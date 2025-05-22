// src/lib/api/weather.ts

import type {
	CoordinatesByZipCode,
	CoordinatesByLocationName,
	WeatherResponse
} from '$lib/types/weather';

const BASE_GEO_URL = 'http://api.openweathermap.org/geo/1.0';
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5';

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

export async function getCoordinatesByZipCode(zipCode: string, countryCode = ''): Promise<CoordinatesByZipCode> {
	const zip = countryCode ? `${zipCode},${countryCode}` : zipCode;
	const url = `${BASE_GEO_URL}/zip?zip=${encodeURIComponent(zip)}&appid=${API_KEY}`;
	return doRequest<CoordinatesByZipCode>(url);
}

export async function getCoordinatesByLocationName(
	cityName: string,
	stateCode = '',
	countryCode = '',
	limit = 1
): Promise<CoordinatesByLocationName[]> {
	let q = cityName;
	if (stateCode) q += `,${stateCode}`;
	if (countryCode) q += `,${countryCode}`;

	const params = new URLSearchParams({
		q,
		appid: API_KEY,
		limit: limit.toString()
	});

	const url = `${BASE_GEO_URL}/direct?${params.toString()}`;
	return doRequest<CoordinatesByLocationName[]>(url);
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
