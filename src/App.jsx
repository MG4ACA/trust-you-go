import { useEffect } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import Home from './spa/pages/Home';
import LearnAboutSriLanka from './spa/pages/LearnAboutSriLanka';

// Admin Portal Imports
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminLayout from './admin/layouts/AdminLayout';
import Agents from './admin/pages/Agents';
import CreateAdmin from './admin/pages/CreateAdmin';
import Dashboard from './admin/pages/Dashboard';
import Login from './admin/pages/Login';

function ScrollToSection({ section }) {
  useEffect(() => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [section]);

  return null;
}

function SectionRedirect() {
  const location = useLocation();
  const section = location.pathname.substring(1); // Remove leading slash

  return (
    <>
      <ScrollToSection section={section} />
      <Home />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Main SPA Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/learn-about-sri-lanka" element={<LearnAboutSriLanka />} />
        <Route path="/about" element={<SectionRedirect />} />
        <Route path="/contact" element={<SectionRedirect />} />
        <Route path="/gallery" element={<SectionRedirect />} />
        <Route path="/offers" element={<SectionRedirect />} />
        <Route path="/guides" element={<SectionRedirect />} />
        <Route path="/reviews" element={<SectionRedirect />} />
        <Route path="/booking" element={<SectionRedirect />} />

        {/* Admin Portal Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="agents" element={<Agents />} />
          <Route path="create-admin" element={<CreateAdmin />} />
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
