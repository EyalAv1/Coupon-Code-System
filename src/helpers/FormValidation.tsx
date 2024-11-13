export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  const minLength = /(?=.{8,})/;
  const hasUppercase = /(?=.*[A-Z])/;
  const hasLowercase = /(?=.*[a-z])/;
  const hasNumber = /(?=.*\d)/;

  return (
    minLength.test(password) &&
    hasUppercase.test(password) &&
    hasLowercase.test(password) &&
    hasNumber.test(password)
  );
};
