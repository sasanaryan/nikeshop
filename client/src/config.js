import axios from "axios";

export const baseurl = axios.create({
    baseURL : "https://nikeshopapi.herokuapp.com/api/"
})