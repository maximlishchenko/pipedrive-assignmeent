import request from 'supertest';
import app from '../src/app';
import dotenv from 'dotenv';

dotenv.config();


describe("GET /deals", () => {
    it("should get all the deals successfully", async () => {
        const response = await request(app)
            .get('/api/deals');

        expect(response.body.success).toBe(true);
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toBeInstanceOf(Array);
    });

    it("should fail accessing deals without a valid api token", async () => {
        const originalApiToken = process.env.API_TOKEN;
        process.env.API_TOKEN = '';
        const response = await request(app)
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

        const response = await request(app)
            .post('/api/deals')
            .send(dealData);

        expect(response.statusCode).toBe(401);
        expect(response.body.data?.success).toBe(false);
        process.env.API_TOKEN = originalApiToken;
    });
});


describe("PUT /deals", () => {
    it("should update an existing deal successfully", async () => {
        const updatedDealData = {
            title: "newDealName",
            value: 1000,
            currency: "EUR"
        };
        // assuming deal with id 14 exists
        const response = await request(app)
            .put('/api/deals/14')
            .send(updatedDealData);

        expect(response.body.success).toBe(true);
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toMatchObject({
            id: expect.any(Number),
            title: "newDealName",
            value: 1000,
            currency: "EUR"
        });
    });

    it("should handle the case with a deleted deal", async () => {
        const updatedDealData = {
            title: "newDealName",
            value: 1000
        };
        // assuming deal with id 4 was deleted
        const response = await request(app)
            .put('/api/deals/4')
            .send(updatedDealData);

        expect(response.body.data?.success).toBe(false);
        expect(response.statusCode).toBe(400);
    });

    it("should handle the case with a non-existent deal", async () => {
        const updatedDealData = {
            title: "newDealName",
            value: 1000
        };
        // assuming deal with id 12345 doesn't exist
        const response = await request(app)
            .put('/api/deals/12345')
            .send(updatedDealData);

        expect(response.statusCode).toBe(404);
        expect(response.body.data?.success).toBe(false);
    });

    it("should fail updating an existing deal without a valid api token", async () => {
        const originalApiToken = process.env.API_TOKEN;
        process.env.API_TOKEN = '';

        const updatedDealData = {
            title: "newDealName",
            value: 1000
        };
        // assuming deal with id 14 exists
        const response = await request(app)
            .put('/api/deals/14')
            .send(updatedDealData);

        expect(response.statusCode).toBe(401);
        expect(response.body.data?.success).toBe(false);
        process.env.API_TOKEN = originalApiToken;
    });
});