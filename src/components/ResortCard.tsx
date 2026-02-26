import type { Resort, WeatherData } from '../types/index.js';

interface ResortCardProps {
    resort: Resort;
    weather: WeatherData;
}

export default function ResortCard({ resort, weather }: ResortCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-4">
                <h3 className="text-xl font-bold text-white">{resort.name}</h3>
                <p className="text-blue-100 text-sm">{resort.country}</p>
            </div>

            <div className="p-4">
                {/* Weather Icon and Temperature */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <span className="text-5xl">{weather.icon}</span>
                        <div>
                            <p className="text-3xl font-bold text-gray-800">
                                {Math.round(weather.temperature)}°C
                            </p>
                            <p className="text-gray-600 text-sm">{weather.conditions}</p>
                        </div>
                    </div>
                </div>

                {/* Weather Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200">
                    <div>
                        <p className="text-gray-500 text-xs uppercase font-semibold">Humidité</p>
                        <p className="text-lg font-semibold text-gray-800">{weather.humidity}%</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs uppercase font-semibold">Vent</p>
                        <p className="text-lg font-semibold text-gray-800">{Math.round(weather.windSpeed)} km/h</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs uppercase font-semibold">Précipitations</p>
                        <p className="text-lg font-semibold text-gray-800">{Math.round(weather.precipitation)} mm</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs uppercase font-semibold">Altitude</p>
                        <p className="text-lg font-semibold text-gray-800">{resort.elevation.min}-{resort.elevation.max} m</p>
                    </div>
                </div>

                {/* Updated timestamp */}
                <p className="text-xs text-gray-400">
                    Mis à jour à {new Date(weather.timestamp).toLocaleTimeString('fr-CH', { hour: '2-digit', minute: '2-digit' })}
                </p>
            </div>
        </div>
    );
}
