import mongoose from "mongoose";

let isConnected = false; 

const DBConn = async () => {
  if (isConnected) {
    return console.log("Already connected to DataBase.");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("Connected to DataBase");
  } catch (error) {
    console.error(error);
  }
};

export default DBConn;
