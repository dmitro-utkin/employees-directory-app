import React, { useState, useEffect } from 'react';
import searchIcon from '../../../../../public/images/search_icon.png';
import burgerIcon from '../../../../../public/images/burger_icon.svg';
import './index.scss';

interface SearchFormProps {
  onToggleFilterMenu: () => void;
  isFilterMenuVisible: boolean;
  onSearch: (query: string) => void;
  searchQuery: string;
}

const SearchForm: React.FC<SearchFormProps> = ({
  onToggleFilterMenu,
  isFilterMenuVisible,
  onSearch,
  searchQuery,
}) => {
  const [inputQuery, setInputQuery] = useState<string>(searchQuery);

  useEffect(() => {
    setInputQuery(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setInputQuery(query);
    onSearch(query);
  };

  const handleCancel = () => {
    setInputQuery('');
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
          value={inputQuery}
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
