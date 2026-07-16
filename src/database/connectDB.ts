import mongoose from 'mongoose';
import { env } from '@/config/env';

const connectDB = async () => {
  await mongoose.connect(env.MONGODB_URI);

  console.log('✅ MongoDB Connected');
};

export default connectDB;