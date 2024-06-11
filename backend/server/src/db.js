import mongoose from 'mongoose';
import config from "./config.js"
//const mongoose = require('mongoose');
//const config = require('./config');

const connect = async () => {
  try {
    let localUrl = config.MONGO_URL;
    //await mongoose.connect(localUrl);
    let dataBaseUrl = config.MONGO_ATLAS_URL;
    await mongoose.connect(dataBaseUrl);
    console.log("Mongoose connected");
  } catch (e) {
    console.error(`Could not connect to MongoDB: ${e}`);
  }
}

const disconnect = async () => {
  return mongoose.connection.close();
}

/*module.exports = {
  connect,
  disconnect,
}*/
export default { connect, disconnect }