import axios from 'axios';
const BASE_URL = 'http://localhost:3000/';

export default axios.create({
  baseURL: BASE_URL,
});

export const getMenuRules = async () => {
  const result = await axios.get(`${BASE_URL}db.json`);
  return result.data;
};
