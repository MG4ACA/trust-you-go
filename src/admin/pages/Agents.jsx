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
    name: '',
    email: '',
    contact: '',
    commissionRate: 15,
    isActive: true,
    notes: '',
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
        name: currentAgent.name || '',
        email: currentAgent.email || '',
        contact: currentAgent.contact || '',
        commissionRate: currentAgent.commissionRate || 15,
        isActive: currentAgent.isActive ?? true,
        notes: currentAgent.notes || '',
      });
    }
  }, [currentAgent, isViewMode, isEditMode]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.contact)) {
      newErrors.contact = 'Invalid contact format';
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

  const handlePopulateSampleData = () => {
    setFormData((prev) => ({
      ...prev,
      ...SAMPLE_DATA.agent,
    }));
    toast.current.show({
      severity: 'info',
      summary: 'Sample Data Loaded',
      detail: 'Form populated with sample agent data',
      life: 2000,
    });
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

      setTimeout(() => navigate(ADMIN_ROUTES.AGENTS_LIST), 1500);
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
          onClick={() => navigate(ADMIN_ROUTES.AGENTS_LIST)}
        />
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <div className="grid">
            {/* Name */}
            <div className="col-12">
              <label htmlFor="name" className="block text-900 font-medium mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              {isViewMode ? (
                <div className="text-900 text-xl">{formData.name}</div>
              ) : (
                <>
                  <InputText
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full ${errors.name ? 'p-invalid' : ''}`}
                  />
                  {errors.name && <small className="p-error">{errors.name}</small>}
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

            {/* Contact */}
            <div className="col-12 md:col-6">
              <label htmlFor="contact" className="block text-900 font-medium mb-2">
                Contact <span className="text-red-500">*</span>
              </label>
              {isViewMode ? (
                <div className="text-900 text-xl">
                  <i className="pi pi-phone mr-2"></i>
                  {formData.contact}
                </div>
              ) : (
                <>
                  <InputText
                    id="contact"
                    value={formData.contact}
                    onChange={(e) => handleInputChange('contact', e.target.value)}
                    className={`w-full ${errors.contact ? 'p-invalid' : ''}`}
                    placeholder="+94XXXXXXXXX"
                  />
                  {errors.contact && <small className="p-error">{errors.contact}</small>}
                </>
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

            {/* Active Status */}
            <div className="col-12 md:col-6">
              <label htmlFor="isActive" className="block text-900 font-medium mb-2">
                Status
              </label>
              {isViewMode ? (
                <div className="text-900 text-xl">
                  <i
                    className={`pi ${
                      formData.isActive
                        ? 'pi-check-circle text-green-500'
                        : 'pi-times-circle text-red-500'
                    } mr-2`}
                  ></i>
                  {formData.isActive ? 'Active' : 'Inactive'}
                </div>
              ) : (
                <Dropdown
                  id="isActive"
                  value={formData.isActive}
                  options={[
                    { label: 'Active', value: true },
                    { label: 'Inactive', value: false }
                  ]}
                  onChange={(e) => handleInputChange('isActive', e.value)}
                  className="w-full"
                />
              )}
            </div>

            {/* Notes */}
            <div className="col-12">
              <label htmlFor="notes" className="block text-900 font-medium mb-2">
                Notes
              </label>
              {isViewMode ? (
                <div className="text-900 text-xl">{formData.notes || 'No notes'}</div>
              ) : (
                <InputText
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="w-full"
                  placeholder="Additional notes about the agent..."
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
                  tooltip="Populate form with sample agent data"
                  tooltipOptions={{ position: 'bottom' }}
                />
                <div className="flex justify-content-end gap-2">
                  <Button
                    label="Cancel"
                    icon="pi pi-times"
                    outlined
                    severity="secondary"
                    onClick={() => navigate(ADMIN_ROUTES.AGENTS_LIST)}
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
                  onClick={() => navigate(ADMIN_ROUTES.EDIT_AGENT(id))}
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
