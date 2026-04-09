import mongoose from "mongoose";

export const connectDB = async () => {
     mongoose.connect(process.env.MONGO_URI, {
        dbName:"MERN_STACK_LIBRARY_MANAGEMENT_SYSTEM",

        }).then(()=>{
            console.log('Database Connected Successfully.');

        }).catch(err=>{
            console.log('Error Connection To Dtabase', err);
        });
    };