import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearError, loginAdmin } from '../store/slices/authSlice';

// Import admin styles (includes PrimeFlex)
import '../styles/admin.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useRef(null);

  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Show error toast when login fails
  useEffect(() => {
    if (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Login Failed',
        detail: error,
        life: 3000,
      });
    }
  }, [error]);

  // Clear Redux error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let isValid = true;

    // Email validation
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Password validation
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const result = await dispatch(loginAdmin({ email, password })).unwrap();

      toast.current?.show({
        severity: 'success',
        summary: 'Login Successful',
        detail: `Welcome back, ${result.user.username}!`,
        life: 2000,
      });

      // Navigate to dashboard after a short delay
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1000);
    } catch {
      // Error is handled by useEffect
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
    if (error) dispatch(clearError());
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError('');
    if (error) dispatch(clearError());
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
      }}
    >
      <Toast ref={toast} />

      <Card
        title="Admin Login"
        subTitle="Trust You Go - Admin Portal"
        style={{ width: '100%', maxWidth: '450px' }}
      >
        <form onSubmit={handleSubmit} className="p-fluid">
          {/* Email Field */}
          <div className="p-field" style={{ marginBottom: '1.5rem' }}>
            <label
              htmlFor="email"
              style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}
            >
              Email <span style={{ color: 'red' }}>*</span>
            </label>
            <InputText
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="admin@trustyougo.com"
              className={emailError ? 'p-invalid' : ''}
              disabled={loading}
              autoFocus
            />
            {emailError && (
              <small className="p-error" style={{ display: 'block', marginTop: '0.25rem' }}>
                {emailError}
              </small>
            )}
          </div>

          {/* Password Field */}
          <div className="p-field" style={{ marginBottom: '1.5rem' }}>
            <label
              htmlFor="password"
              style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}
            >
              Password <span style={{ color: 'red' }}>*</span>
            </label>
            <Password
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              toggleMask
              feedback={false}
              className={passwordError ? 'p-invalid' : ''}
              disabled={loading}
            />
            {passwordError && (
              <small className="p-error" style={{ display: 'block', marginTop: '0.25rem' }}>
                {passwordError}
              </small>
            )}
          </div>

          {/* Demo Credentials Message */}
          <Message
            severity="info"
            text="Demo: admin@trustyougo.com / admin123"
            style={{ marginBottom: '1.5rem' }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            label={loading ? 'Logging in...' : 'Login'}
            icon={loading ? 'pi pi-spin pi-spinner' : 'pi pi-sign-in'}
            loading={loading}
            disabled={loading}
          />
        </form>

        {/* Help Text */}
        <div
          style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.875rem', color: '#666' }}
        >
          <p>Need help? Contact your system administrator</p>
        </div>
      </Card>
    </div>
  );
}

export default Login;
