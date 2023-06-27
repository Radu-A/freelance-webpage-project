const supertest = require('supertest');
const server = require('../app');
const mongoose = require('../utils/db_mongo');
// const { describe } = require('yargs');
const request = supertest(server);

afterAll(async()=>{
    await server.close()
    await mongoose.connection.close()
})

it('Trying jest', ()=>{
    expect(1).toBe(1);
})

describe('GET all projects', ()=> {
    it('gets the test endpoint /', async()=>{
        await request
            .get('/api/projects/search')
            .expect(200)
    })
})