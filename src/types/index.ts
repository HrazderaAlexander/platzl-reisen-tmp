// Strapi API Response Types
export interface StrapiTrip {
  id: string;
  title: string;
  subtitle: string;
  short_description: string;
  full_description: string; // Rich text content
  price_included?: string; // Rich text for "IM PREIS ENTHALTEN"
  additional_info?: string; // Rich text for additional information
  category: 'therme' | 'sightseeing';
  featured_date: string;
  base_price: number;
  hotels: Hotel[];
  dates: TripDate[];
  gallery_images: string[];
  thermen: Therme[];
  price_entries: PriceEntry[];
  created_at: string;
  updated_at: string;
}

export interface Hotel {
  id: string;
  trip_id: string;
  name: string;
  stars: number;
  price: number;
  image_url: string;
  description: string;
  facilities: string; // HTML from rich text
  location: string; // New location field
  facility_icons: string[]; // Array of icon names
  sort_order: number;
  created_at: string;
}

export interface TripDate {
  id: string;
  trip_id: string;
  date: string;
  price: number;
  available: boolean;
  sort_order: number;
  created_at: string;
}

export interface Therme {
  id: string;
  name: string;
  titel: string;
  beschreibung: string;
  sort_order: number;
  active: boolean;
  created_at: string;
}

export interface PriceEntry {
  id: string;
  datum: string; // z.B. "Mo-Mo 18.08.-25.08."
  startdatum: string; // ISO date string
  enddatum: string; // ISO date string
  tage: number; // z.B. 8
  verfuegbar: boolean;
  sort_order: number;
  hotel_preise: HotelPrice[];
  created_at: string;
}

export interface HotelPrice {
  id: string;
  preis: number;
  verfuegbar: boolean;
  hotel: Hotel;
  created_at: string;
}

// Besichtigungsreisen Types
export interface SightseeingTrip {
  id: string;
  titel: string;
  untertitel: string;
  kurzbeschreibung: string;
  hauptbild: string;
  galerie_bilder: string[];
  grundpreis: number;
  ez_zuschlag: number;
  tage: number;
  lange_beschreibung: string;
  im_preis_enthalten: string;
  zusaetzliche_infos: string;
  reiseleitung: Reiseleiter | null;
  termine: SightseeingDate[];
  sortierung: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface SightseeingDate {
  id: string;
  datum_text: string;
  startdatum: string;
  enddatum: string;
  preis: number;
  ez_zuschlag: number;
  verfuegbar: boolean;
  plaetze_gesamt: number;
  plaetze_frei: number;
  sortierung: number;
  created_at: string;
}

export interface Reiseleiter {
  id: string;
  vorname: string;
  nachname: string;
  titel: string;
  foto: string;
  beschreibung: string;
  aktiv: boolean;
  sortierung: number;
  created_at: string;
}

// Main Trip type (same as StrapiTrip for compatibility)
export type Trip = StrapiTrip;

// Re-export gallery types
export type { GalleryImage, GallerySettings, GalleryFilter } from './gallery.js';