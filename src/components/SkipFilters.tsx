import React, { useState, useEffect, useRef } from 'react';
import { SortOption, SkipFilters as SkipFiltersType } from '../types/skip';
import { SlidersHorizontal, ArrowUpDown, Check } from 'lucide-react';

interface SkipFiltersProps {
  onFilterChange: (filters: SkipFiltersType) => void;
  onSortChange: (sortOption: SortOption) => void;
  initialFilters?: SkipFiltersType;
  initialSort?: SortOption;
}

export const SkipFilters: React.FC<SkipFiltersProps> = ({
  onFilterChange,
  onSortChange,
  initialFilters = {},
  initialSort = 'price-asc'
}) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<SkipFiltersType>(initialFilters);
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  
  // Handle clicks outside of dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFiltersOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFilterChange = (newFilters: Partial<SkipFiltersType>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
    setIsSortOpen(false);
    onSortChange(option);
  };

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'size-asc', label: 'Size: Small to Large' },
    { value: 'size-desc', label: 'Size: Large to Small' },
    { value: 'hire-period', label: 'Hire Period' }
  ];

  const getSortLabel = () => {
    return sortOptions.find(option => option.value === sortBy)?.label || 'Sort';
  };

  return (
    <div className="mb-8 animate-fade-in relative z-[999]" style={{ animationDelay: '200ms' }}>
      <div className="flex flex-wrap gap-4 items-center justify-end">

        <div className="flex gap-3">
          {/* Filter Button */}
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => {
                setIsFiltersOpen(!isFiltersOpen);
                if (!isFiltersOpen) setIsSortOpen(false);
              }}
              className={`flex items-center gap-2 px-4 py-3 rounded-full border ${
                Object.keys(filters).length > 1 || filters.allowsHeavyWaste || filters.allowedOnRoad
                  ? 'bg-brand-primary text-white border-brand-primary'
                  : 'bg-white/80 border-neutral-200 text-neutral-700'
              } transition-all duration-300 hover:bg-brand-primary/90 hover:text-white`}
            >
              <SlidersHorizontal size={18} />
              <span>Filter</span>
              {Object.keys(filters).length > 0 || filters.allowsHeavyWaste || filters.allowedOnRoad ? (
                <span className="ml-1 w-5 h-5 flex items-center justify-center bg-white text-brand-primary text-xs font-bold rounded-full">
                  {Object.keys(filters).filter(k => 
                    filters[k as keyof SkipFiltersType] !== undefined
                  ).length}
                </span>
              ) : null}
            </button>

            {isFiltersOpen && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-neutral-100 p-4 z-[1001] animate-fade-in">
                <h3 className="font-bold text-neutral-800 mb-3">Filters</h3>
                
                {/* Size Range */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Size (yards)</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      min={1}
                      max={20}
                      placeholder="Min"
                      value={filters.minSize || ''}
                      onChange={(e) => handleFilterChange({ minSize: e.target.value ? Number(e.target.value) : undefined })}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm"
                    />
                    <span className="text-neutral-400">to</span>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      placeholder="Max"
                      value={filters.maxSize || ''}
                      onChange={(e) => handleFilterChange({ maxSize: e.target.value ? Number(e.target.value) : undefined })}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm"
                    />
                  </div>
                </div>

                {/* Max Price */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Max Price (£)
                  </label>
                  <input
                    type="number"
                    min={0}
                    placeholder="Max price"
                    value={filters.maxPrice || ''}
                    onChange={(e) => handleFilterChange({ maxPrice: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm"
                  />
                </div>

                {/* Checkboxes */}
                <div className="space-y-3 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!filters.allowsHeavyWaste}
                      onChange={(e) => handleFilterChange({ allowsHeavyWaste: e.target.checked || undefined })}
                      className="w-4 h-4 text-brand-primary rounded focus:ring-brand-primary"
                    />
                    <span className="text-sm text-neutral-700">Allows Heavy Waste</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!filters.allowedOnRoad}
                      onChange={(e) => handleFilterChange({ allowedOnRoad: e.target.checked || undefined })}
                      className="w-4 h-4 text-brand-primary rounded focus:ring-brand-primary"
                    />
                    <span className="text-sm text-neutral-700">Allowed on Road</span>
                  </label>
                </div>

                {/* Reset Button */}
                <button
                  onClick={() => {
                    setFilters({});
                    onFilterChange({});
                  }}
                  className="w-full py-2 text-sm text-neutral-600 hover:text-neutral-800 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Sort Button */}
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => {
                setIsSortOpen(!isSortOpen);
                if (!isSortOpen) setIsFiltersOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-3 rounded-full bg-white/80 border border-neutral-200 text-neutral-700 transition-all duration-300 hover:bg-neutral-100"
            >
              <ArrowUpDown size={18} />
              <span>{getSortLabel()}</span>
            </button>

            {isSortOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-neutral-100 py-2 z-[1001] animate-fade-in">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortChange(option.value)}
                    className="w-full text-left px-4 py-2 text-neutral-700 hover:bg-neutral-50 flex items-center justify-between"
                  >
                    {option.label}
                    {sortBy === option.value && <Check size={16} className="text-brand-primary" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
