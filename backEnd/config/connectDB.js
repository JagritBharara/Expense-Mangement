import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Server Runnig on ${mongoose.connection.host}`);
    }catch(err){
        console.log(err);
    }
}


export {connectDB};