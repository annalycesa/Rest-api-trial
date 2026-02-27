import dotenv from 'dotenv/config' // Load environment variables 
import express from 'express'
import notesRouter from './controllers/controller.js' //manggil router dari controller.js, 
// kalau nama filenya index.js, maka cukup tulis nama foldernya saja
// import './config/connection.js' // Load environment variables

import mongo from './config/connection.js'  

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', notesRouter) 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})