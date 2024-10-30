import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './index.scss';

type SearchFormProps = {
  onToggleFilterMenu: () => void;
  isFilterMenuVisible: boolean;
};

const SearchForm: React.FC<SearchFormProps> = ({
  onToggleFilterMenu,
  isFilterMenuVisible,
}) => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('searchText');
    if (query) {
      setSearchText(query);
    }
  }, [searchParams]);

  const handleInputChange = (value: string) => {
    setSearchParams(prevParams => {
      const params = new URLSearchParams(prevParams);
      value ? params.set('searchText', value) : params.delete('searchText');
      return params;
    });
    setSearchText(value);
  };

  const handleCancel = () => {
    setSearchText('');
    setSearchParams(prevParams => {
      const params = new URLSearchParams(prevParams);
      params.delete('searchText');
      return params;
    });
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
          onChange={e => handleInputChange(e.target.value)}
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
      {searchText && (
        <button className="search-form__cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </div>
  );
};

export default SearchForm;