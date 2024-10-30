import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../../common/state/store';
import moment from 'moment';
import CallButtons from '../EmployeeInfo/components/CallButton';
import { getAge } from '../../common/utils';
import {
  StyledLoader,
  StyledError,
  StyledErrorHeader,
  StyledErrorText,
  StyledErrorLink,
  StyledNotFoundBlock,
} from './index.styled';
import './index.scss';


const EmployeeInfo: React.FC = React.memo(() => {
  const [showCallButtons, setShowCallButtons] = useState(false);
  const { employeeId } = useParams<{ employeeId: string }>();
  const navigate = useNavigate();

  const workers = useSelector((state: RootState) => state.workers.workers);
  const loading = useSelector((state: RootState) => state.workers.loading);
  const error = useSelector((state: RootState) => state.workers.error);

  const worker = workers.find(worker => worker.id === String(employeeId));

  const handleCallButtonClick = useCallback(() => {
    setShowCallButtons(true);
  }, []);

  if (loading) {
    return <StyledLoader>Loading...</StyledLoader>;
  }

  if (error) {
    return <div>Error loading employee: {error}</div>;
  }

  if (!worker) {
    return (
      <>
        <StyledError>
          <StyledErrorHeader>Employee not found</StyledErrorHeader>
          <StyledErrorText>
            I can't get the employee's details. Check the ID instructions.
          </StyledErrorText>
        </StyledError>
        <StyledNotFoundBlock />
        <StyledErrorLink to="/">Back to list</StyledErrorLink>
      </>
    );
  }

  return (
    <>
      <section className={`employee-info ${showCallButtons ? 'blur-page' : ''}`}>
        <div className="employee-info__header">
          <button className="employee-info__close-btn" onClick={() => navigate('/')}>
            <img src="/images/left_arrow_icon.png" alt="left arrow" />
          </button>
          <img className="employee-info__avatar" src={worker.avatar} alt="avatar" />
          <h2 className="employee-info__name">
            {worker.name}
            <span className="employee-info__tag">{worker.tag}</span>
          </h2>
          <span className="employee-info__position">
            {worker.position[0].toUpperCase() + worker.position.slice(1)}
          </span>
        </div>
        <div className="employee-info__body">
          <div className="employee-info__birth">
            <div className="employee-info__star">
              <img src="/images/star_icon.png" alt="star" />
            </div>
            {moment(worker.birthDate).format('DD MMMM YYYY')}
            <span className="employee-info__age">{getAge(worker.birthDate)} years</span>
          </div>
        </div>
        <div className="employee-info__call-btn" onClick={handleCallButtonClick}>
          <div className="employee-info__phone">
            <img src="/images/phone_icon.png" alt="phone" />
          </div>
          {worker.phone}
        </div>
      </section>
      {showCallButtons && <CallButtons phoneNumber={worker.phone} cancel={setShowCallButtons} />}
    </>
  );
});

export default EmployeeInfo;
