import React from 'react';
import './index.scss';

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

const EmployeeCard: React.FC<WorkerProps> = ({ worker, showBirthDate, onClick }) => {
  const formattedBirthDate = new Date(worker.birthDate)
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
    })
    .replace(',', '');

  return (
    <li className="employee" key={worker.id} onClick={onClick}>
      <div className="employee__image">
        <img className="employee__avatar" src={worker.avatar} alt={worker.name} />
      </div>

      <div className="employee__name">
        {worker.name}
        {worker.tag && <span className="employee__tag">{worker.tag}</span>}
        <div className="employee__position">
          {worker.position[0].toUpperCase() + worker.position.slice(1)}
        </div>
      </div>

      {showBirthDate && <div className="employee__birth">{formattedBirthDate}</div>}
    </li>
  );
};

export default EmployeeCard;
