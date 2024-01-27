const {connectToDatabase} = require("./src/db/connection");
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// * db connection
connectToDatabase();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Api Restful Ok and executing on port', port);
})