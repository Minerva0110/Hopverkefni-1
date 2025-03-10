import request from 'supertest';
import { app } from '../index'; 
import prisma from '../models/db'; 

beforeAll(async () => {
  await prisma.notes.deleteMany(); 
});

afterAll(async () => {
  await prisma.$disconnect(); 
});

describe('Items API Tests', () => {
  let createdItemId: number;

  it('should create a new note', async () => {
    const response = await request(app).post('/items').send({
      user_id: 1,
      title: 'Test Note',
      content: 'This is a test note',
      is_public: true
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Test Note');
    createdItemId = response.body.id;
  });

  it('should fetch all notes', async () => {
    const response = await request(app).get('/items');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should fetch a single note by ID', async () => {
    const response = await request(app).get(`/items/${createdItemId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdItemId);
  });

  it('should update a note', async () => {
    const response = await request(app).put(`/items/${createdItemId}`).send({
      title: 'Updated Test Note',
      content: 'This is an updated test note',
      is_public: false
    });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Test Note');
  });

  it('should delete a note', async () => {
    const response = await request(app).delete(`/items/${createdItemId}`);
    expect(response.status).toBe(204);
  });

  it('should return 404 for deleted note', async () => {
    const response = await request(app).get(`/items/${createdItemId}`);
    expect(response.status).toBe(404);
  });
});
