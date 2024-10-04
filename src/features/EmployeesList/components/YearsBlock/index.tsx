import React from 'react';
import './index.scss';

interface YearsBlockProps {
  year: number;
}

const YearsBlock: React.FC<YearsBlockProps> = ({ year }) => {
  return (
    <div className="years-block">
      <div className="years-block__line years-block__line_left"></div>
      <h3 className="years-block__title">{year}</h3>
      <div className="years-block__line years-block__line_right"></div>
    </div>
  );
};

export default YearsBlock;
