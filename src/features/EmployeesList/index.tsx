import React from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';
import { WorkerData } from '../../common/state/workersSlice';
import EmployeeCard from './components/EmployeeCard';
import YearsBlock from './components/YearsBlock';
import NotFoundBlock from '../Errors/NotFoundBlock';
import ErrorPage from '../Errors/ErrorPage';
import Skeleton from './components/Skeleton';
import { RootState } from '../../common/state/store';

import './index.scss';

const EmployeesList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const workers = useSelector((state: RootState) => state.workers.workers);
  const loading = useSelector((state: RootState) => state.workers.loading);
  const error = useSelector((state: RootState) => state.workers.error);

  const sortBy = searchParams.get('sortBy');
  const activeFilter = sortBy === 'alphabet' || sortBy === 'birthday' ? sortBy : 'alphabet';
  const searchQuery = searchParams.get('searchText') ?? '';
  const selectedCategory = searchParams.get('position') ?? 'All';

  const filteredWorkers = workers.filter(worker => {
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
  
  if (loading) {
    return <Skeleton />;
  }
  
  if (error) {
    return <ErrorPage />;
  }
  
  if (!filteredWorkers.length) {
    return <NotFoundBlock />;
  }

  const handleWorkerClick = (workerId: string) => {
    setSearchParams({ ...Object.fromEntries(searchParams), workerId: workerId.toString() });
  };

  return (
    <ul className="employees-list">
      {activeFilter === 'birthday' &&
        Object.keys(workerGroupsByYear).map(yearString => {
          const year = Number(yearString);
          return (
            <React.Fragment key={year}>
              <YearsBlock year={year} />
              {workerGroupsByYear[year].map((worker: WorkerData) => (
                <Link key={worker.id} to={`/employee/${worker.id}`}>
                  <EmployeeCard
                    employee={worker}
                    showBirthDate={true}
                    onClick={() => handleWorkerClick(worker.id)}
                  />
                </Link>
              ))}
            </React.Fragment>
          );
        })}
      {activeFilter === 'alphabet' &&
        sortedWorkers.map((worker: WorkerData) => (
          <Link key={worker.id} to={`/employee/${worker.id}`}>
            <EmployeeCard
              employee={worker}
              showBirthDate={false}
              onClick={() => handleWorkerClick(worker.id)}
            />
          </Link>
        ))}
    </ul>
  );
};

export default EmployeesList;
