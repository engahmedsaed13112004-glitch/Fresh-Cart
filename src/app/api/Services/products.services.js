import { apiConfig } from "../config/api.config";

export  default async function getProducts (){

const response = await fetch(`${apiConfig.baseUrl}/products`)
const data = await  response.json()

console.log(data);


return data

}