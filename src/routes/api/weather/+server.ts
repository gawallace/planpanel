import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const lat = url.searchParams.get('lat');
	const lon = url.searchParams.get('lon');
	const units = url.searchParams.get('units') ?? 'imperial';
	const lang = url.searchParams.get('lang') ?? 'en';

	const apiKey = "da2104a405eab5c688cea51060195ab8";

	if (!lat || !lon || !apiKey) {
		return new Response('Missing parameters', { status: 400 });
	}

	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&lang=${lang}`;

	const res = await fetch(apiUrl);
	if (!res.ok) {
		const err = await res.text();
		return new Response(err, { status: res.status });
	}

	const data = await res.json();
	return json(data);
}
