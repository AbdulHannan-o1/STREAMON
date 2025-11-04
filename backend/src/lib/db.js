import mongoose from "mongoose";

export const ConnectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongodb connected ${conn.connection.host}`)
    }catch(error) {
        console.log(`errror connecting to mongodb ${error}`)
        process.exit(1) // 1 means failure
    }
}
