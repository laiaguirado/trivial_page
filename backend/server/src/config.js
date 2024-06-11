import dotenv from 'dotenv';
dotenv.config();
//require('dotenv').config();

const envVarNames = [
  "NODE_ENV",
  "FRONTEND_DIR",
  "SERVER_PORT",
  "JWT_SECRET",
  "JWT_EXPIRATION",
  "DB_USER",
  "DB_PASSWORD",
  "DB_HOST",
  "DB_PORT",
  "DB_DATABASE"
];

const envVarAtlasNames = [
  "NODE_ENV",
  "FRONTEND_DIR",
  "SERVER_PORT",
  "DB_ATLAS_PASSWORD",
  "DB_ATLAS_USER",
  "DB_ATLAS_URL"
];


let envVars = {};

envVarAtlasNames.forEach(varName => {
  if (process.env[varName] === undefined) {
    throw new Error(`Missing environment variable '${varName}'`);
  }
  envVars[varName] = process.env[varName];
})

const getMongoURL = () => {
  const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = envVars;
  return `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?authSource=admin`;
}

const getMongoAtlasUrl = () => {
  const { DB_ATLAS_PASSWORD, DB_ATLAS_USER, DB_ATLAS_URL } = envVars;
  return `mongodb+srv://${DB_ATLAS_USER}:${DB_ATLAS_PASSWORD}@${DB_ATLAS_URL}/?retryWrites=true&w=majority`;
}

//module.exports = {
export default {
  ...envVars,
  isDevelopment: process.env.NODE_ENV === "development",
  //MONGO_URL: getMongoURL(),
  MONGO_ATLAS_URL: getMongoAtlasUrl()
}
