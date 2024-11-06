// import React from 'react';
// import { useSelector } from 'react-redux';
// import { useSearchParams, Link } from 'react-router-dom';
// import { Employee } from '../../common/types';
// import EmployeeCard from './components/EmployeeCard';
// import YearsBlock from './components/YearsBlock';
// import Error from '../Errors';
// import Skeleton from './components/Skeleton';
// import { RootState } from '../../common/state/store';
// import moment from 'moment';

// import './index.scss';

// const EmployeesList: React.FC = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const workers = useSelector((state: RootState) => state.workers.workers);
//   const loading = useSelector((state: RootState) => state.workers.loading);
//   const error = useSelector((state: RootState) => state.workers.error);

//   const sortBy = searchParams.get('sortBy');
//   const activeFilter = sortBy === 'alphabet' || sortBy === 'birthday' ? sortBy : 'alphabet';
//   const searchQuery = searchParams.get('searchText') ?? '';
//   const selectedCategory = searchParams.get('position') ?? 'All';

//   const filteredWorkers = workers.filter(worker => {
//     const searchQueryLower = searchQuery.toLowerCase();
//     const matchesSearchQuery =
//       worker.name.toLowerCase().includes(searchQueryLower) ||
//       worker.tag.toLowerCase().includes(searchQueryLower) ||
//       worker.email.toLowerCase().includes(searchQueryLower);

//     const matchesCategory =
//       selectedCategory.toLowerCase() === 'all' ||
//       worker.position.toLowerCase() === selectedCategory.toLowerCase();

//     return matchesSearchQuery && matchesCategory;
//   });

//   const sortedWorkers = [...filteredWorkers].sort((a, b) => {
//     if (activeFilter === 'alphabet') {
//       return a.name.localeCompare(b.name);
//     } else if (activeFilter === 'birthday') {
//       return new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime();
//     }
//     return 0;
//   });

//   const workerGroupsByYear: { year: number; workers: Employee[]; }[] = [];
//   sortedWorkers.forEach((worker) => {
//     const year = moment(worker.birthDate).year();
//     const existingYearGroup = workerGroupsByYear.find((group) => group.year === year);
//     if (existingYearGroup) {
//       existingYearGroup.workers.push(worker);
//     } else {
//       workerGroupsByYear.push({ year, workers: [worker] });
//     }
//   });

//   if (loading) {
//     return <Skeleton />;
//   }

//   if (error) {
//     return <Error type="general" />;
//   }

//   if (!filteredWorkers.length) {
//     return <Error type="employeesSearch" />;
//   }

//   const handleWorkerClick = (workerId: string) => {
//     setSearchParams({ ...Object.fromEntries(searchParams), workerId: workerId.toString() });
//   };

//   return (
//     <ul className="employees-list">
//       {activeFilter === 'birthday' &&
//         workerGroupsByYear.map((yearGroup) => (
//           <React.Fragment key={yearGroup.year}>
//             <YearsBlock year={yearGroup.year} />
//             {yearGroup.workers.map((worker) => (
//               <Link className='employees-list__link' key={worker.id} to={`/employee/${worker.id}`}>
//                 <EmployeeCard
//                   employee={worker}
//                   showBirthDate={true}
//                   onClick={() => handleWorkerClick(worker.id)}
//                 />
//               </Link>
//             ))}
//           </React.Fragment>
//         ))}
//       {activeFilter === 'alphabet' &&
//         sortedWorkers.map((worker) => (
//           <Link key={worker.id} to={`/employee/${worker.id}`}>
//             <EmployeeCard
//               employee={worker}
//               showBirthDate={false}
//               onClick={() => handleWorkerClick(worker.id)}
//             />
//           </Link>
//         ))}
//     </ul>
//   );
// };

// export default EmployeesList;

import React from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import EmployeeCard from './components/EmployeeCard';
import Error from '../Errors';
import Skeleton from './components/Skeleton';
import YearsBlock from './components/YearsBlock';
import { RootState } from '../../common/state/store';
import './index.scss';

const EmployeesList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
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

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return <Error type="general" />;
  }

  if (!filteredWorkers.length) {
    return <Error type="employeesSearch" />;
  }

  const handleWorkerClick = (workerId: string) => {
    setSearchParams({ ...Object.fromEntries(searchParams), workerId: workerId.toString() });
    navigate(`/employee/${workerId}`);
  };

  return (
    <ul className="employees-list">
      {sortedWorkers.map((worker, index) => {
        const year = new Date(worker.birthDate).getFullYear();
        const shouldShowYearBlock = activeFilter === 'birthday' && (index === 0 || new Date(sortedWorkers[index - 1].birthDate).getFullYear() !== year);

        return (
          <React.Fragment key={worker.id}>
            {shouldShowYearBlock && <YearsBlock year={year} />}
            <EmployeeCard
              employee={worker}
              showBirthDate={activeFilter === 'birthday'}
              onClick={() => handleWorkerClick(worker.id)}
              sortType={activeFilter}
              index={index}
              employees={sortedWorkers}
            />
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default EmployeesList;
