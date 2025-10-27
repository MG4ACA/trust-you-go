import { Card } from 'primereact/card';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DashboardSkeleton } from '../components/LoadingSkeleton';
import { fetchAgents } from '../store/slices/agentSlice';
import '../styles/admin.css';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { agents, loading } = useSelector((state) => state.agents);

  useEffect(() => {
    dispatch(fetchAgents());
  }, [dispatch]);

  const stats = {
    total: agents.length,
    active: agents.filter((a) => a.status === 'active').length,
    pending: agents.filter((a) => a.status === 'pending').length,
  };

  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <Card role="region" aria-label={`${title} statistics`}>
      <div className="flex justify-content-between align-items-start">
        <div>
          <div className="text-500 font-medium mb-2">{title}</div>
          <div className="text-900 font-bold text-4xl mb-2" aria-label={`${value} ${title.toLowerCase()}`}>{value}</div>
          {subtitle && <div className="text-sm text-600">{subtitle}</div>}
        </div>
        <div
          className="border-round flex align-items-center justify-content-center"
          style={{
            width: '3.5rem',
            height: '3.5rem',
            background: `linear-gradient(135deg, ${color}20, ${color}40)`,
          }}
          aria-hidden="true"
        >
          <i className={`${icon} text-2xl`} style={{ color }}></i>
        </div>
      </div>
    </Card>
  );

  const QuickActionCard = ({ title, description, icon, action, color }) => (
    <Card
      className="hover:shadow-3 transition-all transition-duration-300 cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label={title}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          action();
        }
      }}
    >
      <div className="flex flex-column align-items-center text-center" onClick={action}>
        <div
          className="border-circle mb-3 flex align-items-center justify-content-center"
          style={{
            width: '4rem',
            height: '4rem',
            background: `linear-gradient(135deg, ${color}20, ${color}40)`,
          }}
        >
          <i className={`${icon} text-3xl`} style={{ color }}></i>
        </div>
        <h3 className="mt-0 mb-2 text-900">{title}</h3>
        <p className="text-600 text-sm m-0">{description}</p>
      </div>
    </Card>
  );

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-900 mt-0 mb-2">
          Welcome back, {user?.username || 'Admin'}! 👋
        </h1>
        <p className="text-600 mt-0">Here's what's happening with your travel agency today.</p>
      </div>

      <div className="grid mb-4">
        <div className="col-12 md:col-6 lg:col-4">
          <StatCard
            title="Total Agents"
            value={stats.total}
            icon="pi pi-users"
            color="#667eea"
            subtitle="Registered travel agents"
          />
        </div>
        <div className="col-12 md:col-6 lg:col-4">
          <StatCard
            title="Active Agents"
            value={stats.active}
            icon="pi pi-check-circle"
            color="#48bb78"
            subtitle="Currently active"
          />
        </div>
        <div className="col-12 md:col-6 lg:col-4">
          <StatCard
            title="Pending Approval"
            value={stats.pending}
            icon="pi pi-clock"
            color="#ed8936"
            subtitle="Awaiting review"
          />
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-bold text-900 mb-3">Quick Actions</h2>
        <div className="grid">
          <div className="col-12 md:col-6 lg:col-3">
            <QuickActionCard
              title="View Agents"
              description="Browse and manage all travel agents"
              icon="pi pi-users"
              color="#667eea"
              action={() => navigate('/admin/agents')}
            />
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <QuickActionCard
              title="Add Agent"
              description="Register a new travel agent"
              icon="pi pi-user-plus"
              color="#48bb78"
              action={() => navigate('/admin/agents/create')}
            />
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <QuickActionCard
              title="Create Admin"
              description="Add a new admin user"
              icon="pi pi-shield"
              color="#ed8936"
              action={() => navigate('/admin/create-admin')}
            />
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <QuickActionCard
              title="Refresh Data"
              description="Reload dashboard statistics"
              icon="pi pi-refresh"
              color="#4299e1"
              action={() => dispatch(fetchAgents())}
            />
          </div>
        </div>
      </div>

      <Card className="mb-4">
        <h3 className="text-xl font-bold text-900 mt-0 mb-3">Recent Activity</h3>
        <div className="flex flex-column gap-3">
          {agents.slice(0, 3).map((agent, index) => (
            <div
              key={agent.id}
              className={`flex align-items-center ${
                index < 2 ? 'border-bottom-1 border-200 pb-3' : ''
              }`}
            >
              <div
                className="border-circle flex align-items-center justify-content-center mr-3"
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  background: agent.status === 'active' ? '#48bb7820' : '#667eea20',
                }}
              >
                <i
                  className={`pi ${agent.status === 'active' ? 'pi-check' : 'pi-user-plus'}`}
                  style={{ color: agent.status === 'active' ? '#48bb78' : '#667eea' }}
                ></i>
              </div>
              <div className="flex-1">
                <div className="text-900 font-medium">
                  {agent.status === 'active' ? 'Agent approved' : 'New agent registered'}:{' '}
                  {agent.name}
                </div>
                <div className="text-600 text-sm">{agent.email}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;
