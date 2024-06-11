import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL || 'mongodb+srv://admin:Alemzhan_123@hw1-backend.mq7hxkv.mongodb.net/?retryWrites=true&w=majority&appName=HW1-backend');
        console.log('MongoDB connected...');
    } catch (err:any) {
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;