import React from 'react';
import './index.scss';

export type YearsBlockProps = {
  year: number;
};

const YearsBlock: React.FC<YearsBlockProps> = ({ year }) => (
  <div className="years-block">
    <div className="years-block__line years-block__line_left" />
    <h3 className="years-block__title">{year}</h3>
    <div className="years-block__line years-block__line_right" />
  </div>
);

export default YearsBlock;
