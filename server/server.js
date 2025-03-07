import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(cookieParser());

// Allow CORS from any origin with credentials
app.use(cors({
    origin: (origin, callback) => {
        callback(null, true); // Allow any origin
    },
    credentials: true // Allow credentials
}));

//Allow for only specified IP
//const allowedOrigins = ['http://localhost:5173']

app.get('/', (req, res) => res.send("API WORKING CORRECTLY"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(port, () => console.log(`Server started on PORT:${port}`));