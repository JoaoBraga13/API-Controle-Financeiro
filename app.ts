//import express from 'express'
//import routes from './routes'
import { errorHandler } from "./src/middlewares/errorHandler";

const express = require("express");
const routes = require("./routes.ts");

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandler);

module.exports = app;
