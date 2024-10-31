import React from 'react';
import './index.scss';

const AttentionBlock: React.FC = () => {
  return (
    <div className="attention">
      <span className="attention__text">Can`t load data.</span>
      <span className="attention__text">Check your internet connection.</span>
    </div>
  );
};

export default AttentionBlock;
