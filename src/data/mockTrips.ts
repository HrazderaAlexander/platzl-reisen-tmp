// Mock-Daten für Entwicklung und Testing
import { Trip } from '../types';

export const mockTrips: Trip[] = [
  {
    id: '1',
    title: 'Portoroz - Erholung & Sommerurlaub an der Adria',
    subtitle: 'Thermenhotels und Hotels mit beheizten Meerwasserpools direkt am Meer!',
    short_description: 'Mediterrane Düfte, Palmen, Meer und Salz – Portoroz bietet Erholung mit traumhaftem Urlaubs-Gefühl.',
    full_description: `
      <p>Mediterrane Düfte, Palmen, Meer und Salz – Portoroz bietet Erholung mit traumhaftem Urlaubs-Gefühl. Freuen Sie sich auf einen Wellnessurlaub direkt am Meer in den Hotels der Gruppe Bernardin oder auf einen Gesundheitsurlaub mit Thermenzugang in den Life-Class-Hotels.</p>
    `,
    price_included: `
      <ul>
        <li>Fahrt mit modernem 4* Platzl-Reisebus (Rückfahrt ca. 12.30 Uhr)</li>
        <li>Frühstücksjause mit Getränk im Bus</li>
        <li>Nächtigungen im gewünschten Hotel</li>
        <li>Bademantel während des Aufenthaltes (ausgenommen Vile Park – nur gegen Gebühr)</li>
        <li>Eintritt in die Badelandschaft</li>
        <li>Kurtaxe & Anmeldegebühr (€ 3,- p.P./N; € 2,50)</li>
        <li>Willkommensgetränk, Frühstücks- & Abendbuffet</li>
        <li>Reisebetreuung vor Ort (in der Vor- und Nachsaison, Änderungen möglich)</li>
      </ul>
    `,
    additional_info: `
      <h2>THERME PALACE – FÜR GÄSTE DER LIFE CLASS HOTELS:</h2>
      <p>Die 7.500 m2 große Therme „Palace" ist bekannt für ihr heilendes Thermomineralwasser. Das Baden in diesem Wasser wirkt wohltuend auf Haut, Atemwege und Bewegungsapparat.</p>
      
      <h3>Entspannung:</h3>
      <p>Anti-Stress, Meereswelt, Massagewelt; Schönheit: Körper- und Gesichtsbehandlungen, Anti-Cellulite- und Entschlackungsprogramme;</p>
      
      <h3>Therapie:</h3>
      <p>Anti-Rheuma, gegen Osteoporose, gegen Psoriasis, für die Atemwege;</p>
      
      <h3>Wai Thai:</h3>
      <p>Traditionell thailändische Massagen zur Entspannung bzw. Belebung;</p>
      
      <div style="background-color: #fef2f2; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
        <h4><strong>Info:</strong></h4>
        <p>Die Benützung der Therme ist für die Gäste der Life-Class- Hotels kostenlos. Dampfbäder, Solarien, Saunakomplex, Massagen und Behandlungen können gegen Bezahlung benützt werden.</p>
      </div>
      
      <h2>ZUSÄTZLICH GrandHotel BERNARDIN - HOTEL HISTRION - VILE PARK</h2>
      <ul>
        <li>kostenloses Internet</li>
        <li>1 x Saunaeintritt pro Aufenthalt</li>
        <li>10% Ermäßigung auf Wellnessanwendungen</li>
      </ul>
      
      <div style="background-color: #eff6ff; padding: 1.5rem; border-radius: 0.5rem; margin: 1.5rem 0;">
        <h2>LAGUNA-MEERWASSERPARK – FÜR GÄSTE DER BERNARDIN-HOTELS:</h2>
        <p>Der Laguna-Meerwasserpark bietet auf 3.000 m² Wasserfläche Entspannung und Spaß für die ganze Familie. Mit beheizten Meerwasserpools, Whirlpools und verschiedenen Attraktionen ist er das perfekte Ziel für einen erholsamen Tag am Meer.</p>
      </div>
    `,
    category: 'therme' as const,
    featured_date: '18.08.',
    base_price: 589,
    hotels: [
      {
        id: '1',
        trip_id: '1',
        name: '5* Grand Hotel Bernardin',
        stars: 5,
        price: 589,
        image_url: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Das luxuriöse Grand Hotel Bernardin hat eine einzigartige Lage direkt am Meer. Dieses Hotel gehört zur Gruppe der Bernardin Hotels. Alle Bernardin-Hotels haben Zugang zum Strand, Freibad und zum Laguna Meerwasserpark.',
        facilities: '<ul><li>Kostenloses Internet</li><li>1 x Saunaeintritt pro Aufenthalt</li><li>10% Ermäßigung auf Wellnessanwendungen</li><li>Strandbetrieb ca. 15.6. - 15.9. (wetterabhängig)</li></ul>',
        location: 'Direkt am Meer',
        facility_icons: ['wifi', 'spa', 'pool', 'restaurant'],
        sort_order: 0,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        trip_id: '1',
        name: '4* Hotel Histrion',
        stars: 4,
        price: 495,
        image_url: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Modernes 4-Sterne Hotel mit direktem Zugang zum Meer und allen Annehmlichkeiten für einen entspannten Aufenthalt.',
        facilities: '<ul><li>Direkter Strandzugang</li><li>Klimaanlage</li><li>Minibar</li><li>Balkon mit Meerblick</li><li>Wellnessbereich</li></ul>',
        location: 'Premium Lage am Strand',
        facility_icons: ['wifi', 'parking', 'restaurant', 'air_conditioning', 'balcony'],
        sort_order: 1,
        created_at: new Date().toISOString()
      }
    ],
    dates: [
      {
        id: '1',
        trip_id: '1',
        date: '18.08. - 22.08.',
        price: 589,
        available: true,
        sort_order: 0,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        trip_id: '1',
        date: '27.08. - 31.08.',
        price: 629,
        available: true,
        sort_order: 1,
        created_at: new Date().toISOString()
      }
    ],
    gallery_images: [
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    thermen: [
      {
        id: '1',
        name: 'therme_palace',
        titel: 'THERME PALACE – FÜR GÄSTE DER LIFE CLASS HOTELS:',
        beschreibung: `
          <p>Die 7.500 m2 große Therme „Palace" ist bekannt für ihr heilendes Thermomineralwasser. Das Baden in diesem Wasser wirkt wohltuend auf Haut, Atemwege und Bewegungsapparat.</p>
          
          <h3>Entspannung:</h3>
          <p>Anti-Stress, Meereswelt, Massagewelt; Schönheit: Körper- und Gesichtsbehandlungen, Anti-Cellulite- und Entschlackungsprogramme;</p>
          
          <h3>Therapie:</h3>
          <p>Anti-Rheuma, gegen Osteoporose, gegen Psoriasis, für die Atemwege;</p>
          
          <h3>Wai Thai:</h3>
          <p>Traditionell thailändische Massagen zur Entspannung bzw. Belebung;</p>
          
          <div style="background-color: #fef2f2; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
            <h4><strong>Info:</strong></h4>
            <p>Die Benützung der Therme ist für die Gäste der Life-Class- Hotels kostenlos. Dampfbäder, Solarien, Saunakomplex, Massagen und Behandlungen können gegen Bezahlung benützt werden.</p>
          </div>
        `,
        sort_order: 0,
        active: true,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        name: 'laguna_meerwasserpark',
        titel: 'LAGUNA-MEERWASSERPARK – FÜR GÄSTE DER BERNARDIN-HOTELS:',
        beschreibung: `
          <p>Der Laguna-Meerwasserpark ist der größte beheizte Meerwasser-Schwimmbadkomplex in Slowenien: mit Schwimmbecken, Whirlpools, Wasserfällen, Massagestrahlen, Geysiren, Wasserkanonen und Kinderbereich mit verschiedenen Rutschen. Im Sommer hat man direkten Zugang zur Sonnenterrasse und zum Meer.</p>
          
          <div style="background-color: #eff6ff; padding: 1.5rem; border-radius: 0.5rem; margin: 1.5rem 0;">
            <h4><strong>Tipp:</strong></h4>
            <p>Platzl-Extra: 30 % Ermäßigung für unsere Kunden bei den Liegen & Sonnenschirmen am Strand Vile Park</p>
          </div>
        `,
        sort_order: 1,
        active: true,
        created_at: new Date().toISOString()
      }
    ],
    price_entries: [
      {
        id: '1',
        datum: 'Mo-Mo 18.08.-25.08.',
        startdatum: '2024-08-18',
        enddatum: '2024-08-25',
        tage: 8,
        verfuegbar: true,
        sort_order: 0,
        hotel_preise: [
          {
            id: '1',
            preis: 1135,
            verfuegbar: true,
            hotel: {
              id: '1',
              name: '5* Grand Hotel Bernardin',
              stars: 5,
              price: 589,
              image_url: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
              description: 'Das luxuriöse Grand Hotel Bernardin hat eine einzigartige Lage direkt am Meer.',
              facilities: '<ul><li>Kostenloses Internet</li><li>1 x Saunaeintritt pro Aufenthalt</li></ul>',
              location: 'Direkt am Meer',
              facility_icons: ['wifi', 'spa', 'pool', 'restaurant'],
              sort_order: 0,
            },
            created_at: new Date().toISOString()
          },
          {
            id: '2',
            preis: 899,
            verfuegbar: true,
            hotel: {
              id: '2',
              name: '4* Hotel Histrion',
              stars: 4,
              price: 495,
              image_url: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800',
              description: 'Modernes 4-Sterne Hotel mit direktem Zugang zum Meer.',
              facilities: '<ul><li>Direkter Strandzugang</li><li>Klimaanlage</li></ul>',
              location: 'Premium Lage am Strand',
              facility_icons: ['wifi', 'parking', 'restaurant', 'air_conditioning', 'balcony'],
              sort_order: 1,
            },
            created_at: new Date().toISOString()
          }
        ],
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        datum: 'Mo-Mo 25.08.-01.09.',
        tage: 8,
        verfuegbar: true,
        sort_order: 1,
        hotel_preise: [
          {
            id: '3',
            preis: 1049,
            verfuegbar: true,
            hotel: {
              id: '1',
              name: '5* Grand Hotel Bernardin',
              stars: 5,
              price: 589,
              image_url: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
              description: 'Das luxuriöse Grand Hotel Bernardin hat eine einzigartige Lage direkt am Meer.',
              facilities: '<ul><li>Kostenloses Internet</li><li>1 x Saunaeintritt pro Aufenthalt</li></ul>',
              location: 'Direkt am Meer',
              facility_icons: ['wifi', 'spa', 'pool', 'restaurant'],
              sort_order: 0,
            },
            created_at: new Date().toISOString()
          },
          {
            id: '4',
            preis: 859,
            verfuegbar: true,
            hotel: {
              id: '2',
              name: '4* Hotel Histrion',
              stars: 4,
              price: 495,
              image_url: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800',
              description: 'Modernes 4-Sterne Hotel mit direktem Zugang zum Meer.',
              facilities: '<ul><li>Direkter Strandzugang</li><li>Klimaanlage</li></ul>',
              location: 'Premium Lage am Strand',
              facility_icons: ['wifi', 'parking', 'restaurant', 'air_conditioning', 'balcony'],
              sort_order: 1,
            },
            created_at: new Date().toISOString()
          }
        ],
        created_at: new Date().toISOString()
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];