import mongoose from "mongoose";
import dotenv from 'dotenv'
// what is the need of this dotenv.config() line  
dotenv.config();
export const ConnectDb=async()=>{
    try {
        const connectionString = process.env.MONGODB_URL;
        await mongoose.connect(connectionString);
        console.log(`Mongodb Connected Sucessfully ${connectionString}`);
    } catch (error) {
       console.log(error.message);
    }
}