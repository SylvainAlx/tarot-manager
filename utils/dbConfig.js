import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  } catch (e) {
    console.log(e);
  }
};

export default connectMongo;
