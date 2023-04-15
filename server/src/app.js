const express = require('express')
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')
const api = require('./routes/api')

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
}))

app.use(morgan('combined'))

app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('/v1', api)

app.get('/*', (req, res) => {
    res.send(path.join(__dirname, '..', 'public', 'index.html'))
} ) // the * after the endpoint will let the react router handle the clientside routing if it is after all the other set routes

module.exports = app