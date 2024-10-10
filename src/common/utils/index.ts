export const age = (birthDate: string) => {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  return today.getFullYear() - birthDateObj.getFullYear();
};

