const express = require ('express');
const app = express ();
const cors = require ('cors');
const dotenv = require("dotenv");

require('./database');


app.use(cors());

app.use (express.json());

app.use('/api', require('./backend/src/routes/index'));

app.listen (3000);
console.log ('server on port', 3000);