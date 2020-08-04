require('dotenv').config()
const express = require('express')
const app = express()
const db = require('./models')
const cors = require('cors')
const passport = require('passport')
const bodyParser = require('body-parser')
//config DB
const mdb = process.env.MONGO_URI

const users = require('./routes/v1/users')
const mongoose = require('mongoose')

// var corsOptions = {
//     origin: '*',
//     optionsSuccessStatus: 200,
//     methods: [
//         'GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'
//     ],
//     allowedHeaders: "Access-Control-Allow-Origin"
// }

// app.use(cors())

app.use(function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Content-Type", "text/javascript")
    res.header("Accept", "application/json")
    next();
  });
// // middleware
// app.use(cors())

// var expressOptions = {

// }
app.use(cors())
//body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// app.use(bodyParser.urlencoded({extended: true}))

app.use('/v1/users', require('./routes/v1/users'))
app.use('/v1/events', require('./routes/v1/events'))
app.use('/v1/favorites', require('./routes/v1/favorites'))

//setup out routes
app.use('/v1/users', users)

//Call passport
require('./config/passport')(passport)


// const uri = process.env.MONGOD_URI
// console.log(process.env.MONGOD_URI)
// const MongoClient = require('mongodb').MongoClient;
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });


// routes

// connect mongoose THIS WILL CONNECT TO uri IN DEPLOYMENT
mongoose.connect(mdb)
    .then(() => { console.log('MongoDB Connected... (^///^)') })
    .catch(err => console.log(err))

    // test routing
app.get('/', (req, res) => {
    res.send('Hello World \n Server in up and Running! 🐱‍🐉')
})






//listen
app.listen(process.env.PORT || 3001, () => {
    console.log(`listening on ${process.env.PORT || 3001}`)
})