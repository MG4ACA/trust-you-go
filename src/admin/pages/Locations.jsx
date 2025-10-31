import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
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
import { getLocationImages, saveLocationImagesMetadata } from '../services/uploadService';
import {
  clearCurrentLocation,
  createLocation,
  fetchLocationById,
  updateLocation,
} from '../store/slices/locationSlice';
import '../styles/admin.css';

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
    city: '',
    province: 'Western Province',
    location_type: 'tourist_spot',
    latitude: 0,
    longitude: 0,
    entryFee: 0,
    bestTimeToVisit: '',
    averageVisitDuration: '',
    isActive: true,
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  const locationTypeOptions = [
    { label: 'Tourist Spot', value: 'tourist_spot' },
    { label: 'Accommodation', value: 'accommodation' },
    { label: 'Restaurant', value: 'restaurant' },
    { label: 'Activity', value: 'activity' },
    { label: 'Religious', value: 'religious' },
    { label: 'Wildlife', value: 'wildlife' },
    { label: 'Nature', value: 'nature' },
    { label: 'Beach', value: 'beach' },
    { label: 'Adventure', value: 'adventure' },
  ];

  const provinceOptions = [
    { label: 'Western Province', value: 'Western Province' },
    { label: 'Central Province', value: 'Central Province' },
    { label: 'Southern Province', value: 'Southern Province' },
    { label: 'Northern Province', value: 'Northern Province' },
    { label: 'Eastern Province', value: 'Eastern Province' },
    { label: 'North Western Province', value: 'North Western Province' },
    { label: 'North Central Province', value: 'North Central Province' },
    { label: 'Uva Province', value: 'Uva Province' },
    { label: 'Sabaragamuwa Province', value: 'Sabaragamuwa Province' },
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
        city: currentLocation.city || '',
        province: currentLocation.province || 'Western Province',
        location_type: currentLocation.location_type || 'historical',
        latitude: currentLocation.latitude || 0,
        longitude: currentLocation.longitude || 0,
        entryFee: currentLocation.entryFee || 0,
        bestTimeToVisit: currentLocation.bestTimeToVisit || '',
        averageVisitDuration: currentLocation.averageVisitDuration || '',
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

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (formData.latitude < -90 || formData.latitude > 90) {
      newErrors.latitude = 'Latitude must be between -90 and 90';
    }

    if (formData.longitude < -180 || formData.longitude > 180) {
      newErrors.longitude = 'Longitude must be between -180 and 180';
    }

    if (formData.entryFee < 0) {
      newErrors.entryFee = 'Entry fee cannot be negative';
    }

    if (!formData.bestTimeToVisit.trim()) {
      newErrors.bestTimeToVisit = 'Best time to visit is required';
    }

    if (!formData.averageVisitDuration.trim()) {
      newErrors.averageVisitDuration = 'Average visit duration is required';
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
    <div className="p-4">
      <Toast ref={toast} />

      <div className="flex justify-content-between align-items-center mb-4">
        <div className="flex align-items-center gap-2">
          <i className={`pi ${getIcon()} text-3xl text-primary`}></i>
          <h1 className="text-4xl font-bold text-900 m-0">{getTitle()}</h1>
        </div>
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
              <div className="grid">
                {/* Name */}
                <div className="col-12 md:col-6">
                  <label htmlFor="name" className="block text-900 font-medium mb-2">
                    Location Name <span className="text-red-500">*</span>
                  </label>
                  <InputText
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full ${errors.name ? 'p-invalid' : ''}`}
                    disabled={isViewMode}
                    placeholder="e.g., Sigiriya Rock Fortress"
                  />
                  {errors.name && <small className="p-error">{errors.name}</small>}
                </div>

                {/* City */}
                <div className="col-12 md:col-6">
                  <label htmlFor="city" className="block text-900 font-medium mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <InputText
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className={`w-full ${errors.city ? 'p-invalid' : ''}`}
                    disabled={isViewMode}
                    placeholder="e.g., Sigiriya"
                  />
                  {errors.city && <small className="p-error">{errors.city}</small>}
                </div>

                {/* Province */}
                <div className="col-12 md:col-6">
                  <label htmlFor="province" className="block text-900 font-medium mb-2">
                    Province <span className="text-red-500">*</span>
                  </label>
                  <Dropdown
                    id="province"
                    value={formData.province}
                    options={provinceOptions}
                    onChange={(e) => handleInputChange('province', e.value)}
                    className="w-full"
                    disabled={isViewMode}
                  />
                </div>

                {/* Location Type */}
                <div className="col-12 md:col-6">
                  <label htmlFor="locationType" className="block text-900 font-medium mb-2">
                    Location Type <span className="text-red-500">*</span>
                  </label>
                  <Dropdown
                    id="locationType"
                    value={formData.location_type}
                    options={locationTypeOptions}
                    onChange={(e) => handleInputChange('location_type', e.value)}
                    className="w-full"
                    disabled={isViewMode}
                  />
                </div>

                {/* Description */}
                <div className="col-12">
                  <label htmlFor="description" className="block text-900 font-medium mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <InputTextarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className={`w-full ${errors.description ? 'p-invalid' : ''}`}
                    disabled={isViewMode}
                    placeholder="Provide a detailed description of the location..."
                  />
                  {errors.description && <small className="p-error">{errors.description}</small>}
                  <small className="text-600 block mt-1">
                    {formData.description.length} characters (minimum 20 required)
                  </small>
                </div>

                {/* Latitude */}
                <div className="col-12 md:col-6">
                  <label htmlFor="latitude" className="block text-900 font-medium mb-2">
                    Latitude <span className="text-red-500">*</span>
                  </label>
                  <InputNumber
                    id="latitude"
                    value={formData.latitude}
                    onValueChange={(e) => handleInputChange('latitude', e.value)}
                    className={`w-full ${errors.latitude ? 'p-invalid' : ''}`}
                    disabled={isViewMode}
                    minFractionDigits={2}
                    maxFractionDigits={6}
                    placeholder="e.g., 7.957"
                  />
                  {errors.latitude && <small className="p-error">{errors.latitude}</small>}
                </div>

                {/* Longitude */}
                <div className="col-12 md:col-6">
                  <label htmlFor="longitude" className="block text-900 font-medium mb-2">
                    Longitude <span className="text-red-500">*</span>
                  </label>
                  <InputNumber
                    id="longitude"
                    value={formData.longitude}
                    onValueChange={(e) => handleInputChange('longitude', e.value)}
                    className={`w-full ${errors.longitude ? 'p-invalid' : ''}`}
                    disabled={isViewMode}
                    minFractionDigits={2}
                    maxFractionDigits={6}
                    placeholder="e.g., 80.7603"
                  />
                  {errors.longitude && <small className="p-error">{errors.longitude}</small>}
                </div>

                {/* Entry Fee */}
                <div className="col-12 md:col-4">
                  <label htmlFor="entryFee" className="block text-900 font-medium mb-2">
                    Entry Fee (USD) <span className="text-red-500">*</span>
                  </label>
                  <InputNumber
                    id="entryFee"
                    value={formData.entryFee}
                    onValueChange={(e) => handleInputChange('entryFee', e.value)}
                    className={`w-full ${errors.entryFee ? 'p-invalid' : ''}`}
                    disabled={isViewMode}
                    min={0}
                    prefix="$"
                    placeholder="0"
                  />
                  {errors.entryFee && <small className="p-error">{errors.entryFee}</small>}
                  <small className="text-600 block mt-1">Set to 0 for free entry</small>
                </div>

                {/* Best Time to Visit */}
                <div className="col-12 md:col-4">
                  <label htmlFor="bestTimeToVisit" className="block text-900 font-medium mb-2">
                    Best Time to Visit <span className="text-red-500">*</span>
                  </label>
                  <InputText
                    id="bestTimeToVisit"
                    value={formData.bestTimeToVisit}
                    onChange={(e) => handleInputChange('bestTimeToVisit', e.target.value)}
                    className={`w-full ${errors.bestTimeToVisit ? 'p-invalid' : ''}`}
                    disabled={isViewMode}
                    placeholder="e.g., December to April"
                  />
                  {errors.bestTimeToVisit && (
                    <small className="p-error">{errors.bestTimeToVisit}</small>
                  )}
                </div>

                {/* Average Visit Duration */}
                <div className="col-12 md:col-4">
                  <label htmlFor="averageVisitDuration" className="block text-900 font-medium mb-2">
                    Avg. Visit Duration <span className="text-red-500">*</span>
                  </label>
                  <InputText
                    id="averageVisitDuration"
                    value={formData.averageVisitDuration}
                    onChange={(e) => handleInputChange('averageVisitDuration', e.target.value)}
                    className={`w-full ${errors.averageVisitDuration ? 'p-invalid' : ''}`}
                    disabled={isViewMode}
                    placeholder="e.g., 3-4 hours"
                  />
                  {errors.averageVisitDuration && (
                    <small className="p-error">{errors.averageVisitDuration}</small>
                  )}
                </div>

                {/* Active Status */}
                <div className="col-12">
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
                      icon={isEditMode ? 'pi pi-check' : 'pi-plus'}
                      severity="success"
                      loading={actionLoading}
                      type="submit"
                    />
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
