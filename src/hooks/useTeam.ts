import { useState, useEffect } from 'react';
import { strapiApi } from '../lib/api/strapiClient';
import { dataTransformers } from '../lib/api/dataTransformers';

interface TeamMember {
  id: string;
  vorname: string;
  nachname: string;
  position: string;
  aufgaben: string;
  telefon: string;
  mobil: string;
  email: string;
  foto: string;
  kategorie: 'geschaeftsfuehrung' | 'buero_st_marien' | 'buero_linz' | 'fahrer' | 'kleinbusfahrer' | 'reiseleiter';
  sortierung: number;
  aktiv: boolean;
}

interface TeamSettings {
  titel: string;
  untertitel: string;
  team_foto: string;
  buero_st_marien_titel: string;
  buero_st_marien_oeffnungszeiten: string;
  buero_st_marien_betriebsurlaub: string;
  buero_linz_titel: string;
  buero_linz_oeffnungszeiten: string;
  buero_linz_betriebsurlaub: string;
}

export const useTeam = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [teamSettings, setTeamSettings] = useState<TeamSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  // Mock data basierend auf den Bildern
  const mockTeamMembers: TeamMember[] = [
    // Geschäftsführung
    {
      id: '1',
      vorname: 'Harald',
      nachname: 'Platzl',
      position: 'Geschäftsführung',
      aufgaben: 'Geschäftsführung, Gruppenreisen, Busreservierung, Reisekatalog',
      telefon: '07227 - 8198',
      mobil: '0676 - 407 61 80',
      email: 'info@platzl-reisen.at',
      foto: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      kategorie: 'geschaeftsfuehrung',
      sortierung: 0,
      aktiv: true
    },
    // Büro St. Marien
    {
      id: '2',
      vorname: 'Martina',
      nachname: 'Platzl',
      position: 'Vereinsausflüge, Angebote',
      aufgaben: 'Vereinsausflüge, Angebote',
      telefon: '07227 - 8198',
      mobil: '',
      email: 'martina@platzl-reisen.at',
      foto: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400',
      kategorie: 'buero_st_marien',
      sortierung: 0,
      aktiv: true
    },
    {
      id: '3',
      vorname: 'Sandra',
      nachname: 'Aschauer',
      position: 'Buchung Reiseprogramm–Bus',
      aufgaben: 'Buchung Reiseprogramm–Bus',
      telefon: '07227 - 8198',
      mobil: '',
      email: 'sandra@platzl-reisen.at',
      foto: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
      kategorie: 'buero_st_marien',
      sortierung: 1,
      aktiv: true
    },
    {
      id: '4',
      vorname: 'Erika',
      nachname: 'Baumgartner',
      position: 'Buchung Reiseprogramm–Bus',
      aufgaben: 'Buchung Reiseprogramm–Bus',
      telefon: '07227 - 8198',
      mobil: '',
      email: 'erika@platzl-reisen.at',
      foto: 'https://images.pexels.com/photos/3785078/pexels-photo-3785078.jpeg?auto=compress&cs=tinysrgb&w=400',
      kategorie: 'buero_st_marien',
      sortierung: 2,
      aktiv: true
    },
    // Büro Linz
    {
      id: '5',
      vorname: 'Carmen',
      nachname: 'Hauel',
      position: 'Buchungsbüro Linz',
      aufgaben: 'Buchungsbüro Linz',
      telefon: '0732 272717',
      mobil: '',
      email: 'linz@platzl-reisen.at',
      foto: 'https://images.pexels.com/photos/3785076/pexels-photo-3785076.jpeg?auto=compress&cs=tinysrgb&w=400',
      kategorie: 'buero_linz',
      sortierung: 0,
      aktiv: true
    },
    // Fahrer
    {
      id: '6',
      vorname: 'Rudolf',
      nachname: 'Reischl',
      position: 'Fahrer',
      aufgaben: 'Busfahrer für Mehrtagesreisen',
      telefon: '',
      mobil: '',
      email: '',
      foto: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      kategorie: 'fahrer',
      sortierung: 0,
      aktiv: true
    },
    {
      id: '7',
      vorname: 'Gerold',
      nachname: 'Stiftner',
      position: 'Fahrer',
      aufgaben: 'Busfahrer für Mehrtagesreisen',
      telefon: '',
      mobil: '',
      email: '',
      foto: 'https://images.pexels.com/photos/2182969/pexels-photo-2182969.jpeg?auto=compress&cs=tinysrgb&w=400',
      kategorie: 'fahrer',
      sortierung: 1,
      aktiv: true
    },
    // Kleinbusfahrer
    {
      id: '8',
      vorname: 'Ernst',
      nachname: 'Ruppert',
      position: 'Kleinbusfahrer',
      aufgaben: 'Kleinbusfahrer für Tagesausflüge',
      telefon: '',
      mobil: '',
      email: '',
      foto: 'https://images.pexels.com/photos/2182968/pexels-photo-2182968.jpeg?auto=compress&cs=tinysrgb&w=400',
      kategorie: 'kleinbusfahrer',
      sortierung: 0,
      aktiv: true
    },
    {
      id: '9',
      vorname: 'Karl',
      nachname: 'Brandstätter',
      position: 'Kleinbusfahrer',
      aufgaben: 'Kleinbusfahrer für Tagesausflüge',
      telefon: '',
      mobil: '',
      email: '',
      foto: 'https://images.pexels.com/photos/2182967/pexels-photo-2182967.jpeg?auto=compress&cs=tinysrgb&w=400',
      kategorie: 'kleinbusfahrer',
      sortierung: 1,
      aktiv: true
    },
    // Reiseleiter
    {
      id: '10',
      vorname: 'Christine',
      nachname: 'Schultz',
      position: 'Reiseleiterin',
      aufgaben: 'Reiseleitung für Besichtigungsreisen',
      telefon: '',
      mobil: '',
      email: '',
      foto: 'https://images.pexels.com/photos/3785075/pexels-photo-3785075.jpeg?auto=compress&cs=tinysrgb&w=400',
      kategorie: 'reiseleiter',
      sortierung: 0,
      aktiv: true
    },
    {
      id: '11',
      vorname: 'Franz',
      nachname: 'Landerl',
      position: 'Reiseleiter',
      aufgaben: 'Reiseleitung für Besichtigungsreisen',
      telefon: '',
      mobil: '',
      email: '',
      foto: 'https://images.pexels.com/photos/2182966/pexels-photo-2182966.jpeg?auto=compress&cs=tinysrgb&w=400',
      kategorie: 'reiseleiter',
      sortierung: 1,
      aktiv: true
    }
  ];

  const mockTeamSettings: TeamSettings = {
    titel: 'UNSER TEAM',
    untertitel: 'Unser engagiertes, gut ausgebildetes Team kümmert sich gerne um Ihre Anfragen.',
    team_foto: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200',
    buero_st_marien_titel: 'BÜRO ST. MARIEN',
    buero_st_marien_oeffnungszeiten: '<p><strong>Öffnungszeiten</strong></p><p>Montag bis Donnerstag von 08:30 bis 14:00 Uhr</p><p>Freitag (nur telefonisch) von 08:30 - 12:00 Uhr</p>',
    buero_st_marien_betriebsurlaub: 'Betriebsurlaub: 11. - 15. August 2025',
    buero_linz_titel: 'BÜRO LINZ',
    buero_linz_oeffnungszeiten: '<p><strong>Öffnungszeiten</strong></p><p>Montag bis Donnerstag von 08:30 - 14:00 Uhr</p><p>Freitag (nur telefonisch) von 08:30 - 12:00 Uhr</p>',
    buero_linz_betriebsurlaub: 'Betriebsurlaub: 28. Juli - 01. August 2025'
  };

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('=== LOADING TEAM DATA ===');
        
        // Team Members laden
        const membersResponse = await strapiApi.get('/team-members', {
          params: {
            populate: {
              foto: true
            },
            filters: {
              aktiv: true
            },
            sort: ['kategorie:asc', 'sortierung:asc', 'nachname:asc']
          }
        });
        
        // Team Settings laden
        const settingsResponse = await strapiApi.get('/team-settings', {
          params: {
            populate: {
              team_foto: true
            }
          }
        });
        
        console.log('=== TEAM API RESPONSES ===');
        console.log('Members Response:', membersResponse.data);
        console.log('Settings Response:', settingsResponse.data);
        
        if (membersResponse.data?.data && settingsResponse.data?.data) {
          // Transform team members
          const transformedMembers: TeamMember[] = membersResponse.data.data.map((member: any) => {
            const memberData = member.attributes || member;
            return {
              id: member.id.toString(),
              vorname: memberData.vorname || '',
              nachname: memberData.nachname || '',
              position: memberData.position || '',
              aufgaben: memberData.aufgaben || '',
              telefon: memberData.telefon || '',
              mobil: memberData.mobil || '',
              email: memberData.email || '',
              foto: dataTransformers.getMediaUrl(memberData.foto),
              kategorie: memberData.kategorie || 'buero_st_marien',
              sortierung: memberData.sortierung || 0,
              aktiv: memberData.aktiv !== false,
            };
          });
          
          // Transform team settings
          const settingsData = settingsResponse.data.data;
          const transformedSettings: TeamSettings = {
            titel: settingsData.titel || mockTeamSettings.titel,
            untertitel: settingsData.untertitel || mockTeamSettings.untertitel,
            team_foto: dataTransformers.getMediaUrl(settingsData.team_foto) || mockTeamSettings.team_foto,
            buero_st_marien_titel: settingsData.buero_st_marien_titel || mockTeamSettings.buero_st_marien_titel,
            buero_st_marien_oeffnungszeiten: dataTransformers.richTextToHtml(settingsData.buero_st_marien_oeffnungszeiten) || mockTeamSettings.buero_st_marien_oeffnungszeiten,
            buero_st_marien_betriebsurlaub: settingsData.buero_st_marien_betriebsurlaub || mockTeamSettings.buero_st_marien_betriebsurlaub,
            buero_linz_titel: settingsData.buero_linz_titel || mockTeamSettings.buero_linz_titel,
            buero_linz_oeffnungszeiten: dataTransformers.richTextToHtml(settingsData.buero_linz_oeffnungszeiten) || mockTeamSettings.buero_linz_oeffnungszeiten,
            buero_linz_betriebsurlaub: settingsData.buero_linz_betriebsurlaub || mockTeamSettings.buero_linz_betriebsurlaub,
          };
          
          setTeamMembers(transformedMembers);
          setTeamSettings(transformedSettings);
          setUsingMockData(false);
        } else {
          console.log('No team data, using mock data');
          setTeamMembers(mockTeamMembers);
          setTeamSettings(mockTeamSettings);
          setUsingMockData(true);
        }
      } catch (err) {
        console.error('Error fetching team data:', err);
        setError(err instanceof Error ? err.message : 'Fehler beim Laden der Team-Daten');
        setTeamMembers(mockTeamMembers);
        setTeamSettings(mockTeamSettings);
        setUsingMockData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  // Helper functions
  const getMembersByCategory = (category: TeamMember['kategorie']) => {
    return teamMembers.filter(member => member.kategorie === category);
  };

  const getCategoryTitle = (category: TeamMember['kategorie']) => {
    const titles = {
      geschaeftsfuehrung: 'Geschäftsführung',
      buero_st_marien: teamSettings?.buero_st_marien_titel || 'BÜRO ST. MARIEN',
      buero_linz: teamSettings?.buero_linz_titel || 'BÜRO LINZ',
      fahrer: 'FAHRER',
      kleinbusfahrer: 'KLEINBUSFAHRER',
      reiseleiter: 'REISELEITER'
    };
    return titles[category];
  };

  return { 
    teamMembers, 
    teamSettings, 
    loading, 
    error, 
    usingMockData,
    getMembersByCategory,
    getCategoryTitle
  };
};