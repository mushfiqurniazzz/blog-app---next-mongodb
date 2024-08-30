import mongoose from "mongoose";
import React from "react";

const DBConn = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DataBase");
  } catch (error) {
    console.error(error);
  }
};

export default DBConn;
