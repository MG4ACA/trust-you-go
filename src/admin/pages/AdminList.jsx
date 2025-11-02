import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TableSkeleton } from '../components/LoadingSkeleton';
import { ADMIN_ROUTES } from '../config/routeConfig';
import { deleteAdmin, fetchAdmins } from '../store/slices/adminSlice';
import '../styles/admin.css';

function AdminList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useRef(null);

  const { admins, loading } = useSelector((state) => state.admins);
  const { user: currentUser } = useSelector((state) => state.auth);

  const [globalFilter, setGlobalFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState(null);

  useEffect(() => {
    dispatch(fetchAdmins());
  }, [dispatch]);

  // Role options for filters and dropdowns
  const roleOptions = [
    { label: 'All Roles', value: null },
    { label: 'Administrator', value: 'administrator' },
    { label: 'Manager', value: 'manager' },
    { label: 'Super Admin', value: 'super_admin' },
  ];

  /**
   * Filter admins based on current user's role
   * Super Admin can see all admins
   * Admin and Manager cannot see Super Admin data
   */
  const filteredAdminsByRole = admins.filter((admin) => {
    // Super Admin can see all
    if (currentUser?.role === 'super_admin') {
      return true;
    }
    // Admin and Manager cannot see Super Admin role
    if (admin.role === 'super_admin') {
      return false;
    }
    return true;
  });

  // Apply search and role filters
  const filteredAdmins = filteredAdminsByRole.filter((admin) => {
    const matchesRole = !roleFilter || admin.role === roleFilter;
    const matchesSearch =
      !globalFilter ||
      admin.name?.toLowerCase().includes(globalFilter.toLowerCase()) ||
      admin.email?.toLowerCase().includes(globalFilter.toLowerCase()) ||
      admin.contact?.includes(globalFilter);

    return matchesRole && matchesSearch;
  });

  const handleDelete = (adminId, name) => {
    const adminName = name || 'this admin';
    confirmDialog({
      message: (
        <div>
          <p className="m-0 mb-3">
            Are you sure you want to delete <strong>{adminName}</strong>?
          </p>
          <p className="m-0 text-600 text-sm">
            This action cannot be undone. All admin data will be permanently removed.
          </p>
        </div>
      ),
      header: 'Delete Admin',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        try {
          await dispatch(deleteAdmin(adminId)).unwrap();
          toast.current.show({
            severity: 'success',
            summary: 'Deleted',
            detail: `Admin ${adminName} deleted successfully`,
            life: 3000,
          });
          // Refresh the list
          dispatch(fetchAdmins());
        } catch (error) {
          toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: error || 'Failed to delete admin',
            life: 3000,
          });
        }
      },
    });
  };

  // Table row body templates
  const roleBodyTemplate = (rowData) => {
    const roleBadges = {
      super_admin: { label: 'Super Admin', severity: 'danger' },
      administrator: { label: 'Administrator', severity: 'warning' },
      manager: { label: 'Manager', severity: 'info' },
    };

    const badge = roleBadges[rowData.role] || { label: rowData.role, severity: 'secondary' };
    return <Tag value={badge.label} severity={badge.severity} />;
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.isActive ? 'Active' : 'Inactive'}
        severity={rowData.isActive ? 'success' : 'danger'}
      />
    );
  };

  const contactBodyTemplate = (rowData) => {
    return (
      <div>
        <div className="mb-1 font-semibold">{rowData.name || 'N/A'}</div>
        <div className="text-sm">
          <i className="pi pi-envelope mr-2 text-600"></i>
          <span>{rowData.email}</span>
        </div>
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-eye"
          rounded
          outlined
          severity="info"
          tooltip="View Details"
          tooltipOptions={{ position: 'top' }}
          onClick={() => navigate(ADMIN_ROUTES.VIEW_ADMIN(rowData.adminId))}
        />
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          severity="success"
          tooltip="Edit Admin"
          tooltipOptions={{ position: 'top' }}
          onClick={() => navigate(ADMIN_ROUTES.EDIT_ADMIN(rowData.adminId))}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          tooltip="Delete Admin"
          tooltipOptions={{ position: 'top' }}
          onClick={() => handleDelete(rowData.adminId, rowData.name)}
        />
      </div>
    );
  };

  const handleRefresh = async () => {
    try {
      await dispatch(fetchAdmins());
      toast.current.show({
        severity: 'success',
        summary: 'Refreshed',
        detail: 'Admin list refreshed successfully',
        life: 2000,
      });
    } catch {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to refresh admin list',
        life: 2000,
      });
    }
  };

  // Define header for list view
  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center gap-3">
      <div className="flex align-items-center gap-2">
        <h2 className="m-0 text-2xl font-bold text-900">Admin Users</h2>
        <Tag value={`${filteredAdmins.length} total`} severity="info" />
      </div>
      <div className="flex flex-column md:flex-row gap-2 flex-wrap">
        <Dropdown
          value={roleFilter}
          options={roleOptions}
          onChange={(e) => setRoleFilter(e.value)}
          placeholder="Filter by Role"
          className="w-full md:w-14rem"
        />
        <span className="p-input-icon-left w-full md:w-20rem">
          <i className="pi pi-search" />
          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search admins..."
            className="w-full"
          />
        </span>
        <Button
          label="Add New Admin"
          icon="pi pi-plus"
          severity="success"
          onClick={() => navigate(`${ADMIN_ROUTES.ADMINS_LIST}/create`)}
        />
        <Button
          icon="pi pi-refresh"
          rounded
          outlined
          loading={loading}
          onClick={handleRefresh}
          tooltip="Refresh Table"
          tooltipOptions={{ position: 'bottom' }}
        />
      </div>
    </div>
  );

  // Loading state for list page
  if (loading && admins.length === 0) {
    return <TableSkeleton rows={10} columns={5} />;
  }

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <ConfirmDialog />

      <DataTable
        value={filteredAdmins}
        loading={loading}
        header={header}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        dataKey="adminId"
        emptyMessage="No admins found"
        className="p-datatable-gridlines"
        stripedRows
        sortMode="multiple"
        removableSort
      >
        <Column
          header="Admin"
          body={contactBodyTemplate}
          sortable
          sortField="name"
          style={{ minWidth: '18rem' }}
        />
        <Column field="contact" header="Contact" sortable style={{ minWidth: '12rem' }} />
        <Column
          header="Role"
          body={roleBodyTemplate}
          sortable
          sortField="role"
          style={{ minWidth: '10rem' }}
        />
        <Column
          header="Status"
          body={statusBodyTemplate}
          sortable
          sortField="isActive"
          style={{ minWidth: '8rem' }}
        />
        <Column
          header="Actions"
          body={actionBodyTemplate}
          exportable={false}
          style={{ minWidth: '12rem' }}
        />
      </DataTable>

      {/* Info message for non-super-admin users */}
      {currentUser?.role !== 'super_admin' && (
        <div className="mt-3 p-3 bg-blue-50 border-left-4 border-blue-500">
          <p className="m-0 text-blue-900">
            <i className="pi pi-info-circle mr-2"></i>
            Super Admin data is hidden from your view due to your role permissions.
          </p>
        </div>
      )}
    </div>
  );
}

export default AdminList;
