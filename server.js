import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import authRouter from './routes/auth.routes.js';
import messageRouter from './routes/message.router.js';
import userRouter from './routes/user.router.js';

import connectDB from './config/config.js';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
await connectDB(process.env.DBURL);
const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads/userPhotos')));

app.use('/api/v1', authRouter);
app.use('/api/v1', messageRouter);
app.use('/api/v1', userRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`server started at port ${process.env.PORT} 🚀`);
});
