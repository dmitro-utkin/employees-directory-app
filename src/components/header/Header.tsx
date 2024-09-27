import React, { useState } from 'react';
import SearchForm from '../header/searchForm/SearchForm';
import FilterMenu from '../header/searchForm/filter-menu/FilterMenu';
import Navigation from '../header/navigation/Navigation';
import './header.scss';

interface HeaderProps {
  updateSearchParams: (params: { [key: string]: string }) => void;
  activeFilter: 'alphabet' | 'birthday';
  searchQuery: string; // Додано властивість searchQuery
  selectedCategory: string;
}

const Header: React.FC<HeaderProps> = ({ updateSearchParams, activeFilter, searchQuery, selectedCategory }) => {
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
    <div className="header">
      <h1 className="header__title">Search</h1>
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
      <Navigation setSelectedCategory={handleCategoryChange} selectedCategory={selectedCategory} />
    </div>
  );
};

export default Header;
