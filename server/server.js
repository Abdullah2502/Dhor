import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { getConnection } from './config/db.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;


app.use(cors({
  origin: [
        "http://localhost:5173",           // Keep this for local development
        "https://dhor.netlify.app"         // Add your live Netlify URL here
    ],// or whatever your frontend URL is
  credentials: true
}));
getConnection();


app.use(express.json());

app.use((req, res, next) => {
  console.log(`--> INCOMING REQUEST: ${req.method} ${req.url}`);
  next();
});

app.use('/api/auth', authRoutes);

app.use("/api/product", productRoutes);
app.get("/", (req,res)=>{
    res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});