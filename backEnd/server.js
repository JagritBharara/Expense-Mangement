import express from "express";
import cors from "cors";
import morgan from "morgan";
import { configDotenv } from "dotenv";
import { connectDB } from "./config/connectDB.js";
import userRouter from './routes/userRoute.js';
import transactionRoute from './routes/transactionRoute.js'

configDotenv();
const app = express();
const PORT = 4444 || process.env.PORT;
connectDB();
// Middlewares
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.get('/',(req,res)=>{
    res.send("JAI SHREE GANESH,JAI SHREE RAM");
})

// User Route
app.use('/api/user',userRouter);

// Transaction Route
app.use('/api/transaction',transactionRoute);

// listen
app.listen(PORT,()=>{
    console.log(`Server Running on:${PORT}`)
})

// mongodb+srv://jagritbharara12:9667819733@cluster0.5xzl1u6.mongodb.net/