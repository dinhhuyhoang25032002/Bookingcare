import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouters from './route/web';
import connectDB from "./config/connectDB";

require('dotenv').config();

let app = express();


app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);


    next();
});

// app.use(bodyParser.json({limit:'50mb'}));
// app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({ limit:'50mb', extended: true }))

viewEngine(app);
initWebRouters(app);
connectDB();

let port = process.env.PORT || 6969;
app.listen(port, () => {
    console.log("Backend Node.js is running on the port: " + port);
})