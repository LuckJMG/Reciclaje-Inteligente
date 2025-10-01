import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RecyclingMap } from '@/components/RecyclingMap';
import { EducationalPosts } from '@/components/EducationalPosts';
import { MapboxTokenInput } from '@/components/MapboxTokenInput';
import { Map, BookOpen, Recycle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MAPBOX_TOKEN_KEY = 'mapbox_token';

const Index = () => {
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem(MAPBOX_TOKEN_KEY);
    if (savedToken) {
      setMapboxToken(savedToken);
    }
  }, []);

  const handleTokenSubmit = (token: string) => {
    localStorage.setItem(MAPBOX_TOKEN_KEY, token);
    setMapboxToken(token);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity w-fit"
            onClick={() => navigate('/')}
          >
            <div className="p-2 rounded-lg bg-gradient-eco">
              <Recycle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Reciclaje Inteligente</h1>
              <p className="text-xs text-muted-foreground">Encuentra, Aprende, Recicla</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="map" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6 shadow-soft">
            <TabsTrigger value="map" className="gap-2">
              <Map className="w-4 h-4" />
              <span className="hidden sm:inline">Mapa</span>
            </TabsTrigger>
            <TabsTrigger value="learn" className="gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Aprende</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="mt-0">
            <div className="h-[calc(100vh-200px)] rounded-lg overflow-hidden shadow-elevated bg-card">
              {mapboxToken ? (
                <RecyclingMap mapboxToken={mapboxToken} />
              ) : (
                <MapboxTokenInput onTokenSubmit={handleTokenSubmit} />
              )}
            </div>
          </TabsContent>

          <TabsContent value="learn" className="mt-0">
            <div className="h-[calc(100vh-200px)] rounded-lg overflow-hidden shadow-elevated bg-card p-4 sm:p-6">
              <EducationalPosts />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
