import express from "express";
import dotenv from 'dotenv';
import colors from 'colors';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { errorHandler } from "./middleware/errorMiddleware.js";
import { connectDB } from "./config/db.js";
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 8000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS configuration
// app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
// app.options('*', cors()); 
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

app.get('/', (req, res) => {
    res.send('Welcome to the Task Management API');
});

app.get('/test-cors', (req, res) => {
    res.json({ message: "CORS is working!" });
});

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on ${PORT} port`.yellow.bold));
