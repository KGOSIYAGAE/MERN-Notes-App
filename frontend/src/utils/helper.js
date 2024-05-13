export const validateEmail = (email) => {
  const regx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regx.test(email);
};
