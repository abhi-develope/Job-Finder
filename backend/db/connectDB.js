import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI)
        console.log("connected to mongodb");
        
        
    } catch (error) {
        console.log("unable to connect database", error);
        
        
    }
} 