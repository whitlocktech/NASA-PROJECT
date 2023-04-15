const launchesDatabase = require('./launches.mongo')
const planets = require('./planets.mongo')

const DEFAULT_FLIGHT_NUMBER = 100

const launch = {
    flightNumber: 100,
    mission: 'Kepler Eploration X',
    rocker: 'Explorer IS1',
    lauchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['ZTM', 'NASA', 'ESA'],
    upcoming: true,
    success: true,
}

saveLaunch(launch)
//launches.set(launch.flightNumber, launch)

async function existsLaunchWithId(launchId) {
    return await launchesDatabase.findOne({
        flightNumber: launchId,
    })
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
        .findOne()
        .sort('-flightNumber')

    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER
    }

    return latestLaunch.flightNumber
}

async function getAllLaunches() {
    return await launchesDatabase.find({}, {
        '_id': 0,
        '__v': 0,
    })
}

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    })

    if (!planet) {
        throw new Error('No matching planet found') //always call the new keyword before error
    }


    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    }
    )
}

async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1
    const newLaunch = Object.assign(launch, {
        succes: true,
    upcoming: true,
    customers: [ 'ZTM, NASA, ESA'],
    flightNumber: newFlightNumber,
    })
    
    await saveLaunch(newLaunch)

}
/*
function addNewLaunch(launch) {
    latestFlightNumber++
    launches.set(
        latestFlightNumber, 
        Object.assign(launch, {
            success: true,
            upcoming: true,
            customers: ['ZTM', 'Nasa', 'ESA'],
            flightNumber: latestFlightNumber,
        })
    )
}
*/

async function abortLaunchById(launchId) {
    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchId, 
    }, {
        upcoming: false,
        success: false,
    })

    return aborted.modifiedCount === 1
    
    /*const aborted = launches.get(launchId)
    aborted.upcoming = false
    aborted.success = false
    return aborted */
}

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunchById,
}