import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import { Chips } from 'primereact/chips';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ItinerarySteps from '../components/ItinerarySteps';
import { fetchLocations } from '../store/slices/locationSlice';
import {
  clearSelectedPackage,
  createPackage,
  fetchPackageById,
  updatePackage,
} from '../store/slices/packageSlice';

const difficultyLevels = [
  { label: 'Easy', value: 'easy' },
  { label: 'Moderate', value: 'moderate' },
  { label: 'Challenging', value: 'challenging' },
];

const categories = [
  { label: 'Cultural', value: 'cultural' },
  { label: 'Adventure', value: 'adventure' },
  { label: 'Nature', value: 'nature' },
  { label: 'Comprehensive', value: 'comprehensive' },
  { label: 'Short Trip', value: 'short-trip' },
];

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
    name: '',
    description: '',
    duration: 1,
    price: 0,
    maxPeople: 1,
    difficulty: 'easy',
    category: 'cultural',
    includes: [],
    excludes: [],
    highlights: [],
    isActive: true,
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
      setFormData(selectedPackage);
    }
  }, [selectedPackage]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        navigate('/admin/packages');
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
    navigate('/admin/packages');
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
            onClick={() => navigate('/admin/packages')}
          />
          {isViewMode && (
            <Button
              label="Edit Package"
              icon="pi pi-pencil"
              onClick={() => navigate(`/admin/packages/edit/${id}`)}
            />
          )}
        </div>
      </div>
      <Card>
        <form onSubmit={handleSubmit} className="p-fluid">
          <div className="grid">
            <div className="col-12">
              <div className="field">
                <label htmlFor="name">Package Name *</label>
                <InputText
                  id="name"
                  name="name"
                  value={formData.name}
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
                <label htmlFor="duration">Duration (Days) *</label>
                <InputNumber
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onValueChange={(e) => handleNumberChange(e, 'duration')}
                  min={1}
                  required
                  disabled={isViewMode}
                />
              </div>
            </div>{' '}
            <div className="col-6">
              <div className="field">
                <label htmlFor="price">Price ($) *</label>
                <InputNumber
                  id="price"
                  name="price"
                  value={formData.price}
                  onValueChange={(e) => handleNumberChange(e, 'price')}
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
                <label htmlFor="maxPeople">Maximum People *</label>
                <InputNumber
                  id="maxPeople"
                  name="maxPeople"
                  value={formData.maxPeople}
                  onValueChange={(e) => handleNumberChange(e, 'maxPeople')}
                  min={1}
                  required
                  disabled={isViewMode}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="field">
                <label htmlFor="difficulty">Difficulty Level *</label>
                <Dropdown
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  options={difficultyLevels}
                  onChange={handleChange}
                  required
                  disabled={isViewMode}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="field">
                <label htmlFor="category">Category *</label>
                <Dropdown
                  id="category"
                  name="category"
                  value={formData.category}
                  options={categories}
                  onChange={handleChange}
                  required
                  disabled={isViewMode}
                />
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
              <div className="field">
                <label htmlFor="includes">Inclusions</label>
                <Chips
                  id="includes"
                  name="includes"
                  value={formData.includes}
                  onChange={(e) =>
                    handleChange({
                      target: { name: 'includes', value: e.value },
                    })
                  }
                  placeholder="Add inclusion..."
                  disabled={isViewMode}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="field">
                <label htmlFor="excludes">Exclusions</label>
                <Chips
                  id="excludes"
                  name="excludes"
                  value={formData.excludes}
                  onChange={(e) =>
                    handleChange({
                      target: { name: 'excludes', value: e.value },
                    })
                  }
                  placeholder="Add exclusion..."
                  disabled={isViewMode}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="field">
                <label htmlFor="highlights">Highlights</label>
                <Chips
                  id="highlights"
                  name="highlights"
                  value={formData.highlights}
                  onChange={(e) =>
                    handleChange({
                      target: { name: 'highlights', value: e.value },
                    })
                  }
                  placeholder="Add highlight..."
                  disabled={isViewMode}
                />
              </div>
            </div>
            <div className="col-12">
              <h3>Itinerary</h3>
              <ItinerarySteps
                numDays={formData.duration}
                onChange={(itinerary) =>
                  handleChange({
                    target: { name: 'itinerary', value: itinerary },
                  })
                }
                value={formData.itinerary}
                disabled={isViewMode}
                locations={locations}
                onSave={async (itineraryData) => {
                  // Save current form data with the new itinerary
                  const updatedData = {
                    ...formData,
                    itinerary: itineraryData,
                  };

                  if (id) {
                    await dispatch(updatePackage({ id, data: updatedData })).unwrap();
                  } else {
                    await dispatch(createPackage(updatedData)).unwrap();
                  }
                }}
              />
            </div>
            <div className="col-12 flex justify-content-end gap-2">
              {!isViewMode && (
                <>
                  <Button
                    label="Cancel"
                    icon="pi pi-times"
                    onClick={handleCancel}
                    className="p-button-text"
                  />
                  <Button label="Save" icon="pi pi-save" type="submit" loading={loading} />
                </>
              )}
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Package;
