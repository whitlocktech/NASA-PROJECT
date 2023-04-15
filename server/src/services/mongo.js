const mongoose = require('mongoose')

const MONGO_URL = process.env.MONGO_URL //bad don't leave secrets in code

mongoose.connection.once('open', () => {
    console.log('Connection Ready')
})

mongoose.connection.on('error', (err) => {
    console.error(err)
})

async function mongoConnect() {
    mongoose.connect(MONGO_URL, {
        /*useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,  These options are not longer needed are set by default
        useUnifiedTopology: true, //Use all four of these when connecting to the mongo db */ 
    })
}

async function mongoDisconnect() {
    await mongoose.disconnect()
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
}