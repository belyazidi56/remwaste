import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { SkipCard } from './SkipCard';
import { LoadingSkeletons } from './LoadingSkeletons';
import { ErrorMessage } from './ErrorMessage';
import { StickySelection } from './StickySelection';
import { fetchSkips } from '../services/skipApi';
import { useSkipStore } from '../store/skipStore';

export const SkipSelection: React.FC = () => {
  const { selectedSkip } = useSkipStore();
  
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

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans">
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-radial from-brand-primary/10 via-transparent to-transparent -z-10"></div>
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <header className="text-center mb-16 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-neutral-900 mb-4">
            Find the Perfect Skip
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Fast delivery, competitive pricing, and a size for every project. All prices include VAT.
          </p>
        </header>

        <main 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32 animate-slide-up"
          style={{ animationDelay: '300ms' }}
        >
          {isLoading && <LoadingSkeletons />}
          {error && (
            <ErrorMessage
              message="Unable to load skip options. Please try again."
              onRetry={() => refetch()}
            />
          )}
          {skips && skips.map((skip, index) => (
            <div 
              key={skip.id} 
              className="animate-slide-up"
              style={{ animationDelay: `${400 + index * 100}ms` }}
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