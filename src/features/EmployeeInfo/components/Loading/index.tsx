import React from 'react';
import './index.scss';

export type Loading = {
  loading: boolean;
};

const Loading: React.FC<Loading> = () => {
  return (
    <div className="loading">
      <p className="loading__text">Loading...</p>
    </div>
  );
};

export default Loading;