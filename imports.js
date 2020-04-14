const express = require("express");
const app = express()
const redis = require("redis")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")


module.exports = {
    express,
    app,
    redis,
    mongoose,
    bodyParser,
};
