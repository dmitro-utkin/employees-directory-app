import React from 'react';
import './worker.scss';

interface WorkerProps {
  worker: {
    id: string;
    avatar: string;
    name: string;
    tag: string;
    position: string;
    birthDate: string;
    phone: string;
    email: string;
  };
  showBirthDate: boolean;
  onClick: () => void;
}

const Worker: React.FC<WorkerProps> = ({ worker, showBirthDate, onClick }) => {
  const formattedBirthDate = new Date(worker.birthDate)
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
    })
    .replace(',', '');

  return (
    <li className="worker" key={worker.id} onClick={onClick}>
      <div className="worker__image">
        <img className="worker__avatar" src={worker.avatar} alt={worker.name} />
      </div>

      <div className="worker__name">
        {worker.name}
        {worker.tag && <span className="worker__tag">{worker.tag}</span>}
        <div className="worker__position">
          {worker.position[0].toUpperCase() + worker.position.slice(1)}
        </div>
      </div>

      {showBirthDate && <div className="worker__birth">{formattedBirthDate}</div>}
    </li>
  );
};

export default Worker;
