import { useState, useEffect } from 'react';
import { reisebedingungenService } from '../lib/api/reisebedingungenService';
import { dataTransformers } from '../lib/api/dataTransformers'; // 👈 WICHTIGER IMPORT

interface ReisebedingungenData {
  titel: string;
  buchungstelefon: string;
  service_titel: string;
  service_punkte: Array<{ text: string; sortierung: number }>;
  ansprechpartner_titel: string;
  ansprechpartner_name: string;
  ansprechpartner_position: string;
  ansprechpartner_telefon: string;
  ansprechpartner_mobil: string;
  ansprechpartner_email: string;
  ansprechpartner_foto: string;
  inhaltsblocks: Array<{
    titel: string;
    text: string; // Wird jetzt HTML enthalten
    icon_typ: string;
    farbe: string;
    sortierung: number;
  }>;
}

export const useReisebedingungen = () => {
  const [reisebedingungenData, setReisebedingungenData] = useState<ReisebedingungenData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  // Mock-Daten (Text sollte als Markdown formatiert sein)
  const mockData = {
    titel: "ALLGEMEINE REISEBEDINGUNGEN",
    buchungstelefon: "0732 / 27 27 17",
    service_titel: "MASSGESCHNEIDERTE BUSREISEN MIT \"PLATZL-SERVICE\" SEIT 80 JAHREN",
    service_punkte: [
      { text: "erfahrene Reiseleiter & freundliche Fahrer", sortierung: 0 },
      { text: "moderne & komfortable Reisebusse", sortierung: 1 },
      { text: "Ihr Urlaub beginnt schon zu Hause - ohne Auto, Stress und Hektik", sortierung: 2 },
      { text: "interessante Reiseziele zu den besten Plätzen in ganz Europa", sortierung: 3 },
      { text: "persönliche Beratung für Ihren Kultur- oder Gesundheitsurlaub", sortierung: 4 },
      { text: "sehr günstige Kreuzfahrten inkl. Transfer und Platzl-Reisebegleitung", sortierung: 5 }
    ],
    ansprechpartner_titel: "IHR ANSPRECHPARTNER FÜR FRAGEN",
    ansprechpartner_name: "Harald Platzl",
    ansprechpartner_position: "Geschäftsführung, Gruppenreisen, Busreservierung, Reisekatalog",
    ansprechpartner_telefon: "07227 - 8198",
    ansprechpartner_mobil: "0676 - 407 61 80",
    ansprechpartner_email: "info@platzl-reisen.at",
    ansprechpartner_foto: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
    inhaltsblocks: [
      {
        titel: "Achtung",
        text: "**Die Vergabe der Sitzplätze** erfolgt in der Reihenfolge der Anmeldung.\nKleine Änderungen infolge einer Veränderung des Buseinsatzplanes behalten wir uns vor!",
        icon_typ: "warning", farbe: "gelb", sortierung: 0
      },
      {
        titel: "Zustieg",
        text: "St. Marien, Steyr-Tabor, Urfahr Info-Jahrmarktgelände, Linz Hbf., Stadtplatz Traun, Bhf. Wels – weitere Zustiegsmöglichkeiten nur bis 10 Tage vor Abreise. Kostenlose Abholung in Oberösterreich ab 6 Personen, an einer gemeinsamen Abholstelle, gratis Parkmöglichkeiten beim Platzl-Büro in St. Marien.",
        icon_typ: "location", farbe: "gruen", sortierung: 1
      },
      {
        titel: "Rauchen",
        text: "Wir bitten um Verständnis für das **Rauchverbot** in den Bussen, Zigarettenpausen werden eingelegt.",
        icon_typ: "smoking", farbe: "rot", sortierung: 2
      },
    ]
  };

  useEffect(() => {
    const processAndSetData = (rawData: any) => {
      // Wende die Markdown-Konvertierung auf jeden Inhaltsblock an
      const transformedInhaltsblocks = rawData.inhaltsblocks?.map((block: any) => ({
        ...block,
        text: dataTransformers.markdownToHtml(block.text),
      })) || [];

      const finalData: ReisebedingungenData = {
        ...rawData,
        ansprechpartner_foto: dataTransformers.getMediaUrl(rawData.ansprechpartner_foto),
        inhaltsblocks: transformedInhaltsblocks.sort((a: any, b: any) => a.sortierung - b.sortierung),
        service_punkte: rawData.service_punkte?.sort((a: any, b: any) => a.sortierung - b.sortierung) || [],
      };
      
      setReisebedingungenData(finalData);
    };

    const fetchReisebedingungenData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await reisebedingungenService.getReisebedingungenData();
        
        if (response && response.data) {
          processAndSetData(response.data);
          setUsingMockData(false);
        } else {
          setError('Keine Daten von der API erhalten.');
          processAndSetData(mockData);
          setUsingMockData(true);
        }
      } catch (err) {
        console.error('Error fetching reisebedingungen data:', err);
        setError(err instanceof Error ? err.message : 'Fehler beim Laden der Daten.');
        processAndSetData(mockData);
        setUsingMockData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchReisebedingungenData();
  }, []);

  return { reisebedingungenData, loading, error, usingMockData };
};