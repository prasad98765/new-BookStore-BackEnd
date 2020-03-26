const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const app = express();

const expressValidator = require("express-validator");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger/swagger.json")

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

var cors = require("cors");
app.use(cors());

require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'))
app.use('/upload', express.static('upload'))
mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("successfully contected to database");
  })
  .catch(err => {
    console.log("could not connect to the database . Exiting now...", err);
    process.exit();
  });

require("./src/routes/book.routes")(app);
// require("./src/rsroutes/userInfo.routes")(app);

app.listen(process.env.PORT, () => {
  console.log("Server is listening on port " + process.env.PORT);
});
