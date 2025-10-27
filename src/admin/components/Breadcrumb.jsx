import { BreadCrumb } from 'primereact/breadcrumb';
import { useLocation, useNavigate } from 'react-router-dom';

function Breadcrumb() {
  const location = useLocation();
  const navigate = useNavigate();

  const home = {
    icon: 'pi pi-home',
    command: () => navigate('/admin/dashboard'),
  };

  const getBreadcrumbItems = () => {
    const pathnames = location.pathname.split('/').filter((x) => x && x !== 'admin');

    const items = pathnames.map((name, index) => {
      const routeTo = `/admin/${pathnames.slice(0, index + 1).join('/')}`;
      const isLast = index === pathnames.length - 1;

      // Format label
      let label = name
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      // Handle special cases
      if (name === 'create-admin') {
        label = 'Create Admin';
      } else if (name === 'create') {
        label = 'Create New';
      } else if (name === 'edit') {
        label = 'Edit';
      } else if (!isNaN(name)) {
        label = 'Details';
      }

      return {
        label,
        command: !isLast ? () => navigate(routeTo) : undefined,
      };
    });

    return items;
  };

  const items = getBreadcrumbItems();

  // Don't show breadcrumb on dashboard
  if (location.pathname === '/admin/dashboard' || location.pathname === '/admin') {
    return null;
  }

  return (
    <div className="mb-3">
      <BreadCrumb model={items} home={home} />
    </div>
  );
}

export default Breadcrumb;
