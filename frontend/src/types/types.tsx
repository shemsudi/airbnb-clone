interface Location {
  coordinates: {
    lat: number;
    lng: number;
  };
  country?: string;
  address?: string;
  floor?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  showExactLocation: boolean;
}

type Pricing = {
  nightlyRate?: number;
  currency?: string;
  smartPricing?: boolean;
};

interface Discount {
  weeklyDiscount?: number;
  monthlyDiscount?: number;
  newLPDiscount?: number;
}

interface LegalInfo {
  hostingType?: string;
  securityCameras?: {
    isAvailable?: boolean;
    description?: string;
  };
  noiseMonitors?: boolean;
  weapons?: boolean;
}

type HostedPlaces = {
  title: string;
  uuid: string;
  lastPage: string;
  isCompleted: boolean;
  structure: string;
  privacyType: string;
  description: string;
  visibility: string;
  highlights: string[];
  instantBook: string;
  guests: number;
  beds: number;
  bedrooms: number;
  bathrooms: number;
  location: Location;
  photos: string[];
  amenities: string[];
  uniqueAmenities?: string[];
  safetyAmenities?: string[];
  houseRules?: string[];
  pricing: Pricing;
  availability: {
    startDate?: Date;
    endDate?: Date;
    minStay?: number;
    maxStay?: number;
  };
  discount?: Discount;
  legalInfo?: LegalInfo;
  user: string;
  created_at?: Date;
  updated_at?: Date;
};

interface SearchParams {
  [key: string]: string;
  tab_id: string;
  refinement_paths: string;
  search_mode: string;
  flexible_trip_lengths: string;
  location_search: string;
  monthly_start_date: string;
  monthly_length: string;
  monthly_end_date: string;
  price_filter_input_type: string;
  channel: string;
  date_picker_type: string;
  search_type: string;
  price_filter_num_nights: string;
  category_tag: string;
}

export type { HostedPlaces, SearchParams };

export type { Location, Pricing, Discount, LegalInfo };
