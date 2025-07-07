// src/data/actualites/types.ts
export interface ActualiteEntrepriseType {
  id: string;
  title: string;
  paragraphs: string[];
  backgroundThumbnail: string;
  video?: string;
  date?: string;
  tags?: string[];
  // Ajoute d'autres champs si besoin
}
