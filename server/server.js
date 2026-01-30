import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { getConnection } from './config/db.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
getConnection();


app.use(express.json());

app.use('/api/auth', authRoutes);
app.get("/", (req,res)=>{
    res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});