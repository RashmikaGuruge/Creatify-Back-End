import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import user from './routes/user.js';
import auth from './routes/auth.js';
import gig from './routes/gig.js';
import review from './routes/review.js';
import order from './routes/order.js';
import conversation from './routes/conversation.js'
import message from './routes/message.js'
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();
const dbUrl = 'mongodb://127.0.0.1:27017/fiverr';
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', user);
app.use('/api/auth', auth);
app.use('/api/gigs', gig);
app.use('/api/reviews', review);
app.use('/api/orders', order);
app.use("/api/conversations", conversation);
app.use("/api/messages", message);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
})

app.listen(8800, () => {
    connect();
    console.log("Backend server is running!");
});