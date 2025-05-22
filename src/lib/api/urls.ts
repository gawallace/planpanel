const BASE_OW_ONECALL_URL = 'https://api.openweathermap.org/data/3.0/onecall';

export function getWeatherUrl(lat: number, lon: number, apiKey: string, units?: string, lang?: string): string {
    const params = new URLSearchParams({
        lat: lat.toString(),
        lon: lon.toString(),
        appid: apiKey
    });
    if (units) params.set('units', units);
    if (lang) params.set('lang', lang);

    return `${BASE_OW_ONECALL_URL}?${params.toString()}`;
}