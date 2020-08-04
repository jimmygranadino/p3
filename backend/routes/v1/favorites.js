const express = require('express')
const router = express.Router()
var cors = require('cors')
var app = express()

const db = require('../../models')

app.use(cors())

////////////// ROUTES

//Get Favorites
//Lists all of collection 'user' from database, as an array of JSON objects

// //tells browser to execute this function on GET /routes/v1/favorites.js
// router.get('/', (req, res) => {
//     //query database, db.Favorite is exported from models/index.js 
//     db.Favorite.find()
//         // after backend waits for api(db) response, do the next thing (anonymous promise function) (favorites is the query returned from db)
//         .then(favorites => {
//             //accept response as favorites, send to frontend
//             res.send(favorites)
//         })
//         .catch(err => console.log(err))
// })

// //simple test route for debugging, no response expected from db
// router.get('/test', function (req, res) {
//     console.log(`successfully connected to backend!!!!!!!! favorites.js`)
// })


// // GET inevidial event, currently searches by parameter :id, having multiple calls of single type(get, post, ...) to a single location ('/') is problematic; (now /view/:id)
// router.get('/view/:id', (req, res) => {
//     //
//     db.Favorite.findById(req.params.id)
//         .then((favorite) => {
//             res.send(favorite)
//         })
//         .catch(err => console.log('err in GET request favorite.js'))
// })


// CREATE favorite within database
//currently this checks for duplicates with title, we should change this to a unique identifier (eventId)
// router.post('/testpost', (req, res) => {
//     console.log(req.body)} //remove this line to fix.
//     db.Favorite.findOne({}).findOne({
//         email: req.body.email
//     })
//         .then(user => {
//             console.log(user)
//             //if favorite searched for is found, return error
//             if (user.favorite.includes(req.body.title)) {
//                 console.log(`in the if fav section`)
//                 return res.send('error, favorite already exists in collection')
//                 //else insert() in db
//             } else {
//                 //I'd like to figure out how to clean this up to be more readable.
//                 let reqBody = { title: req.body.title }
//                 const newEvent = new Event(
//                     reqBody
//                 )
//                 // const newFavorite = new Favorite({
//                 //     title: req.body.title,
//                 //     location: req.body.location,
//                 //     date: req.body.date,
//                 //     description: req.body.description,
//                 //     // userId: req.body.userId
//                 // })
//                 //saves to database
//                 user.favorite.push(newEvent)
//                     //retuns data to browser
//                 return res.send(user)
//             }
//         })
//         .catch(err => console.log(err))
// })

// // FIND AND UPDATE
// //selects a document and updates it, this is probably the most difficult CRUD operation so far
// router.put('/updateFavoriteByTitle/:title', (req, res) => {
//     //currently searches by req.params, this can be simpler with req.body
//     db.Favorite.findOneAndUpdate(
//         // find the document
//         { title: req.params.title },
//         //define new document content (currently overwrites all values)
//         { $set: req.body }
//     )
//         //promise function to be run after db sends response
//         .then(updatedFavorite => {
//             res.send(updatedFavorite)
//         })
//         .catch(err => console.error(err))
// })

// //DELETE A DOCUMENT
// //like find(_id), but destroys the located document :)
// router.delete('/deleteFavoriteByTitle/:title', (req, res) => {
//     db.Event.findOneAndDelete(
//         //document to be deleted
//         { title: req.params.title }
//     )
//         .then(deleteFavorite => {
//             res.send({ Message: `Event Deleted: ${req.params.title}` })
//         })
//         .catch(err => { console.error(err) })
// })

// module.exports = router

/*------------ REWRITE -----------*/
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });

// GET - return a page with all favorites
router.get('/', function (req, res, next) {
    db.Favorite.find()
        .then(favorites => {
            console.log(favorites)
            res.send(favorites)
        })
})

router.get('/idOnly', (req, res, next) => {
    let filter = "title"
    db.Favorite.find({},{filter})
    .then(favorites => {
        console.log(favorites)
        res.send(favorites)
    })
})

// { $push: { userEmail: req.body.email } }

router.post('/testpost', function (req,res, next) {
        db.Favorite.findOneAndUpdate({
            email: req.body.email
        }, 
        { $push: { email: req.body.email } })
        .then(favorite => {
            if (favorite) {
                return res.send('error, event already favorited')
            } else {
                let reqBody = req.body
                const newFave = new Favorite(
                    reqBody
                )
                newFave.save()
                .then(fave => res.json(fave))
            }
        })
        .catch (err => console.log(err))
})

router.delete('/deleteFavorite/:id', (req,res,next) => {
    // console.log(JSON.stringify(req.body))
    db.Favorite.findOneAndDelete(
        { _id: req.params.id }
        )
        .then(deleteFavorite => {
        console.log(deleteFavorite)
        res.send({Message: 'Favorite Deleted'})
    })
    .catch(err => { console.error(err) })
})

// POST - receive the name of a pokemon and add it to the database
router.post('/add', function (req, res) {
    db.Favorite.create({
        eventId: req.body.eventId
    })
        .then(favorite => {
            console.log(favorite)
            db.User.findOneAndUpdate({
                email: req.body.email
            },
                { $push: { userEmail: favorite } }
            ).then(function (event) {
                console.log(event)
                res.send(event)
            })
        })
})


module.exports = router
