import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect
        (`${process.env.MONGODB_URI}`)
        console.log(`Connection Succeeded \nHost : ${connectionInstance.connection.host}`);
    }catch(error){
        console.log("MongoDB Connection failed ",error);
        process.exit(1)
    }
}

export default connectDB;