import axios, * as others from 'axios';
import { showError, showWarn } from '../toast/notification';

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

export const deleteRequest = async (url: string) => {
  await axios
    .delete(process.env.REACT_APP_API_URL + url, {
      headers: {
        Authorization: `Bearer`,
      },
    })
    .then(() => {
      showWarn("Item was deleted.");
    })
    .catch(() => {
      showError("Something went wrong!");
    });
};

export const put = async (url: string, data: any) => {
  const json = JSON.stringify(data);

  return await axios.put(process.env.REACT_APP_API_URL + url, json, {
      headers: {
          "Content-Type": `application/json`
      }
  });
};