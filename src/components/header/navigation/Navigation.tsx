import React from 'react';
import './navigation.scss';

const Navigation = () => {
  return (
    <div className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">All</li>
        <li className="navigation__item">Designers</li>
        <li className="navigation__item">Analysts</li>
        <li className="navigation__item">Managers</li>
        <li className="navigation__item">iOS</li>
        <li className="navigation__item">Android</li>
      </ul>
    </div>
  );
};

export default Navigation;