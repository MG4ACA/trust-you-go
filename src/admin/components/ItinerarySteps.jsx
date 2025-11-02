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

  // Build itinerary from package_locations
  const itineraryData = useMemo(() => {
    const itinerary = Array.from({ length: numDays }, (_, index) => ({
      dayNumber: index + 1,
      description: '',
      locations: [],
    }));

    // Populate locations from package_locations
    if (Array.isArray(value)) {
      value.forEach((pl) => {
        const location = locations.find((l) => l.locationId === pl.location_id);
        if (location && pl.day_number <= numDays) {
          const dayIndex = pl.day_number - 1;
          itinerary[dayIndex].locations.push({
            ...location,
            visit_order: pl.visit_order || 0,
            notes: pl.notes || '',
          });
        }
      });
    }

    // Sort locations by visit_order within each day
    itinerary.forEach((day) => {
      day.locations.sort((a, b) => (a.visit_order || 0) - (b.visit_order || 0));
    });

    return itinerary;
  }, [numDays, value, locations]);

  const handleDescriptionChange = (dayIndex, newDescription) => {
    // For now, descriptions are not persisted (not in database schema)
    // This is kept for UI purposes but won't be saved
    console.log('Day description changed:', dayIndex, newDescription);
  };

  const searchLocation = (event) => {
    const query = event.query.toLowerCase();
    setFilteredLocations(
      locations.filter(
        (location) =>
          location.name.toLowerCase().includes(query) ||
          location.description.toLowerCase().includes(query)
      )
    );
  };

  const handleLocationSelect = (dayIndex, location) => {
    // Transform back to package_locations format
    const packageLocations = itineraryData.flatMap((day) =>
      (day.locations || []).map((loc) => ({
        location_id: loc.locationId,
        day_number: day.dayNumber,
        visit_order: loc.visit_order || 0,
        notes: loc.notes || '',
      }))
    );

    // Check if location already exists on this day
    const dayNumber = itineraryData[dayIndex].dayNumber;
    if (
      packageLocations.some(
        (pl) => pl.location_id === location.locationId && pl.day_number === dayNumber
      )
    ) {
      return; // Location already added
    }

    // Get next visit order for this day
    const dayLocations = packageLocations.filter((pl) => pl.day_number === dayNumber);
    const nextVisitOrder =
      dayLocations.length > 0 ? Math.max(...dayLocations.map((l) => l.visit_order || 0)) + 1 : 0;

    // Add new location
    const newPackageLocation = {
      location_id: location.locationId,
      day_number: dayNumber,
      visit_order: nextVisitOrder,
      notes: '',
    };

    packageLocations.push(newPackageLocation);
    onChange?.(packageLocations);
  };

  const removeLocation = (dayIndex, locationId) => {
    // Transform back to package_locations format
    const packageLocations = itineraryData.flatMap((day) =>
      (day.locations || []).map((loc) => ({
        location_id: loc.locationId,
        day_number: day.dayNumber,
        visit_order: loc.visit_order || 0,
        notes: loc.notes || '',
      }))
    );

    // Remove the location
    const dayNumber = itineraryData[dayIndex].dayNumber;
    const filtered = packageLocations.filter(
      (pl) => !(pl.location_id === locationId && pl.day_number === dayNumber)
    );

    onChange?.(filtered);
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
    <div key={location.locationId} className="flex align-items-center">
      <div>
        <div>{location.name}</div>
        <small>{location.description}</small>
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
                      <div key={location.locationId} className="col-12 md:col-6 lg:col-4 xl:col-3">
                        <Card
                          title={location.name}
                          subTitle={
                            <div className="flex align-items-center gap-2">
                              <LocationTypeTag type={location.locationType} />
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
                                // Transform back to package_locations format
                                const packageLocations = itineraryData.flatMap((day) =>
                                  (day.locations || []).map((loc) => ({
                                    location_id: loc.locationId,
                                    day_number: day.dayNumber,
                                    visit_order: loc.visit_order || 0,
                                    notes: loc.notes || '',
                                  }))
                                );

                                // Find and update the note
                                const dayNumber = itineraryData[index].dayNumber;
                                const updated = packageLocations.map((pl) =>
                                  pl.location_id === location.locationId &&
                                  pl.day_number === dayNumber
                                    ? { ...pl, notes: e.target.value }
                                    : pl
                                );

                                onChange?.(updated);
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
                              onClick={() => removeLocation(index, location.locationId)}
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
