import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../common/state/store';
import { WorkerData } from '../../common/state/workersSlice';
import Worker from './components/EmployeeCard';
import YearsBlock from './components/YearsBlock';
import NotFoundBlock from '../Errors/NotFoundBlock';
import ErrorPage from '../Errors/ErrorPage';
import Skeleton from './components/Skeleton';
import './index.scss';

interface EmployeesListProps {
  activeFilter: 'alphabet' | 'birthday';
  searchQuery: string;
  selectedCategory: string;
  onWorkerClick: (workerId: string) => void;
}

const EmployeesList: React.FC<EmployeesListProps> = ({
  activeFilter,
  searchQuery,
  selectedCategory,
  onWorkerClick,
}) => {
  const workers = useSelector((state: RootState) => state.workers.workers);
  const loading = useSelector((state: RootState) => state.workers.loading);
  const error = useSelector((state: RootState) => state.workers.error);

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return <ErrorPage />;
  }

  const filteredWorkers = workers.filter((worker) => {
    const searchQueryLower = searchQuery.toLowerCase();
    const matchesSearchQuery =
      worker.name.toLowerCase().includes(searchQueryLower) ||
      worker.tag.toLowerCase().includes(searchQueryLower) ||
      worker.email.toLowerCase().includes(searchQueryLower);

    const matchesCategory =
      selectedCategory.toLowerCase() === 'all' ||
      worker.position.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearchQuery && matchesCategory;
  });

  const sortedWorkers = [...filteredWorkers].sort((a, b) => {
    if (activeFilter === 'alphabet') {
      return a.name.localeCompare(b.name);
    } else if (activeFilter === 'birthday') {
      return new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime();
    }
    return 0;
  });

  const workerGroupsByYear: { [key: number]: WorkerData[] } = {};
  if (activeFilter === 'birthday') {
    for (const worker of sortedWorkers) {
      const year = new Date(worker.birthDate).getFullYear();
      if (!workerGroupsByYear[year]) {
        workerGroupsByYear[year] = [];
      }
      workerGroupsByYear[year].push(worker);
    }
  }

  const noWorkersFound = filteredWorkers.length === 0;

  return (
    <ul className="employees-list">
      {noWorkersFound ? (
        <NotFoundBlock />
      ) : (
        <>
          {activeFilter === 'birthday' &&
            Object.keys(workerGroupsByYear).map((yearString) => {
              const year = Number(yearString);
              return (
                <React.Fragment key={year}>
                  <YearsBlock year={year} />
                  {workerGroupsByYear[year].map((worker: WorkerData) => (
                    <Worker
                      key={worker.id}
                      worker={worker}
                      showBirthDate={true}
                      onClick={() => onWorkerClick(worker.id)}
                    />
                  ))}
                </React.Fragment>
              );
            })}
          {activeFilter === 'alphabet' &&
            sortedWorkers.map((worker: WorkerData) => (
              <Worker
                key={worker.id}
                worker={worker}
                showBirthDate={false}
                onClick={() => onWorkerClick(worker.id)}
              />
            ))}
        </>
      )}
    </ul>
  );
};

export default EmployeesList;
