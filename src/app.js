const express = require('express')
const path = require('path')
const db = require('./db/connection')
require('dotenv').config();

const routes = require('./routes')

const app = express();
app.use(express.json())
app.use('/api/v1/tasks', routes)

app.use(express.static(path.resolve(__dirname,'../public')))

app.get('/', (req,res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'))
})

const startServer = () => {
    app.listen('5000', () =>{ 
        console.log('App started');
    })
}

const connectionString = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URI}:${process.env.MONGO_PORT}/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0`
db(connectionString)
    .then(startServer)
    .catch((err) => {
    console.error(err)
})
