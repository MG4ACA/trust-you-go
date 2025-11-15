import { Card } from 'primereact/card';
import { Skeleton } from 'primereact/skeleton';
import '../styles/skeleton.css';

export function DashboardSkeleton() {
  return (
    <div className="skeleton-container">
      <div className="skeleton-header">
        <Skeleton width="30%" height="2.5rem" className="mb-2" />
        <Skeleton width="50%" height="1rem" />
      </div>

      <div className="skeleton-grid skeleton-grid-3">
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <Card>
              <Skeleton width="60%" height="1rem" className="mb-2" />
              <Skeleton width="40%" height="2.5rem" className="mb-2" />
              <Skeleton width="80%" height="0.875rem" />
            </Card>
          </div>
        ))}
      </div>

      <div className="skeleton-grid skeleton-grid-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i}>
            <Card>
              <Skeleton width="100%" height="3rem" className="mb-2" />
              <Skeleton width="70%" height="1rem" />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5, columns = 5 }) {
  return (
    <div className="skeleton-container">
      <div className="skeleton-table-header">
        <Skeleton width="15rem" height="2.5rem" />
        <Skeleton width="10rem" height="2.5rem" />
      </div>

      <Card>
        <div className="skeleton-table-filters">
          <div className="skeleton-filter-col-6">
            <Skeleton width="100%" height="2.5rem" />
          </div>
          <div className="skeleton-filter-col-3">
            <Skeleton width="100%" height="2.5rem" />
          </div>
        </div>

        <div className="skeleton-table-wrapper">
          {/* Header */}
          <div className="skeleton-table-row skeleton-table-head">
            {Array.from({ length: columns }).map((_, i) => (
              <Skeleton key={i} width={`${100 / columns}%`} height="1.5rem" />
            ))}
          </div>

          {/* Rows */}
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="skeleton-table-row">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton key={colIndex} width={`${100 / columns}%`} height="1rem" />
              ))}
            </div>
          ))}
        </div>

        <div className="skeleton-table-footer">
          <Skeleton width="10rem" height="2rem" />
          <Skeleton width="15rem" height="2rem" />
        </div>
      </Card>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="skeleton-container">
      <div className="skeleton-form-header">
        <Skeleton width="20rem" height="2.5rem" />
        <Skeleton width="10rem" height="2.5rem" />
      </div>

      <div className="skeleton-form-layout">
        <div className="skeleton-form-main">
          <Card>
            <div className="skeleton-form-fields">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="skeleton-form-field">
                  <Skeleton width="40%" height="1rem" className="mb-2" />
                  <Skeleton width="100%" height="2.5rem" />
                </div>
              ))}
              <div className="skeleton-form-divider">
                <Skeleton width="100%" height="1px" />
              </div>
              <div className="skeleton-form-actions">
                <Skeleton width="8rem" height="2.5rem" />
                <Skeleton width="10rem" height="2.5rem" />
              </div>
            </div>
          </Card>
        </div>

        <div className="skeleton-form-sidebar">
          <Card className="mb-3">
            <Skeleton width="60%" height="1.5rem" className="mb-3" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="mb-3">
                <Skeleton width="100%" height="1rem" className="mb-2" />
                <Skeleton width="100%" height="3rem" />
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default {
  DashboardSkeleton,
  TableSkeleton,
  FormSkeleton,
};
