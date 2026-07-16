import app from './app';
import connectDB from './database/connectDB';
import { env } from './config/env';

const startServer = async () => {
  try {
    await connectDB();

    app.listen(env.PORT, () => {
      console.log(`🚀 Server Running: http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error('Server Start Failed');
    console.error(error);
  }
};

startServer();