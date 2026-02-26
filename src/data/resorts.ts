import type { Resort } from '../types/index.js';

export const resorts: Resort[] = [
    {
        id: 'chamonix',
        name: 'Chamonix-Mont-Blanc',
        country: 'France',
        elevation: {
            min: 1035,
            max: 3842,
        },
        coordinates: {
            lat: 45.8631,
            lon: 6.8694,
        },
        timezone: 'Europe/Zurich',
    },
    {
        id: 'verbier',
        name: 'Verbier',
        country: 'Switzerland',
        elevation: {
            min: 1500,
            max: 3002,
        },
        coordinates: {
            lat: 46.1017,
            lon: 7.2284,
        },
        timezone: 'Europe/Zurich',
    },
    {
        id: 'zermatt',
        name: 'Zermatt',
        country: 'Switzerland',
        elevation: {
            min: 1620,
            max: 3899,
        },
        coordinates: {
            lat: 46.0207,
            lon: 7.7491,
        },
        timezone: 'Europe/Zurich',
    },
    {
        id: 'avoriaz',
        name: 'Avoriaz',
        country: 'France',
        elevation: {
            min: 1800,
            max: 2722,
        },
        coordinates: {
            lat: 46.1864,
            lon: 6.7169,
        },
        timezone: 'Europe/Zurich',
    },
    {
        id: 'les-gets',
        name: 'Les Gets',
        country: 'France',
        elevation: {
            min: 1172,
            max: 2002,
        },
        coordinates: {
            lat: 46.3503,
            lon: 6.7406,
        },
        timezone: 'Europe/Zurich',
    },
    {
        id: 'morzine',
        name: 'Morzine',
        country: 'France',
        elevation: {
            min: 1000,
            max: 2000,
        },
        coordinates: {
            lat: 46.4165,
            lon: 6.7087,
        },
        timezone: 'Europe/Zurich',
    },
];
