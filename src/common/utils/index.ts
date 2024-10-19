export const getAge = (birthDate: string) => {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  return today.getFullYear() - birthDateObj.getFullYear();
};

