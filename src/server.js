const express = require("express");
const {  mongoConn } = require('./databases/configuration');
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();
const userRoute = require("./routes/user");
const tiposEquipo = require('./routes/tipoEquipo');
// settings
const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(express.json());


// routes
app.use("/api", userRoute);
app.use('/api', tiposEquipo);
// static files
// carga el index html pero no logro que lea react/jsx...
app.use(express.static(path.join(__dirname, 'public')));

  // mongodb connection
const conn = mongoConn();

// server listening
app.listen(port, () => console.log("Server listening to!!!", port));