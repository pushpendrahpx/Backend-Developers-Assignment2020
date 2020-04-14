const express = require("express");
const app = express()
const redis = require("redis")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")



// For Swagger
const SwaggerJsDoc = require("swagger-jsdoc")
const  SwaggerUI = require("swagger-ui-express");


module.exports = {
    express,
    app,
    redis,
    mongoose,
    bodyParser,
    SwaggerJsDoc,
    SwaggerUI
};
