
	import { getCurrentWeather } from '$lib/api/weather';
	import type { WeatherResponse } from '$lib/types/weather';

	export const weatherState = $state<{
		result: { name: string; temp: number; conditions: string; icon: string } | null;
		full: WeatherResponse | null;
		loading: boolean;
		error: string;
		refresh: () => void;
	}>({
		result: null,
		full: null,
		loading: false,
		error: '',
		refresh: () => getWeather()
	});

	async function getWeather() {
		console.log('Fetching weather...');
		weatherState.loading = true;
		weatherState.error = '';

		if (!navigator.geolocation) {
			weatherState.loading = false;
			weatherState.error = 'Geolocation not supported.';
			return;
		}

		navigator.geolocation.getCurrentPosition(
			async ({ coords }) => {
				try {
					const weather = await getCurrentWeather(coords.latitude, coords.longitude, "imperial", "en");
					weatherState.result = {
						name: weather.name,
						temp: weather.main.temp,
						conditions: weather.weather[0].description,
						icon: weather.weather[0].icon
					};
					weatherState.full = weather;
				} catch {
					weatherState.error = 'Failed to fetch weather.';
				} finally {
					weatherState.loading = false;
				}
			},
			() => {
				weatherState.loading = false;
				weatherState.error = 'Location access denied or unavailable.';
			}
		);
	}


