import nodeAxios from "axios";
import { IUsers } from "../types/userTypes";

const axios = nodeAxios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // göm API nyckel tsm med gitignore & config.json etc
});

export function getUsers() {
  return axios.get<IUsers[]>("/users");
}
