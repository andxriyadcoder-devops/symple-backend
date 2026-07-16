import { Document } from 'mongoose';
import { IUser } from '@/shared/interfaces';

export interface IUserDocument extends IUser, Document {}