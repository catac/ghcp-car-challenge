export interface Resort {
    id: string;
    name: string;
    country: string;
    elevation: {
        min: number;
        max: number;
    };
    coordinates: {
        lat: number;
        lon: number;
    };
    timezone: string;
}

export interface WeatherData {
    temperature: number;
    humidity: number;
    windSpeed: number;
    precipitation: number;
    conditions: string;
    snowDepth?: number;
    icon: string;
    timestamp: number;
}

export interface ResortWeather {
    resort: Resort;
    weather: WeatherData;
    lastUpdated: number;
}
