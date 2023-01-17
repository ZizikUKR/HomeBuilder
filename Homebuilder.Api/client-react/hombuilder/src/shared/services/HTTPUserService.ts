import axios, * as others from 'axios';

export const get = async (url: string) => {
  return await axios.get(process.env.REACT_APP_API_URL + url);
};

export const post = async (url: string, data: any) => {
  const json = JSON.stringify(data);

  return await axios.post(process.env.REACT_APP_API_URL + url, json, {
      headers: {
          "Content-Type": `application/json`
      }
  });
};
