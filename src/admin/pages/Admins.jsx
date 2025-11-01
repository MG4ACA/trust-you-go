import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FormSkeleton } from '../components/LoadingSkeleton';
import { ADMIN_ROUTES } from '../config/routeConfig';
import { SAMPLE_DATA } from '../config/sampleData';
import {
  clearCurrentAdmin,
  createAdmin,
  fetchAdminById,
  updateAdmin,
} from '../store/slices/adminSlice';
import '../styles/admin.css';

function Admins() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useRef(null);

  const { currentAdmin, loading, actionLoading } = useSelector((state) => state.admins);

  // Determine the current mode
  const isViewMode = id && !window.location.pathname.includes('/edit/');
  const isEditMode = id && window.location.pathname.includes('/edit/');
  const isCreateMode = window.location.pathname.includes('/create');

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'administrator',
    status: 'active',
  });

  const [errors, setErrors] = useState({});

  // Fetch single admin for view/edit modes
  useEffect(() => {
    if (id && (isViewMode || isEditMode)) {
      dispatch(fetchAdminById(id));
    }

    return () => {
      if (isViewMode || isEditMode) {
        dispatch(clearCurrentAdmin());
      }
    };
  }, [id, dispatch, isViewMode, isEditMode]);

  // Populate form when currentAdmin is loaded
  useEffect(() => {
    if (currentAdmin && (isViewMode || isEditMode)) {
      setFormData({
        firstName: currentAdmin.firstName || '',
        lastName: currentAdmin.lastName || '',
        email: currentAdmin.email || '',
        phone: currentAdmin.phone || '',
        role: currentAdmin.role || 'administrator',
        status: currentAdmin.status || 'active',
      });
    }
  }, [currentAdmin, isViewMode, isEditMode]);

  // Role options for dropdowns
  const roleOptions = [
    { label: 'Administrator', value: 'administrator' },
    { label: 'Manager', value: 'manager' },
    { label: 'Super Admin', value: 'super_admin' },
  ];

  const statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  // Populate form with sample data
  const handlePopulateSampleData = () => {
    setFormData((prev) => ({
      ...prev,
      ...SAMPLE_DATA.admin,
    }));
    toast.current.show({
      severity: 'info',
      summary: 'Sample Data Loaded',
      detail: 'Form populated with sample admin data',
      life: 2000,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.current.show({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please fix the errors before submitting',
        life: 3000,
      });
      return;
    }

    try {
      if (isCreateMode) {
        await dispatch(createAdmin(formData)).unwrap();
        toast.current.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Admin created successfully',
          life: 3000,
        });
      } else if (isEditMode) {
        await dispatch(updateAdmin({ id, data: formData })).unwrap();
        toast.current.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Admin updated successfully',
          life: 3000,
        });
      }

      setTimeout(() => navigate(ADMIN_ROUTES.ADMINS_LIST), 1500);
    } catch (error) {
      const errorDetail =
        error.message ||
        (isCreateMode
          ? 'Failed to create admin. Please check your connection and try again.'
          : 'Failed to update admin. Please check your connection and try again.');

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
    if (isViewMode) return 'Admin Details';
    if (isEditMode) return 'Edit Admin';
    return 'Create New Admin';
  };

  const getIcon = () => {
    if (isViewMode) return 'pi-eye';
    if (isEditMode) return 'pi-pencil';
    return 'pi-user-plus';
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
          onClick={() => navigate(ADMIN_ROUTES.ADMINS_LIST)}
        />
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <div className="grid">
            {/* First Name */}
            <div className="col-12 md:col-6">
              <label htmlFor="firstName" className="block text-900 font-medium mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              {isViewMode ? (
                <div className="text-900 text-xl">{formData.firstName}</div>
              ) : (
                <>
                  <InputText
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full ${errors.firstName ? 'p-invalid' : ''}`}
                  />
                  {errors.firstName && <small className="p-error">{errors.firstName}</small>}
                </>
              )}
            </div>

            {/* Last Name */}
            <div className="col-12 md:col-6">
              <label htmlFor="lastName" className="block text-900 font-medium mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              {isViewMode ? (
                <div className="text-900 text-xl">{formData.lastName}</div>
              ) : (
                <>
                  <InputText
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full ${errors.lastName ? 'p-invalid' : ''}`}
                  />
                  {errors.lastName && <small className="p-error">{errors.lastName}</small>}
                </>
              )}
            </div>

            {/* Email */}
            <div className="col-12 md:col-6">
              <label htmlFor="email" className="block text-900 font-medium mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              {isViewMode ? (
                <div className="text-900 text-xl">
                  <i className="pi pi-envelope mr-2"></i>
                  {formData.email}
                </div>
              ) : (
                <>
                  <InputText
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full ${errors.email ? 'p-invalid' : ''}`}
                  />
                  {errors.email && <small className="p-error">{errors.email}</small>}
                </>
              )}
            </div>

            {/* Phone */}
            <div className="col-12 md:col-6">
              <label htmlFor="phone" className="block text-900 font-medium mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              {isViewMode ? (
                <div className="text-900 text-xl">
                  <i className="pi pi-phone mr-2"></i>
                  {formData.phone}
                </div>
              ) : (
                <>
                  <InputText
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full ${errors.phone ? 'p-invalid' : ''}`}
                    placeholder="+94XXXXXXXXX"
                  />
                  {errors.phone && <small className="p-error">{errors.phone}</small>}
                </>
              )}
            </div>

            {/* Role */}
            <div className="col-12 md:col-6">
              <label htmlFor="role" className="block text-900 font-medium mb-2">
                Role <span className="text-red-500">*</span>
              </label>
              {isViewMode ? (
                <div className="text-900 text-xl">
                  {roleOptions.find((opt) => opt.value === formData.role)?.label}
                </div>
              ) : (
                <Dropdown
                  id="role"
                  value={formData.role}
                  options={roleOptions}
                  onChange={(e) => handleInputChange('role', e.value)}
                  className="w-full"
                />
              )}
            </div>

            {/* Status */}
            <div className="col-12 md:col-6">
              <label htmlFor="status" className="block text-900 font-medium mb-2">
                Status
              </label>
              {isViewMode ? (
                <div className="text-900 text-xl">
                  <i
                    className={`pi ${
                      formData.status === 'active'
                        ? 'pi-check-circle text-green-500'
                        : 'pi-times-circle text-red-500'
                    } mr-2`}
                  ></i>
                  {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
                </div>
              ) : (
                <Dropdown
                  id="status"
                  value={formData.status}
                  options={statusOptions}
                  onChange={(e) => handleInputChange('status', e.value)}
                  className="w-full"
                />
              )}
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
                  tooltip="Populate form with sample admin data"
                  tooltipOptions={{ position: 'bottom' }}
                />
                <div className="flex justify-content-end gap-2">
                  <Button
                    label="Cancel"
                    icon="pi pi-times"
                    outlined
                    severity="secondary"
                    onClick={() => navigate(ADMIN_ROUTES.ADMINS_LIST)}
                    type="button"
                  />
                  <Button
                    label={isEditMode ? 'Update Admin' : 'Create Admin'}
                    icon={isEditMode ? 'pi pi-check' : 'pi pi-plus'}
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
                  label="Edit Admin"
                  icon="pi pi-pencil"
                  severity="info"
                  onClick={() => navigate(ADMIN_ROUTES.EDIT_ADMIN(id))}
                />
              </div>
            </>
          )}
        </form>
      </Card>
    </div>
  );
}

export default Admins;
