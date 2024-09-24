import React from 'react';
import './navigation.scss';

interface NavigationProps {
  setSelectedCategory: (category: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ setSelectedCategory }) => {
  const handleCategoryClick = (category: string) => {
    console.log('Category Clicked:', category);
    setSelectedCategory(category);
  };

  return (
    <div className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item" onClick={() => handleCategoryClick('All')}>
          All
        </li>
        <li className="navigation__item" onClick={() => handleCategoryClick('Designer')}>
          Designers
        </li>
        <li className="navigation__item" onClick={() => handleCategoryClick('Analyst')}>
          Analysts
        </li>
        <li className="navigation__item" onClick={() => handleCategoryClick('Manager')}>
          Managers
        </li>
        <li className="navigation__item" onClick={() => handleCategoryClick('iOS')}>
          iOS
        </li>
        <li className="navigation__item" onClick={() => handleCategoryClick('Android')}>
          Android
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
