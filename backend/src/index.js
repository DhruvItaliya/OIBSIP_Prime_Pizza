import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './db/db_conn.js'
import cors from 'cors';
import homeRoutes from './routes/homeRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

//routes
app.use('/',homeRoutes);
app.use('/auth',authRoutes);
app.use('/admin',adminRoutes);

// for connection to DB
dbConnection()

// listen server from port
app.listen(process.env.PORT,()=>{
    console.log(`Listening from port ${process.env.PORT}`);
})