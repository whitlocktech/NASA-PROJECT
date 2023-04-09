const http = require('http')
const app = require('./app')

const { loadPlantesData } = require('./models/planets.model')

const PORT = process.env.PORT || 8000

const server = http.createServer(app)

async function startServer(){
    await loadPlantesData()

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
}

startServer()