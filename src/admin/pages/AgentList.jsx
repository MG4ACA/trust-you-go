import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TableSkeleton } from '../components/LoadingSkeleton';
import { ADMIN_ROUTES } from '../config/routeConfig';
import { deleteAgent, fetchAgents } from '../store/slices/agentSlice';
import '../styles/admin.css';
import '../styles/list-view.css';

function AgentList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useRef(null);
  const { agents, loading } = useSelector((state) => state.agents);

  const [globalFilter, setGlobalFilter] = useState('');

  useEffect(() => {
    dispatch(fetchAgents());
  }, [dispatch]);

  const handleDelete = (agentId, agentName) => {
    const displayName = agentName || 'this agent';
    confirmDialog({
      message: (
        <div>
          <p className="dialog-message-title">
            Are you sure you want to delete <strong>{displayName}</strong>?
          </p>
          <p className="dialog-message-subtitle">
            This action cannot be undone. All agent data will be permanently removed.
          </p>
        </div>
      ),
      header: 'Delete Agent',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      accept: async () => {
        try {
          await dispatch(deleteAgent(agentId)).unwrap();
          toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Agent deleted successfully',
            life: 3000,
          });
        } catch (error) {
          toast.current.show({
            severity: 'error',
            summary: 'Deletion Failed',
            detail:
              error.message ||
              'Failed to delete agent. The agent may have active bookings or the server may be unavailable. Please try again.',
            life: 5000,
          });
        }
      },
    });
  };

  const activeBodyTemplate = (rowData) => {
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
          tooltip="View Details"
          tooltipOptions={{ position: 'top' }}
          onClick={() => navigate(ADMIN_ROUTES.VIEW_AGENT(rowData.agentId))}
        />
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          severity="success"
          tooltip="Edit Agent"
          tooltipOptions={{ position: 'top' }}
          onClick={() => navigate(ADMIN_ROUTES.EDIT_AGENT(rowData.agentId))}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          tooltip="Delete Agent"
          tooltipOptions={{ position: 'top' }}
          onClick={() => handleDelete(rowData.agentId, rowData.name)}
        />
      </div>
    );
  };

  const contactBodyTemplate = (rowData) => {
    return (
      <div>
        <div className="mb-1 font-semibold">{rowData.name || 'N/A'}</div>
        <div className="mb-1 text-sm">
          <i className="pi pi-envelope mr-2 text-600"></i>
          <span>{rowData.email}</span>
        </div>
        <div className="text-sm">
          <i className="pi pi-phone mr-2 text-600"></i>
          <span>{rowData.contact}</span>
        </div>
      </div>
    );
  };

  // Calculate filtered agents
  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      !globalFilter ||
      (agent.name && agent.name.toLowerCase().includes(globalFilter.toLowerCase())) ||
      (agent.email && agent.email.toLowerCase().includes(globalFilter.toLowerCase())) ||
      (agent.contact && agent.contact.includes(globalFilter));

    return matchesSearch;
  });

  // Define header after filteredAgents
  const handleRefresh = async () => {
    try {
      await dispatch(fetchAgents());
      toast.current.show({
        severity: 'success',
        summary: 'Refreshed',
        detail: 'Agent list refreshed successfully',
        life: 2000,
      });
    } catch {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to refresh agent list',
        life: 2000,
      });
    }
  };

  const header = (
    <div className="list-header">
      <div className="list-header-left">
        <h2 className="list-header-title">Travel Agents</h2>
        <Tag value={`${filteredAgents.length} total`} severity="info" />
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
          label="Add Agent"
          icon="pi pi-plus"
          severity="success"
          onClick={() => navigate(ADMIN_ROUTES.CREATE_AGENT)}
          className="w-50"
        />

        <span className="list-search-wrapper">
          <i className="pi pi-search right-[17px] absolute" />
          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search agents..."
          />
        </span>
      </div>
    </div>
  );

  if (loading && agents.length === 0) {
    return <TableSkeleton rows={10} columns={7} />;
  }

  return (
    <div className="list-container">
      <Toast ref={toast} />
      <ConfirmDialog />

      <DataTable
        value={filteredAgents}
        loading={loading}
        header={header}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        dataKey="agentId"
        emptyMessage="No agents found"
        className="p-datatable-gridlines"
        stripedRows
        sortMode="multiple"
        removableSort
      >
        <Column
          header="Agent"
          body={contactBodyTemplate}
          sortable
          sortField="name"
          style={{ minWidth: '18rem' }}
        />
        <Column
          field="commissionRate"
          header="Commission"
          body={(rowData) => `${rowData.commissionRate}%`}
          sortable
          style={{ minWidth: '10rem' }}
        />
        <Column field="notes" header="Notes" sortable style={{ minWidth: '15rem' }} />
        <Column
          field="isActive"
          header="Status"
          body={activeBodyTemplate}
          sortable
          style={{ minWidth: '8rem' }}
        />
        <Column
          field="createdAt"
          header="Created"
          body={(rowData) =>
            rowData.createdAt ? new Date(rowData.createdAt).toLocaleDateString() : 'N/A'
          }
          sortable
          style={{ minWidth: '10rem' }}
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

export default AgentList;
