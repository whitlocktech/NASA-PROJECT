const launches = new Map()


const launch = {
    flightNumber: 100,
    mission: 'Kepler Eploration X',
    rocker: 'Explorer IS1',
    lauchDate: new Date('December 27, 2030'),
    destination: 'Kepler-442 b',
    customers: ['ZTM', 'NASA', 'ESA'],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch)

module.exports = {
    launches,
}