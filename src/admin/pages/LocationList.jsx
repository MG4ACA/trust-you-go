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
import { deleteLocation, fetchLocations } from '../store/slices/locationSlice';
import '../styles/admin.css';
import '../styles/list-view.css';

function LocationList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useRef(null);
  const { locations, loading } = useSelector((state) => state.locations);

  const [globalFilter, setGlobalFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(null);

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const categoryOptions = [
    { label: 'All Categories', value: null },
    { label: 'Historical', value: 'historical' },
    { label: 'Religious', value: 'religious' },
    { label: 'Wildlife', value: 'wildlife' },
    { label: 'Nature', value: 'nature' },
    { label: 'Beach', value: 'beach' },
    { label: 'Adventure', value: 'adventure' },
  ];

  const handleDelete = (locationId, locationName) => {
    confirmDialog({
      message: (
        <div>
          <p className="dialog-message-title">
            Are you sure you want to delete <strong>{locationName}</strong>?
          </p>
          <p className="dialog-message-subtitle">
            This action cannot be undone. All location data and associated packages will be
            affected.
          </p>
        </div>
      ),
      header: 'Delete Location',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      accept: async () => {
        try {
          await dispatch(deleteLocation(locationId)).unwrap();
          toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Location deleted successfully',
            life: 3000,
          });
        } catch (error) {
          toast.current.show({
            severity: 'error',
            summary: 'Deletion Failed',
            detail:
              error.message ||
              'Failed to delete location. It may be used in active packages. Please try again.',
            life: 5000,
          });
        }
      },
    });
  };

  const categoryBodyTemplate = (rowData) => {
    const categoryColors = {
      historical: 'warning',
      religious: 'info',
      wildlife: 'success',
      nature: 'primary',
      beach: 'cyan',
      adventure: 'danger',
    };

    return (
      <Tag
        value={rowData.locationType}
        severity={categoryColors[rowData.locationType] || 'secondary'}
        style={{ textTransform: 'capitalize' }}
      />
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.isActive ? 'Active' : 'Inactive'}
        severity={rowData.isActive ? 'success' : 'danger'}
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="table-actions">
        <Button
          icon="pi pi-eye"
          rounded
          outlined
          severity="info"
          onClick={() => navigate(ADMIN_ROUTES.VIEW_LOCATION(rowData.locationId))}
          tooltip="View"
          tooltipOptions={{ position: 'top' }}
        />
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          severity="warning"
          onClick={() => navigate(ADMIN_ROUTES.EDIT_LOCATION(rowData.locationId))}
          tooltip="Edit"
          tooltipOptions={{ position: 'top' }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => handleDelete(rowData.locationId, rowData.name)}
          tooltip="Delete"
          tooltipOptions={{ position: 'top' }}
        />
      </div>
    );
  };

  const locationBodyTemplate = (rowData) => {
    return (
      <div>
        <div className="font-semibold">{rowData.name}</div>
        <div className="text-sm text-600">{rowData.description}</div>
      </div>
    );
  };

  // Filter locations
  const filteredLocations = locations.filter((location) => {
    const matchesCategory = !categoryFilter || location.locationType === categoryFilter;
    const matchesSearch =
      !globalFilter ||
      location.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
      location.description.toLowerCase().includes(globalFilter.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleRefresh = async () => {
    try {
      await dispatch(fetchLocations());
      toast.current.show({
        severity: 'success',
        summary: 'Refreshed',
        detail: 'Location list refreshed successfully',
        life: 2000,
      });
    } catch {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to refresh location list',
        life: 2000,
      });
    }
  };

  const header = (
    <div className="list-header">
      <div className="list-header-left">
        <h2 className="list-header-title">Tourist Locations</h2>
        <Tag value={`${filteredLocations.length} total`} severity="info" />
      </div>
      <div className="list-header-actions">
        <Button
          icon="pi pi-refresh"
          rounded
          outlined
          loading={loading}
          onClick={handleRefresh}
          tooltip="Refresh Table"
          tooltipOptions={{ position: 'bottom' }}
        />
        <Button
          label="Add Location"
          icon="pi pi-plus"
          severity="success"
          className="w-60"
          onClick={() => navigate(ADMIN_ROUTES.CREATE_LOCATION)}
        />
        <Dropdown
          value={categoryFilter}
          options={categoryOptions}
          onChange={(e) => setCategoryFilter(e.value)}
          placeholder="Filter by Category"
        />
        <span className="list-search-wrapper">
          <i className="pi pi-search" />
          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search locations..."
            className="w-full"
          />
        </span>
      </div>
    </div>
  );

  if (loading && locations.length === 0) {
    return <TableSkeleton rows={10} columns={6} />;
  }

  return (
    <div className="list-container">
      <Toast ref={toast} />
      <ConfirmDialog />

      <DataTable
        value={filteredLocations}
        loading={loading}
        header={header}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        dataKey="locationId"
        emptyMessage="No locations found"
        className="p-datatable-gridlines"
        stripedRows
        responsiveLayout="scroll"
      >
        <Column
          field="name"
          header="Location"
          body={locationBodyTemplate}
          sortable
          style={{ minWidth: '15rem' }}
        />
        <Column
          field="locationType"
          header="Category"
          body={categoryBodyTemplate}
          sortable
          style={{ minWidth: '10rem' }}
        />
        <Column field="locationUrl" header="URL" sortable style={{ minWidth: '12rem' }} />
        <Column
          field="isActive"
          header="Status"
          body={statusBodyTemplate}
          sortable
          style={{ minWidth: '8rem' }}
        />
        <Column
          header="Actions"
          body={actionBodyTemplate}
          exportable={false}
          style={{ minWidth: '12rem' }}
        />
      </DataTable>
    </div>
  );
}

export default LocationList;
