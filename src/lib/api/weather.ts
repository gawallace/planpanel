// src/lib/api/weather.ts

import type {
	WeatherResponse
} from '$lib/types/weather';

//const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const API_KEY = "da2104a405eab5c688cea51060195ab8";

async function doRequest<T>(url: string, method = 'GET', payload?: unknown): Promise<T> {
	const options: RequestInit = {
		method,
		headers: {
			'Content-Type': 'application/json'
		},
		body: payload ? JSON.stringify(payload) : undefined
	};

	const res = await fetch(url, options);

	if (!res.ok) {
		const errorBody = await res.text();
		throw new Error(`Request failed: ${res.status}, body: ${errorBody}`);
	}

	return res.json() as Promise<T>;
}

export async function getCurrentWeather(
	lat: number,
	lon: number,
	units = '',
	lang = ''
): Promise<WeatherResponse> {
	const params = new URLSearchParams({
		lat: lat.toString(),
		lon: lon.toString()
	});
	if (units) params.set('units', units);
	if (lang) params.set('lang', lang);

	// Hit your own server endpoint (proxy)
	const url = `/api/weather?${params.toString()}`;
	return doRequest<WeatherResponse>(url);
}
