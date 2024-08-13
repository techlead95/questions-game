import { v4 as uuidv4 } from 'uuid';

export const uuid = () => uuidv4();

export const capitalize = (str: string | null) => {
  if (!str) return '';

  return str.charAt(0).toUpperCase() + str.slice(1);
};
