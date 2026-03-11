import 'dotenv/config';

import passport from './helpers/passport.js' // Load Passport configuration
import express from 'express'
import routes from './router/index.js'
// kalau nama filenya index.js, maka cukup tulis nama foldernya saja
import './config/connection.js' // Load environment variables

import errorHandler from './middlewares/errorHandler.js' // Import custom error handling middleware
import { connectRabbitMQ } from './helpers/rabbitmq.js';
import mongo from 'mongoose';



const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(passport.initialize())


app.use('/', routes) 
app.use(errorHandler) // Use the custom error handling middleware

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})