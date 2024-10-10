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

  const handleToggleFilterMenu = () => {
    setIsFilterMenuVisible(prevState => !prevState);
  };

  const handleFilterChange = (filter: 'alphabet' | 'birthday') => {
    setSearchParams({ ...Object.fromEntries(searchParams), sortBy: filter });
  };

  const handleSearch = (query: string) => {
    setSearchParams({ ...Object.fromEntries(searchParams), searchText: query });
  };

  const handleCategoryChange = (category: string) => {
    setSearchParams({ ...Object.fromEntries(searchParams), position: category });
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
