import mongoose from 'mongoose';

const dbConnection = ()=>{
        mongoose.connect(process.env.mongoURI).then(()=>{
            console.log("DB Connection successful");
        }).catch((error)=>{
            console.log("Failed to connect DB");
            console.log(error.message);
        });
}

export default dbConnection;