import { Document } from 'mongoose';
import { ITransaction } from '@/shared/interfaces';

export interface ITransactionDocument extends ITransaction, Document {}