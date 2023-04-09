const fs = require('fs')
const path = require('path')
const { parse } = require('csv-parse')


const habitablePlanets = []

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
    .on('data', (data) => {
        if (isHabitablePlanet(data)) {
            habitablePlanets.push(data)}
    })
    .on('error', (err) => {
        console.log(err)
        reject(err)
    })
    .on('end', () => {
        console.log(`${habitablePlanets.length} Potentially habitable planets found!`)
        resolve() //Nothing isin the function cuz we pushed it to the data
    })
})

}


module.exports = {
    loadPlantesData,
    planets: habitablePlanets,
}