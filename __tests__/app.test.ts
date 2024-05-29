import request from 'supertest';
import app from '../src/app';
import dotenv from 'dotenv';

dotenv.config();


describe("GET /deals", () => {
    it("should get all the deals successfully", async () => {
        const response =  await request(app)
            .get('/api/deals');

        expect(response.body.success).toBe(true);
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toBeInstanceOf(Array);
    });

    it("should fail accessing deals without a valid api token", async () => {
        const originalApiToken = process.env.API_TOKEN;
        process.env.API_TOKEN = '';
        const response =  await request(app)
        .get('/api/deals');

        expect(response.statusCode).toBe(401);
        expect(response.body.data?.success).toBe(false);
        process.env.API_TOKEN = originalApiToken;
    });
});


describe("POST /deals", () => {
    it("should create a new deal successfully", async () => {
        const dealData = {
            title: "myDeal"
        };

        const response = await request(app)
            .post('/api/deals')
            .send(dealData);

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        // expect(response.body.data.title).toBe(dealData.title);
        expect(response.body.data).toMatchObject({
            id: expect.any(Number),
            title: "myDeal"
        });
    });

    it("should fail creating a new deal if title is not provided", async () => {
        const response = await request(app)
            .post('/api/deals');

        expect(response.statusCode).toBe(400);
        expect(response.body.data?.success).toBe(false);
    });

    it("should fail creating a new deal without a valid api token", async () => {
        const originalApiToken = process.env.API_TOKEN;
        process.env.API_TOKEN = '';

        const dealData = {
            title: "myDeal"
        };

        const response =  await request(app)
            .post('/api/deals')
            .send(dealData);

        expect(response.statusCode).toBe(401);
        expect(response.body.data?.success).toBe(false);
        process.env.API_TOKEN = originalApiToken;
    });
});
