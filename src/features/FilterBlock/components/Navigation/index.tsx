import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './index.scss';

export type NavigationProps = {
  setSelectedCategory: (category: string) => void;
};

const categories = ['All', 'Designer', 'Analyst', 'Manager', 'iOS', 'Android'];

const Navigation: React.FC<NavigationProps> = ({ setSelectedCategory }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const activeCategory = searchParams.get('position') ?? 'All';

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSearchParams({ position: category });
    navigate(`?position=${category}`);
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
