import React, { useState } from 'react';
import Header from './components/header/Header';
import ListOfWorkers from './components/listOfWorkers/ListOfWorkers';
import './index.scss';

const App = () => {
  const [activeFilter, setActiveFilter] = useState<'alphabet' | 'birthday'>('alphabet');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  return (
    <div className="page">
      <Header
        setActiveFilter={setActiveFilter}
        setSearchQuery={setSearchQuery}
        activeFilter={activeFilter}
        setSelectedCategory={setSelectedCategory}
      />
      <ListOfWorkers
        activeFilter={activeFilter}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default App;
