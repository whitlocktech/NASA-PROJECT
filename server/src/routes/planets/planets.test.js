const request = require('supertest')
const app = require('../../app')
const { mongoConnect } = require('../../services/mongo')

describe('Test GET /planets', () => {
    beforeAll( async () => {
        mongoConnect()
    })
    test('Should return 200 success', async () => {
        const response = await request(app)
        .get('/planets')
        .expect('Content-Type', /json/)
        .expect(200)
    })
})
