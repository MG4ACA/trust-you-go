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
import {
  clearCurrentAgent,
  createAgent,
  fetchAgentById,
  updateAgent,
} from '../store/slices/agentSlice';
import '../styles/admin.css';

function Agents() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useRef(null);

  const { currentAgent, loading, actionLoading } = useSelector((state) => state.agents);
  const isViewMode = id && !window.location.pathname.includes('/edit/');
  const isEditMode = id && window.location.pathname.includes('/edit/');
  const isCreateMode = !id;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Sri Lanka',
    commissionRate: 15,
    status: 'pending',
    joinedDate: new Date().toISOString().split('T')[0],
    totalBookings: 0,
    totalRevenue: 0,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id && (isViewMode || isEditMode)) {
      dispatch(fetchAgentById(id));
    }

    return () => {
      dispatch(clearCurrentAgent());
    };
  }, [id, dispatch, isViewMode, isEditMode]);

  useEffect(() => {
    if (currentAgent && (isViewMode || isEditMode)) {
      setFormData({
        firstName: currentAgent.firstName || '',
        lastName: currentAgent.lastName || '',
        email: currentAgent.email || '',
        phone: currentAgent.phone || '',
        address: currentAgent.address || '',
        city: currentAgent.city || '',
        country: currentAgent.country || 'Sri Lanka',
        commissionRate: currentAgent.commissionRate || 15,
        status: currentAgent.status || 'pending',
        joinedDate: currentAgent.joinedDate || new Date().toISOString().split('T')[0],
        totalBookings: currentAgent.totalBookings || 0,
        totalRevenue: currentAgent.totalRevenue || 0,
      });
    }
  }, [currentAgent, isViewMode, isEditMode]);

  const statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Pending', value: 'pending' },
    { label: 'Inactive', value: 'inactive' },
  ];

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

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (formData.commissionRate < 0 || formData.commissionRate > 100) {
      newErrors.commissionRate = 'Commission rate must be between 0 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

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
        await dispatch(createAgent(formData)).unwrap();
        toast.current.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Agent created successfully',
          life: 3000,
        });
      } else if (isEditMode) {
        await dispatch(updateAgent({ id, data: formData })).unwrap();
        toast.current.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Agent updated successfully',
          life: 3000,
        });
      }

      setTimeout(() => navigate('/admin/agents'), 1500);
    } catch (error) {
      const errorDetail =
        error.message ||
        (isCreateMode
          ? 'Failed to create agent. Please check your connection and try again.'
          : 'Failed to update agent. Please check your connection and try again.');

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
    if (isViewMode) return 'Agent Details';
    if (isEditMode) return 'Edit Agent';
    return 'Create New Agent';
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
          onClick={() => navigate('/admin/agents')}
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

            {/* Address */}
            <div className="col-12">
              <label htmlFor="address" className="block text-900 font-medium mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              {isViewMode ? (
                <div className="text-900 text-xl">
                  <i className="pi pi-map-marker mr-2"></i>
                  {formData.address}
                </div>
              ) : (
                <>
                  <InputText
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={`w-full ${errors.address ? 'p-invalid' : ''}`}
                    placeholder="Street address"
                  />
                  {errors.address && <small className="p-error">{errors.address}</small>}
                </>
              )}
            </div>

            {/* City */}
            <div className="col-12 md:col-6">
              <label htmlFor="city" className="block text-900 font-medium mb-2">
                City <span className="text-red-500">*</span>
              </label>
              {isViewMode ? (
                <div className="text-900 text-xl">{formData.city}</div>
              ) : (
                <>
                  <InputText
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className={`w-full ${errors.city ? 'p-invalid' : ''}`}
                  />
                  {errors.city && <small className="p-error">{errors.city}</small>}
                </>
              )}
            </div>

            {/* Country */}
            <div className="col-12 md:col-6">
              <label htmlFor="country" className="block text-900 font-medium mb-2">
                Country
              </label>
              {isViewMode ? (
                <div className="text-900 text-xl">{formData.country}</div>
              ) : (
                <InputText
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="w-full"
                />
              )}
            </div>

            {/* Commission Rate */}
            <div className="col-12 md:col-6">
              <label htmlFor="commissionRate" className="block text-900 font-medium mb-2">
                Commission Rate (%)
              </label>
              {isViewMode ? (
                <div className="text-900 text-xl">{formData.commissionRate}%</div>
              ) : (
                <>
                  <InputText
                    id="commissionRate"
                    type="number"
                    value={formData.commissionRate}
                    onChange={(e) =>
                      handleInputChange('commissionRate', parseFloat(e.target.value))
                    }
                    className={`w-full ${errors.commissionRate ? 'p-invalid' : ''}`}
                    min="0"
                    max="100"
                  />
                  {errors.commissionRate && (
                    <small className="p-error">{errors.commissionRate}</small>
                  )}
                </>
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
                        : formData.status === 'pending'
                        ? 'pi-clock text-orange-500'
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

            {/* Joined Date */}
            <div className="col-12 md:col-6">
              <label htmlFor="joinedDate" className="block text-900 font-medium mb-2">
                Joined Date
              </label>
              {isViewMode ? (
                <div className="text-900 text-xl">
                  <i className="pi pi-calendar mr-2"></i>
                  {formData.joinedDate}
                </div>
              ) : (
                <InputText
                  id="joinedDate"
                  type="date"
                  value={formData.joinedDate}
                  onChange={(e) => handleInputChange('joinedDate', e.target.value)}
                  className="w-full"
                  disabled={isEditMode}
                />
              )}
            </div>

            {/* Total Bookings (View/Edit only) */}
            {(isViewMode || isEditMode) && (
              <div className="col-12 md:col-6">
                <label className="block text-900 font-medium mb-2">Total Bookings</label>
                <div className="text-900 text-xl">
                  <i className="pi pi-shopping-bag mr-2 text-blue-500"></i>
                  {formData.totalBookings}
                </div>
              </div>
            )}

            {/* Total Revenue (View/Edit only) */}
            {(isViewMode || isEditMode) && (
              <div className="col-12 md:col-6">
                <label className="block text-900 font-medium mb-2">Total Revenue</label>
                <div className="text-900 text-xl">
                  <i className="pi pi-dollar mr-2 text-green-500"></i>
                  LKR {formData.totalRevenue.toLocaleString()}
                </div>
              </div>
            )}
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
                  onClick={() => navigate('/admin/agents')}
                  type="button"
                />
                <Button
                  label={isEditMode ? 'Update Agent' : 'Create Agent'}
                  icon={isEditMode ? 'pi pi-check' : 'pi pi-plus'}
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
                  label="Edit Agent"
                  icon="pi pi-pencil"
                  severity="info"
                  onClick={() => navigate(`/admin/agents/edit/${id}`)}
                />
              </div>
            </>
          )}
        </form>
      </Card>
    </div>
  );
}

export default Agents;
