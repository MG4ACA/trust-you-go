import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations } from '../store/slices/locationSlice';
import '../styles/form.css';

const ItineraryBuilder = ({ numDays = 1, onChange, value = [] }) => {
  const [itinerary, setItinerary] = useState(value);
  const dispatch = useDispatch();
  const { locations } = useSelector((state) => state.locations);
  const locationOptions = (locations || []).map((loc) => ({
    label: loc.name,
    value: loc.id,
  }));

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  useEffect(() => {
    // Initialize or adjust itinerary when numDays changes
    const days = Array.from({ length: numDays }, (_, i) => i + 1);
    setItinerary((prev) => {
      const newItinerary = [...prev];
      // Add missing days
      days.forEach((day) => {
        if (!newItinerary.find((item) => item.dayNumber === day)) {
          newItinerary.push({
            dayNumber: day,
            items: [],
          });
        }
      });
      // Remove extra days
      return newItinerary.filter((item) => item.dayNumber <= numDays);
    });
  }, [numDays]);

  useEffect(() => {
    onChange(itinerary);
  }, [itinerary, onChange]);

  const handleAddStop = (dayNumber) => {
    setItinerary((prev) =>
      prev.map((day) => {
        if (day.dayNumber === dayNumber) {
          return {
            ...day,
            items: [
              ...day.items,
              {
                locationId: '',
                order: day.items.length + 1,
                notes: '',
              },
            ],
          };
        }
        return day;
      })
    );
  };

  const handleRemoveStop = (dayNumber, order) => {
    setItinerary((prev) =>
      prev.map((day) => {
        if (day.dayNumber === dayNumber) {
          return {
            ...day,
            items: day.items
              .filter((item) => item.order !== order)
              .map((item, index) => ({
                ...item,
                order: index + 1,
              })),
          };
        }
        return day;
      })
    );
  };

  const handleLocationChange = (dayNumber, order, locationId) => {
    setItinerary((prev) =>
      prev.map((day) => {
        if (day.dayNumber === dayNumber) {
          return {
            ...day,
            items: day.items.map((item) => {
              if (item.order === order) {
                return { ...item, locationId };
              }
              return item;
            }),
          };
        }
        return day;
      })
    );
  };

  const handleNotesChange = (dayNumber, order, notes) => {
    setItinerary((prev) =>
      prev.map((day) => {
        if (day.dayNumber === dayNumber) {
          return {
            ...day,
            items: day.items.map((item) => {
              if (item.order === order) {
                return { ...item, notes };
              }
              return item;
            }),
          };
        }
        return day;
      })
    );
  };

  const locationTemplate = (rowData) => {
    return (
      <Dropdown
        value={rowData.locationId}
        options={locationOptions}
        onChange={(e) => handleLocationChange(rowData.dayNumber, rowData.order, e.value)}
        placeholder="Select location"
        className="w-full"
      />
    );
  };

  const notesTemplate = (rowData) => {
    return (
      <InputText
        value={rowData.notes}
        onChange={(e) => handleNotesChange(rowData.dayNumber, rowData.order, e.target.value)}
        placeholder="Optional notes"
        className="w-full"
      />
    );
  };

  const actionsTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-trash"
        className="p-button-text p-button-danger"
        onClick={() => handleRemoveStop(rowData.dayNumber, rowData.order)}
      />
    );
  };

  return (
    <div className="itinerary-builder-grid">
      {itinerary.map((day) => (
        <div key={day.dayNumber}>
          <Card title={`Day ${day.dayNumber}`}>
            <DataTable
              value={day.items.map((item) => ({
                ...item,
                dayNumber: day.dayNumber,
              }))}
              dataKey="order"
              responsiveLayout="scroll"
            >
              <Column field="order" header="Stop" body={(rowData) => `Stop ${rowData.order}`} />
              <Column field="locationId" header="Location" body={locationTemplate} />
              <Column field="notes" header="Notes" body={notesTemplate} />
              <Column header="Actions" body={actionsTemplate} />
            </DataTable>
            <div className="itinerary-builder-actions">
              <Button
                icon="pi pi-plus"
                label="Add Stop"
                onClick={() => handleAddStop(day.dayNumber)}
                className="p-button-text"
              />
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ItineraryBuilder;
