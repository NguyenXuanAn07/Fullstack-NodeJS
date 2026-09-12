import express from "express";
import bodyParser, { urlencoded } from "body-parser";
import viewEngine from "./config/viewEngine.js";
import initWebRoutes from "./route/web.js";
import connectDB from "./config/connectDB.js";
require("dotenv").config();

let app = express();

//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);
connectDB()

let port = process.env.PORT;

app.listen(port, () => {
  console.log("Backend Nodejs is running on the port: " + port);
});
