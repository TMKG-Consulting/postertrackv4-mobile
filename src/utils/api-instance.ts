import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { InternalAxiosRequestConfig } from "axios";

const ApiInstance = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
});

ApiInstance.interceptors.request.use(
	async (config: InternalAxiosRequestConfig) => {
		const accessToken = await SecureStore.getItemAsync("accessToken");

		// Add access token to Authorization header if it exists
		if (accessToken) {
			config.headers["auth-token"] = `${accessToken}`;
		}

		return config;
	},
	(error: any) => {
		return Promise.reject(error);
	}
);

export default ApiInstance;
