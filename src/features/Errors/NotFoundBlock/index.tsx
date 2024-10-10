import React from 'react';
import './index.scss';

const NotFoundBlock = () => (
  <div className="notFound-block">
    <img className="notFound-block__img" src="/images/magnifying_glass.png" alt="magnifying glass" />
    <h4 className="notFound-block__title">We didn't find anyone</h4>
    <p className="notFound-block__text">Try changing your request</p>
  </div>
);

export default NotFoundBlock;
