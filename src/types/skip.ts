export interface Skip {
  id: string;
  size: number;
  price_before_vat: number;
  vat: number;
  allows_heavy_waste: boolean;
  allowed_on_road: boolean;
  hire_period_days: number;
  description?: string;
}

export interface SelectedSkip extends Skip {
  total_price: number;
}

export type SortOption = 'price-asc' | 'price-desc' | 'size-asc' | 'size-desc' | 'hire-period';

export interface SkipFilters {
  minSize?: number;
  maxSize?: number;
  allowsHeavyWaste?: boolean;
  allowedOnRoad?: boolean;
  maxPrice?: number;
}

export interface SkipSortAndFilter {
  sortBy: SortOption;
  filters: SkipFilters;
}