import { Document } from 'mongoose';
import { IWallet } from '@/shared/interfaces';

export interface IWalletDocument extends IWallet, Document {}