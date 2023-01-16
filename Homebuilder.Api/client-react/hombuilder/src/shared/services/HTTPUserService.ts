import axios, * as others from 'axios';

export const get = async (url: string) => {
  return await axios.get(process.env.REACT_APP_API_URL + url);
};
