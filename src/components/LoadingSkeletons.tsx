import React from 'react';

export const SkipCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden border-2 border-transparent">
      <div className="h-48 bg-neutral-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
      </div>
      <div className="p-5">
        <div className="h-6 bg-neutral-200 rounded w-3/4 mb-3"></div>
        <div className="h-8 bg-neutral-200 rounded w-1/2 mb-4"></div>
        <div className="space-y-2 mb-5">
          <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
          <div className="h-4 bg-neutral-200 rounded w-full"></div>
          <div className="h-4 bg-neutral-200 rounded w-4/5"></div>
        </div>
        <div className="h-12 bg-neutral-200 rounded-lg"></div>
      </div>
    </div>
  );
};

export const LoadingSkeletons: React.FC = () => {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <SkipCardSkeleton key={index} />
      ))}
    </>
  );
};