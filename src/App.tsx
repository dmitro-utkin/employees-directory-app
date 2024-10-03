import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './common/state/store';
import { fetchWorkers } from './common/gateway.ts/gateway';
import Header from './components/header/Header';
import ListOfWorkers from './components/listOfWorkers/ListOfWorkers';
import WorkerInfo from './components/listOfWorkers/workerInfo/WorkerInfo';
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

  const handleWorkerClick = (workerId: number) => {
    updateSearchParams({ workerId: workerId.toString() });
  };

  const handleBackClick = () => {
    const params = { ...Object.fromEntries(searchParams) };
    delete params.workerId;
    setSearchParams(params);
  };

  return (
    <div className="page">
      <Header
        updateSearchParams={updateSearchParams}
        activeFilter={activeFilter}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
      />
      {!selectedWorkerId ? (
        <ListOfWorkers
          activeFilter={activeFilter}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onWorkerClick={handleWorkerClick}
        />
      ) : (
        <WorkerInfo workerId={Number(selectedWorkerId)} onBackClick={handleBackClick} />
      )}
    </div>
  );
};

export default App;
