import nodeAxios from "axios";
import { IUsers } from "../types/userTypes";
import { IFormInputs } from "../types/formTypes";

const axios = nodeAxios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // Hide api key with gitignore & config.json etc
});

export function getUsers() {
  return axios.get<IUsers[]>("/users");
}

export function postData(formData: IFormInputs) {
  return axios.post("/posts", formData);
}
