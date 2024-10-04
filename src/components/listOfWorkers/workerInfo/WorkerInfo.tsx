import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../common/state/store';
import leftArrowIcon from '../../../../public/images/left_arrow_icon.png';
import starIcon from '../../../../public/images/star_icon.png';
import phoneIcon from '../../../../public/images/phone_icon.png';
import CallButtons from '../callButton/CallButtons';
import './workerInfo.scss';

interface WorkerInfoProps {
  workerId: number;
  onBackClick: () => void;
}

const age = (birthDate: string) => {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  return today.getFullYear() - birthDateObj.getFullYear();
};

const WorkerInfo: React.FC<WorkerInfoProps> = React.memo(({ workerId, onBackClick }) => {
  const [showCallButtons, setShowCallButtons] = useState(false);

  const workers = useSelector((state: RootState) => state.workers.workers);
  const loading = useSelector((state: RootState) => state.workers.loading);
  const error = useSelector((state: RootState) => state.workers.error);

  const worker = workers.find(worker => Number(worker.id) === workerId);

  const handleCallButtonClick = useCallback(() => {
    setShowCallButtons(true);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading workers: {error}</div>;
  }

  if (!worker) {
    return <div>Worker not found</div>;
  }

  const formattedBirthDate = new Date(worker.birthDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      <section className={`worker-info ${showCallButtons ? 'blur-page' : ''}`}>
        <div className="worker-info__header">
          <button className="worker-info__close-btn" onClick={onBackClick}>
            <img src={leftArrowIcon} alt="left arrow" />
          </button>
          <img className="worker-info__avatar" src={worker.avatar} alt="avatar" />
          <h2 className="worker-info__name">
            {worker.name}
            <span className="worker-info__tag">{worker.tag}</span>
          </h2>
          <span className="worker-info__position">
            {worker.position[0].toUpperCase() + worker.position.slice(1)}
          </span>
        </div>
        <div className="worker-info__body">
          <div className="worker-info__birth">
            <div className="worker-info__star">
              <img src={starIcon} alt="star" />
            </div>
            {formattedBirthDate}
            <span className="worker-info__age">{age(worker.birthDate)} years</span>
          </div>
        </div>
        <div className="worker-info__call-btn" onClick={handleCallButtonClick}>
          <div className="worker-info__phone">
            <img src={phoneIcon} alt="phone" />
          </div>
          {worker.phone}
        </div>
      </section>
      {showCallButtons && <CallButtons phoneNumber={worker.phone} cancel={setShowCallButtons} />}
    </>
  );
});

export default WorkerInfo;
