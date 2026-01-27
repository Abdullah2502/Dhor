import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { getConnection } from './config/db.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
getConnection();


app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});