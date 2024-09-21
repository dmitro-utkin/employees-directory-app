import React, { useState } from 'react';
import SearchForm from '../header/searchForm/SearchForm';
import FilterMenu from '../header/searchForm/filter-menu/FilterMenu';
import Navigation from '../header/navigation/Navigation';
import './header.scss';

interface HeaderProps {
  setActiveFilter: (filter: 'alphabet' | 'birthday') => void;
  setSearchQuery: (query: string) => void;
  activeFilter: 'alphabet' | 'birthday';
}

const Header: React.FC<HeaderProps> = ({ setActiveFilter, setSearchQuery, activeFilter }) => {
  const [isFilterMenuVisible, setFilterMenuVisible] = useState<boolean>(false);

  const handleToggleFilterMenu = () => {
    setFilterMenuVisible(prevState => !prevState);
  };

  const handleFilterChange = (filter: 'alphabet' | 'birthday') => {
    setActiveFilter(filter);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="header">
      <h1 className="header__title">Search</h1>

      <SearchForm
        onToggleFilterMenu={handleToggleFilterMenu}
        isFilterMenuVisible={isFilterMenuVisible}
        onSearch={handleSearch}
      />
      {isFilterMenuVisible && (
        <FilterMenu
          onClose={handleToggleFilterMenu}
          isFilterMenuVisible={isFilterMenuVisible}
          onFilterChange={handleFilterChange}
          activeFilter={activeFilter}
        />
      )}
      <Navigation />
    </div>
  );
};

export default Header;
