import request from 'supertest';
import { app } from '../index.js';
import prisma from '../models/db.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

beforeAll(async () => {
    await prisma.note.deleteMany();
    await prisma.category.deleteMany();
});

afterAll(async () => {
    await prisma.$disconnect();
});

describe('Categories API', () => {
    let categoryId: number;

    it('should create a new category', async () => {
        const res = await request(app)
            .post('/categories')
            .send({ name: 'Work' });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('Work');

        categoryId = res.body.id;
    });

    it('should fetch all categories', async () => {
        const res = await request(app).get('/categories');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should fetch a category by ID', async () => {
        const res = await request(app).get(`/categories/${categoryId}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('id', categoryId);
    });

    it('should return 404 for a non-existent category', async () => {
        const res = await request(app).get('/categories/99999');
        expect(res.status).toBe(404);
    });

    it('should update a category', async () => {
        const res = await request(app)
            .put(`/categories/${categoryId}`)
            .send({ name: 'Updated Work' });

        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Updated Work');
    });

    it('should delete a category', async () => {
        const res = await request(app).delete(`/categories/${categoryId}`);
        expect(res.status).toBe(204);
    });

    it('should return 404 when deleting a non-existent category', async () => {
        const res = await request(app).delete('/categories/99999');
        expect(res.status).toBe(404);
    });
});
