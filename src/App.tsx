import React, { useState, useEffect } from 'react';
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
  const [selectedWorkerId, setSelectedWorkerId] = useState<number | null>(null);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWorkers());
  
    const workerIdParam = searchParams.get('workerId');
    if (workerIdParam) {
      setSelectedWorkerId(Number(workerIdParam));
    } else {
      setSelectedWorkerId(null);
    }
  }, [dispatch, searchParams]);

  const activeFilter = (searchParams.get('sortBy') as 'alphabet' | 'birthday') || 'alphabet';
  const searchQuery = searchParams.get('searchText') ?? '';
  const selectedCategory = searchParams.get('position') ?? 'All';

  const handleWorkerClick = (workerId: number) => {
    setSelectedWorkerId(workerId);
    setSearchParams({ ...Object.fromEntries(searchParams), workerId: workerId.toString() });
  };

  const handleBackClick = () => {
    setSelectedWorkerId(null);
    setSearchParams(searchParams => {
      const params = { ...Object.fromEntries(searchParams) };
      delete params.workerId;
      return params;
    });
  };

  return (
    <div className="page">
      <Header
        updateSearchParams={setSearchParams}
        activeFilter={activeFilter}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
      />
      {selectedWorkerId === null ? (
        <ListOfWorkers
          activeFilter={activeFilter}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onWorkerClick={handleWorkerClick}
        />
      ) : (
        <WorkerInfo workerId={selectedWorkerId} onBackClick={handleBackClick} />
      )}
    </div>
  );
};

export default App;
