import { ProgressSpinner } from 'primereact/progressspinner';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { ADMIN_ROUTES } from '../config/routeConfig';
import { checkAuthStatus } from '../store/slices/authSlice';

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, checkingAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check authentication status on mount
    dispatch(checkAuthStatus());
  }, [dispatch]);

  // Show loading spinner while checking authentication
  if (checkingAuth) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: '#f8f9fa',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <ProgressSpinner />
          <p style={{ marginTop: '1rem', color: '#6c757d' }}>Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={ADMIN_ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // Render children if authenticated
  return children;
}

export default ProtectedRoute;
