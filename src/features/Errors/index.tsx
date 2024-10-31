import React from 'react';
import { useNavigate } from 'react-router-dom';
import errorMessageData, { type ErrorMessageData } from './configs';

import './index.scss';

type ErrorsProps = {
  type: keyof ErrorMessageData;
};

const Error: React.FC<ErrorsProps> = ({ type }) => {
  const navigate = useNavigate();
  const { imgUrl, title, description, button } = errorMessageData[type];

  return (
    <div className="error">
      <img className="error__icon" src={imgUrl} alt="ERROR" />
      <h5 className="error__title">{title}</h5>
      <p className="error__description">{description}</p>
      {button && (
        <button className="error__link" onClick={() => navigate('/')}>
          {button}
        </button>
      )}
    </div>
  );
};

export default Error;
