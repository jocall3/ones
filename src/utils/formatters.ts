/**
 * Formats a number as a currency string.
 * @param amount The number to format.
 * @param currency The ISO currency code (e.g., 'USD', 'EUR'). Defaults to 'USD'.
 * @param locale The locale to use for formatting. Defaults to 'en-US'.
 * @returns A formatted currency string (e.g., '$1,234.56').
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Formats a date object or string into a localized date string.
 * @param date The date to format.
 * @param options Intl.DateTimeFormatOptions to customize the output.
 * @param locale The locale to use for formatting. Defaults to 'en-US'.
 * @returns A formatted date string (e.g., 'January 1, 2023').
 */
export const formatDate = (
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
  locale: string = 'en-US'
): string => {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
};

/**
 * Formats a date object or string into a localized date and time string.
 * @param date The date to format.
 * @param options Intl.DateTimeFormatOptions to customize the output.
 * @param locale The locale to use for formatting. Defaults to 'en-US'.
 * @returns A formatted date and time string (e.g., 'January 1, 2023, 12:00:00 PM').
 */
export const formatDateTime = (
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  },
  locale: string = 'en-US'
): string => {
    const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
    return new Intl.DateTimeFormat(locale, options).format(dateObj);
};

/**
 * Formats a number with commas as thousands separators.
 * @param value The number to format.
 * @param locale The locale to use for formatting. Defaults to 'en-US'.
 * @returns A formatted number string (e.g., '1,234,567.89').
 */
export const formatNumber = (
  value: number,
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale).format(value);
};

/**
 * Formats a number as a percentage string.
 * @param value The number to format (e.g., 0.75 for 75%).
 * @param minimumFractionDigits The minimum number of fraction digits to use.
 * @param locale The locale to use for formatting. Defaults to 'en-US'.
 * @returns A formatted percentage string (e.g., '75%').
 */
export const formatPercentage = (
    value: number,
    minimumFractionDigits: number = 0,
    locale: string = 'en-US'
): string => {
    return new Intl.NumberFormat(locale, {
        style: 'percent',
        minimumFractionDigits,
    }).format(value);
};


/**
 * Masks an account number, showing only the last few digits.
 * @param accountNumber The full account number string.
 * @param visibleDigits The number of digits to leave visible at the end. Defaults to 4.
 * @returns A masked account number string (e.g., '**** 1234').
 */
export const maskAccountNumber = (
  accountNumber: string,
  visibleDigits: number = 4
): string => {
  if (!accountNumber || accountNumber.length <= visibleDigits) {
    return accountNumber;
  }
  const lastDigits = accountNumber.slice(-visibleDigits);
  return `**** ${lastDigits}`;
};

/**
 * Capitalizes the first letter of a string.
 * @param str The string to capitalize.
 * @returns The capitalized string.
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Truncates a string to a specified length and adds an ellipsis.
 * @param str The string to truncate.
 * @param maxLength The maximum length of the string before truncation.
 * @returns The truncated string with an ellipsis.
 */
export const truncate = (str: string, maxLength: number): string => {
    if (!str || str.length <= maxLength) {
        return str;
    }
    return `${str.substring(0, maxLength)}...`;
};

/**
 * Converts a string from camelCase to Title Case.
 * e.g., "camelCaseString" -> "Camel Case String"
 * @param str The camelCase string.
 * @returns The Title Case string.
 */
export const camelCaseToTitle = (str: string): string => {
    if (!str) return '';
    const result = str.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
};