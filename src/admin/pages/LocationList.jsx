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
        value={rowData.location_type}
        severity={categoryColors[rowData.location_type] || 'secondary'}
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

  const entryFeeBodyTemplate = (rowData) => {
    return rowData.entryFee === 0 ? (
      <Tag value="Free" severity="success" />
    ) : (
      <span>${rowData.entryFee}</span>
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
          onClick={() => navigate(`/admin/locations/${rowData.id}`)}
          tooltip="View"
          tooltipOptions={{ position: 'top' }}
        />
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          severity="warning"
          onClick={() => navigate(`/admin/locations/edit/${rowData.id}`)}
          tooltip="Edit"
          tooltipOptions={{ position: 'top' }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => handleDelete(rowData.id, rowData.name)}
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
        <div className="text-sm text-600">
          <i className="pi pi-map-marker mr-1"></i>
          {rowData.city}, {rowData.province}
        </div>
      </div>
    );
  };

  // Filter locations
  const filteredLocations = locations.filter((location) => {
    const matchesCategory = !categoryFilter || location.location_type === categoryFilter;
    const matchesSearch =
      !globalFilter ||
      location.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
      location.city.toLowerCase().includes(globalFilter.toLowerCase()) ||
      location.province.toLowerCase().includes(globalFilter.toLowerCase()) ||
      location.description.toLowerCase().includes(globalFilter.toLowerCase());

    return matchesCategory && matchesSearch;
  });

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
          <i className="pi pi-search" />
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
          onClick={() => navigate('/admin/locations/create')}
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
        dataKey="id"
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
          field="location_type"
          header="Category"
          body={categoryBodyTemplate}
          sortable
          style={{ minWidth: '10rem' }}
        />
        <Column
          field="entryFee"
          header="Entry Fee"
          body={entryFeeBodyTemplate}
          sortable
          style={{ minWidth: '8rem' }}
        />
        <Column field="bestTimeToVisit" header="Best Time" sortable style={{ minWidth: '12rem' }} />
        <Column
          field="averageVisitDuration"
          header="Duration"
          sortable
          style={{ minWidth: '10rem' }}
        />
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
