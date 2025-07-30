


import mongoose from 'mongoose';




const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error(' MongoDB connection error:', err.message);
    process.exit(1);
  }
};




export default connectDB;