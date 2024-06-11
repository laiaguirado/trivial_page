import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import db from './db.js'
import dotenv from 'dotenv';
import trivialControllers from "./trivial/trivial.controllers.js";
//const express = require("express");
//const cors = require("cors");
//const morgan = require("morgan");
//const config = require("./config");
//const db = require("./db");

dotenv.config();
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//app.use("/", express.static(config.FRONTEND_DIR));

//require('./trivial/trivial.controllers').addRoutesTo(app);
trivialControllers.addRoutesTo(app);

const start = async () => {
    await db.connect();
    app.listen(process.env.SERVER_PORT, () => {
        const mode = process.env.NODE_ENV.toUpperCase();
        console.log(`Trivial API Server (mode ${mode}) listening on port :${process.env.SERVER_PORT}`);
    });
};

start();