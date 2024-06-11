
require('dotenv').config();

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
  "DB_ATLAS_PASSWORD"
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
  const { DB_ATLAS_PASSWORD } = envVars;
  return `mongodb+srv://laiaguirado:${DB_ATLAS_PASSWORD}@cluster0.rtlkk76.mongodb.net/?retryWrites=true&w=majority`;
}

module.exports = {
  ...envVars,
  isDevelopment: process.env.NODE_ENV === "development",
  //MONGO_URL: getMongoURL(),
  MONGO_ATLAS_URL: getMongoAtlasUrl()
}
