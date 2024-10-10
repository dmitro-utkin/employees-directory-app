import React from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';
import { RootState } from '../../common/state/store';
import { WorkerData } from '../../common/state/workersSlice';
import Worker from './components/EmployeeCard';
import YearsBlock from './components/YearsBlock';
import NotFoundBlock from '../Errors/NotFoundBlock';
import ErrorPage from '../Errors/ErrorPage';
import Skeleton from './components/Skeleton';
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

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return <ErrorPage />;
  }

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

  const noWorkersFound = filteredWorkers.length === 0;

  const handleWorkerClick = (workerId: string) => {
    setSearchParams({ ...Object.fromEntries(searchParams), workerId: workerId.toString() });
  };

  return (
    <ul className="employees-list">
      {noWorkersFound ? (
        <NotFoundBlock />
      ) : (
        <>
          {activeFilter === 'birthday' &&
            Object.keys(workerGroupsByYear).map(yearString => {
              const year = Number(yearString);
              return (
                <React.Fragment key={year}>
                  <YearsBlock year={year} />
                  {workerGroupsByYear[year].map((worker: WorkerData) => (
                    <Link key={worker.id} to={`/employee/${worker.id}`}>
                      <Worker
                        worker={worker}
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
                <Worker
                  worker={worker}
                  showBirthDate={false}
                  onClick={() => handleWorkerClick(worker.id)}
                />
              </Link>
            ))}
        </>
      )}
    </ul>
  );
};

export default EmployeesList;

// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import './index.scss';

// const EmployeesList: React.FC = () => {
//   const workers = useSelector((state: RootState) => state.workers.workers);

//   return (
//     <div className="employees-list">
//       {workers.map((worker) => (
//         <Link key={worker.id} to={`/employee/${worker.id}`}>
//           <div className="employee-card">
//             <img className="employee-card__avatar" src={worker.avatar} alt="avatar" />
//             <h2 className="employee-card__name">{worker.name}</h2>
//             <span className="employee-card__position">{worker.position}</span>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default EmployeesList;
