import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { logoutAdmin } from '../store/slices/authSlice';
import { toggleSidebar } from '../store/slices/uiSlice';

// Import admin styles (includes PrimeFlex)
import '../styles/admin.css';

function AdminLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sidebarVisible = useSelector((state) => state.ui.sidebarVisible);
  const user = useSelector((state) => state.auth.user);

  const menuItems = [
    {
      label: 'Navigation',
      items: [
        {
          label: 'Dashboard',
          icon: 'pi pi-home',
          command: () => navigate('/admin/dashboard'),
        },
        {
          label: 'Agents',
          icon: 'pi pi-users',
          command: () => navigate('/admin/agents'),
        },
        {
          label: 'Create Admin',
          icon: 'pi pi-user-plus',
          command: () => navigate('/admin/create-admin'),
        },
      ],
    },
    {
      separator: true,
    },
    {
      label: 'Account',
      items: [
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => {
            // Dispatch logout action
            dispatch(logoutAdmin());
            navigate('/admin/login');
          },
        },
      ],
    },
  ];

  return (
    <div
      style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa', position: 'relative' }}
    >
      {/* Mobile Overlay */}
      {sidebarVisible && (
        <div
          onClick={() => dispatch(toggleSidebar())}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            display: 'none',
          }}
          className="mobile-sidebar-overlay"
        />
      )}

      {/* Sidebar */}
      {sidebarVisible && (
        <div
          style={{
            width: '280px',
            background: '#ffffff',
            boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
          }}
          className="admin-sidebar"
        >
          {/* Logo/Header */}
          <div
            style={{
              padding: '1.5rem',
              borderBottom: '1px solid #dee2e6',
              textAlign: 'center',
            }}
          >
            <h2 style={{ margin: 0, color: '#495057' }}>
              <i className="pi pi-shield" style={{ marginRight: '0.5rem' }}></i>
              Trust You Go
            </h2>
            <p style={{ margin: '0.5rem 0 0 0', color: '#6c757d', fontSize: '0.875rem' }}>
              Admin Portal
            </p>
          </div>

          {/* Menu */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
            <Menu model={menuItems} style={{ width: '100%', border: 'none' }} />
          </div>

          {/* User Info */}
          <div
            style={{
              padding: '1rem',
              borderTop: '1px solid #dee2e6',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <Avatar
              icon="pi pi-user"
              size="large"
              shape="circle"
              style={{ backgroundColor: '#667eea', color: '#ffffff' }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                {user?.username || 'Admin User'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6c757d' }}>
                {user?.role || 'Super Admin'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Header */}
        <div
          style={{
            background: '#ffffff',
            padding: '1rem 1.5rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button
            icon={sidebarVisible ? 'pi pi-times' : 'pi pi-bars'}
            onClick={() => dispatch(toggleSidebar())}
            className="p-button-text"
            tooltip={sidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#6c757d', fontSize: '0.875rem' }}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <Button
              icon="pi pi-bell"
              className="p-button-text"
              badge="3"
              badgeClassName="p-badge-danger"
            />
          </div>
        </div>

        {/* Page Content */}
        <div style={{ flex: 1, overflow: 'auto' }}>
          <div style={{ padding: '1rem 1.5rem 0' }}>
            <Breadcrumb />
          </div>
          <Outlet />
        </div>

        {/* Footer */}
        <div
          style={{
            background: '#ffffff',
            padding: '1rem 1.5rem',
            borderTop: '1px solid #dee2e6',
            textAlign: 'center',
            color: '#6c757d',
            fontSize: '0.875rem',
          }}
        >
          © 2025 Trust You Go. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
