import { Document, Types } from 'mongoose';

export interface IBaseDocument extends Document {
  _id: Types.ObjectId;

  createdAt: Date;

  updatedAt: Date;
}