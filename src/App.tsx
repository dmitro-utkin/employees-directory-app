import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './common/state/store';
import { fetchWorkers } from './common/gateway.ts/gateway';
import FilterBlock from './features/FilterBlock';
import EmployeesList from './features/EmployeesList';
import EmployeeInfo from './features/EmployeesList/components/EmployeeInfo';
import './index.scss';

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch: AppDispatch = useDispatch();

  const selectedWorkerId = searchParams.get('workerId');
  const sortBy = searchParams.get('sortBy');
  const activeFilter = (sortBy === 'alphabet' || sortBy === 'birthday') ? sortBy : 'alphabet';
  const searchQuery = searchParams.get('searchText') ?? '';
  const selectedCategory = searchParams.get('position') ?? 'All';

  useEffect(() => {
    dispatch(fetchWorkers());
  }, [dispatch]);

  const updateSearchParams = (newParams: { [key: string]: string }) => {
    const params = { ...Object.fromEntries(searchParams), ...newParams };
    setSearchParams(params);
  };

  const handleWorkerClick = (workerId: string) => {
    updateSearchParams({ workerId: workerId.toString() });
  };

  const handleBackClick = () => {
    const params = { ...Object.fromEntries(searchParams) };
    delete params.workerId;
    setSearchParams(params);
  };

  return (
    <div className="page">
      <FilterBlock
        updateSearchParams={updateSearchParams}
        activeFilter={activeFilter}
        searchQuery={searchQuery}
      />
      {!selectedWorkerId ? (
        <EmployeesList
          activeFilter={activeFilter}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onWorkerClick={handleWorkerClick}
        />
      ) : (
        <EmployeeInfo workerId={Number(selectedWorkerId)} onBackClick={handleBackClick} />
      )}
    </div>
  );
};

export default App;
