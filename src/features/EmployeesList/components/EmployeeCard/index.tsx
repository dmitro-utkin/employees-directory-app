// import React from 'react';
// import moment from 'moment';
// import { Employee } from '../../../../common/types';

// import './index.scss';

// type EmployeeCardProps = {
//   employee: Employee;
//   showBirthDate: boolean;
//   onClick: () => void;
// };

// const EmployeeCard: React.FC<EmployeeCardProps> = ({
//   employee: { id, birthDate, avatar, name, tag, position },
//   showBirthDate,
//   onClick,
// }) => {
//   return (
//     <>
//       <li className="employee" key={id} onClick={onClick}>
//         <div className="employee__info">
//           <div className="employee__image">
//             <img className="employee__avatar" src={avatar} alt={name} />
//           </div>

//           <div className="employee__name">
//             {name}
//             {tag && <span className="employee__tag">{tag}</span>}
//             <div className="employee__position">
//               {position[0].toUpperCase() + position.slice(1)}
//             </div>
//           </div>
//         </div>
//       </li>
//       {showBirthDate && (
//         <div className="employee__birth">{moment(birthDate).format('DD MMMM')}</div>
//       )}
//     </>
//   );
// };

// export default EmployeeCard;

import React from 'react';
import moment from 'moment';
import { Employee } from '../../../../common/types';
import './index.scss';

type EmployeeCardProps = {
  employee: Employee;
  showBirthDate: boolean;
  onClick: () => void;
  sortType: 'alphabet' | 'birthday';
  index: number;
  employees: Employee[];
};

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee: { birthDate, avatar, name, tag, position },
  showBirthDate,
  onClick,
}) => {
  return (
    <li className="employee" onClick={onClick}>
      <div className="employee__info">
        <div className="employee__image">
          <img className="employee__avatar" src={avatar} alt={name} />
        </div>

        <div className="employee__name">
          {name}
          {tag && <span className="employee__tag">{tag}</span>}
          <div className="employee__position">
            {position[0].toUpperCase() + position.slice(1)}
          </div>
        </div>
      </div>
      {showBirthDate && (
        <div className="employee__birth">{moment(birthDate).format('DD MMMM')}</div>
      )}
    </li>
  );
};

export default EmployeeCard;


