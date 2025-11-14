import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { recyclingPoints, RecyclingPoint } from '@/data/recyclingPoints';
import { RecyclingPointModal } from './RecyclingPointModal';
import { MapPin, Search, Navigation, LocateFixed, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Checkbox } from '@/components/ui/checkbox';

interface RecyclingMapProps {
  mapboxToken: string;
}

export const RecyclingMap: React.FC<RecyclingMapProps> = ({ mapboxToken }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const userLocationMarker = useRef<mapboxgl.Marker | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<RecyclingPoint | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const { toast } = useToast();

  // Get unique materials from all recycling points
  const allMaterials = Array.from(
    new Set(recyclingPoints.flatMap(point => point.materials))
  ).sort();

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
    // Hide autocomplete when clicking on map
    map.current.on('click', () => {
      setShowSuggestions(false);
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  // Handle markers separately to allow filtering
  useEffect(() => {
    if (!map.current) return;

    // Remove existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Filter recycling points based on selected filters
    const filteredPoints = recyclingPoints.filter(point => {
      const statusMatch = selectedStatuses.length === 0 || selectedStatuses.includes(point.status);
      const materialMatch = selectedMaterials.length === 0 || 
        selectedMaterials.some(material => point.materials.includes(material));
      return statusMatch && materialMatch;
    });

    // Add markers for filtered recycling points
    filteredPoints.forEach((point) => {
      const el = document.createElement('div');
      el.className = 'recycling-marker';
      el.style.cursor = 'pointer';
      el.style.transition = 'transform 0.2s ease';
      
      // Set stroke color based on status
      let strokeColor = '';
      if (point.status === 'available') {
        strokeColor = 'hsl(var(--status-available))';
      } else if (point.status === 'nearly-full') {
        strokeColor = 'hsl(var(--status-nearly-full))';
      } else {
        strokeColor = 'hsl(var(--status-full))';
      }
      
      // Create MapPin icon without background circle
      el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;

      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.15)';
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
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
  }, [selectedStatuses, selectedMaterials]);

  const fetchSuggestions = async (query: string) => {
    if (!query.trim() || query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxToken}&limit=5&country=cl`
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

  const goToMyLocation = () => {
    if (!map.current) return;
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          //Borrar el marcador si es que existe (para simular actualización)
          if (userLocationMarker.current) {
            userLocationMarker.current.remove();
          }

          //Marcador

          const el = document.createElement('div');
          el.style.width = '20px';
          el.style.height = '20px';
          el.style.borderRadius = '50%';
          el.style.backgroundColor = '#3b82f6'; // Azul
          el.style.border = '3px solid white';
          el.style.boxShadow = '0 0 10px rgba(59, 130, 246, 0.5)';
          el.style.cursor = 'pointer';

          userLocationMarker.current = new mapboxgl.Marker({
            element: el,
            anchor: 'center'
          })
            .setLngLat([userLng,userLat])
            .addTo(map.current)

          
          map.current?.flyTo({
            center: [userLng, userLat],
            zoom: 15,
            duration: 2000
          });
          
          toast({
            title: "Ubicación encontrada",
            description: "El mapa se ha centrado en tu ubicación actual",
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

  const handleStatusToggle = (status: string) => {
    setSelectedStatuses(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const handleMaterialToggle = (material: string) => {
    setSelectedMaterials(prev =>
      prev.includes(material) ? prev.filter(m => m !== material) : [...prev, material]
    );
  };

  const clearFilters = () => {
    setSelectedStatuses([]);
    setSelectedMaterials([]);
  };

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      
      <div className="absolute top-4 left-4 right-20 z-20">
        <div className="relative bg-card rounded-lg shadow-elevated">
          <div className="flex items-center gap-2 p-3">
            <Search className="text-primary w-5 h-5 flex-shrink-0" />
            <Input 
              placeholder="Buscar dirección..." 
              className="rounded-sm border-0 focus:outline-none p-4px h-auto bg-transparent placeholder:text-muted-foreground/60"
              value={searchQuery}
              onChange={(e) => handleSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            />
            <Button 
              variant="ghost"
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="h-auto px-3 py-2"
            >
              Buscar
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className="h-auto px-3 py-2"
            >
              <Filter className="w-5 h-5" />
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

          {showFilters && (
            <Card className="absolute top-full left-0 right-0 mt-1 p-4 max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">Filtros</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                  className="h-auto p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Estado</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="status-available"
                        checked={selectedStatuses.includes('available')}
                        onCheckedChange={() => handleStatusToggle('available')}
                      />
                      <label htmlFor="status-available" className="flex items-center gap-2 text-sm cursor-pointer">
                        <div className="w-3 h-3 rounded-full bg-status-available"></div>
                        Disponible
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="status-nearly-full"
                        checked={selectedStatuses.includes('nearly-full')}
                        onCheckedChange={() => handleStatusToggle('nearly-full')}
                      />
                      <label htmlFor="status-nearly-full" className="flex items-center gap-2 text-sm cursor-pointer">
                        <div className="w-3 h-3 rounded-full bg-status-nearlyFull"></div>
                        Casi Lleno
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="status-full"
                        checked={selectedStatuses.includes('full')}
                        onCheckedChange={() => handleStatusToggle('full')}
                      />
                      <label htmlFor="status-full" className="flex items-center gap-2 text-sm cursor-pointer">
                        <div className="w-3 h-3 rounded-full bg-status-full"></div>
                        Lleno
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Materiales</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {allMaterials.map((material) => (
                      <div key={material} className="flex items-center gap-2">
                        <Checkbox
                          id={`material-${material}`}
                          checked={selectedMaterials.includes(material)}
                          onCheckedChange={() => handleMaterialToggle(material)}
                        />
                        <label htmlFor={`material-${material}`} className="text-sm cursor-pointer">
                          {material}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {(selectedStatuses.length > 0 || selectedMaterials.length > 0) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="w-full"
                  >
                    Limpiar filtros
                  </Button>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className="absolute bottom-4 right-4 z-10 h-14 w-14 rounded-full shadow-elevated"
              onClick={goToMyLocation}
            >
              <LocateFixed className="w-6 h-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Ubicación actual</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

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
