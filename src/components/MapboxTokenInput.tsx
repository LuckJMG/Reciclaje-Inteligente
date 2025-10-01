import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface MapboxTokenInputProps {
  onTokenSubmit: (token: string) => void;
}

export const MapboxTokenInput: React.FC<MapboxTokenInputProps> = ({ onTokenSubmit }) => {
  const [token, setToken] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      onTokenSubmit(token.trim());
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <Card className="w-full max-w-md shadow-elevated">
        <CardHeader className="space-y-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-center text-xl">Token de Mapbox Requerido</CardTitle>
          <CardDescription className="text-center">
            Ingresa tu token público de Mapbox para ver el mapa interactivo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription className="text-sm">
              ¿No tienes un token? Obtén uno gratis en{' '}
              <a
                href="https://account.mapbox.com/access-tokens/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                mapbox.com
                <ExternalLink className="w-3 h-3" />
              </a>
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="pk.eyJ1Ijoi..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="font-mono text-sm"
            />
            <Button type="submit" className="w-full" disabled={!token.trim()}>
              Cargar Mapa
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center">
            Tu token se guarda localmente en tu navegador
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
