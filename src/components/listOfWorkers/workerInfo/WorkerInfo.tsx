import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../common/state/store';
import leftArrowIcon from '../../../images/left_arrow_icon.png';
import starIcon from '../../../images/star_icon.png';
import phoneIcon from '../../../images/phone_icon.png';
import './workerInfo.scss';
import CallButtons from '../callButton/CallButtons';

interface WorkerInfoProps {
  workerId: number;
  onBackClick: () => void;
}

const age = (birthDate: string) => {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  return age;
};

const WorkerInfo: React.FC<WorkerInfoProps> = ({ workerId, onBackClick }) => {
  const [showCallButtons, setShowCallButtons] = useState(false);
  const worker = useSelector((state: RootState) =>
    state.workers.workers.find(worker => worker.id === workerId),
  );

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
        <div className="worker-info__call-btn" onClick={() => setShowCallButtons(true)}>
          <div className="worker-info__phone">
            <img src={phoneIcon} alt="phone" />
          </div>
          {worker.phone}
        </div>
      </section>
      {showCallButtons && <CallButtons phoneNumber={worker.phone} cancel={setShowCallButtons} />}
    </>
  );
};

export default WorkerInfo;
