import { describe, expect, it } from "vitest";
import app from "../index"
import request from 'supertest';

describe('GET /', () => {
    it('should respond with a JSON object containing a message', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({});
    });
});