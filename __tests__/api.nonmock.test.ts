
import app from '../src/index.ts';
import supertest from 'supertest';


describe('Test actual GET /api/search API (Integration Test)', () => {
  it('GET /api/search returns expected data', async () => {

    const response = await supertest(app).get('/api/search?term=mace of disruption');
    const data = response?.body?.data[0];    
    
    expect(response.status).toBe(200);
    expect(data).toHaveProperty('name');
    expect(data).toHaveProperty('collector_number');
    expect(data).toHaveProperty('rarity');
    expect(data).toHaveProperty('set_name');
  });
});


