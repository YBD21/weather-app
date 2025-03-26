export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  localtime: string;
}

export interface Condition {
  text: string;
  icon: string;
  code: number;
}

export interface Current {
  temp_c: number;
  temp_f: number;
  condition: Condition;
  wind_kph: number;
  wind_mph: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  uv: number;
}

export interface Astro {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
}

export interface Day {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  condition: Condition;
}

export interface ForecastDay {
  date: string;
  date_epoch: number;
  day: Day;
  astro: Astro;
}

export interface Forecast {
  forecastday: ForecastDay[];
}

export interface WeatherForecast {
  location: Location;
  current: Current;
  forecast: Forecast;
}
