type ErrorMessage = {
  imgUrl: string;
  title: string;
  description: string;
  button?: string;
};

export type ErrorMessageData = {
  general: ErrorMessage;
  employeeSearch: ErrorMessage;
  employeesSearch: ErrorMessage;
};

const errorMessageData: ErrorMessageData = {
  general: {
    imgUrl: '/images/error_icon.png',
    title: 'Some unexpected error...',
    description: 'Our team is fixing it now',
    button: 'Try again',
  },
  employeeSearch: {
    imgUrl: '/images/magnifying_glass.png',
    title: "We didn't find anyone",
    description: 'Try changing your request',
    button: 'Back to list',
  },
  employeesSearch: {
    imgUrl: '/images/magnifying_glass.png',
    title: "We didn't find anyone",
    description: 'Try changing your request',
  },
};

export default errorMessageData;
