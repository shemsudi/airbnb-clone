interface HostedPlaces {
  title?: string;
  lastPage?: string;
  isCompleted?: boolean;
  structure?: string;
  privacyType?: string;
  description?: string;
  visibility?: string;
  highlights?: string[];
  instantBook?: string;
  guests?: number;
  beds?: number;
  bedrooms?: number;
  bathrooms?: number;
  location?: Location;
  photos?: string[];
  amenities?: string[];
  uniqueAmenities?: string[];
  safetyAmenities?: string[];
  houseRules?: string[];
  availability?: {
    startDate?: Date;
    endDate?: Date;
    minStay?: number;
    maxStay?: number;
  };
  created_at?: Date;
  updated_at?: Date;
}




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

export type {HostedPlaces,SearchParams};