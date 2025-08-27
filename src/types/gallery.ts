export interface GalleryImage {
  id: string;
  titel: string;
  beschreibung?: string;
  bild_url: string;
  ort: string;
  reise_datum: string; // ISO date string from Strapi date field
  favorit: boolean;
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
  month?: string;
  year?: number;
  ort?: string;
  searchTerm?: string;
}