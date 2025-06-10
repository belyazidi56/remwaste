import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SkipCard } from './SkipCard';
import { LoadingSkeletons } from './LoadingSkeletons';
import { ErrorMessage } from './ErrorMessage';
import { StickySelection } from './StickySelection';
import { SkipFilters } from './SkipFilters';
import { fetchSkips } from '../services/skipApi';
import { useSkipStore } from '../store/skipStore';
import type { SortOption, SkipFilters as SkipFiltersType } from '../types/skip';

export const SkipSelection: React.FC = () => {
  const { selectedSkip } = useSkipStore();
  const [filters, setFilters] = useState<SkipFiltersType>({});
  const [sortOption, setSortOption] = useState<SortOption>('price-asc');
  
  const handleFilterChange = (newFilters: SkipFiltersType) => {
    setFilters(newFilters);
  };
  
  const {
    data: skips,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['skips'],
    queryFn: () => fetchSkips(),
    staleTime: 5 * 60 * 1000
  });

  const filteredAndSortedSkips = useMemo(() => {
    if (!skips) return [];
    
    // Apply filters
    let result = [...skips];
        
    // Filter by size range
    if (filters.minSize !== undefined) {
      result = result.filter(skip => skip.size >= filters.minSize!);
    }
    
    if (filters.maxSize !== undefined) {
      result = result.filter(skip => skip.size <= filters.maxSize!);
    }
    
    // Filter by features
    if (filters.allowsHeavyWaste) {
      result = result.filter(skip => skip.allows_heavy_waste);
    }
    
    if (filters.allowedOnRoad) {
      result = result.filter(skip => skip.allowed_on_road);
    }
    
    // Filter by price
    if (filters.maxPrice !== undefined && filters.maxPrice > 0) {
      const maxPrice = filters.maxPrice;
      
      result = result.filter(skip => {
        const totalPrice = skip.price_before_vat
        return totalPrice <= maxPrice;
      });
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => {
          return a.price_before_vat - b.price_before_vat;
        });
        break;
      case 'price-desc':
        result.sort((a, b) => {
          return b.price_before_vat - a.price_before_vat;
        });
        break;
      case 'size-asc':
        result.sort((a, b) => a.size - b.size);
        break;
      case 'size-desc':
        result.sort((a, b) => b.size - a.size);
        break;
      case 'hire-period':
        result.sort((a, b) => a.hire_period_days - b.hire_period_days);
        break;
    }
    
    return result;
  }, [skips, filters, sortOption]);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans">
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-radial from-brand-primary/10 via-transparent to-transparent -z-10"></div>
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <header className="text-center mb-16 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-neutral-900 mb-4">
            Find the Perfect Skip
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Fast delivery, competitive pricing, and a size for every project.
          </p>
        </header>

        <SkipFilters 
          onFilterChange={handleFilterChange}
          onSortChange={setSortOption}
          initialSort={sortOption}
          initialFilters={filters}
        />

        <main 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32 animate-slide-up"
          style={{ animationDelay: '300ms' }}
        >
          {isLoading && <LoadingSkeletons />}
          {error && (
            <ErrorMessage
              message="We couldn't load the skips. Please try again."
              onRetry={() => refetch()}
            />
          )}
          {!isLoading && !error && filteredAndSortedSkips.length === 0 && (
            <div className="col-span-full text-center py-16">
              <h3 className="text-2xl font-semibold text-neutral-800">No Skips Found</h3>
              <p className="text-neutral-600 mt-2">Try adjusting your filters to see more results.</p>
            </div>
          )}
          {filteredAndSortedSkips.map((skip, index) => (
            <div 
              key={skip.id} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <SkipCard skip={skip} />
            </div>
          ))}
        </main>
      </div>

      {selectedSkip && <StickySelection />}
    </div>
  );
};