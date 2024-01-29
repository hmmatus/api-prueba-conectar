const {connectToDatabase} = require("./src/db/connection");
const express = require('express');
const cors = require('cors');
const routes = require("./src/routes/index");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(routes);



// * db connection
connectToDatabase();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Api Restful Ok and executing on port', port);
})