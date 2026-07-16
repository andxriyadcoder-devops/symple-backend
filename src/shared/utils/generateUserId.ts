import { nanoid } from 'nanoid';

export const generateUserId = () => {
  return `USR_${nanoid(8).toUpperCase()}`;
};