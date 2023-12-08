import { SuperTest, Test } from 'supertest';
import app from '../src/index.ts';
import axios, { AxiosResponse } from 'axios';
import supertest from 'supertest';

jest.mock('axios');

describe('Mock the GET /api/search api and test response', () => {
  const sampleResponseObj = { name: 'Mace', collector_number: 1, rarity: "common", set_name: "Adventures in the Forgotten Realms" }
  it('search phrase mace should respond with certain properties in JSON form', async () => {
    // Mock the Axios get method to return a specific response
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: { name: 'Mace', collector_number: 1, rarity: "common", set_name: "Adventures in the Forgotten Realms" },
      status: 200,
    } as AxiosResponse);

    const response = await (supertest(app) as SuperTest<Test>).get('/api/search?q=mace');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('collector_number');
    expect(response.body).toHaveProperty('rarity');
    expect(response.body).toHaveProperty('set_name');
    expect(response.body).toMatchObject(sampleResponseObj);

  });
});