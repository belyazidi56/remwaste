import React from 'react';
import { ArrowRight, X, Truck } from 'lucide-react';
import { useSkipStore } from '../store/skipStore';

export const StickySelection: React.FC = () => {
  const { selectedSkip, clearSelection } = useSkipStore();

  if (!selectedSkip) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-sm border-t border-neutral-200 shadow-2xl z-50 animate-slide-up">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center">
              <Truck className="w-6 h-6 text-brand-primary" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-800">
                {selectedSkip.size} Yard Skip
              </h3>
              <p className="text-sm text-neutral-600">
                Total Price: <span className="font-bold text-neutral-900">£{selectedSkip.total_price.toFixed(0)}</span> inc. VAT & Delivery
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearSelection}
              className="p-2 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-200 rounded-full transition-colors"
              aria-label="Clear selection"
            >
              <X size={18} />
            </button>
            
            <button className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3 rounded-lg font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 animate-pulse-strong">
              Continue to Checkout
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};