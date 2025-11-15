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
          <p className="m-0 mb-3">
            Are you sure you want to delete <strong>{locationName}</strong>?
          </p>
          <p className="m-0 text-600 text-sm">
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
      <div className="flex gap-2">
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
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center gap-3">
      <div className="flex align-items-center gap-2">
        <h2 className="m-0 text-2xl font-bold text-900">Tourist Locations</h2>
        <Tag value={`${filteredLocations.length} total`} severity="info" />
      </div>
      <div className="flex flex-column md:flex-row gap-2">
        <Dropdown
          value={categoryFilter}
          options={categoryOptions}
          onChange={(e) => setCategoryFilter(e.value)}
          placeholder="Filter by Category"
          className="w-full md:w-14rem"
        />
        <span className="p-input-icon-left w-full md:w-20rem">
          <i className="pi pi-search right-[17px]" />
          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search locations..."
            className="w-full"
          />
        </span>
        <Button
          label="Add Location"
          icon="pi pi-plus"
          severity="success"
          onClick={() => navigate(ADMIN_ROUTES.CREATE_LOCATION)}
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

  if (loading && locations.length === 0) {
    return <TableSkeleton rows={10} columns={6} />;
  }

  return (
    <div className="p-4">
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
