import { sendHttpRequest } from "./fetch.js";
import User from "./user.js";

const MAX_ID = 10000;
const MIN_ID = 100;

const generateId = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

export const createUserData = (data) => {
  return sendHttpRequest("PUT", "https://reqres.in/api/users/", data).then(
    (responseData) => {
      data.id = generateId(MIN_ID, MAX_ID);

      return data;
    }
  );
};

export const deleteUserData = (id) => {
  return sendHttpRequest("DELETE", "https://reqres.in/api/users/" + id).then(
    (responseData) => {
      return responseData;
    }
  );
};

export const getUserData = (id) => {
  return sendHttpRequest("GET", "https://reqres.in/api/users/" + id).then(
    (responseData) => {
      return responseData;
    }
  );
};

export const getUsersData = () => {
  return sendHttpRequest("GET", "https://reqres.in/api/users/").then(
    (responseData) => {
      return responseData;
    }
  );
};

export const updateUserData = (id, data) => {
  return sendHttpRequest("PUT", "https://reqres.in/api/users/" + id, data).then(
    (responseData) => {
      return data;
    }
  );
};
