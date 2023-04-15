const fs = require('fs')
const path = require('path')
const { parse } = require('csv-parse')

const planets = require('./planets.mongo')

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] <1.6
}

/* const new Promise((resolve, reject) =>{
    resolve(42)
})
promise.then((result) => {

})
await result = await promise
console.log(result)
*/

function loadPlantesData(){
    return new Promise((resolve, reject) => {fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
    .pipe(parse({ //Sets the comments to the # and then the columns set to true. // pipe takes the readable stream and pushes it to the writeable array.
        comment: '#',
        columns: true,
    }))
    .on('data', async (data) => {
        if (isHabitablePlanet(data)) {
            // insert + update = upsert
            savePlanet(data)
        }
    })
    .on('error', (err) => {
        console.log(err)
        reject(err)
    })
    .on('end', async () => {
        const countPlanetsFound = (await getAllPlanets()).length
        console.log(`${countPlanetsFound} Potentially habitable planets found!`)
        resolve() //Nothing isin the function cuz we pushed it to the data
    })
})

}

async function getAllPlanets() {
    return await planets.find({}, {
        '_id': 0,
        '__v': 0,
    })
}

async function savePlanet(data) {
    try {
        await planets.updateOne({
        keplerName: data.kepler_name,
    }, {
        keplerName: data.kepler_name
    },{
        upsert: true,
    })
    } catch(err) {
        console.log(`Could not save planet ${err}`)
    }
    
}

module.exports = {
    loadPlantesData,
    getAllPlanets,
}