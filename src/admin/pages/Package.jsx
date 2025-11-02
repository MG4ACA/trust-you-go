import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ItinerarySteps from '../components/ItinerarySteps';
import { ADMIN_ROUTES } from '../config/routeConfig';
import { fetchLocations } from '../store/slices/locationSlice';
import {
  clearSelectedPackage,
  createPackage,
  fetchPackageById,
  updatePackage,
} from '../store/slices/packageSlice';

const Package = () => {
  const toast = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { selectedPackage, loading, error } = useSelector((state) => state.packages);
  const { locations } = useSelector((state) => state.locations);
  const location = useLocation();

  const isCreateMode = location.pathname.endsWith('/create');
  const isEditMode = location.pathname.includes('/edit/');
  const isViewMode = id && !isCreateMode && !isEditMode;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    noOfDays: 1,
    basePrice: 0,
    isTemplate: false,
    isActive: true,
    packageLocations: [],
  });

  useEffect(() => {
    // Fetch locations regardless of mode
    dispatch(fetchLocations());

    // Only fetch package if we have a numeric ID (editing/viewing existing package)
    if (id && id !== 'new') {
      dispatch(fetchPackageById(id));
    }
    return () => {
      dispatch(clearSelectedPackage());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedPackage) {
      // Transform package_locations into display format
      const packageLocations = selectedPackage.packageLocations || [];

      setFormData({
        title: selectedPackage.title || '',
        description: selectedPackage.description || '',
        noOfDays: selectedPackage.noOfDays || 1,
        basePrice: selectedPackage.basePrice || 0,
        isTemplate: selectedPackage.isTemplate || false,
        isActive: selectedPackage.isActive !== undefined ? selectedPackage.isActive : true,
        packageLocations: packageLocations,
      });
    }
  }, [selectedPackage, locations]);

  useEffect(() => {
    if (error) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: error,
        life: 3000,
      });
    }
  }, [error]);

  const validateForm = () => {
    const errors = {};
    if (!formData.title?.trim()) errors.title = 'Package title is required';
    if (!formData.description?.trim()) errors.description = 'Description is required';
    if (!formData.noOfDays || formData.noOfDays < 1)
      errors.noOfDays = 'Duration must be at least 1 day';
    if (!formData.basePrice || formData.basePrice <= 0)
      errors.basePrice = 'Base price must be greater than 0';

    // Validate package_locations - each day must have at least one location
    if (formData.packageLocations && formData.packageLocations.length > 0) {
      const daysWithLocations = new Set(formData.packageLocations.map((pl) => pl.day_number));
      const allDaysCovered = Array.from({ length: formData.noOfDays }, (_, i) => i + 1).every(
        (day) => daysWithLocations.has(day)
      );
      if (!allDaysCovered) {
        errors.packageLocations = 'Each day must have at least one location';
      }
    } else if (formData.noOfDays > 0) {
      errors.packageLocations = 'At least one location must be added to the package';
    }

    return errors;
  };

  const handlePopulateSampleData = () => {
    setFormData((prev) => ({
      ...prev,
      title: 'Cultural Triangle Tour',
      description:
        'Explore the rich cultural heritage of Sri Lanka. This comprehensive tour covers three ancient capitals: Anuradhapura, Polonnaruwa, and Kandy. Visit UNESCO World Heritage Sites, ancient temples, and learn about Buddhist history and architecture.',
      noOfDays: 5,
      basePrice: 899.99,
      isTemplate: false,
      isActive: true,
      packageLocations: prev.packageLocations || [],
    }));
    toast.current.show({
      severity: 'info',
      summary: 'Sample Data Loaded',
      detail: 'Form populated with sample package data',
      life: 2000,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      Object.entries(validationErrors).forEach(([field, message]) => {
        toast.current.show({
          severity: 'error',
          summary: 'Validation Error',
          detail: `${field}: ${message}`,
          life: 3000,
        });
      });
      return;
    }

    try {
      if (id) {
        await dispatch(updatePackage({ id, data: formData })).unwrap();
        toast.current.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Package updated successfully',
          life: 3000,
        });
      } else {
        await dispatch(createPackage(formData)).unwrap();
        toast.current.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Package created successfully',
          life: 3000,
        });
        navigate(ADMIN_ROUTES.PACKAGES_LIST);
      }
    } catch (error) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: error,
        life: 3000,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (e, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: e.value,
    }));
  };

  const handleCancel = () => {
    navigate(ADMIN_ROUTES.PACKAGES_LIST);
  };

  const getTitle = () => {
    if (isViewMode) return 'Package Details';
    if (isEditMode) return 'Edit Package';
    return 'Create New Package';
  };

  const getIcon = () => {
    if (isViewMode) return 'pi-eye';
    if (isEditMode) return 'pi-pencil';
    return 'pi-box';
  };

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <div className="flex justify-content-between align-items-center mb-4">
        <div className="flex align-items-center gap-2">
          <i className={`pi ${getIcon()} text-3xl text-primary`}></i>
          <h1 className="text-4xl font-bold text-900 m-0">{getTitle()}</h1>
        </div>
        <div className="flex gap-2">
          <Button
            label="Back to List"
            icon="pi pi-arrow-left"
            outlined
            onClick={() => navigate(ADMIN_ROUTES.PACKAGES_LIST)}
          />
          {isViewMode && (
            <Button
              label="Edit Package"
              icon="pi pi-pencil"
              onClick={() => navigate(ADMIN_ROUTES.EDIT_PACKAGE(id))}
            />
          )}
        </div>
      </div>
      <Card>
        <form onSubmit={handleSubmit} className="p-fluid">
          <div className="grid">
            <div className="col-12">
              <div className="field">
                <label htmlFor="title">Package Title *</label>
                <InputText
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  disabled={isViewMode}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="field">
                <label htmlFor="description">Description *</label>
                <InputTextarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  required
                  disabled={isViewMode}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="field">
                <label htmlFor="noOfDays">Duration (Days) *</label>
                <InputNumber
                  id="noOfDays"
                  name="noOfDays"
                  value={formData.noOfDays}
                  onValueChange={(e) => handleNumberChange(e, 'noOfDays')}
                  min={1}
                  required
                  disabled={isViewMode}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="field">
                <label htmlFor="basePrice">Base Price ($) *</label>
                <InputNumber
                  id="basePrice"
                  name="basePrice"
                  value={formData.basePrice}
                  onValueChange={(e) => handleNumberChange(e, 'basePrice')}
                  mode="currency"
                  currency="USD"
                  locale="en-US"
                  min={0}
                  required
                  disabled={isViewMode}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="field">
                <label htmlFor="isTemplate" className="block">
                  Template Package
                </label>
                <div className="flex align-items-center">
                  <Checkbox
                    inputId="isTemplate"
                    name="isTemplate"
                    checked={formData.isTemplate}
                    onChange={(e) =>
                      handleChange({
                        target: { name: 'isTemplate', value: e.checked },
                      })
                    }
                    disabled={isViewMode}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="field">
                <label htmlFor="isActive" className="block">
                  Active
                </label>
                <div className="flex align-items-center">
                  <Checkbox
                    inputId="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={(e) =>
                      handleChange({
                        target: { name: 'isActive', value: e.checked },
                      })
                    }
                    disabled={isViewMode}
                  />
                </div>
              </div>
            </div>
            <div className="col-12">
              <h3>Package Locations</h3>
              <ItinerarySteps
                numDays={formData.noOfDays}
                onChange={(packageLocations) => {
                  // Transform itinerary data into packageLocations format
                  const transformedLocations = packageLocations.flatMap((day) =>
                    (day.locations || []).map((location) => ({
                      location_id: location.id,
                      day_number: day.dayNumber,
                      visit_order: location.visit_order || 0,
                      notes: location.notes || '',
                    }))
                  );

                  setFormData((prev) => ({
                    ...prev,
                    packageLocations: transformedLocations,
                  }));
                }}
                value={formData.package_locations}
                disabled={isViewMode}
                locations={locations}
                onSave={async (packageLocationData) => {
                  // Save current form data with the new package locations
                  const updatedData = {
                    ...formData,
                    package_locations: packageLocationData,
                  };

                  if (id) {
                    await dispatch(updatePackage({ id, data: updatedData })).unwrap();
                  } else {
                    await dispatch(createPackage(updatedData)).unwrap();
                  }
                }}
              />
            </div>
            <div className="col-12 flex justify-content-between align-items-center gap-2">
              {!isViewMode && (
                <Button
                  label="Load Sample Data"
                  icon="pi pi-list"
                  text
                  onClick={handlePopulateSampleData}
                  type="button"
                  tooltip="Populate form with sample package data"
                  tooltipOptions={{ position: 'bottom' }}
                />
              )}
              {!isViewMode && (
                <div className="flex gap-2">
                  <Button
                    label="Cancel"
                    icon="pi pi-times"
                    onClick={handleCancel}
                    className="p-button-text"
                  />
                  <Button label="Save" icon="pi pi-save" type="submit" loading={loading} />
                </div>
              )}
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Package;
