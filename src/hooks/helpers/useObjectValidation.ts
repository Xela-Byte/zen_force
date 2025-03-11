const validateObject = <T extends Record<string, any>>(
  keys: (keyof T)[] = [], // Default to empty array
  obj: T | null = null, // Allow null objects
): boolean => {
  if (!obj || !Array.isArray(keys)) return false; // Handle edge cases

  return keys.every(key => {
    const value = obj[key];
    return (
      value !== undefined &&
      value !== null &&
      value !== '' &&
      !(Array.isArray(value) && value.length === 0) // Ensures non-empty array
    );
  });
};

export default validateObject;
