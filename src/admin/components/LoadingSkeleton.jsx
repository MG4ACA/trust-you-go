import { Card } from 'primereact/card';
import { Skeleton } from 'primereact/skeleton';

export function DashboardSkeleton() {
  return (
    <div className="p-4">
      <div className="mb-4">
        <Skeleton width="30%" height="2.5rem" className="mb-2" />
        <Skeleton width="50%" height="1rem" />
      </div>

      <div className="grid mb-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="col-12 md:col-6 lg:col-4">
            <Card>
              <Skeleton width="60%" height="1rem" className="mb-2" />
              <Skeleton width="40%" height="2.5rem" className="mb-2" />
              <Skeleton width="80%" height="0.875rem" />
            </Card>
          </div>
        ))}
      </div>

      <div className="grid mb-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="col-12 md:col-6 lg:col-3">
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
    <div className="p-4">
      <div className="flex justify-content-between align-items-center mb-4">
        <Skeleton width="15rem" height="2.5rem" />
        <Skeleton width="10rem" height="2.5rem" />
      </div>

      <Card>
        <div className="mb-3 grid">
          <div className="col-12 md:col-6">
            <Skeleton width="100%" height="2.5rem" />
          </div>
          <div className="col-12 md:col-3">
            <Skeleton width="100%" height="2.5rem" />
          </div>
        </div>

        <div className="border-round border-1 surface-border">
          {/* Header */}
          <div className="flex gap-3 p-3 border-bottom-1 surface-border">
            {Array.from({ length: columns }).map((_, i) => (
              <Skeleton key={i} width={`${100 / columns}%`} height="1.5rem" />
            ))}
          </div>

          {/* Rows */}
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex gap-3 p-3 border-bottom-1 surface-border">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton key={colIndex} width={`${100 / columns}%`} height="1rem" />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-3 flex justify-content-between">
          <Skeleton width="10rem" height="2rem" />
          <Skeleton width="15rem" height="2rem" />
        </div>
      </Card>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="p-4">
      <div className="flex justify-content-between align-items-center mb-4">
        <Skeleton width="20rem" height="2.5rem" />
        <Skeleton width="10rem" height="2.5rem" />
      </div>

      <div className="grid">
        <div className="col-12 lg:col-8">
          <Card>
            <div className="grid">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="col-12 md:col-6">
                  <Skeleton width="40%" height="1rem" className="mb-2" />
                  <Skeleton width="100%" height="2.5rem" />
                </div>
              ))}
              <div className="col-12">
                <Skeleton width="100%" height="1px" className="my-4" />
              </div>
              <div className="col-12 flex justify-content-end gap-2">
                <Skeleton width="8rem" height="2.5rem" />
                <Skeleton width="10rem" height="2.5rem" />
              </div>
            </div>
          </Card>
        </div>

        <div className="col-12 lg:col-4">
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
