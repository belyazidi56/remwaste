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