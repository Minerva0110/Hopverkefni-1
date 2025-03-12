import request from 'supertest';
import { app } from '../index.js';
import prisma from '../models/db.js';
beforeAll(async () => {
    await prisma.note.deleteMany();
});
afterAll(async () => {
    await prisma.$disconnect();
});
describe('Notes API Tests', () => {
    let createdNoteId;
    it('should create a new note', async () => {
        const response = await request(app).post('/notes').send({
            userId: 1,
            title: 'Test Note',
            content: 'This is a test note',
            isPublic: true
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Test Note');
        createdNoteId = response.body.id;
    });
    it('should fetch all notes', async () => {
        const response = await request(app).get('/notes');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
    it('should fetch a single note by ID', async () => {
        const response = await request(app).get(`/notes/${createdNoteId}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(createdNoteId);
    });
    it('should update a note', async () => {
        const response = await request(app).put(`/notes/${createdNoteId}`).send({
            title: 'Updated Test Note',
            content: 'This is an updated test note',
            isPublic: false
        });
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Updated Test Note');
    });
    it('should delete a note', async () => {
        const response = await request(app).delete(`/notes/${createdNoteId}`);
        expect(response.status).toBe(204);
        expect(response.body).toEqual({});
    });
    it('should return 404 for deleted note', async () => {
        const response = await request(app).get(`/notes/${createdNoteId}`);
        expect(response.status).toBe(404);
    });
});
afterAll(async () => {
    await prisma.$disconnect();
});
