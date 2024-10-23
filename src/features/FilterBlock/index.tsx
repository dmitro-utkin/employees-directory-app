import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import FilterMenu from './components/SearchForm/components/FilterMenu';
import Navigation from './components/Navigation';
import './index.scss';

const FilterBlock: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterMenuVisible, setIsFilterMenuVisible] = useState<boolean>(false);

  const sortBy = searchParams.get('sortBy');
  const activeFilter = (sortBy === 'alphabet' || sortBy === 'birthday') ? sortBy : 'alphabet';
  const searchQuery = searchParams.get('searchText') ?? '';

  const updateParams = (key: string, value: string) => {
    setSearchParams({ ...Object.fromEntries(searchParams), [key]: value });
  };

  const handleToggleFilterMenu = () => {
    setIsFilterMenuVisible(prevState => !prevState);
  };

  const handleSearch = (query: string) => {
    updateParams('searchText', query);
  };

  const handleFilterChange = (filter: 'alphabet' | 'birthday') => {
    updateParams('sortBy', filter);
  };

  const handleCategoryChange = (category: string) => {
    updateParams('position', category);
  };

  return (
    <div className="filter-block">
      <h1 className="filter-block__title">Search</h1>
      <SearchForm
        onToggleFilterMenu={handleToggleFilterMenu}
        isFilterMenuVisible={isFilterMenuVisible}
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />
      {isFilterMenuVisible && (
        <FilterMenu
          onClose={handleToggleFilterMenu}
          isFilterMenuVisible={isFilterMenuVisible}
          onFilterChange={handleFilterChange}
          activeFilter={activeFilter}
        />
      )}
      <Navigation setSelectedCategory={handleCategoryChange} />
    </div>
  );
};

export default FilterBlock;
