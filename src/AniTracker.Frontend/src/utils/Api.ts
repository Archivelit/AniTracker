import axios from "axios";

export const api = axios.create({
	baseURL: process.env.services__api__https__0,
	timeout: 2000
});