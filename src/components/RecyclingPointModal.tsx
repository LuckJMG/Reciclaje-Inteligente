import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { RecyclingPoint } from '@/data/recyclingPoints';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, RefreshCw, Trash2 } from 'lucide-react';
import { getMaterialIcon } from '@/utils/materialIcons';

interface RecyclingPointModalProps {
  point: RecyclingPoint;
  isOpen: boolean;
  onClose: () => void;
}

export const RecyclingPointModal: React.FC<RecyclingPointModalProps> = ({
  point,
  isOpen,
  onClose,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-status-available text-white';
      case 'nearly-full':
        return 'bg-status-nearlyFull text-white';
      case 'full':
        return 'bg-status-full text-white';
      default:
        return 'bg-muted';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Disponible';
      case 'nearly-full':
        return 'Casi Lleno';
      case 'full':
        return 'Lleno';
      default:
        return status;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{point.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">{point.address}</p>
          </div>

          <div className="flex items-center justify-between py-3 border-y">
            <div className="flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-primary" />
              <span className="font-medium">Estado del Contenedor</span>
            </div>
            <Badge className={getStatusColor(point.status)}>
              {getStatusText(point.status)}
            </Badge>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <RefreshCw className="w-5 h-5 text-primary" />
              <span className="font-medium">Materiales Aceptados</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {point.materials.map((material) => {
                const Icon = getMaterialIcon(material);
                return (
                  <Badge key={material} variant="secondary" className="gap-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    {material}
                  </Badge>
                );
              })}
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium mb-1">Horario de Atención</p>
              <p className="text-muted-foreground">{point.hours}</p>
            </div>
          </div>

          <div className="pt-2 border-t text-xs text-muted-foreground">
            Última actualización: {point.lastUpdate}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
