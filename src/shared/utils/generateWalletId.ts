import { nanoid } from 'nanoid';

export const generateWalletId = () => {
  return `WAL_${nanoid(8).toUpperCase()}`;
};