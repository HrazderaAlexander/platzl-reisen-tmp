import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { Footer } from './components/Footer';
import { TripList } from './components/TripList';
import { TripDetail } from './components/TripDetail';
import { GalleryPage } from './components/GalleryPage';
import { useTrip } from './hooks/useTrips';
import { Trip } from './types';

type Page = 'home' | 'therme' | 'sightseeing' | 'trip' | 'agb' | 'download' | 'contact' | 'sonstiges' | 'umweltbeitrag' | 'reisebedingungen' | 'team' | 'flotte' | 'newsletter' | 'impressum' | 'about-us' | 'gutscheine' | 'reiseversicherung' | 'datenschutz' | 'galerie';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState<'therme' | 'sightseeing' | null>(null);
  
  // URL-basiertes Routing
  useEffect(() => {
    const updateFromURL = () => {
      const hash = window.location.hash.slice(1); // Remove #
      const [page, category, tripId] = hash.split('/');
      
      console.log('=== URL ROUTING ===');
      console.log('Hash:', hash);
      console.log('Parsed:', { page, category, tripId });
      
      if (page === 'therme') {
        setCurrentPage('therme');
        setCurrentCategory('therme');
        setSelectedTripId(null);
      } else if (page === 'sightseeing') {
        setCurrentPage('sightseeing');
        setCurrentCategory('sightseeing');
        setSelectedTripId(null);
      } else if (page === 'trip' && category && tripId) {
        setCurrentPage('trip');
        setCurrentCategory(category as 'therme' | 'sightseeing');
        setSelectedTripId(tripId);
      } else if (page === 'agb') {
        setCurrentPage('agb');
        setCurrentCategory(null);
        setSelectedTripId(null);
      } else if (page === 'download') {
        setCurrentPage('download');
        setCurrentCategory(null);
        setSelectedTripId(null);
      } else if (page === 'contact') {
        setCurrentPage('contact');
        setCurrentCategory(null);
        setSelectedTripId(null);
      } else if (page === 'sonstiges') {
        setCurrentPage('sonstiges');
        setCurrentCategory(null);
        setSelectedTripId(null);
      } else if (page === 'umweltbeitrag') {
        setCurrentPage('umweltbeitrag');
        setCurrentCategory(null);
        setSelectedTripId(null);
      } else if (page === 'reisebedingungen') {
        setCurrentPage('reisebedingungen');
        setCurrentCategory(null);
        setSelectedTripId(null);
      } else if (page === 'team') {
        setCurrentPage('team');
        setCurrentCategory(null);
        setSelectedTripId(null);
      } else if (page === 'flotte') {
        setCurrentPage('flotte');
        setCurrentCategory(null);
        setSelectedTripId(null);
      } else if (page === 'newsletter') {
        setCurrentPage('newsletter');
        setCurrentCategory(null);
        setSelectedTripId(null);
      } else if (page === 'impressum') {
        setCurrentPage('impressum');
        setCurrentCategory(null);
        setSelectedTripId(null);
      } else if (page === 'about-us') {
        setCurrentPage('about-us');
        setCurrentCategory(null);
        setSelectedTripId(null);
      } else if (page === 'gutscheine') {
        setCurrentPage('gutscheine');
        setCurrentCategory(null);
        setSelectedTripId(null);
      } else if (page === 'reiseversicherung') {
        setCurrentPage('reiseversicherung');
        setCurrentCategory(null);
        setSelectedTripId(null);
      } else if (page === 'datenschutz') {
        setCurrentPage('datenschutz');
        setCurrentCategory(null);
        setSelectedTripId(null);
      } else if (page === 'galerie') {
        setCurrentPage('galerie');
        setCurrentCategory(null);
        setSelectedTripId(null);
      } else {
        setCurrentPage('home');
        setCurrentCategory(null);
        setSelectedTripId(null);
      }
    };
    
    // Initial load
    updateFromURL();
    
    // Listen for hash changes
    window.addEventListener('hashchange', updateFromURL);
    
    return () => {
      window.removeEventListener('hashchange', updateFromURL);
    };
  }, []);
  
  const { trip: selectedTrip } = useTrip(selectedTripId || '', currentCategory);

  const handleNavigate = (page: Page | string) => {
    console.log('=== NAVIGATE ===');
    console.log('Target page:', page);
    
    if (page === 'therme') {
      window.location.hash = '#therme';
    } else if (page === 'sightseeing') {
      window.location.hash = '#sightseeing';
    } else if (page === 'agb') {
      window.location.hash = '#agb';
    } else if (page === 'download') {
      window.location.hash = '#download';
    } else if (page === 'contact') {
      window.location.hash = '#contact';
    } else if (page === 'sonstiges') {
      window.location.hash = '#sonstiges';
    } else if (page === 'umweltbeitrag') {
      window.location.hash = '#umweltbeitrag';
    } else if (page === 'reisebedingungen') {
      window.location.hash = '#reisebedingungen';
    } else if (page === 'team') {
      window.location.hash = '#team';
    } else if (page === 'flotte') {
      window.location.hash = '#flotte';
    } else if (page === 'newsletter') {
      window.location.hash = '#newsletter';
    } else if (page === 'impressum') {
      window.location.hash = '#impressum';
    } else if (page === 'about-us') {
      window.location.hash = '#about-us';
    } else if (page === 'gutscheine') {
      window.location.hash = '#gutscheine';
    } else if (page === 'reiseversicherung') {
      window.location.hash = '#reiseversicherung';
    } else if (page === 'datenschutz') {
      window.location.hash = '#datenschutz';
    } else if (page === 'galerie') {
      window.location.hash = '#galerie';
    } else if (page === 'home') {
      window.location.hash = '';
    }
  };

  const handleTripSelect = (trip: Trip) => {
    console.log('=== TRIP SELECTED ===');
    console.log('Selected trip:', trip.title);
    console.log('Selected trip category:', trip.category);
    console.log('Selected trip ID:', trip.id);
    console.log('Current category context:', currentCategory);
    
    // URL: #trip/therme/123 oder #trip/sightseeing/456
    window.location.hash = `#trip/${trip.category}/${trip.id}`;
  };

  const handleBackFromTrip = () => {
    console.log('=== BACK FROM TRIP ===');
    console.log('Selected trip category:', selectedTrip?.category);
    console.log('Current category context:', currentCategory);
    
    // Zurück zur entsprechenden Kategorie-Seite
    const targetCategory = selectedTrip?.category || currentCategory || 'therme';
    window.location.hash = `#${targetCategory}`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        onTripSelect={handleTripSelect}
      />
      
      {currentPage === 'home' && (
        <HomePage onNavigate={handleNavigate} />
      )}
      
      {currentPage === 'therme' && (
        <TripList 
          category="therme"
          title="Thermenreisen"
          onTripSelect={handleTripSelect}
        />
      )}
      
      {currentPage === 'sightseeing' && (
        <TripList 
          category="sightseeing"
          title="Besichtigungsreisen"
          onTripSelect={handleTripSelect}
        />
      )}
      
      {currentPage === 'trip' && selectedTrip && (
        <TripDetail 
          trip={selectedTrip}
          onBack={handleBackFromTrip}
        />
      )}
      
      {currentPage === 'agb' && (
        <AGBPage onBack={() => handleNavigate('home')} />
      )}
      
      {currentPage === 'download' && (
        <DownloadPage onBack={() => handleNavigate('home')} />
      )}
      
      {currentPage === 'contact' && (
        <ContactPage onBack={() => handleNavigate('home')} />
      )}
      
      {currentPage === 'sonstiges' && (
        <SonstigesPage 
          onBack={() => handleNavigate('home')} 
          onNavigate={handleNavigate}
        />
      )}
      
      {currentPage === 'umweltbeitrag' && (
        <UmweltbeitragPage onBack={() => handleNavigate('sonstiges')} />
      )}
      
      {currentPage === 'reisebedingungen' && (
        <ReisebedingungenPage onBack={() => handleNavigate('sonstiges')} />
      )}
      
      {currentPage === 'team' && (
        <TeamPage onBack={() => handleNavigate('sonstiges')} />
      )}
      
      {currentPage === 'flotte' && (
        <FlottePage onBack={() => handleNavigate('sonstiges')} />
      )}
      
      {currentPage === 'newsletter' && (
        <NewsletterPage onBack={() => handleNavigate('sonstiges')} />
      )}
      
      {currentPage === 'impressum' && (
        <ImpressumPage onBack={() => handleNavigate('sonstiges')} />
      )}
      
      {currentPage === 'about-us' && (
        <AboutUsPage 
          onBack={() => handleNavigate('sonstiges')} 
          onNavigate={handleNavigate}
        />
      )}
      
      {currentPage === 'gutscheine' && (
        <GutscheinePage onBack={() => handleNavigate('sonstiges')} />
      )}
      
      {currentPage === 'reiseversicherung' && (
        <ReiseversicherungPage onBack={() => handleNavigate('sonstiges')} />
      )}
      
      {currentPage === 'datenschutz' && (
        <DatenschutzPage onBack={() => handleNavigate('sonstiges')} />
      )}
      
      {currentPage === 'galerie' && (
        <GalleryPage onBack={() => handleNavigate('home')} />
      )}
      
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;