"use strict";

const express = require("express");
const app = express();
const game = require("../routes.js/index.js");

app.use(express.static("./public"));
app.use(express.json());
app.use("/", game);

const port = 3000;
app.listen(port, () => 
    console.log(`listening on port: ${port}`)
);