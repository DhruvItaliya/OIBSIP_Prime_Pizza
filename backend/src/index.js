import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './db/db_conn.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import homeRoutes from './routes/homeRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';


const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/',homeRoutes);
app.use('/auth',authRoutes);
app.use('/admin',adminRoutes);
app.use('/cart',cartRoutes);
app.use('/order',orderRoutes);

// for connection to DB
dbConnection()

// listen server from port
app.listen(process.env.PORT,()=>{
    console.log(`Listening from port ${process.env.PORT}`);
})