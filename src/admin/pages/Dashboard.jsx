import { Card } from 'primereact/card';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DashboardSkeleton } from '../components/LoadingSkeleton';
import { ADMIN_ROUTES } from '../config/routeConfig';
import { fetchAgents } from '../store/slices/agentSlice';
import '../styles/admin.css';
import '../styles/dashboard.css';

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
      <div className="stat-card-content">
        <div className="stat-card-info">
          <div className="stat-card-title">{title}</div>
          <div className="stat-card-value" aria-label={`${value} ${title.toLowerCase()}`}>
            {value}
          </div>
          {subtitle && <div className="stat-card-subtitle">{subtitle}</div>}
        </div>
        <div
          className="stat-card-icon"
          style={{
            background: `linear-gradient(135deg, ${color}20, ${color}40)`,
          }}
          aria-hidden="true"
        >
          <i className={icon} style={{ color }}></i>
        </div>
      </div>
    </Card>
  );

  const QuickActionCard = ({ title, description, icon, action, color }) => (
    <Card
      className="quick-action-card"
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
      <div className="quick-action-content" onClick={action}>
        <div
          className="quick-action-icon"
          style={{
            background: `linear-gradient(135deg, ${color}20, ${color}40)`,
          }}
        >
          <i className={icon} style={{ color }}></i>
        </div>
        <h3 className="quick-action-title">{title}</h3>
        <p className="quick-action-description">{description}</p>
      </div>
    </Card>
  );

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-stats">
        <div>
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

      <div className="dashboard-section">
        <h2 className="dashboard-section-title">Quick Actions</h2>
        <div className="dashboard-quick-actions">
          <div>
            <QuickActionCard
              title="View Agents"
              description="Browse and manage all travel agents"
              icon="pi pi-users"
              color="#667eea"
              action={() => navigate(ADMIN_ROUTES.AGENTS_LIST)}
            />
          </div>
          <div>
            <QuickActionCard
              title="Add Agent"
              description="Register a new travel agent"
              icon="pi pi-user-plus"
              color="#48bb78"
              action={() => navigate(ADMIN_ROUTES.CREATE_AGENT)}
            />
          </div>
          <div>
            <QuickActionCard
              title="Create Admin"
              description="Add a new admin user"
              icon="pi pi-shield"
              color="#ed8936"
              action={() => navigate(ADMIN_ROUTES.CREATE_ADMIN)}
            />
          </div>
          <div>
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

      <Card className="dashboard-activity">
        <h3 className="dashboard-activity-title">Recent Activity</h3>
        <div className="activity-list">
          {agents.slice(0, 3).map((agent, index) => (
            <div key={agent.id} className="activity-item">
              <div
                className="activity-icon"
                style={{
                  background: agent.status === 'active' ? '#48bb7820' : '#667eea20',
                }}
              >
                <i
                  className={`pi ${agent.status === 'active' ? 'pi-check' : 'pi-user-plus'}`}
                  style={{ color: agent.status === 'active' ? '#48bb78' : '#667eea' }}
                ></i>
              </div>
              <div className="activity-details">
                <div className="activity-text">
                  {agent.status === 'active' ? 'Agent approved' : 'New agent registered'}:{' '}
                  {agent.name}
                </div>
                <div className="activity-email">{agent.email}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;
