import React, { useState } from 'react';
import Header from './components/header/Header';
import ListOfWorkers from './components/listOfWorkers/ListOfWorkers';
import WorkerInfo from './components/listOfWorkers/workerInfo/WorkerInfo';
import './index.scss';

const App = () => {
  const [activeFilter, setActiveFilter] = useState<'alphabet' | 'birthday'>('alphabet');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedWorkerId, setSelectedWorkerId] = useState<number | null>(null);

  const handleWorkerClick = (workerId: number) => {
    setSelectedWorkerId(workerId);
  };

  const handleBackClick = () => {
    setSelectedWorkerId(null);
  };

  return (
    <div className="page">
      <Header
        setActiveFilter={setActiveFilter}
        setSearchQuery={setSearchQuery}
        activeFilter={activeFilter}
        setSelectedCategory={setSelectedCategory}
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
