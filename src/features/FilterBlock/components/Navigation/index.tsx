import React, { useState, useEffect } from 'react';
import './index.scss';

interface NavigationProps {
  setSelectedCategory: (category: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ setSelectedCategory }) => {
  const [activeCategory, setActiveCategory] = useState<string>(() => {
    return localStorage.getItem('activeCategory') ?? 'All';
  });

  useEffect(() => {
    localStorage.setItem('activeCategory', activeCategory);
  }, [activeCategory]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setActiveCategory(category);
  };

  return (
    <div className="navigation">
      <ul className="navigation__list">
        <li
          className={`navigation__item ${activeCategory === 'All' ? 'navigation__item_active' : ''}`}
          onClick={() => handleCategoryClick('All')}
        >
          All
        </li>
        <li
          className={`navigation__item ${activeCategory === 'Designer' ? 'navigation__item_active' : ''}`}
          onClick={() => handleCategoryClick('Designer')}
        >
          Designers
        </li>
        <li
          className={`navigation__item ${activeCategory === 'Analyst' ? 'navigation__item_active' : ''}`}
          onClick={() => handleCategoryClick('Analyst')}
        >
          Analysts
        </li>
        <li
          className={`navigation__item ${activeCategory === 'Manager' ? 'navigation__item_active' : ''}`}
          onClick={() => handleCategoryClick('Manager')}
        >
          Managers
        </li>
        <li
          className={`navigation__item ${activeCategory === 'iOS' ? 'navigation__item_active' : ''}`}
          onClick={() => handleCategoryClick('iOS')}
        >
          iOS
        </li>
        <li
          className={`navigation__item ${activeCategory === 'Android' ? 'navigation__item_active' : ''}`}
          onClick={() => handleCategoryClick('Android')}
        >
          Android
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
