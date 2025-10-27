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
import { deleteAgent, fetchAgents } from '../store/slices/agentSlice';
import '../styles/admin.css';

function AgentList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useRef(null);
  const { agents, loading } = useSelector((state) => state.agents);

  const [globalFilter, setGlobalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);

  useEffect(() => {
    dispatch(fetchAgents());
  }, [dispatch]);

  const statusOptions = [
    { label: 'All', value: null },
    { label: 'Active', value: 'active' },
    { label: 'Pending', value: 'pending' },
    { label: 'Inactive', value: 'inactive' },
  ];

  const handleDelete = (agentId, firstName, lastName) => {
    const agentName = `${firstName || ''} ${lastName || ''}`.trim() || 'this agent';
    confirmDialog({
      message: (
        <div>
          <p className="m-0 mb-3">
            Are you sure you want to delete <strong>{agentName}</strong>?
          </p>
          <p className="m-0 text-600 text-sm">
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

  const statusBodyTemplate = (rowData) => {
    const severity =
      {
        active: 'success',
        pending: 'warning',
        inactive: 'danger',
      }[rowData.status] || 'info';

    return <Tag value={rowData.status} severity={severity} />;
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
          onClick={() => navigate(`/admin/agents/${rowData.id}`)}
        />
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          severity="success"
          tooltip="Edit Agent"
          tooltipOptions={{ position: 'top' }}
          onClick={() => navigate(`/admin/agents/edit/${rowData.id}`)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          tooltip="Delete Agent"
          tooltipOptions={{ position: 'top' }}
          onClick={() => handleDelete(rowData.id, rowData.firstName, rowData.lastName)}
        />
      </div>
    );
  };

  const contactBodyTemplate = (rowData) => {
    const fullName = `${rowData.firstName || ''} ${rowData.lastName || ''}`.trim() || 'N/A';
    return (
      <div>
        <div className="mb-1 font-semibold">{fullName}</div>
        <div className="mb-1 text-sm">
          <i className="pi pi-envelope mr-2 text-600"></i>
          <span>{rowData.email}</span>
        </div>
        <div className="text-sm">
          <i className="pi pi-phone mr-2 text-600"></i>
          <span>{rowData.phone}</span>
        </div>
      </div>
    );
  };

  // Calculate filtered agents first
  const filteredAgents = agents.filter((agent) => {
    const matchesStatus = !statusFilter || agent.status === statusFilter;
    const fullName = `${agent.firstName || ''} ${agent.lastName || ''}`.toLowerCase();
    const matchesSearch =
      !globalFilter ||
      fullName.includes(globalFilter.toLowerCase()) ||
      agent.email.toLowerCase().includes(globalFilter.toLowerCase()) ||
      agent.phone.includes(globalFilter) ||
      (agent.city && agent.city.toLowerCase().includes(globalFilter.toLowerCase()));

    return matchesStatus && matchesSearch;
  });

  // Define header after filteredAgents
  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center gap-3">
      <div className="flex align-items-center gap-2">
        <h2 className="m-0 text-2xl font-bold text-900">Travel Agents</h2>
        <Tag value={`${filteredAgents.length} total`} severity="info" />
      </div>
      <div className="flex flex-column md:flex-row gap-2">
        <Dropdown
          value={statusFilter}
          options={statusOptions}
          onChange={(e) => setStatusFilter(e.value)}
          placeholder="Filter by Status"
          className="w-full md:w-14rem"
        />
        <span className="p-input-icon-left w-full md:w-20rem">
          <i className="pi pi-search" />
          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search agents..."
            className="w-full"
          />
        </span>
        <Button
          label="Add Agent"
          icon="pi pi-plus"
          severity="success"
          onClick={() => navigate('/admin/agents/create')}
        />
      </div>
    </div>
  );

  if (loading && agents.length === 0) {
    return <TableSkeleton rows={10} columns={7} />;
  }

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <ConfirmDialog />

      <DataTable
        value={filteredAgents}
        loading={loading}
        header={header}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        dataKey="id"
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
          sortField="firstName"
          style={{ minWidth: '18rem' }}
        />
        <Column field="city" header="City" sortable style={{ minWidth: '10rem' }} />
        <Column
          field="commissionRate"
          header="Commission"
          body={(rowData) => `${rowData.commissionRate}%`}
          sortable
          style={{ minWidth: '8rem' }}
        />
        <Column
          field="status"
          header="Status"
          body={statusBodyTemplate}
          sortable
          style={{ minWidth: '8rem' }}
        />
        <Column field="totalBookings" header="Bookings" sortable style={{ minWidth: '8rem' }} />
        <Column field="joinedDate" header="Joined Date" sortable style={{ minWidth: '10rem' }} />
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
