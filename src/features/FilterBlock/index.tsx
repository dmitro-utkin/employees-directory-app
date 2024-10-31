import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import FilterMenu from './components/SearchForm/components/FilterMenu';
import Navigation from './components/Navigation';
import './index.scss';

const FilterBlock: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterMenuVisible, setIsFilterMenuVisible] = useState(false);

  const updateParams = (key: string, value: string) =>
    setSearchParams({ ...Object.fromEntries(searchParams), [key]: value });

  const toggleFilterMenu = () => setIsFilterMenuVisible(prevState => !prevState);

  const handleFilterChange = (filter: 'alphabet' | 'birthday') => updateParams('sortBy', filter);

  const handleCategoryChange = (category: string) => updateParams('position', category);

  const activeFilter = searchParams.get('sortBy') ?? 'alphabet';

  return (
    <div className="filter-block">
      <h1 className="filter-block__title">Search</h1>
      <SearchForm onToggleFilterMenu={toggleFilterMenu} isFilterMenuVisible={isFilterMenuVisible} />
      {isFilterMenuVisible && (
        <FilterMenu
          onClose={toggleFilterMenu}
          isFilterMenuVisible={isFilterMenuVisible}
          onFilterChange={handleFilterChange}
          activeFilter={activeFilter as 'alphabet' | 'birthday'}
        />
      )}
      <Navigation setSelectedCategory={handleCategoryChange} />
    </div>
  );
};

export default FilterBlock;
