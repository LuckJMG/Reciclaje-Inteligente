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
    name: 'Centro de Reciclaje Parque Central',
    lat: 40.7829,
    lng: -73.9654,
    status: 'available',
    materials: ['Plástico', 'Papel', 'Vidrio', 'Metal'],
    hours: '24/7',
    lastUpdate: 'Hace 2 horas',
    address: 'Central Park West, Nueva York, NY',
  },
  {
    id: '2',
    name: 'Centro Comunitario Centro',
    lat: 40.7589,
    lng: -73.9851,
    status: 'nearly-full',
    materials: ['Plástico', 'Papel', 'Cartón'],
    hours: '6:00 AM - 10:00 PM',
    lastUpdate: 'Hace 30 minutos',
    address: '150 W 34th St, Nueva York, NY',
  },
  {
    id: '3',
    name: 'Punto de Recolección Este',
    lat: 40.7614,
    lng: -73.9776,
    status: 'full',
    materials: ['Vidrio', 'Metal'],
    hours: '7:00 AM - 9:00 PM',
    lastUpdate: 'Hace 15 minutos',
    address: '405 Lexington Ave, Nueva York, NY',
  },
  {
    id: '4',
    name: 'Estación Ecológica Puente Brooklyn',
    lat: 40.7061,
    lng: -73.9969,
    status: 'available',
    materials: ['Plástico', 'Papel', 'Vidrio', 'Metal', 'Electrónica'],
    hours: '24/7',
    lastUpdate: 'Hace 1 hora',
    address: 'Brooklyn Bridge Park, Brooklyn, NY',
  },
  {
    id: '5',
    name: 'Centro Verde Williamsburg',
    lat: 40.7081,
    lng: -73.9571,
    status: 'available',
    materials: ['Orgánico', 'Papel', 'Cartón'],
    hours: '8:00 AM - 6:00 PM',
    lastUpdate: 'Hace 3 horas',
    address: 'Bedford Ave, Brooklyn, NY',
  },
  {
    id: '6',
    name: 'Reciclaje Queens Plaza',
    lat: 40.7489,
    lng: -73.9372,
    status: 'nearly-full',
    materials: ['Plástico', 'Vidrio', 'Metal'],
    hours: '24/7',
    lastUpdate: 'Hace 45 minutos',
    address: 'Queens Plaza, Queens, NY',
  },
];
