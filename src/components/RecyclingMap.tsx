import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { recyclingPoints, RecyclingPoint } from '@/data/recyclingPoints';
import { RecyclingPointModal } from './RecyclingPointModal';
import { MapPin, Search, Locate } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';

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
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-70.6109, -33.4272],
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
      el.style.cursor = 'pointer';
      
      // Create inner element for styling and animations
      const inner = document.createElement('div');
      inner.style.width = '40px';
      inner.style.height = '40px';
      inner.style.borderRadius = '50%';
      inner.style.display = 'flex';
      inner.style.alignItems = 'center';
      inner.style.justifyContent = 'center';
      inner.style.transition = 'transform 0.2s ease';
      
      // Set color based on status
      if (point.status === 'available') {
        inner.style.backgroundColor = 'hsl(var(--status-available))';
      } else if (point.status === 'nearly-full') {
        inner.style.backgroundColor = 'hsl(var(--status-nearly-full))';
      } else {
        inner.style.backgroundColor = 'hsl(var(--status-full))';
      }
      
      inner.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
      
      el.appendChild(inner);

      el.addEventListener('mouseenter', () => {
        inner.style.transform = 'scale(1.1)';
      });

      el.addEventListener('mouseleave', () => {
        inner.style.transform = 'scale(1)';
      });

      el.addEventListener('click', () => {
        setSelectedPoint(point);
      });

      const marker = new mapboxgl.Marker({
        element: el,
        anchor: 'center'
      })
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

  const fetchSuggestions = async (query: string) => {
    if (!query.trim() || query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxToken}&limit=5&country=cl&proximity=-70.6506,-33.4372`
      );
      
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.features || []);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSearchInput = (value: string) => {
    setSearchQuery(value);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion: any) => {
    const [lng, lat] = suggestion.center;
    setSearchQuery(suggestion.place_name);
    setShowSuggestions(false);
    
    map.current?.flyTo({
      center: [lng, lat],
      zoom: 14,
      duration: 2000
    });
    
    toast({
      title: "Ubicación encontrada",
      description: suggestion.place_name,
    });
  };

  const handleSearch = async () => {
    if (!searchQuery.trim() || !map.current) return;
    
    setIsSearching(true);
    setShowSuggestions(false);
    
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${mapboxToken}&limit=1&country=cl`
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
      
      <div className="absolute top-4 left-4 right-20 z-10">
        <div className="relative bg-card rounded-lg shadow-elevated">
          <div className="flex items-center gap-2 p-3">
            <Search className="text-primary w-5 h-5 flex-shrink-0" />
            <Input 
              placeholder="Buscar dirección..." 
              className="border-0 focus-visible:ring-0 p-0 h-auto"
              value={searchQuery}
              onChange={(e) => handleSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            />
            <Button 
              size="icon"
              variant="ghost"
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
          
          {showSuggestions && suggestions.length > 0 && (
            <Card className="absolute top-full left-0 right-0 mt-1 max-h-60 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-3 hover:bg-accent cursor-pointer transition-colors border-b last:border-b-0"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="text-sm font-medium">{suggestion.text}</div>
                  <div className="text-xs text-muted-foreground">{suggestion.place_name}</div>
                </div>
              ))}
            </Card>
          )}
        </div>
      </div>

      <Button
        size="icon"
        className="absolute bottom-20 right-4 z-10 h-14 w-14 rounded-full shadow-elevated"
        onClick={findNearest}
        title="Buscar punto más cercano"
      >
        <Locate className="w-6 h-6" />
      </Button>

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
