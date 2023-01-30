const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const port = process.env.PORT || 8000
const connectDB = require('./config/db')

connectDB()
const app = express()

const {  errorHandler } = require('./middleware/errorMiddleware')


app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/api/goals', require('./routes/goalRoutes'))

app.use(errorHandler)



app.listen(port, () => console.log(`server is listening to port ${port}`))


