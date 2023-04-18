const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config");
const db = require("./db");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/", express.static(config.FRONTEND_DIR));

require('./trivial/trivial.controllers').addRoutesTo(app);

const start = async () => {
    await db.connect();
    app.listen(config.SERVER_PORT, () => {
        const mode = config.NODE_ENV.toUpperCase();
        console.log(`Trivial API Server (mode ${mode}) listening on port :${config.SERVER_PORT}`);
    });
};

start();