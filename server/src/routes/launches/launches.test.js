const request = require('supertest')
const app = require('../../app')
const { mongoConnect,
mongoDisconnect,
 } = require('../../services/mongo')
const { loadPlantesData } = require('../../models/planets.model')

describe('Launches API', () => {
    beforeAll(async () => {
        await mongoConnect()
        await loadPlantesData()
    })
    afterAll(async () => {
        await mongoDisconnect()
    })
    describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
        .get('/v1/launches')
        .expect('Content-Type', /json/)
        .expect(200)
    })
    
})

describe('Testing POST /launches', () => {
    const completeLaunchData = {
        mission: 'Uss enterprise',
        rocket: 'NCC 1077-D',
        target: 'Kepler-442 b',
        launchDate: 'Feburary 7, 2055',
    }
    const launchDataWithoutDate = {
        mission: 'Uss enterprise',
        rocket: 'NCC 1077-D',
        target: 'Kepler-442 b',    }
    
    const launchDataWithInvalidDate = {
        mission: 'Uss enterprise',
        rocket: 'NCC 1077-D',
        target: 'Kepler-442 b',
        launchDate: 'Bingo',
    }

    test('SHould be 201 success', async () => {
        const response = await request(app)
        .post('/v1/launches')
        .send(completeLaunchData)
        .expect('Content-Type', /json/)
        .expect(201)

        const requestDate = new Date(completeLaunchData.launchDate).valueOf()
        const responseDate = new Date(response.body.launchDate).valueOf()
        expect(responseDate).toBe(requestDate)

        expect(response.body).toMatchObject(launchDataWithoutDate)
    })
    test('It should catch missing require properties',  async () => {
        const resonse = await request(app)
        .post('/v1/launches')
        .send(launchDataWithoutDate)
        .expect('Content-Type', /json/)
        .expect(400)

        expect(resonse.body).toStrictEqual({
            error: 'Missing required launch property',
        })
    })
    test('It should catech invalid dates', async () => {
        const resonse = await request(app)
        .post('/v1/launches')
        .send(launchDataWithInvalidDate)
        .expect('Content-Type', /json/)
        .expect(400)

        expect(resonse.body).toStrictEqual({
            error: 'Invalid launch date',
        })
    })
})
})

