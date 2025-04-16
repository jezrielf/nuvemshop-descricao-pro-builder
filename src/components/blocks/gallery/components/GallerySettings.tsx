
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GallerySettingsProps {
  imageFit: string;
  onImageFitChange: (value: string) => void;
}

const GallerySettings: React.FC<GallerySettingsProps> = ({ 
  imageFit, 
  onImageFitChange 
}) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-sm font-medium">Imagens da Galeria</h3>
      <div>
        <label className="text-xs mr-2">Preenchimento da Imagem:</label>
        <Select value={imageFit} onValueChange={onImageFitChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Escolha o tipo de preenchimento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="contain">Conter (mostrar imagem inteira)</SelectItem>
            <SelectItem value="cover">Cobrir (preencher todo o espaço)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default GallerySettings;
