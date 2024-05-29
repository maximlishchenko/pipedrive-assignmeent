import request from 'supertest';
import app from '../src/app';
import dotenv from 'dotenv';

dotenv.config();


describe("GET /deals", () => {

    it("should get all the deals successfully", async () => {
        const response =  await request(app).get('/api/deals');
        expect(response.body.success).toBe(true);
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toBeInstanceOf(Array);
    });

    it("should fail accessing deals without a valid api token", async () => {
        const originalApiToken = process.env.API_TOKEN;
        process.env.API_TOKEN = '';
        const response =  await request(app).get('/api/deals');
        expect(response.statusCode).toBe(401);
        expect(response.body.data?.success).toBe(false);
        process.env.API_TOKEN = originalApiToken;
    });

});
