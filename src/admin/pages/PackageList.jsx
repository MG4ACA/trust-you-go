import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { DataTable } from 'primereact/datatable';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTES } from '../config/routeConfig';
import { deletePackage, fetchPackages } from '../store/slices/packageSlice';
import '../styles/admin.css';
import '../styles/list-view.css';

const PackageList = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const toast = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: packages, loading, error } = useSelector((state) => state.packages);

  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: error,
        life: 3000,
      });
    }
  }, [error]);

  const handleAdd = () => {
    navigate(ADMIN_ROUTES.CREATE_PACKAGE);
  };

  const handleDelete = (id) => {
    confirmDialog({
      message: 'Are you sure you want to delete this package?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        try {
          await dispatch(deletePackage(id)).unwrap();
          toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Package deleted successfully',
            life: 3000,
          });
        } catch (error) {
          toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: error,
            life: 3000,
          });
        }
      },
    });
  };

  const renderHeader = () => {
    const handleRefresh = async () => {
      try {
        await dispatch(fetchPackages());
        toast.current.show({
          severity: 'success',
          summary: 'Refreshed',
          detail: 'Package list refreshed successfully',
          life: 2000,
        });
      } catch {
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to refresh package list',
          life: 2000,
        });
      }
    };

    return (
      <div className="list-header">
        <h3 className="list-header-title">Travel Packages</h3>
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
          <Button icon="pi pi-plus" label="New Package" onClick={handleAdd} severity="success" />
        </div>
      </div>
    );
  };

  const statusTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.isActive ? 'Active' : 'Inactive'}
        severity={rowData.isActive ? 'success' : 'danger'}
      />
    );
  };

  const actionsTemplate = (rowData) => {
    return (
      <div>
        <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-text mr-2"
          onClick={() => navigate(ADMIN_ROUTES.VIEW_PACKAGE(rowData.id))}
          tooltip="View"
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-text mr-2"
          onClick={() => navigate(ADMIN_ROUTES.EDIT_PACKAGE(rowData.id))}
          tooltip="Edit"
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-text p-button-danger"
          onClick={() => handleDelete(rowData.id)}
          tooltip="Delete"
        />
      </div>
    );
  };

  const priceTemplate = (rowData) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(rowData.basePrice);
  };

  const header = renderHeader();

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
      <DataTable
        value={packages}
        selection={selectedItems}
        onSelectionChange={(e) => setSelectedItems(e.value)}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} packages"
        header={header}
        loading={loading}
        responsiveLayout="scroll"
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
        <Column field="title" header="Title" sortable />
        <Column field="noOfDays" header="Duration (Days)" sortable />
        <Column field="basePrice" header="Price" body={priceTemplate} sortable />
        <Column field="isTemplate" header="Template" sortable />
        <Column field="isActive" header="Status" body={statusTemplate} sortable />
        <Column header="Actions" body={actionsTemplate} />
      </DataTable>
    </>
  );
};

export default PackageList;
