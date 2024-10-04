import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import FilterMenu from './components/SearchForm/components/FilterMenu';
import Navigation from './components/Navigation';
import './index.scss';

interface FilterBlockProps {
  updateSearchParams: (params: { [key: string]: string }) => void;
  activeFilter: 'alphabet' | 'birthday';
  searchQuery: string;
}

const FilterBlock: React.FC<FilterBlockProps> = ({ updateSearchParams, activeFilter, searchQuery }) => {
  const [isFilterMenuVisible, setIsFilterMenuVisible] = useState<boolean>(false);

  const handleToggleFilterMenu = () => {
    setIsFilterMenuVisible(prevState => !prevState);
  };

  const handleFilterChange = (filter: 'alphabet' | 'birthday') => {
    updateSearchParams({ sortBy: filter });
  };

  const handleSearch = (query: string) => {
    updateSearchParams({ searchText: query });
  };

  const handleCategoryChange = (category: string) => {
    updateSearchParams({ position: category });
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
      <Navigation setSelectedCategory={handleCategoryChange}  />
    </div>
  );
};

export default FilterBlock;
