import {
  Droplet,
  FileText,
  Wine,
  Zap,
  Package,
  Leaf,
  Cpu,
  Boxes,
  LucideIcon,
} from 'lucide-react';

export const getMaterialIcon = (material: string): LucideIcon => {
  const materialLower = material.toLowerCase();
  
  if (materialLower.includes('plastic') || materialLower.includes('plástico')) return Droplet;
  if (materialLower.includes('paper') || materialLower.includes('papel')) return FileText;
  if (materialLower.includes('cardboard') || materialLower.includes('cartón')) return Boxes;
  if (materialLower.includes('glass') || materialLower.includes('vidrio')) return Wine;
  if (materialLower.includes('metal')) return Zap;
  if (materialLower.includes('organic') || materialLower.includes('orgánico')) return Leaf;
  if (materialLower.includes('electronics') || materialLower.includes('electrónica') || materialLower.includes('e-waste')) return Cpu;
  
  return Package;
};
