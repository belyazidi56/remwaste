import { Skip } from '../types/skip';

const API_BASE_URL = 'https://app.wewantwaste.co.uk/api';

export const fetchSkips = async (postcode: string = 'NR32', area: string = 'Lowestoft'): Promise<Skip[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/skips/by-location?postcode=${postcode}&area=${area}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform the API response to match our Skip interface
    return data.map((skip: any) => ({
      id: skip.id?.toString() || Math.random().toString(),
      size: skip.size || skip.yards || 0,
      price_before_vat: skip.price_before_vat || skip.price || 0,
      vat: skip.vat || 20,
      allows_heavy_waste: skip.allows_heavy_waste || false,
      allowed_on_road: skip.allowed_on_road || true,
      hire_period_days: skip.hire_period_days || 7,
      description: skip.description || `${skip.size || skip.yards} yard skip for your waste disposal needs`
    }));
  } catch (error) {
    console.error('Error fetching skips:', error);
    
    // Fallback to mock data if API fails
    const mockSkips: Skip[] = [
      {
        id: '1',
        size: 4,
        price_before_vat: 189,
        vat: 20,
        allows_heavy_waste: false,
        allowed_on_road: true,
        hire_period_days: 7,
        description: 'Perfect for small home renovations'
      },
      {
        id: '2',
        size: 6,
        price_before_vat: 250,
        vat: 20,
        allows_heavy_waste: true,
        allowed_on_road: true,
        hire_period_days: 14,
        description: 'Ideal for medium-sized projects'
      },
      {
        id: '3',
        size: 8,
        price_before_vat: 271,
        vat: 20,
        allows_heavy_waste: true,
        allowed_on_road: true,
        hire_period_days: 7,
        description: 'Great for larger home clearances'
      },
      {
        id: '4',
        size: 10,
        price_before_vat: 325,
        vat: 20,
        allows_heavy_waste: true,
        allowed_on_road: false,
        hire_period_days: 7,
        description: 'Suitable for construction waste'
      },
      {
        id: '5',
        size: 12,
        price_before_vat: 375,
        vat: 20,
        allows_heavy_waste: true,
        allowed_on_road: false,
        hire_period_days: 14,
        description: 'Large capacity for major projects'
      },
      {
        id: '6',
        size: 14,
        price_before_vat: 425,
        vat: 20,
        allows_heavy_waste: true,
        allowed_on_road: false,
        hire_period_days: 14,
        description: 'Maximum capacity for commercial use'
      }
    ];
    
    return mockSkips;
  }
};