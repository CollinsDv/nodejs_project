const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config(); // managing .env
const routes = require('./routes/routes'); // route management

// database connection
const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection
// test connection
database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

const app = express()

app.use(express.json())
app.use('/api', routes) //basepoint and other routes. All endpoints will start from /api

app.listen(3000, () => {
  console.log('server started at ${3000}')
})
