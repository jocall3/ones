export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  // Basic phone number validation (numbers and optional hyphens/spaces)
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
  return phoneRegex.test(phoneNumber);
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

export const isStrongPassword = (password: string): boolean => {
  // Password must be at least 8 characters long
  // and contain at least one uppercase letter, one lowercase letter, one number, and one special character
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
  return strongPasswordRegex.test(password);
};

export const isValidName = (name: string): boolean => {
  // Name should only contain letters, spaces, hyphens, and apostrophes
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  return nameRegex.test(name);
};

export const isValidZipCode = (zipCode: string): boolean => {
  // US zip code format: 5 digits or 5 digits followed by a hyphen and 4 digits
  const zipCodeRegex = /^\d{5}(?:[-\s]\d{4})?$/;
  return zipCodeRegex.test(zipCode);
};

export const isValidDate = (dateString: string): boolean => {
  // Check if the date string is in a valid format (e.g., YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) {
    return false;
  }

  const date = new Date(dateString);
  const timestamp = date.getTime();

  if (typeof timestamp !== 'number' || isNaN(timestamp)) {
    return false;
  }

  return date.toISOString().slice(0, 10) === dateString;
};

export const isValidCurrency = (currencyCode: string): boolean => {
  // Basic currency code validation (3 uppercase letters)
  const currencyRegex = /^[A-Z]{3}$/;
  return currencyRegex.test(currencyCode);
};

export const isValidAmount = (amount: string | number): boolean => {
  // Check if the amount is a valid number and has at most 2 decimal places
  const amountRegex = /^\d+(\.\d{1,2})?$/;

  if (typeof amount === 'number') {
    return amountRegex.test(amount.toString());
  } else if (typeof amount === 'string') {
    return amountRegex.test(amount);
  }

  return false;
};

export const isNotEmpty = (value: string): boolean => {
  return value.trim() !== '';
};

export const isPositiveNumber = (value: number): boolean => {
  return value > 0;
};

export const isNonNegativeNumber = (value: number): boolean => {
  return value >= 0;
};