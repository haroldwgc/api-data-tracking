//declaracion
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const urimongoose = "mongodb://localhost/store";
//const urimongoose =  "mongodb+srv://Tracking:Mudvayne*.666@cluster0.jnamc.mongodb.net/store?retryWrites=true&w=majority";
const routes = require("./routes");

const app = express();

//configuracion mongoose
mongoose.Promise = global.Promise;
mongoose.connect(urimongoose, {
  useNewUrlParser: true,
});

//habilitar body parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Habilitar cors
app.use(cors());

app.use("/", routes());

app.listen(5000, function () {
  console.log("Servidor web en ejecucion");
});
