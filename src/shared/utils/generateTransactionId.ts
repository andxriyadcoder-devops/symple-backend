import { nanoid } from 'nanoid';

export const generateTransactionId = () => {
  return `TXN_${nanoid(10).toUpperCase()}`;
};