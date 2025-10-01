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
  
  if (materialLower.includes('plastic')) return Droplet;
  if (materialLower.includes('paper')) return FileText;
  if (materialLower.includes('cardboard')) return Boxes;
  if (materialLower.includes('glass')) return Wine;
  if (materialLower.includes('metal')) return Zap;
  if (materialLower.includes('organic')) return Leaf;
  if (materialLower.includes('electronics') || materialLower.includes('e-waste')) return Cpu;
  
  return Package;
};
