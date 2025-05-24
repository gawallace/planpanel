
import { browser } from '$app/environment';
import { getCurrentWeather, getWeatherOverview } from '$lib/api/weather';
import type { WeatherOverview, WeatherResponse } from '$lib/types/weather';

export const weatherState = $state<{
	result: { name: string; temp: number; conditions: string; icon: string } | null;
	full: WeatherResponse | null;
	overview: WeatherOverview | null;
	loading: boolean;
	error: string;
	refresh: () => void;
}>({
	result: null,
	full: null,
	overview: null,
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
			const baseParams = {
				lat: coords.latitude,
				lon: coords.longitude,
				units: 'imperial',
				lang: 'en'
			}

			try {
				const weather = await getCurrentWeather(baseParams);
				weatherState.result = {
					name: "Monticello",
					temp: weather.current.temp,
					conditions: weather.current.weather[0].description,
					icon: weather.current.weather[0].icon
				};
				weatherState.full = weather;

				weatherState.overview = await getWeatherOverview(baseParams);
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

if (browser) {
	getWeather();

	// Auto-refresh every 10 minutes
	const interval = setInterval(getWeather, 10 * 60 * 1000);

	// Cleanup in HMR
	if (import.meta.hot) {
		import.meta.hot.dispose(() => {
			clearInterval(interval);
		});
	}
}
