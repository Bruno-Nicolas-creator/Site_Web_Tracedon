export interface CalculationResult {
  inventoryValue: number;
  taxReductionIS: number;
  vatRecovered: number;
  destructionSavings: number;
  netFinancialGain: number;
  co2SavedKg: number;
  finesAvoidedMin: number;
  finesAvoidedMax: number;
}

export type IndustryType = 'gms' | 'non_alimentaire' | 'textile' | 'agroalimentaire' | 'restauration';

export interface IndustryConfig {
  id: IndustryType;
  label: string;
  defaultStock: number;
  vatRate: number;
  co2Factor: number; // kg CO2 per €
  destructionRate: number; // % cost to incinerate/landfill
  relevantLaw: 'Loi Garot (Surfaces > 400m²)' | 'Loi AGEC (Zéro destruction neuf)';
  potentialSanction: string;
}

export interface DemoRequest {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  inventoryEstimated: string;
  preferredDate?: string;
  notes?: string;
}
