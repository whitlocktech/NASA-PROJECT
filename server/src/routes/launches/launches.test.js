const request = require('supertest')
const app = require('../../app')

describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
        .get('/launches')
        .expect('Content-Type', /json/)
        .expect(200)
    })
})

describe('Testing POST /launches', () => {

    const completeLaunchData = {
        mission: 'Uss enterprise',
        rocket: 'NCC 1077-D',
        target: 'Kepler-186 f',
        launchDate: 'Feburary 7, 2055',
    }
    const launchDataWithoutDate = {
        mission: 'Uss enterprise',
        rocket: 'NCC 1077-D',
        target: 'Kepler-186 f',    }
    
    const launchDataWithInvalidDate = {
        mission: 'Uss enterprise',
        rocket: 'NCC 1077-D',
        target: 'Kepler-186 f',
        launchDate: 'Bingo',
    }

    test('SHould be 201 success', async () => {
        const response = await request(app)
        .post('/launches')
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
        .post('/launches')
        .send(launchDataWithoutDate)
        .expect('Content-Type', /json/)
        .expect(400)

        expect(resonse.body).toStrictEqual({
            error: 'Missing required launch property',
        })
    })
    test('It should catech invalid dates', async () => {
        const resonse = await request(app)
        .post('/launches')
        .send(launchDataWithInvalidDate)
        .expect('Content-Type', /json/)
        .expect(400)

        expect(resonse.body).toStrictEqual({
            error: 'Invalid launch date',
        })
    })
})