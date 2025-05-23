export interface BaseWeatherParams {
  lat: number;
  lon: number;
  units?: string;
  lang?: string;
}

export interface WeatherResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeather;
  minutely?: MinutelyWeather[];
  hourly?: HourlyWeather[];
  daily?: DailyWeather[];
  alerts?: WeatherAlert[];
}

// Shared interfaces
export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Precipitation {
  '1h': number;
}

// Current
export interface CurrentWeather {
  dt: number;
  sunrise?: number;
  sunset?: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_gust?: number;
  wind_deg: number;
  rain?: Precipitation;
  snow?: Precipitation;
  weather: Weather[];
}

// Minutely
export interface MinutelyWeather {
  dt: number;
  precipitation: number;
}

// Hourly
export interface HourlyWeather {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_gust?: number;
  wind_deg: number;
  pop: number;
  rain?: Precipitation;
  snow?: Precipitation;
  weather: Weather[];
}

// Daily
export interface DailyWeather {
  dt: number;
  sunrise?: number;
  sunset?: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary?: string; // unofficial field not always present
  temp: {
    morn: number;
    day: number;
    eve: number;
    night: number;
    min: number;
    max: number;
  };
  feels_like: {
    morn: number;
    day: number;
    eve: number;
    night: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_gust?: number;
  wind_deg: number;
  clouds: number;
  uvi: number;
  pop: number;
  rain?: number;
  snow?: number;
  weather: Weather[];
}

// Alerts
export interface WeatherAlert {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
}

export interface WeatherOverview {
  lat: number;
  lon: number;  
  tz: string;
  date: string;
  units: string;
  weather_overview: string;
}