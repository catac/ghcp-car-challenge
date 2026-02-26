import type { Resort, WeatherData } from '../types/index.js';

const OPEN_METEO_API = 'https://api.open-meteo.com/v1/forecast';

interface OpenMeteoResponse {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    timezone: string;
    current?: {
        time: string;
        interval: number;
        temperature_2m: number;
        relative_humidity_2m: number;
        precipitation: number;
        weather_code: number;
        wind_speed_10m: number;
    };
    current_units?: {
        time: string;
        temperature_2m: string;
        relative_humidity_2m: string;
        precipitation: string;
        weather_code: string;
    };
}

const weatherCodeDescription: Record<number, string> = {
    0: 'Dégagé',
    1: 'Partiellement nuageux',
    2: 'Partiellement nuageux',
    3: 'Nuageux',
    45: 'Brouillard',
    48: 'Brouillard givrant',
    51: 'Petite pluie légère',
    53: 'Petite pluie',
    55: 'Petite pluie dense',
    61: 'Pluie',
    63: 'Pluie modérée',
    65: 'Pluie dense',
    71: 'Petite neige',
    73: 'Neige',
    75: 'Neige dense',
    77: 'Grains de neige',
    80: 'Averses légères',
    81: 'Averses',
    82: 'Averses violentes',
    85: 'Petite averse de neige',
    86: 'Averse de neige',
    95: 'Orage',
    96: 'Orage avec grésil léger',
    99: 'Orage avec grésil',
};

const weatherCodeIcon: Record<number, string> = {
    0: '☀️',
    1: '🌤️',
    2: '⛅',
    3: '☁️',
    45: '🌫️',
    48: '🌫️',
    51: '🌧️',
    53: '🌧️',
    55: '🌧️',
    61: '🌧️',
    63: '🌧️',
    65: '⛈️',
    71: '❄️',
    73: '❄️',
    75: '❄️',
    77: '❄️',
    80: '🌧️',
    81: '⛈️',
    82: '⛈️',
    85: '❄️',
    86: '❄️',
    95: '⛈️',
    96: '⛈️',
    99: '⛈️',
};

export async function fetchWeatherForResort(resort: Resort): Promise<WeatherData> {
    try {
        const params = new URLSearchParams({
            latitude: resort.coordinates.lat.toString(),
            longitude: resort.coordinates.lon.toString(),
            current: 'temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m',
            timezone: resort.timezone,
        });

        const response = await fetch(`${OPEN_METEO_API}?${params}`);

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = (await response.json()) as OpenMeteoResponse;

        if (!data.current) {
            throw new Error('No current weather data available');
        }

        const weatherCode = data.current.weather_code || 0;

        return {
            temperature: data.current.temperature_2m,
            humidity: data.current.relative_humidity_2m,
            windSpeed: data.current.wind_speed_10m,
            precipitation: data.current.precipitation,
            conditions: weatherCodeDescription[weatherCode] || 'Inconnu',
            icon: weatherCodeIcon[weatherCode] || '🌡️',
            timestamp: Date.now(),
        };
    } catch (error) {
        console.error(`Failed to fetch weather for ${resort.name}:`, error);
        throw error;
    }
}

export async function fetchWeatherForAllResorts(resorts: Resort[]): Promise<WeatherData[]> {
    const weatherPromises = resorts.map(resort => fetchWeatherForResort(resort));
    return Promise.all(weatherPromises);
}
