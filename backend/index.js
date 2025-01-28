import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => { console.log('Connected to MongoDB') }).catch((err) => { console.log(err) });

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: "*"}))

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

//import routes
import authRoutes from './routes/auth.route.js';
import noteRoutes from './routes/note.route.js';

app.use('/api/auth', authRoutes);
app.use('/api/note', noteRoutes);

//error handling 
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(statusCode).json({
    sucess: false,
    statusCode,
    message,
  });
});