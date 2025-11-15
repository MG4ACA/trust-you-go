import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { ADMIN_ROUTES } from '../config/routeConfig';
import { logoutAdmin } from '../store/slices/authSlice';
import { toggleSidebar } from '../store/slices/uiSlice';

import '../styles/admin.css';
import './AdminLayout.css';

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
          command: () => navigate(ADMIN_ROUTES.DASHBOARD),
        },
        {
          label: 'Agents',
          icon: 'pi pi-users',
          command: () => navigate(ADMIN_ROUTES.AGENTS_LIST),
        },
        {
          label: 'Locations',
          icon: 'pi pi-map-marker',
          command: () => navigate(ADMIN_ROUTES.LOCATIONS_LIST),
        },
        {
          label: 'Packages',
          icon: 'pi pi-box',
          command: () => navigate(ADMIN_ROUTES.PACKAGES_LIST),
        },
        {
          label: 'Admins',
          icon: 'pi pi-shield',
          command: () => navigate(ADMIN_ROUTES.ADMINS_LIST),
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
            navigate(ADMIN_ROUTES.LOGIN);
          },
        },
      ],
    },
  ];

  return (
    <div className="admin-layout">
      {/* Mobile Overlay */}
      {sidebarVisible && (
        <div onClick={() => dispatch(toggleSidebar())} className="mobile-sidebar-overlay" />
      )}

      {/* Sidebar */}
      {sidebarVisible && (
        <div className="admin-sidebar">
          {/* Logo/Header */}
          <div className="sidebar-header">
            <h2 className="sidebar-title">
              <i className="pi pi-shield sidebar-icon"></i>
              Trust You Go
            </h2>
            <p className="sidebar-subtitle">Admin Portal</p>
          </div>

          {/* Menu */}
          <div className="sidebar-menu">
            <Menu model={menuItems} className="admin-menu" />
          </div>

          {/* User Info */}
          <div className="sidebar-user">
            <Avatar icon="pi pi-user" size="large" shape="circle" className="user-avatar" />
            <div className="user-info">
              <div className="user-name">{user?.username || 'Admin User'}</div>
              <div className="user-role">{user?.role || 'Super Admin'}</div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="admin-main">
        {/* Top Header */}
        <div className="admin-header">
          <Button
            icon={sidebarVisible ? 'pi pi-times' : 'pi pi-bars'}
            onClick={() => dispatch(toggleSidebar())}
            className="p-button-text"
            tooltip={sidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
          />
          <div className="breadcrumb-wrapper">
            <Breadcrumb />
          </div>
          <div className="header-right">
            <span className="header-date">
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
        <div className="admin-content">
          <Outlet />
        </div>

        {/* Footer */}
        <div className="admin-footer">© 2025 Trust You Go. All rights reserved.</div>
      </div>
    </div>
  );
}

export default AdminLayout;
