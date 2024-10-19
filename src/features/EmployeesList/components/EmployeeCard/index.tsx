import React from 'react';
import './index.scss';

type EmployeeCardProps = {
  employee: {
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

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, showBirthDate, onClick }) => {
  const formattedBirthDate = new Date(employee.birthDate)
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
    })
    .replace(',', '');

  return (
    <li className="employee" key={employee.id} onClick={onClick}>
      <div className="employee__image">
        <img className="employee__avatar" src={employee.avatar} alt={employee.name} />
      </div>

      <div className="employee__name">
        {employee.name}
        {employee.tag && <span className="employee__tag">{employee.tag}</span>}
        <div className="employee__position">
          {employee.position[0].toUpperCase() + employee.position.slice(1)}
        </div>
      </div>

      {showBirthDate && <div className="employee__birth">{formattedBirthDate}</div>}
    </li>
  );
};

export default EmployeeCard;
