import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Map, BookOpen, Recycle, MapPin, Clock, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-6 rounded-2xl bg-gradient-eco shadow-elevated">
            <Recycle className="w-16 h-16 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
          Reciclaje Inteligente
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          La forma más fácil de encontrar puntos de reciclaje en Santiago, 
          verificar su disponibilidad y aprender a reciclar correctamente
        </p>
        
        <Button 
          size="lg" 
          className="text-lg px-8 py-6 shadow-elevated"
          onClick={() => navigate('/app')}
        >
          Comenzar a Reciclar
        </Button>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          ¿Qué puedes hacer?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-elevated hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-lg bg-primary/10">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                Encuentra Puntos Cercanos
              </h3>
              <p className="text-muted-foreground text-center">
                Localiza fácilmente los puntos de reciclaje más cercanos a tu ubicación o busca por dirección
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-elevated hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-lg bg-primary/10">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                Verifica Disponibilidad
              </h3>
              <p className="text-muted-foreground text-center">
                Consulta el estado en tiempo real de los contenedores y sus horarios de atención
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-elevated hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-lg bg-primary/10">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                Aprende a Reciclar
              </h3>
              <p className="text-muted-foreground text-center">
                Accede a guías completas sobre cómo separar y preparar diferentes materiales para reciclar
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Impact Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-eco text-white shadow-elevated">
          <CardContent className="py-12 text-center">
            <Leaf className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Haz la Diferencia
            </h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
              Cada acción cuenta. Al reciclar correctamente, contribuyes a reducir la contaminación, 
              conservar recursos naturales y construir un futuro más sostenible para todos
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8"
              onClick={() => navigate('/app')}
            >
              Únete al Cambio
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        <p>Reciclaje Inteligente • Santiago, Chile • 2025</p>
      </footer>
    </div>
  );
};

export default Landing;
