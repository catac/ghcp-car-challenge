import { useQuery } from '@tanstack/react-query';
import ResortCard from '../components/ResortCard.js';
import { resorts } from '../data/resorts.js';
import { fetchWeatherForAllResorts } from '../services/weatherService.js';
import type { WeatherData } from '../types/index.js';

export default function Dashboard() {
    const { data: weatherData, isLoading, error } = useQuery({
        queryKey: ['weather'],
        queryFn: () => fetchWeatherForAllResorts(resorts),
        staleTime: 1000 * 60 * 30, // 30 minutes
        refetchOnWindowFocus: false,
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold text-gray-800">⛷️ Météo des Neiges</h1>
                    <p className="text-gray-600 mt-2">Conditions météo des stations de ski de la région genevoise</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                {isLoading ? (
                    <div className="flex items-center justify-center py-16">
                        <div className="text-center">
                            <div className="animate-spin text-4xl mb-4">⏳</div>
                            <p className="text-gray-600">Chargement des données météo...</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                        <p className="font-semibold">Erreur lors du chargement</p>
                        <p className="text-sm">{error instanceof Error ? error.message : 'Une erreur est survenue'}</p>
                    </div>
                ) : weatherData ? (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {resorts.map((resort, index) => (
                                <ResortCard
                                    key={resort.id}
                                    resort={resort}
                                    weather={weatherData[index] as WeatherData}
                                />
                            ))}
                        </div>
                    </div>
                ) : null}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-12">
                <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600 text-sm">
                    <p>Données météo fournies par Open-Meteo</p>
                </div>
            </footer>
        </div>
    );
}
