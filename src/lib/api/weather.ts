// src/lib/api/weather.ts

import type {
	BaseWeatherParams,
	WeatherOverview,
	WeatherResponse
} from '$lib/types/weather';

//const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const API_KEY = "da2104a405eab5c688cea51060195ab8";



async function doRequest<T>(method = 'GET', params?: URLSearchParams, payload?: unknown, path?: string): Promise<T> {
	const options: RequestInit = {
		method,
		headers: {
			'Content-Type': 'application/json'
		},
		body: payload ? JSON.stringify(payload) : undefined
	};

	const res = await fetch(`/api/weather${path ? "/" + path : ""}?${params?.toString()}`, options);

	if (!res.ok) {
		const errorBody = await res.text();
		throw new Error(`Request failed: ${res.status}, body: ${errorBody}`);
	}

	return res.json() as Promise<T>;
}

function buildURLParamsFromBase(base: BaseWeatherParams) {
	const params = new URLSearchParams({
		lat: base.lat.toString(),
		lon: base.lon.toString()
	});
	if (base.units) params.set('units', base.units);
	if (base.lang) params.set('lang', base.lang);

	return params;
}

export async function getCurrentWeather(p: BaseWeatherParams): Promise<WeatherResponse> {
	return doRequest<WeatherResponse>('GET', buildURLParamsFromBase(p));
}

export async function getWeatherOverview(p: BaseWeatherParams): Promise<WeatherOverview> {
	return doRequest<WeatherOverview>('GET', buildURLParamsFromBase(p), undefined, 'overview');
}