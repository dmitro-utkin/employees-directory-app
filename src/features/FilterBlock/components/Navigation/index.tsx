import React, { useState, useEffect } from 'react';
import { NavigationProps } from '../../../../common/types';
import './index.scss';

const categories = ['All', 'Designer', 'Analyst', 'Manager', 'iOS', 'Android'];

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
        {categories.map(category => (
          <li
            key={category}
            className={`navigation__item ${
              activeCategory === category ? 'navigation__item_active' : ''
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
