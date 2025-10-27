import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAdmin } from '../store/slices/adminSlice';
import '../styles/admin.css';

function CreateAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useRef(null);
  const { actionLoading } = useSelector((state) => state.admins);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'manager',
    isActive: true,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const roleOptions = [
    { label: 'Super Admin', value: 'super_admin', description: 'Full system access' },
    { label: 'Admin', value: 'admin', description: 'Manage agents and bookings' },
    { label: 'Manager', value: 'manager', description: 'View and report access' },
  ];

  const generatePassword = () => {
    const length = 12;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setFormData((prev) => ({ ...prev, password, confirmPassword: password }));
    setShowPassword(true);
    toast.current.show({
      severity: 'success',
      summary: 'Password Generated',
      detail: 'A secure password has been generated',
      life: 3000,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
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
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please fix the errors before submitting',
        life: 3000,
      });
      return;
    }

    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword: _confirmPassword, ...adminData } = formData;

      await dispatch(createAdmin(adminData)).unwrap();

      toast.current.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Admin user created successfully',
        life: 3000,
      });

      setTimeout(() => navigate('/admin/dashboard'), 1500);
    } catch (error) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: error.message || 'Failed to create admin',
        life: 3000,
      });
    }
  };

  const selectedRole = roleOptions.find((r) => r.value === formData.role);

  return (
    <div className="p-4">
      <Toast ref={toast} />

      <div className="flex justify-content-between align-items-center mb-4">
        <div className="flex align-items-center gap-2">
          <i className="pi pi-user-plus text-3xl text-primary"></i>
          <h1 className="text-4xl font-bold text-900 m-0">Create New Admin</h1>
        </div>
        <Button
          label="Back to Dashboard"
          icon="pi pi-arrow-left"
          outlined
          onClick={() => navigate('/admin/dashboard')}
        />
      </div>

      <div className="grid">
        <div className="col-12 lg:col-8">
          <Card>
            <form onSubmit={handleSubmit}>
              <div className="grid">
                {/* Username */}
                <div className="col-12 md:col-6">
                  <label htmlFor="username" className="block text-900 font-medium mb-2">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <InputText
                    id="username"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className={`w-full ${errors.username ? 'p-invalid' : ''}`}
                    placeholder="e.g., john_admin"
                  />
                  {errors.username && <small className="p-error">{errors.username}</small>}
                </div>

                {/* Email */}
                <div className="col-12 md:col-6">
                  <label htmlFor="email" className="block text-900 font-medium mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <InputText
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full ${errors.email ? 'p-invalid' : ''}`}
                    placeholder="admin@trustyougo.com"
                  />
                  {errors.email && <small className="p-error">{errors.email}</small>}
                </div>

                {/* First Name */}
                <div className="col-12 md:col-6">
                  <label htmlFor="firstName" className="block text-900 font-medium mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <InputText
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full ${errors.firstName ? 'p-invalid' : ''}`}
                  />
                  {errors.firstName && <small className="p-error">{errors.firstName}</small>}
                </div>

                {/* Last Name */}
                <div className="col-12 md:col-6">
                  <label htmlFor="lastName" className="block text-900 font-medium mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <InputText
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full ${errors.lastName ? 'p-invalid' : ''}`}
                  />
                  {errors.lastName && <small className="p-error">{errors.lastName}</small>}
                </div>

                {/* Role */}
                <div className="col-12">
                  <label htmlFor="role" className="block text-900 font-medium mb-2">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <Dropdown
                    id="role"
                    value={formData.role}
                    options={roleOptions}
                    onChange={(e) => handleInputChange('role', e.value)}
                    optionLabel="label"
                    optionValue="value"
                    className="w-full"
                    itemTemplate={(option) => (
                      <div>
                        <div className="font-semibold">{option.label}</div>
                        <div className="text-sm text-600">{option.description}</div>
                      </div>
                    )}
                  />
                  {selectedRole && (
                    <small className="text-600 block mt-2">
                      <i className="pi pi-info-circle mr-1"></i>
                      {selectedRole.description}
                    </small>
                  )}
                </div>

                <div className="col-12">
                  <Divider />
                </div>

                {/* Password */}
                <div className="col-12 md:col-6">
                  <div className="flex justify-content-between align-items-center mb-2">
                    <label htmlFor="password" className="text-900 font-medium">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <Button
                      type="button"
                      label="Generate"
                      icon="pi pi-key"
                      size="small"
                      outlined
                      onClick={generatePassword}
                    />
                  </div>
                  <Password
                    id="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full ${errors.password ? 'p-invalid' : ''}`}
                    toggleMask={showPassword}
                    feedback={true}
                  />
                  {errors.password && <small className="p-error">{errors.password}</small>}
                </div>

                {/* Confirm Password */}
                <div className="col-12 md:col-6">
                  <label htmlFor="confirmPassword" className="block text-900 font-medium mb-2">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <Password
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`w-full ${errors.confirmPassword ? 'p-invalid' : ''}`}
                    feedback={false}
                    toggleMask
                  />
                  {errors.confirmPassword && (
                    <small className="p-error">{errors.confirmPassword}</small>
                  )}
                </div>

                {/* Active Status */}
                <div className="col-12">
                  <div className="flex align-items-center">
                    <Checkbox
                      inputId="isActive"
                      checked={formData.isActive}
                      onChange={(e) => handleInputChange('isActive', e.checked)}
                    />
                    <label htmlFor="isActive" className="ml-2 text-900">
                      Active (User can log in immediately)
                    </label>
                  </div>
                </div>
              </div>

              <Divider />

              <div className="flex justify-content-end gap-2">
                <Button
                  label="Cancel"
                  icon="pi pi-times"
                  outlined
                  severity="secondary"
                  onClick={() => navigate('/admin/dashboard')}
                  type="button"
                />
                <Button
                  label="Create Admin"
                  icon="pi pi-check"
                  severity="success"
                  loading={actionLoading}
                  type="submit"
                />
              </div>
            </form>
          </Card>
        </div>

        <div className="col-12 lg:col-4">
          <Card title="Admin Roles" className="mb-3">
            <div className="flex flex-column gap-3">
              <div>
                <div className="font-semibold text-900 mb-1">
                  <i className="pi pi-shield text-red-500 mr-2"></i>Super Admin
                </div>
                <p className="text-sm text-600 m-0">
                  Full system access including user management, system settings, and all data.
                </p>
              </div>
              <Divider />
              <div>
                <div className="font-semibold text-900 mb-1">
                  <i className="pi pi-user text-blue-500 mr-2"></i>Admin
                </div>
                <p className="text-sm text-600 m-0">
                  Manage agents, bookings, packages, and locations. Cannot manage other admins.
                </p>
              </div>
              <Divider />
              <div>
                <div className="font-semibold text-900 mb-1">
                  <i className="pi pi-eye text-green-500 mr-2"></i>Manager
                </div>
                <p className="text-sm text-600 m-0">
                  View-only access to reports and analytics. Can export data but cannot modify.
                </p>
              </div>
            </div>
          </Card>

          <Card title="Security Tips">
            <ul className="text-sm text-600 pl-3">
              <li className="mb-2">Use strong, unique passwords</li>
              <li className="mb-2">Enable 2FA when available</li>
              <li className="mb-2">Review admin access regularly</li>
              <li className="mb-2">Deactivate unused accounts</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CreateAdmin;
