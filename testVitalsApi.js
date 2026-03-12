import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const API_PORT = process.env.PORT || 5000;
const API_URL = `http://localhost:${API_PORT}/api/v1`;

function testVitals() {
  http.get(`${API_URL}/vitals/global`, (res) => {
    console.log('Global Vitals Status:', res.statusCode);
  }).on('error', (e) => {
    console.error('Error connecting to backend:', e.message);
  });
}

testVitals();
