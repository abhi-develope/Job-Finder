import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './db/connectDB.js';

dotenv.config();
const app = express();

// middleware---
app.use(express.json());
app.use(cookieParser());
const corsOption = {
    origin: 'http//localhost:5173',
    Credentials: true
}
app.use(cors(corsOption));

const port = process.env.PORT || 3000;

// app.get('/', (req, res)=>{
//     res.send("hello world")
// })


app.listen(port, ()=>{
    connectDB();
    console.log(`listing on port ${port}`);
    
})


