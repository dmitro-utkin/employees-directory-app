import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './common/state/store';
import { fetchWorkers } from './common/state/workersSlice';
import Header from './components/header/Header';
import ListOfWorkers from './components/listOfWorkers/ListOfWorkers';
import WorkerInfo from './components/listOfWorkers/workerInfo/WorkerInfo';
import './index.scss';

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch: AppDispatch = useDispatch();

  const selectedWorkerId = searchParams.get('workerId');
  const activeFilter = (searchParams.get('sortBy') as 'alphabet' | 'birthday') || 'alphabet';
  const searchQuery = searchParams.get('searchText') ?? '';
  const selectedCategory = searchParams.get('position') ?? 'All';

  useEffect(() => {
    dispatch(fetchWorkers());
  }, [dispatch]);

  const handleWorkerClick = (workerId: number) => {
    setSearchParams({ ...Object.fromEntries(searchParams), workerId: workerId.toString() });
  };

  const handleBackClick = () => {
    const params = { ...Object.fromEntries(searchParams) };
    delete params.workerId;
    setSearchParams(params);
  };

  return (
    <div className="page">
      <Header
        updateSearchParams={setSearchParams}
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
