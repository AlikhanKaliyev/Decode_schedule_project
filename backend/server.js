require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { corsOptionsDelegate } = require("./config/cors");
const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(require("cookie-parser")());
app.use(cors(corsOptionsDelegate));

app.use(require("./routes"));

app.listen(3001, () => {
  console.log(process.env);
  console.log(`Server is listening on port 3001`);
});
