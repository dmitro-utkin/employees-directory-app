import React, { useState } from 'react';
import Header from './components/header/Header';
import ListOfWorkers from './components/listOfWorkers/ListOfWorkers';
import './index.scss';

const App = () => {
  const [activeFilter, setActiveFilter] = useState<'alphabet' | 'birthday'>('alphabet');
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="page">
      <Header
        setActiveFilter={setActiveFilter}
        setSearchQuery={setSearchQuery}
        activeFilter={activeFilter}
      />
      <ListOfWorkers activeFilter={activeFilter} searchQuery={searchQuery} />
    </div>
  );
};

export default App;
