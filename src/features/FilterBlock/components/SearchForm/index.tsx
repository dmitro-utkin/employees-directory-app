import React, { useState, useEffect } from 'react';
import { SearchFormProps } from '../../../../common/types';
import './index.scss';

const SearchForm: React.FC<SearchFormProps> = ({
  onToggleFilterMenu,
  isFilterMenuVisible,
  onSearch,
  searchQuery,
}) => {
  const [searchText, setSearchText] = useState<string>(searchQuery);

  useEffect(() => {
    setSearchText(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchText(query);
    onSearch(query);
  };

  const handleCancel = () => {
    setSearchText('');
    onSearch('');
  };

  return (
    <div className="search-form">
      <form className="search-form__form">
        <img className="search-form__search-icon" src="/images/search_icon.png" alt="search-icon" />
        <input
          className="search-form__input"
          type="text"
          placeholder="Enter name, tag, email..."
          value={searchText}
          onChange={handleInputChange}
        />
        <button
          className={`search-form__button ${isFilterMenuVisible ? 'active' : ''}`}
          type="button"
          onClick={onToggleFilterMenu}
        >
          <img
            className={`burger ${isFilterMenuVisible ? 'burger_active' : ''}`}
            src="/images/burger_icon.svg"
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
