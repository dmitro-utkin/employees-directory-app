import React from 'react';
import './index.scss';

interface CallOnNumberProps {
  phoneNumber: string | undefined;
  cancel: React.Dispatch<React.SetStateAction<boolean>>;
}

const CallButtons: React.FC<CallOnNumberProps> = ({ phoneNumber, cancel }) => {
  return (
    <div className="call-buttons">
      <button className="call-buttons__phone-number call-buttons__btn">{phoneNumber}</button>
      <button className="call-buttons__cancel-btn call-buttons__btn" onClick={() => cancel(false)}>
        Cancel
      </button>
    </div>
  );
};

export default CallButtons;
