import React, { useState, useEffect } from 'react';
import searchIcon from '../../../images/search_icon.png';
import burgerIcon from '../../../images/burger_icon.svg';
import './searchForm.scss';

interface SearchFormProps {
  onToggleFilterMenu: () => void;
  isFilterMenuVisible: boolean;
  onSearch: (query: string) => void;
  searchQuery: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ onToggleFilterMenu, isFilterMenuVisible, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    return localStorage.getItem('searchQuery') || '';
  });

  useEffect(() => {
    localStorage.setItem('searchQuery', searchQuery);
  }, [searchQuery]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleCancel = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className="search-form">
      <form className="search-form__form">
        <img className="search-form__search-icon" src={searchIcon} alt="search-icon" />
        <input
          className="search-form__input"
          type="text"
          placeholder="Enter name, tag, email..."
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button
          className={`search-form__button ${isFilterMenuVisible ? 'active' : ''}`}
          type="button"
          onClick={onToggleFilterMenu}
        >
          <img
            className={`burger ${isFilterMenuVisible ? 'burger_active' : ''}`}
            src={burgerIcon}
            alt="burger-menu"
          />
        </button>
      </form>
      {searchQuery && (
        <button className="search-form__cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </div>
  );
};

export default SearchForm;
