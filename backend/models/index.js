// import mongoose
const mongoose = require('mongoose')


// set up mongoose connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/eventTracker30',
{useNewUrlParser: true}
)
let db = mongoose.connection

// set up console log to confirm it's running
db.once('open', () => {
    console.log(`connected to MongoDB at ${db.host}:${db.port}`)
    console.log(`connected to database ${db.name}`)
})
db.on('error', err => {
    console.log(`FFFFFFFFFFFFFFFFFF database error:`)
    console.error(err)
})


// export all our models

module.exports.User = require('./user')
module.exports.Favorite = require('./favorite')
module.exports.Event = require('./event')
