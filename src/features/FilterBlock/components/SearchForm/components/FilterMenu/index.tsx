import React from 'react';
import './index.scss';

interface FilterMenuProps {
  onClose: () => void;
  isFilterMenuVisible: boolean;
  onFilterChange: (filter: 'alphabet' | 'birthday') => void;
  activeFilter: 'alphabet' | 'birthday';
}

const FilterMenu: React.FC<FilterMenuProps> = ({
  onClose,
  isFilterMenuVisible,
  onFilterChange,
  activeFilter,
}) => {
  const handleButtonClick = (filterType: 'alphabet' | 'birthday') => {
    onFilterChange(filterType);
  };

  return (
    <div className="filter-container">
      <div className="overlay" onClick={onClose}></div>
      <div className={`filter ${isFilterMenuVisible ? 'filter_active' : ''}`}>
        <div className="filter__header">
          <button className="filter__close-btn" onClick={onClose}>
          <span className="filter__close-icon">+</span>
          </button>
          <h3 className="filter__title">Filter</h3>
        </div>
        <div className="filter__content">
          <div className="filter__block" onClick={() => handleButtonClick('alphabet')}>
            <button
              className={`filter__btn ${activeFilter === 'alphabet' ? 'filter__btn_active' : ''}`}
              title="By Alphabet"
            />
            <span className="filter__text">By Alphabet</span>
          </div>
          <div className="filter__block" onClick={() => handleButtonClick('birthday')}>
            <button
              className={`filter__btn ${activeFilter === 'birthday' ? 'filter__btn_active' : ''}`}
              title="By Birthday"
            />
            <span className="filter__text">By Birthday</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;
