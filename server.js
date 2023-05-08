const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/routes');
var bodyParser = require('body-parser')
require('dotenv').config();
const { connectdb } = require("./config/db");

app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(cors());
app.use('/', routes);

connectdb();

app.listen(process.env.PORT, () => console.log(`connected to port ${process.env.PORT}`));