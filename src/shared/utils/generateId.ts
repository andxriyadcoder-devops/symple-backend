import { customAlphabet } from 'nanoid';

const nano = customAlphabet(
  '123456789ABCDEFGHJKLMNPQRSTUVWXYZ',
  10,
);

export const generateUserId = () => {
  return `USR_${nano()}`;
};

export const generateWalletId = () => {
  return `WAL_${nano()}`;
};

export const generateTransactionId = () => {
  return `TRX_${nano()}`;
};