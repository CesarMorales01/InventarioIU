const express = require("express");
const {  mongoConn } = require('./databases/configuration');
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();
const userRoute = require("./routes/user");
const tiposEquipo = require('./routes/tipoEquipo');
const marcaRoute = require("./routes/marca");
const estadoRoute = require("./routes/estado");
const inventarios = require('./routes/inventario');
const fileUpload = require('express-fileupload');
// settings
const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(express.json());

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));


// routes
app.use('/api/usuarios', userRoute);
app.use('/api/tiposequipo', tiposEquipo);
app.use('/api/marca', marcaRoute);
app.use('/api/estado', estadoRoute);
app.use('/api/inventarios', inventarios);
// static files
// carga el index html pero no logro que lea react/jsx...
app.use(express.static(path.join(__dirname, 'public')));

  // mongodb connection
const conn = mongoConn();

// server listening
app.listen(port, () => console.log("Server listening to!!!", port));