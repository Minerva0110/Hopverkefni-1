import request from 'supertest';
import app from '../src/index';

describe('Items API', () => {
  it('should list all items', async () => {
    const res = await request(app).get('/items');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new item', async () => {
    const newItem = { title: 'Test Task' };
    const res = await request(app).post('/items').send(newItem);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title', 'Test Task');
  });
});
