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
import userRoutes from './routes/userRoutes.js';

const app = express();
dotenv.config();
// app.use(cors());
app.use(cors({
    origin: [process.env.FRONTEND_URL1,process.env.FRONTEND_URL2],
    methods: ['GET', 'POST', 'DELETE', 'PUT','PATCH'],
    credentials: true
}));

app.use('/src',express.static('src'))
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/',homeRoutes);
app.use('/auth',authRoutes);
app.use('/admin',adminRoutes);
app.use('/user',userRoutes);
app.use('/cart',cartRoutes);
app.use('/order',orderRoutes);

// for connection to DB
dbConnection()

// listen server from port
app.listen(process.env.PORT,()=>{
    console.log(`Listening from port ${process.env.PORT}`);
})