import React from 'react';
import { CheckCircle2, Truck, Zap, Clock, Shield } from 'lucide-react';
import { Skip, SelectedSkip } from '../types/skip';
import { useSkipStore } from '../store/skipStore';

interface SkipCardProps {
  skip: Skip;
}

export const SkipCard: React.FC<SkipCardProps> = ({ skip }) => {
  const { selectedSkip, selectSkip } = useSkipStore();
  const isSelected = selectedSkip?.id === skip.id;
  
  const totalPrice = skip.price_before_vat + (skip.price_before_vat * skip.vat / 100);
  
  const handleSelect = () => {
    const selectedSkipData: SelectedSkip = {
      ...skip,
      total_price: totalPrice
    };
    selectSkip(selectedSkipData);
  };

  const imageSrc = `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${skip.size}-yarder-skip.jpg`;

  return (
    <div 
      className={`
        relative bg-white rounded-2xl shadow-card transition-all duration-300 group cursor-pointer border-2
        ${isSelected 
          ? 'border-brand-primary shadow-interactive' 
          : 'border-transparent hover:shadow-card-hover hover:-translate-y-1'}
      `}
      onClick={handleSelect}
    >
      {/* Selected Checkmark */}
      {isSelected && (
        <div className="absolute -top-3 -right-3 z-10 bg-brand-primary rounded-full p-1.5 shadow-lg">
          <CheckCircle2 size={20} className="text-white" />
        </div>
      )}

      {/* Skip Image */}
      <div className="relative h-48 bg-neutral-100 rounded-t-xl overflow-hidden">
        <img
          src={imageSrc}
          alt={`${skip.size} yard skip`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
            if (fallback) fallback.classList.remove('hidden');
          }}
        />
        <div className="hidden absolute inset-0 flex items-center justify-center bg-neutral-100">
          <div className="text-neutral-500 text-center">
            <div className="w-16 h-16 mx-auto mb-2 bg-neutral-200 rounded-lg flex items-center justify-center">
              <Truck size={28} />
            </div>
            <p className="font-semibold">{skip.size} Yard Skip</p>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-bold text-neutral-800">
            {skip.size} Yard Skip
          </h3>
          <div className="bg-brand-secondary/10 text-brand-primary px-3 py-1 rounded-full text-sm font-bold">
            {skip.size} Yards
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <span className="text-3xl font-extrabold text-neutral-900">£{skip.price_before_vat.toFixed(0)}</span>
        </div>

        {/* Features */}
        <div className="space-y-2 text-sm text-neutral-600 mb-5">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-brand-secondary" />
            <span>{skip.hire_period_days} day hire period</span>
          </div>
          {skip.allows_heavy_waste && (
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-utility-warning" />
              <span>Suitable for heavy waste</span>
            </div>
          )}
          {skip.allowed_on_road && (
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-utility-success" />
              <span>Road placement available</span>
            </div>
          )}
        </div>
        
        {/* Description */}
        {skip.description && (
          <p className="text-xs text-neutral-500 mb-5 line-clamp-2 h-8">
            {skip.description}
          </p>
        )}

        {/* Action Button */}
        <button
          className={`
            w-full py-3 px-5 rounded-lg font-bold text-base transition-all duration-200 transform
            flex items-center justify-center gap-2
            ${isSelected 
              ? 'bg-brand-primary text-white cursor-default'
              : 'bg-neutral-100 text-neutral-700 hover:bg-brand-primary hover:text-white hover:scale-105 hover:shadow-lg'
            }
          `}
          disabled={isSelected}
        >
          {isSelected ? 'Selected' : 'Select This Skip'}
        </button>
      </div>
    </div>
  );
};