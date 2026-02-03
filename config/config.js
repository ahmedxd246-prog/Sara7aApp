import mongoose from 'mongoose';

const connectDB = async (DBURL) => {
  try {
    await mongoose.connect(DBURL);
    console.log('connected to mongo ✅✅');
  } catch (err) {
    console.log(`error DB connection ❌ ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
