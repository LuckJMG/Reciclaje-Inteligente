export type RecyclingPointStatus = 'available' | 'nearly-full' | 'full';

export interface RecyclingPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: RecyclingPointStatus;
  materials: string[];
  hours: string;
  lastUpdate: string;
  address: string;
}

export const recyclingPoints: RecyclingPoint[] = [
  {
    id: '1',
    name: 'Punto Verde Providencia',
    lat: -33.4272,
    lng: -70.6109,
    status: 'available',
    materials: ['Plástico', 'Papel', 'Vidrio', 'Metal'],
    hours: '24/7',
    lastUpdate: 'Hace 2 horas',
    address: 'Av. Providencia con Los Leones, Providencia',
  },
  {
    id: '2',
    name: 'Centro de Reciclaje Las Condes',
    lat: -33.4150,
    lng: -70.5843,
    status: 'nearly-full',
    materials: ['Plástico', 'Papel', 'Cartón'],
    hours: '6:00 AM - 10:00 PM',
    lastUpdate: 'Hace 30 minutos',
    address: 'Av. Apoquindo 4900, Las Condes',
  },
  {
    id: '3',
    name: 'Punto Limpio Ñuñoa',
    lat: -33.4569,
    lng: -70.5983,
    status: 'full',
    materials: ['Vidrio', 'Metal', 'Electrónica'],
    hours: '7:00 AM - 9:00 PM',
    lastUpdate: 'Hace 15 minutos',
    address: 'Av. Irarrázaval 3000, Ñuñoa',
  },
  {
    id: '4',
    name: 'Estación Ecológica Parque Bicentenario',
    lat: -33.4044,
    lng: -70.5698,
    status: 'available',
    materials: ['Plástico', 'Papel', 'Vidrio', 'Metal', 'Electrónica'],
    hours: '24/7',
    lastUpdate: 'Hace 1 hora',
    address: 'Cerca del Parque Bicentenario, Vitacura',
  },
  {
    id: '5',
    name: 'Centro Verde La Reina',
    lat: -33.4456,
    lng: -70.5380,
    status: 'available',
    materials: ['Orgánico', 'Papel', 'Cartón'],
    hours: '8:00 AM - 6:00 PM',
    lastUpdate: 'Hace 3 horas',
    address: 'Av. Larraín 9750, La Reina',
  },
  {
    id: '6',
    name: 'Reciclaje Santiago Centro',
    lat: -33.4378,
    lng: -70.6504,
    status: 'nearly-full',
    materials: ['Plástico', 'Vidrio', 'Metal'],
    hours: '24/7',
    lastUpdate: 'Hace 45 minutos',
    address: 'Plaza de Armas, Santiago Centro',
  },
  {
    id: '7',
    name: 'Punto Verde Vitacura',
    lat: -33.3969,
    lng: -70.5642,
    status: 'available',
    materials: ['Plástico', 'Papel', 'Vidrio', 'Orgánico'],
    hours: '7:00 AM - 8:00 PM',
    lastUpdate: 'Hace 4 horas',
    address: 'Av. Vitacura 5250, Vitacura',
  },
  {
    id: '8',
    name: 'Centro de Acopio Providencia',
    lat: -33.4342,
    lng: -70.6125,
    status: 'available',
    materials: ['Papel', 'Cartón', 'Metal'],
    hours: '9:00 AM - 7:00 PM',
    lastUpdate: 'Hace 1 hora',
    address: 'Manuel Montt con Av. Providencia, Providencia',
  },
];
