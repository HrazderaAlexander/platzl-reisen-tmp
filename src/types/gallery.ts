export interface GalleryImage {
  id: string;
  titel: string;
  beschreibung?: string;
  bild_url: string;
  ort: string;
  monat: string;
  jahr: number; // Bleibt number, wird aus Strapi number field gelesen
  reise_datum: string; // z.B. "November 2021"
  datum: string; // ISO date string from Strapi date field
  favorit: boolean;
  tags: string[];
  sortierung: number;
  aktiv: boolean;
  created_at: string;
  updated_at: string;
}

export interface GallerySettings {
  titel: string;
  untertitel: string;
  intro_text: string;
  email_kontakt: string;
  hinweis_text: string;
  archiv_titel: string;
}

export interface GalleryFilter {
  monat?: string;
  jahr?: number;
  ort?: string;
  searchTerm?: string;
}