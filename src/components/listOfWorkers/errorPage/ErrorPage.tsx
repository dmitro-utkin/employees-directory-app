import React from 'react';
import { Link } from 'react-router-dom';
import errorIcon from '../../../images/error_icon.png';
import './errorPage.scss';

const ErrorPage = () => {
  return (
    <div className="errorPage">
      <img className="errorPage__icon" src={errorIcon} alt="ERROR" />
      <h5 className="errorPage__title">Some unexpected error...</h5>
      <p className="errorPage__description">Our team is fixing it now</p>
      <Link to="/" className="errorPage__link">
        Try again
      </Link>
    </div>
  );
};

export default ErrorPage;