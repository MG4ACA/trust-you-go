import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { TabPanel, TabView } from 'primereact/tabview';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ImageUploader from '../components/ImageUploader';
import { FormSkeleton } from '../components/LoadingSkeleton';
import { ADMIN_ROUTES } from '../config/routeConfig';
import { SAMPLE_DATA } from '../config/sampleData';
import { getLocationImages, saveLocationImagesMetadata } from '../services/uploadService';
import {
  clearCurrentLocation,
  createLocation,
  fetchLocationById,
  updateLocation,
} from '../store/slices/locationSlice';
import '../styles/admin.css';
import '../styles/form.css';

function Locations() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useRef(null);

  const { currentLocation, loading, actionLoading } = useSelector((state) => state.locations);
  const isViewMode = id && !window.location.pathname.includes('/edit/');
  const isEditMode = id && window.location.pathname.includes('/edit/');
  const isCreateMode = !id;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    locationType: 'historical',
    locationUrl: '',
    isActive: true,
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  const locationTypeOptions = [
    { label: 'Historical', value: 'historical' },
    { label: 'Religious', value: 'religious' },
    { label: 'Wildlife', value: 'wildlife' },
    { label: 'Nature', value: 'nature' },
    { label: 'Beach', value: 'beach' },
    { label: 'Adventure', value: 'adventure' },
  ];

  useEffect(() => {
    if (id && (isViewMode || isEditMode)) {
      dispatch(fetchLocationById(id));
      // Load images for this location
      loadLocationImages(id);
    }

    return () => {
      dispatch(clearCurrentLocation());
    };
  }, [dispatch, id, isViewMode, isEditMode]);

  const loadLocationImages = async (locationId) => {
    try {
      const locationImages = await getLocationImages(locationId);
      setImages(locationImages);
    } catch (error) {
      console.error('Failed to load images:', error);
    }
  };

  useEffect(() => {
    if (currentLocation && (isViewMode || isEditMode)) {
      setFormData({
        name: currentLocation.name || '',
        description: currentLocation.description || '',
        locationType: currentLocation.locationType || 'historical',
        locationUrl: currentLocation.locationUrl || '',
        isActive: currentLocation.isActive !== undefined ? currentLocation.isActive : true,
      });
    }
  }, [currentLocation, isViewMode, isEditMode]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handlePopulateSampleData = () => {
    setFormData((prev) => ({
      ...prev,
      ...SAMPLE_DATA.location,
    }));
    toast.current.show({
      severity: 'info',
      summary: 'Sample Data Loaded',
      detail: 'Form populated with sample location data',
      life: 2000,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.current.show({
        severity: 'warn',
        summary: 'Validation Required',
        detail: 'Please review and fix the highlighted fields before submitting.',
        life: 4000,
      });
      return;
    }

    try {
      let locationId = id;

      if (isCreateMode) {
        const result = await dispatch(createLocation(formData)).unwrap();
        locationId = result.id;

        toast.current.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Location created successfully',
          life: 3000,
        });
      } else if (isEditMode) {
        await dispatch(updateLocation({ id, data: formData })).unwrap();

        toast.current.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Location updated successfully',
          life: 3000,
        });
      }

      // Save images metadata for new images
      if (images.length > 0) {
        const newImages = images.filter((img) => img.isNew);
        if (newImages.length > 0 && locationId) {
          await saveLocationImagesMetadata(locationId, newImages);
        }
      }

      setTimeout(() => navigate(ADMIN_ROUTES.LOCATIONS_LIST), 1500);
    } catch (error) {
      const errorDetail =
        error.message ||
        (isCreateMode
          ? 'Failed to create location. Please check your connection and try again.'
          : 'Failed to update location. Please check your connection and try again.');

      toast.current.show({
        severity: 'error',
        summary: isCreateMode ? 'Creation Failed' : 'Update Failed',
        detail: errorDetail,
        life: 5000,
      });
    }
  };

  if (loading && (isViewMode || isEditMode)) {
    return <FormSkeleton />;
  }

  const getTitle = () => {
    if (isViewMode) return 'Location Details';
    if (isEditMode) return 'Edit Location';
    return 'Create New Location';
  };

  const getIcon = () => {
    if (isViewMode) return 'pi-eye';
    if (isEditMode) return 'pi-pencil';
    return 'pi-map-marker';
  };

  return (
    <div className="form-container">
      <Toast ref={toast} />

      <div className="flex justify-content-between align-items-center mb-4">
        <Button
          label="Back to List"
          icon="pi pi-arrow-left"
          outlined
          onClick={() => navigate(ADMIN_ROUTES.LOCATIONS_LIST)}
        />
      </div>

      <TabView>
        {/* Tab 1: Location Details */}
        <TabPanel header="Location Details" leftIcon="pi pi-map-marker mr-2">
          <Card>
            <form onSubmit={handleSubmit}>
              <div>
                <div className="flex justify-content-around">
                  {/* Name */}
                  <div className="w-40">
                    <label htmlFor="name" className="block text-900 font-medium mb-2">
                      Location Name <span className="text-red-500">*</span>
                    </label>

                    <InputText
                      id="name"
                      disabled={isViewMode}
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full ${errors.name ? 'p-invalid' : ''}`}
                      placeholder="e.g., Sigiriya Rock Fortress"
                    />
                    {errors.name && <small className="p-error">{errors.name}</small>}
                  </div>

                  {/* Location Type */}
                  <div className="w-40">
                    <label htmlFor="locationType" className="block text-900 font-medium mb-2">
                      Location Type <span className="text-red-500">*</span>
                    </label>
                    <Dropdown
                      id="locationType"
                      value={formData.locationType}
                      options={locationTypeOptions}
                      onChange={(e) => handleInputChange('locationType', e.value)}
                      className="w-full"
                      disabled={isViewMode}
                    />
                  </div>
                </div>

                <div className="flex justify-content-around">
                  {/* Description */}
                  <div className="w-40">
                    <label htmlFor="description" className="block text-900 font-medium mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>

                    <InputTextarea
                      id="description"
                      disabled={isViewMode}
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className={`w-full ${errors.description ? 'p-invalid' : ''}`}
                      placeholder="Provide a detailed description of the location..."
                    />
                    {errors.description && <small className="p-error">{errors.description}</small>}
                    <small className="text-600 block mt-1">
                      {formData.description.length} characters (minimum 20 required)
                    </small>
                  </div>

                  {/* Location URL */}
                  <div className="w-40">
                    <label htmlFor="locationUrl" className="block text-900 font-medium mb-2">
                      Location URL
                    </label>

                    <InputText
                      id="locationUrl"
                      disabled={isViewMode}
                      value={formData.locationUrl}
                      onChange={(e) => handleInputChange('locationUrl', e.target.value)}
                      className="w-full"
                      placeholder="e.g., https://example.com/location"
                    />
                    <small className="text-600 block mt-1">Optional website or map link</small>
                  </div>
                </div>

                <div className="flex justify-content-around">
                  {/* Active Status */}
                  <div className="w-40">
                    <div className="flex align-items-center">
                      <Checkbox
                        inputId="isActive"
                        checked={formData.isActive}
                        onChange={(e) => handleInputChange('isActive', e.checked)}
                        disabled={isViewMode}
                      />
                      <label htmlFor="isActive" className="ml-2 text-900">
                        Active (Location visible to agents and customers)
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {!isViewMode && (
                <>
                  <Divider />
                  <div className="flex justify-content-between align-items-center gap-2">
                    <Button
                      label="Load Sample Data"
                      icon="pi pi-list"
                      text
                      onClick={handlePopulateSampleData}
                      type="button"
                      tooltip="Populate form with sample location data"
                      tooltipOptions={{ position: 'bottom' }}
                    />
                    <div className="flex justify-content-end gap-2">
                      <Button
                        label="Cancel"
                        icon="pi pi-times"
                        outlined
                        severity="secondary"
                        onClick={() => navigate(ADMIN_ROUTES.LOCATIONS_LIST)}
                        type="button"
                      />
                      <Button
                        label={isEditMode ? 'Update Location' : 'Create Location'}
                        icon={isEditMode ? 'pi pi-check' : 'pi-plus'}
                        severity="success"
                        loading={actionLoading}
                        type="submit"
                      />
                    </div>
                  </div>
                </>
              )}

              {isViewMode && (
                <>
                  <Divider />
                  <div className="flex justify-content-end gap-2">
                    <Button
                      label="Edit Location"
                      icon="pi pi-pencil"
                      severity="info"
                      onClick={() => navigate(`/admin/locations/edit/${id}`)}
                    />
                  </div>
                </>
              )}
            </form>
          </Card>
        </TabPanel>

        {/* Tab 2: Images */}
        <TabPanel header="Images" leftIcon="pi pi-images mr-2">
          <Card>
            <ImageUploader
              locationId={id || 'temp'}
              initialImages={images}
              onImagesChange={setImages}
              disabled={isViewMode}
            />

            {!isViewMode && (
              <>
                <Divider />
                <div className="flex justify-content-end gap-2">
                  <Button
                    label="Cancel"
                    icon="pi pi-times"
                    outlined
                    severity="secondary"
                    onClick={() => navigate(ADMIN_ROUTES.LOCATIONS_LIST)}
                    type="button"
                  />
                  <Button
                    label={isEditMode ? 'Update Location' : 'Create Location'}
                    icon={isEditMode ? 'pi pi-check' : 'pi pi-plus'}
                    severity="success"
                    loading={actionLoading}
                    onClick={handleSubmit}
                  />
                </div>
              </>
            )}
          </Card>
        </TabPanel>
      </TabView>
    </div>
  );
}

export default Locations;
