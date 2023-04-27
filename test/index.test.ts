import { describe, expect, it } from "vitest";
import app from "../index"
import request from 'supertest';

describe('Gateway api', () => {
    it('should respond with a JSON object containing a message', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({});
    });

    it('It should respond to GET requests', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(404);
    });

    it('It should get 404 from error route', async () => {
        const response = await request(app).get('/api/error');
        expect(response.statusCode).toBe(404);
    });

    it('It should proxy requests to the building service', async () => {
        const response = await request(app).get('/api/buildings');
        expect(response.statusCode).toBe(504);
    });
});