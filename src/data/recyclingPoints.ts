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
    name: 'Central Park Recycling Hub',
    lat: 40.7829,
    lng: -73.9654,
    status: 'available',
    materials: ['Plastic', 'Paper', 'Glass', 'Metal'],
    hours: '24/7',
    lastUpdate: '2 hours ago',
    address: 'Central Park West, New York, NY',
  },
  {
    id: '2',
    name: 'Downtown Community Center',
    lat: 40.7589,
    lng: -73.9851,
    status: 'nearly-full',
    materials: ['Plastic', 'Paper', 'Cardboard'],
    hours: '6:00 AM - 10:00 PM',
    lastUpdate: '30 minutes ago',
    address: '150 W 34th St, New York, NY',
  },
  {
    id: '3',
    name: 'East Side Collection Point',
    lat: 40.7614,
    lng: -73.9776,
    status: 'full',
    materials: ['Glass', 'Metal'],
    hours: '7:00 AM - 9:00 PM',
    lastUpdate: '15 minutes ago',
    address: '405 Lexington Ave, New York, NY',
  },
  {
    id: '4',
    name: 'Brooklyn Bridge Eco Station',
    lat: 40.7061,
    lng: -73.9969,
    status: 'available',
    materials: ['Plastic', 'Paper', 'Glass', 'Metal', 'Electronics'],
    hours: '24/7',
    lastUpdate: '1 hour ago',
    address: 'Brooklyn Bridge Park, Brooklyn, NY',
  },
  {
    id: '5',
    name: 'Williamsburg Green Hub',
    lat: 40.7081,
    lng: -73.9571,
    status: 'available',
    materials: ['Organic', 'Paper', 'Cardboard'],
    hours: '8:00 AM - 6:00 PM',
    lastUpdate: '3 hours ago',
    address: 'Bedford Ave, Brooklyn, NY',
  },
  {
    id: '6',
    name: 'Queens Plaza Recycling',
    lat: 40.7489,
    lng: -73.9372,
    status: 'nearly-full',
    materials: ['Plastic', 'Glass', 'Metal'],
    hours: '24/7',
    lastUpdate: '45 minutes ago',
    address: 'Queens Plaza, Queens, NY',
  },
];
