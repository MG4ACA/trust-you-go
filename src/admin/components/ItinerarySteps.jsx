import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
import { InputTextarea } from 'primereact/inputtextarea';
import { Steps } from 'primereact/steps';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTES } from '../config/routeConfig';
import LocationTypeTag from './LocationTypeTag';

const ItinerarySteps = ({
  numDays = 1,
  value = [],
  onChange,
  onSave,
  disabled = false,
  locations = [],
  errors = {},
}) => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [locationInput, setLocationInput] = useState('');

  const validateLocationAdd = (dayNumber, location) => {
    const dayLocations = itineraryData[dayNumber - 1]?.locations || [];

    // Check for duplicate locations
    if (dayLocations.some((loc) => loc.id === location.id)) {
      return 'Location already added to this day';
    }

    // Validate accommodation count
    const accommodationCount = dayLocations.filter(
      (loc) => loc.location_type === 'accommodation'
    ).length;

    if (location.location_type === 'accommodation' && accommodationCount >= 1) {
      return 'Cannot add more than one accommodation per day';
    }

    return null;
  };

  // Use memo to compute itinerary data
  const itineraryData = useMemo(() => {
    return Array.from({ length: numDays }, (_, index) => ({
      dayNumber: index + 1,
      description: value[index]?.description || '',
      locations: (value[index]?.locations || []).map((loc) => ({
        ...loc,
        visit_order: loc.visit_order || 0,
        notes: loc.notes || '',
      })),
    }));
  }, [numDays, value]);

  const handleDescriptionChange = (dayIndex, newDescription) => {
    const updatedItinerary = [...itineraryData];
    updatedItinerary[dayIndex] = {
      ...updatedItinerary[dayIndex],
      description: newDescription,
    };
    onChange?.(updatedItinerary);
  };

  const searchLocation = (event) => {
    const query = event.query.toLowerCase();
    setFilteredLocations(
      locations.filter(
        (location) =>
          location.name.toLowerCase().includes(query) || location.city.toLowerCase().includes(query)
      )
    );
  };

  const handleLocationSelect = (dayIndex, location) => {
    const updatedItinerary = [...itineraryData];
    if (!updatedItinerary[dayIndex].locations) {
      updatedItinerary[dayIndex].locations = [];
    }

    // Check if location already exists
    if (!updatedItinerary[dayIndex].locations.find((loc) => loc.id === location.id)) {
      // Get the next visit_order for this day
      const nextVisitOrder =
        updatedItinerary[dayIndex].locations.length > 0
          ? Math.max(...updatedItinerary[dayIndex].locations.map((l) => l.visit_order)) + 1
          : 0;

      // Make sure we have the complete location object with all properties
      const selectedLocation = {
        ...location,
        visit_order: nextVisitOrder,
        notes: '',
        // Ensure these properties exist
        images: location.images || [],
        name: location.name || '',
        city: location.city || '',
        province: location.province || '',
        location_type: location.location_type || '',
      };

      updatedItinerary[dayIndex].locations = [
        ...updatedItinerary[dayIndex].locations,
        selectedLocation,
      ];

      // Update the itinerary
      onChange?.(updatedItinerary);
    }
  };

  const removeLocation = (dayIndex, locationId) => {
    const updatedItinerary = [...itineraryData];
    updatedItinerary[dayIndex].locations = updatedItinerary[dayIndex].locations.filter(
      (location) => location.id !== locationId
    );
    onChange?.(updatedItinerary);
  };

  const handleAddNewLocation = async () => {
    // Save current package data before navigating
    if (onSave) {
      await onSave(itineraryData);
    }
    // Navigate to location creation page
    navigate(ADMIN_ROUTES.CREATE_LOCATION);
  };

  const locationItemTemplate = (location) => (
    <div key={location.id} className="flex align-items-center">
      <div>
        <div>{location.name}</div>
        <small>
          {location.city}, {location.province}
        </small>
      </div>
    </div>
  );

  const stepItems = itineraryData.map((day) => ({
    label: `Day ${day.dayNumber}`,
  }));

  return (
    <div className="itinerary-steps">
      {errors.itinerary && <div className="p-error mb-3">{errors.itinerary}</div>}
      <Steps
        model={stepItems}
        activeIndex={activeStep}
        onSelect={(e) => setActiveStep(e.index)}
        readOnly={disabled}
      />

      {itineraryData.map((day, index) => (
        <Card
          key={day.dayNumber}
          className={`mt-3 ${activeStep === index ? 'block' : 'hidden'}`}
          title={`Day ${day.dayNumber} Details`}
        >
          <div className="grid">
            <div className="col-12">
              <div className="field">
                <label htmlFor={`description-${day.dayNumber}`}>Description</label>
                <InputTextarea
                  id={`description-${day.dayNumber}`}
                  value={day.description}
                  onChange={(e) => handleDescriptionChange(index, e.target.value)}
                  rows={3}
                  disabled={disabled}
                />
              </div>
            </div>

            {!disabled && (
              <div className="col-12">
                <div className="field">
                  <label>Add Location</label>
                  <div className="grid">
                    <div className="col-12">
                      <div className="p-inputgroup">
                        <AutoComplete
                          value={locationInput}
                          suggestions={filteredLocations}
                          completeMethod={searchLocation}
                          field="name"
                          itemTemplate={locationItemTemplate}
                          onChange={(e) => setLocationInput(e.value)}
                          onSelect={(e) => {
                            handleLocationSelect(index, e.value);
                            setLocationInput('');
                          }}
                          placeholder="Search for a location..."
                          className="w-full"
                          dropdown
                        />
                        <Button
                          icon="pi pi-plus"
                          className="p-button-success"
                          onClick={handleAddNewLocation}
                          tooltip="Add New Location"
                          tooltipOptions={{ position: 'bottom' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="col-12">
              <div className="grid">
                {day.locations &&
                  [...day.locations]
                    .sort((a, b) => a.visit_order - b.visit_order)
                    .map((location) => (
                      <div key={location.id} className="col-12 md:col-6 lg:col-4 xl:col-3">
                        <Card
                          title={location.name}
                          subTitle={
                            <div className="flex align-items-center gap-2">
                              <LocationTypeTag type={location.location_type} />
                              <span>
                                {location.city}, {location.province}
                              </span>
                            </div>
                          }
                          className="mb-3"
                        >
                          {location.images && location.images.length > 0 && (
                            <Image
                              src={location.images[0].imageUrl}
                              alt={location.name}
                              width="100%"
                              preview
                            />
                          )}
                          <div className="mt-2">
                            <InputTextarea
                              value={location.notes || ''}
                              onChange={(e) => {
                                const updatedItinerary = [...itineraryData];
                                const loc = updatedItinerary[index].locations.find(
                                  (l) => l.id === location.id
                                );
                                if (loc) {
                                  loc.notes = e.target.value;
                                  onChange?.(updatedItinerary);
                                }
                              }}
                              rows={2}
                              placeholder="Add notes..."
                              disabled={disabled}
                              className="w-full"
                            />
                          </div>
                          {!disabled && (
                            <Button
                              icon="pi pi-times"
                              className="p-button-rounded p-button-danger p-button-sm absolute right-0 top-0 m-2"
                              onClick={() => removeLocation(index, location.id)}
                            />
                          )}
                        </Card>
                      </div>
                    ))}
              </div>
            </div>
          </div>

          <div className="flex justify-content-between mt-3">
            <Button
              label="Previous"
              icon="pi pi-chevron-left"
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0 || disabled}
              className="p-button-secondary"
            />
            <Button
              label="Next"
              icon="pi pi-chevron-right"
              iconPos="right"
              onClick={() => setActiveStep(Math.min(numDays - 1, activeStep + 1))}
              disabled={activeStep === numDays - 1 || disabled}
            />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ItinerarySteps;
