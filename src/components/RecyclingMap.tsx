import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { recyclingPoints, RecyclingPoint } from '@/data/recyclingPoints';
import { RecyclingPointModal } from './RecyclingPointModal';
import { MapPin, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface RecyclingMapProps {
  mapboxToken: string;
}

export const RecyclingMap: React.FC<RecyclingMapProps> = ({ mapboxToken }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<RecyclingPoint | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-73.9654, 40.7829],
      zoom: 12,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add markers for each recycling point
    recyclingPoints.forEach((point) => {
      const el = document.createElement('div');
      el.className = 'recycling-marker';
      el.style.width = '40px';
      el.style.height = '40px';
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.transition = 'var(--transition-smooth)';
      
      // Set color based on status
      if (point.status === 'available') {
        el.style.backgroundColor = 'hsl(var(--status-available))';
      } else if (point.status === 'nearly-full') {
        el.style.backgroundColor = 'hsl(var(--status-nearly-full))';
      } else {
        el.style.backgroundColor = 'hsl(var(--status-full))';
      }
      
      el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;

      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.1)';
        el.style.zIndex = '1000';
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
        el.style.zIndex = 'auto';
      });

      el.addEventListener('click', () => {
        setSelectedPoint(point);
      });

      const marker = new mapboxgl.Marker(el)
        .setLngLat([point.lng, point.lat])
        .addTo(map.current!);

      markers.current.push(marker);
    });

    return () => {
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
      map.current?.remove();
    };
  }, [mapboxToken]);

  const handleSearch = async () => {
    if (!searchQuery.trim() || !map.current) return;
    
    setIsSearching(true);
    
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${mapboxToken}&limit=1`
      );
      
      if (!response.ok) {
        throw new Error('Error en la búsqueda');
      }
      
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        map.current.flyTo({
          center: [lng, lat],
          zoom: 14,
          duration: 2000
        });
        
        toast({
          title: "Ubicación encontrada",
          description: data.features[0].place_name,
        });
      } else {
        toast({
          title: "No se encontraron resultados",
          description: "Intenta con otra dirección",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error en la búsqueda",
        description: "Por favor, intenta de nuevo",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const findNearest = () => {
    if (!map.current) return;
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          
          let nearest = recyclingPoints[0];
          let minDistance = Infinity;
          
          recyclingPoints.forEach(point => {
            const distance = Math.sqrt(
              Math.pow(point.lat - userLat, 2) + Math.pow(point.lng - userLng, 2)
            );
            if (distance < minDistance) {
              minDistance = distance;
              nearest = point;
            }
          });
          
          map.current?.flyTo({
            center: [nearest.lng, nearest.lat],
            zoom: 15,
            duration: 2000
          });
          
          setSelectedPoint(nearest);
          
          toast({
            title: "Punto más cercano",
            description: nearest.name,
          });
        },
        () => {
          toast({
            title: "Error de ubicación",
            description: "No se pudo acceder a tu ubicación",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Ubicación no disponible",
        description: "Tu navegador no soporta geolocalización",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      
      <div className="absolute top-4 left-4 right-4 z-10 flex gap-2 flex-col sm:flex-row">
        <div className="flex-1 bg-card rounded-lg shadow-elevated p-3">
          <div className="flex items-center gap-2">
            <Search className="text-primary w-5 h-5 flex-shrink-0" />
            <Input 
              placeholder="Buscar dirección..." 
              className="border-0 focus-visible:ring-0 p-0 h-auto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button 
              size="sm" 
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="sm:hidden"
            >
              {isSearching ? 'Buscando...' : 'Buscar'}
            </Button>
          </div>
        </div>
        <Button 
          className="sm:w-auto"
          onClick={findNearest}
        >
          Buscar Más Cercano
        </Button>
      </div>

      <div className="absolute bottom-4 left-4 z-10 bg-card rounded-lg shadow-elevated p-4 space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-status-available"></div>
          <span>Disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-status-nearlyFull"></div>
          <span>Casi Lleno</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-status-full"></div>
          <span>Lleno</span>
        </div>
      </div>

      {selectedPoint && (
        <RecyclingPointModal
          point={selectedPoint}
          isOpen={!!selectedPoint}
          onClose={() => setSelectedPoint(null)}
        />
      )}
    </div>
  );
};
