import React, { useState } from 'react';
import { ArrowLeft, Check, Star, Euro, Calendar, MapPin, Info, CreditCard, Sparkles, Users, Clock, Wifi, Car, Utensils, Waves, ChevronLeft, ChevronRight, Dumbbell, Coffee, Shield, Wind, Calculator as Elevator, Eye, Mountain, Zap, Phone, Bed, Building, TreePine, Plane, Filter, Search } from 'lucide-react';
import { Trip, Hotel, PriceEntry } from '../types';

interface TripDetailProps {
  trip: Trip;
  onBack: () => void;
}

type TabType = 'overview' | 'hotels' | 'thermen' | 'dates';

export const TripDetail: React.FC<TripDetailProps> = ({ trip, onBack }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Default images if no gallery images are available
  const defaultImages = [
    'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ];

  // Use Strapi images if available, otherwise fallback to default
  const galleryImages = trip.gallery_images && trip.gallery_images.length > 0 
    ? trip.gallery_images 
    : defaultImages;

  console.log('=== TRIPDETAIL GALLERY DEBUG ===');
  console.log('Trip gallery_images array:', trip.gallery_images);
  console.log('Gallery images length:', trip.gallery_images?.length || 0);
  console.log('Using default images?', !trip.gallery_images || trip.gallery_images.length === 0);
  console.log('Final gallery images:', galleryImages);

  // Auto-advance slideshow
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [galleryImages.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // Dynamische Tabs basierend auf Reisekategorie
  const baseTabs = [
    { id: 'overview', label: 'Übersicht', icon: Info },
    { id: 'dates', label: 'Termine & Preise', icon: Calendar },
  ];
  
  // Füge Hotels und Thermen nur bei Thermenreisen hinzu
  const tabs = trip.category === 'therme' 
    ? [
        baseTabs[0], // Übersicht
        { id: 'hotels', label: 'Hotels', icon: MapPin },
        { id: 'thermen', label: 'Thermen', icon: Waves },
        baseTabs[1], // Termine & Preise
      ]
    : baseTabs; // Nur Übersicht und Termine für Besichtigungsreisen

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < count ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const renderHotelModal = (hotel: Hotel) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        <div className="relative">
          <img
            src={getHotelImageUrl(hotel)}
            alt={hotel.name}
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <button
            onClick={() => setSelectedHotel(null)}
            className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            ×
          </button>
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-3xl font-bold mb-2">{hotel.name}</h3>
            <div className="flex items-center space-x-3">
              {renderStars(hotel.stars)}
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                {hotel.stars} Sterne
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/20 p-3 rounded-2xl">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Preis pro Person</p>
                <div className="text-3xl font-bold text-accent">€{hotel.price},-</div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-accent to-accent/80 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg">
              Jetzt buchen
            </div>
          </div>

          <p className="text-gray-700 mb-8 text-lg leading-relaxed">{hotel.description}</p>

          <div className="bg-primary/10 rounded-2xl p-6">
            <h4 className="text-xl font-bold mb-4 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-accent" />
              Ausstattung & Services
            </h4>
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: hotel.facilities || '' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const categoryColor = trip.category === 'therme' ? 'therme' : 'sightseeing';
  const categoryColorClass = trip.category === 'therme' ? 'text-therme' : 'text-sightseeing';
  const categoryBgClass = trip.category === 'therme' ? 'bg-therme' : 'bg-sightseeing';
  const categoryGradientClass = trip.category === 'therme' 
    ? 'from-therme to-therme/80' 
    : 'from-sightseeing to-sightseeing/80';

  // Filter function for price entries
  const filterPriceEntries = (entries: PriceEntry[]) => {
    if (!startDateFilter && !endDateFilter) {
      return entries;
    }

    return entries.filter(entry => {
      // Use proper date fields if available, fallback to string parsing
      let entryStartDate: Date;
      let entryEndDate: Date;
      
      if (entry.startdatum && entry.enddatum) {
        // Use proper date fields from Strapi
        entryStartDate = new Date(entry.startdatum);
        entryEndDate = new Date(entry.enddatum);
      } else {
        // Fallback: Extract dates from entry.datum string
        const dateMatch = entry.datum.match(/(\d{1,2})\.(\d{1,2})\.-(\d{1,2})\.(\d{1,2})\./);
        if (!dateMatch) return true;

        const [, startDay, startMonth, endDay, endMonth] = dateMatch;
        const currentYear = new Date().getFullYear();
        
        let startYear = currentYear;
        let endYear = currentYear;
        
        if (parseInt(endMonth) < parseInt(startMonth)) {
          endYear = currentYear + 1;
        }
        
        entryStartDate = new Date(startYear, parseInt(startMonth) - 1, parseInt(startDay));
        entryEndDate = new Date(endYear, parseInt(endMonth) - 1, parseInt(endDay));
      }

      // Check against filters
      let matchesStart = true;
      let matchesEnd = true;

      if (startDateFilter) {
        const filterStartDate = new Date(startDateFilter);
        // Allow same date or later
        matchesStart = entryStartDate.getTime() >= filterStartDate.getTime();
      }

      if (endDateFilter) {
        const filterEndDate = new Date(endDateFilter);
        // Allow same date or earlier
        matchesEnd = entryEndDate.getTime() <= filterEndDate.getTime();
      }

      return matchesStart && matchesEnd;
    });
  };

  // Apply filters to price entries
  const filteredPriceEntries = filterPriceEntries(trip.price_entries || []);
  const hasActiveFilters = startDateFilter || endDateFilter;

  // Icon mapping for hotel facilities
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      wifi: Wifi,
      parking: Car,
      restaurant: Utensils,
      spa: Waves,
      pool: Waves,
      fitness: Dumbbell,
      bar: Coffee,
      room_service: Bed,
      concierge: Users,
      business_center: Building,
      pet_friendly: Shield,
      air_conditioning: Wind,
      elevator: Elevator,
      balcony: Eye,
      sea_view: Eye,
      mountain_view: Mountain,
      beach_access: TreePine,
      shuttle_service: Plane
    };
    return iconMap[iconName] || Info;
  };

  const getIconLabel = (iconName: string) => {
    const labelMap: { [key: string]: string } = {
      wifi: 'WiFi',
      parking: 'Parking',
      restaurant: 'Restaurant',
      spa: 'Spa',
      pool: 'Pool',
      fitness: 'Fitness',
      bar: 'Bar',
      room_service: 'Zimmerservice',
      concierge: 'Concierge',
      business_center: 'Business Center',
      pet_friendly: 'Haustiere',
      air_conditioning: 'Klimaanlage',
      elevator: 'Aufzug',
      balcony: 'Balkon',
      sea_view: 'Meerblick',
      mountain_view: 'Bergblick',
      beach_access: 'Strandzugang',
      shuttle_service: 'Shuttle Service'
    };
    return labelMap[iconName] || iconName;
  };

  const renderHotelIcons = (icons: string[]) => {
    console.log('=== HOTEL ICONS DEBUG ===');
    console.log('Icons array:', icons);
    
    // Keine Icons verfügbar
    if (!icons || icons.length === 0) {
      console.log('No icons available from Strapi');
      return null;
    }

    return icons.map((iconName, index) => {
      const IconComponent = getIconComponent(iconName);
      const label = getIconLabel(iconName);
      console.log(`Rendering icon: ${iconName} -> ${label}`);
      
      return (
        <div key={index} className="flex items-center space-x-1">
          <IconComponent className="h-4 w-4" />
          <span className="text-sm">{label}</span>
        </div>
      );
    });
  };

  // Debug hotel image
  const getHotelImageUrl = (hotel: Hotel) => {
    console.log('=== HOTEL IMAGE DEBUG ===');
    console.log('Hotel object:', hotel);
    console.log('Hotel image_url field:', hotel.image_url);
    console.log('Hotel image_url type:', typeof hotel.image_url);
    
    if (hotel.image_url && hotel.image_url.length > 0) {
      console.log('Using hotel.image_url:', hotel.image_url);
      return hotel.image_url;
    }
    
    console.log('No valid image URL found, using fallback');
    return 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-primary/20">
      {/* Hero Section with Dynamic Background */}
      <div className="relative overflow-hidden min-h-[60vh]">
        {/* Image Slideshow Background */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <img
              src={galleryImages[currentImageIndex]}
              alt={`${trip.title} - Bild ${currentImageIndex + 1}`}
              className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40" />
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${categoryGradientClass} opacity-60`} />
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-5">
          <div className="absolute top-10 right-20 w-32 h-32 bg-white/10 rounded-full animate-bounce delay-1000" />
          <div className="absolute top-40 right-40 w-16 h-16 bg-white/20 rounded-full animate-pulse" />
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/15 rounded-full animate-bounce delay-500" />
          <div className="absolute top-20 left-1/3 w-20 h-20 bg-white/10 rounded-full animate-pulse delay-700" />
          <div className="absolute bottom-40 right-1/4 w-28 h-28 bg-white/5 rounded-full animate-bounce delay-300" />
        </div>
        
        <div className="relative container mx-auto px-4 py-16 z-10">
          <button
            onClick={onBack}
            className="group flex items-center text-white/90 hover:text-white mb-8 transition-all duration-300 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl hover:bg-white/20 hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5 mr-3 transform group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium">Zurück zur Übersicht</span>
          </button>
          
          <div className="max-w-5xl">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className={`${categoryBgClass} p-4 rounded-2xl shadow-lg animate-pulse`}>
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
                <span className="text-white font-semibold text-lg">{trip.featured_date}</span>
              </div>
              <div className="bg-accent text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                ab €{trip.base_price},-
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <span className="text-white/90 text-sm font-medium">
                  {trip.category === 'therme' ? '🏊‍♀️ Wellness' : '🏛️ Kultur'}
                </span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl leading-tight">
              {trip.title}
            </h1>
            <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-4xl drop-shadow-md">
              {trip.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Tab Navigation */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-primary/20 shadow-lg">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`group relative flex items-center space-x-2 px-6 py-4 border-b-4 font-medium transition-all duration-300 hover:scale-105 ${
                    activeTab === tab.id
                      ? `border-${categoryColor} ${categoryColorClass} bg-gradient-to-t from-${categoryColor}/10 to-transparent shadow-lg`
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gradient-to-t hover:from-gray-50 hover:to-transparent'
                  }`}
                >
                  <Icon className={`h-5 w-5 transition-all duration-300 ${
                    activeTab === tab.id ? 'scale-110 drop-shadow-sm' : 'group-hover:scale-105'
                  }`} />
                  <span className="text-sm">{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-${categoryColor} to-${categoryColor}/60 rounded-t-full`} />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Enhanced Tab Content */}
      <div className="container mx-auto px-4 py-16">
        {activeTab === 'overview' && (
          <div className="space-y-12 max-w-6xl mx-auto">
            {/* Reisebeschreibung mit Icon und Farbe */}
            {trip.full_description && (
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-l-8 border-accent relative overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
                <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full -translate-y-20 translate-x-20" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full translate-y-16 -translate-x-16" />
                <div className="relative">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="bg-accent/10 p-3 rounded-xl">
                      <Info className="h-6 w-6 text-accent" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Reisebeschreibung</h2>
                  </div>
                  <div className="prose prose-base max-w-none">
                    <div 
                      className="text-gray-700 leading-relaxed text-sm"
                      dangerouslySetInnerHTML={{ __html: trip.full_description }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Reiseleiter für Besichtigungsreisen */}
            {trip.category === 'sightseeing' && (trip as any).reiseleiter && (
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-l-8 border-sightseeing relative overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
                <div className="absolute top-0 right-0 w-40 h-40 bg-sightseeing/5 rounded-full -translate-y-20 translate-x-20" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full translate-y-16 -translate-x-16" />
                <div className="relative">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="bg-sightseeing/10 p-3 rounded-xl">
                      <Users className="h-6 w-6 text-sightseeing" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Reiseleitung</h2>
                  </div>
                  <div className="flex items-start space-x-6">
                    {(trip as any).reiseleiter.photo && (
                      <img
                        src={(trip as any).reiseleiter.photo}
                        alt={(trip as any).reiseleiter.name}
                        className="w-16 h-16 rounded-full object-cover shadow-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {(trip as any).reiseleiter.name}
                      </h3>
                      {(trip as any).reiseleiter.description && (
                        <p className="text-gray-700 leading-relaxed text-sm">
                          {(trip as any).reiseleiter.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* IM PREIS ENTHALTEN - Besonders hervorgehoben */}
            {trip.price_included && (
              <div className={`relative overflow-hidden rounded-3xl shadow-2xl border-l-8 border-${categoryColor} transform hover:scale-[1.02] transition-all duration-300`}>
                <div className={`bg-gradient-to-br from-${categoryColor}/15 via-${categoryColor}/10 to-white p-8 md:p-12`}>
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/30 rounded-full -translate-y-24 translate-x-24" />
                  <div className="absolute bottom-0 left-0 w-36 h-36 bg-white/20 rounded-full translate-y-18 -translate-x-18" />
                  <div className={`absolute top-4 right-4 w-16 h-16 bg-${categoryColor}/20 rounded-full animate-pulse`} />
                  
                  <div className="relative">
                    <div className="flex items-center space-x-4 mb-8">
                      <div className={`${categoryBgClass} p-3 rounded-xl shadow-lg animate-bounce`}>
                        <CreditCard className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className={`text-xl font-bold ${categoryColorClass} drop-shadow-sm`}>
                          IM PREIS ENTHALTEN
                        </h2>
                        <p className="text-gray-600 text-sm mt-1">Alles was Sie für Ihre Reise benötigen</p>
                      </div>
                    </div>
                    
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                      <div className="prose prose-base max-w-none">
                        <div 
                          className="text-gray-700 leading-relaxed text-sm"
                          dangerouslySetInnerHTML={{ __html: trip.price_included }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Zusätzliche Informationen mit Icons */}
            {trip.additional_info && (
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-primary/20 relative overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
                <div className="absolute top-0 right-0 w-36 h-36 bg-primary/10 rounded-full -translate-y-18 translate-x-18" />
                <div className="absolute bottom-0 left-0 w-28 h-28 bg-accent/5 rounded-full translate-y-14 -translate-x-14" />
                <div className="relative">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="bg-primary/20 p-3 rounded-xl">
                      <Sparkles className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">Zusätzliche Informationen</h2>
                      <p className="text-gray-600 text-sm mt-1">Wichtige Details für Ihre Reise</p>
                    </div>
                  </div>
                  <div className="prose prose-base max-w-none">
                    <div 
                      className="text-gray-700 leading-relaxed text-sm"
                      dangerouslySetInnerHTML={{ __html: trip.additional_info }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'hotels' && trip.category === 'therme' && (
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className={`${categoryBgClass} p-2 rounded-xl`}>
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Unsere Hotels
                </h2>
              </div>
              <p className="text-gray-600 text-xs">Wählen Sie aus unseren sorgfältig ausgewählten Hotels</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {trip.hotels.map((hotel, index) => (
                <div
                  key={hotel.id}
                  className="group bg-white rounded-3xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 border border-primary/10 relative"
                  onClick={() => setSelectedHotel(hotel)}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Hotel Image with Overlay */}
                  <div className="relative overflow-hidden h-80">
                    <img
                      src={getHotelImageUrl(hotel)}
                      alt={hotel.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    
                    {/* Floating Elements */}
                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                      <div className="flex items-center space-x-1">
                        {renderStars(hotel.stars)}
                      </div>
                    </div>
                    
                    <div className="absolute top-6 left-6 bg-accent text-white px-4 py-2 rounded-full font-bold shadow-lg">
                      €{hotel.price},-
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-2xl font-semibold text-sm border border-white/30 transform scale-95 group-hover:scale-100 transition-transform duration-300">
                        Details ansehen →
                      </div>
                    </div>
                  </div>
                  
                  {/* Hotel Info */}
                  <div className="p-8">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-accent transition-colors duration-300">
                      {hotel.name}
                    </h3>
                    
                    <p className="text-gray-600 line-clamp-3 mb-6 leading-relaxed text-sm">
                      {hotel.description}
                    </p>
                    
                    {/* Hotel Icons from Strapi */}
                    <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-500">
                      {hotel.facility_icons && hotel.facility_icons.length > 0 ? (
                        <div className="flex flex-wrap gap-3">
                          {hotel.facility_icons.map((iconKey, index) => {
                            const IconComponent = getIconComponent(iconKey);
                            const label = getIconLabel(iconKey);
                            return (
                              <div key={index} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full text-xs">
                                <IconComponent className="h-3 w-3 text-gray-600" />
                                <span className="text-gray-700 text-xs">{label}</span>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic">Keine Ausstattung-Icons verfügbar</span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                      <div className="flex items-center space-x-2">
                        <MapPin className={`h-4 w-4 ${categoryColorClass}`} />
                        <span className="text-gray-600 text-sm">{hotel.location || 'Lage nicht angegeben'}</span>
                      </div>
                      
                      <div className={`font-bold ${categoryColorClass} group-hover:translate-x-2 transition-transform duration-300 text-sm`}>
                        Mehr erfahren →
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'hotels' && trip.category === 'sightseeing' && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-16">
              <div className="bg-gray-100 rounded-2xl p-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-600 mb-2">Besichtigungsreisen</h3>
                <p className="text-gray-500 text-sm">
                  Besichtigungsreisen beinhalten keine Hotelauswahl. 
                  Die Unterkunft ist bereits im Reisepreis enthalten.
                </p>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'thermen' && trip.category === 'therme' && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className={`${categoryBgClass} p-2 rounded-2xl`}>
                  <Waves className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Therme-Informationen
                </h2>
              </div>
              <p className="text-gray-600 text-sm">Entspannung und Wellness in den schönsten Thermen</p>
            </div>
            
            {/* Debug Info */}
            <div className="mb-8 p-4 bg-yellow-100 rounded-lg">
              <h3 className="font-bold text-yellow-800 mb-2">Debug Info:</h3>
              <p className="text-yellow-700 text-sm">
                Thermen gefunden: {trip.thermen ? trip.thermen.length : 0}
              </p>
              {trip.thermen && trip.thermen.length > 0 && (
                <div className="mt-2">
                  <p className="text-yellow-700 text-sm">Therme Namen:</p>
                  <ul className="text-yellow-600 text-xs">
                    {trip.thermen.map((therme, index) => (
                      <li key={index}>
                        {index + 1}. {therme.name} - {therme.titel} (Aktiv: {therme.active ? 'Ja' : 'Nein'})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt-4 p-3 bg-blue-50 rounded">
                <p className="text-blue-800 font-semibold">Hotels Debug:</p>
                <ul className="text-blue-700 text-xs mt-1">
                  {trip.hotels.map((hotel, index) => (
                    <li key={index}>
                      {hotel.name}: {hotel.facility_icons.length} Icons ({hotel.facility_icons.join(', ')})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {trip.thermen && trip.thermen.length > 0 ? (
              <div className="space-y-12">
                {trip.thermen.filter(therme => therme.active).map((therme, index) => (
                  <div
                    key={therme.id}
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-primary/10 relative transform hover:scale-[1.02] transition-all duration-300"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {/* Therme Header */}
                    <div className={`bg-gradient-to-r ${categoryGradientClass} p-8 text-white relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
                      <div className="relative">
                        <h3 className="text-lg font-bold mb-4">{therme.titel}</h3>
                      </div>
                    </div>
                    
                    {/* Therme Content */}
                    <div className="p-6 space-y-6">
                      <div className="therme-content prose prose-sm max-w-none">
                        <div 
                          dangerouslySetInnerHTML={{ __html: therme.beschreibung }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-gray-100 rounded-2xl p-12">
                  <Waves className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-600 mb-2">Keine Therme-Informationen verfügbar</h3>
                  <p className="text-gray-500 mb-4 text-sm">Fügen Sie Therme-Informationen über das Strapi Admin Panel hinzu.</p>
                  <p className="text-gray-400 text-xs mt-2">
                    Stellen Sie sicher, dass die Therme "published" und "aktiv" ist.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'thermen' && trip.category === 'sightseeing' && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-16">
              <div className="bg-gray-100 rounded-2xl p-12">
                <Waves className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-600 mb-2">Besichtigungsreisen</h3>
                <p className="text-gray-500 text-sm">
                  Besichtigungsreisen beinhalten keine Therme-Besuche. 
                  Fokus liegt auf kulturellen Sehenswürdigkeiten und Stadtführungen.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dates' && (
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className={`${categoryBgClass} p-2 rounded-2xl`}>
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Termine & Preise</h2>
              </div>
              <p className="text-gray-600 text-sm">
                {trip.category === 'therme' 
                  ? 'Alle Preise für verschiedene Hotels und Termine'
                  : 'Verfügbare Termine und Preise'
                }
              </p>
            </div>
            
            {/* Filter Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-primary/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center">
                  <Filter className="h-4 w-4 mr-2 text-accent" />
                  Filter & Suche
                </h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                    showFilters 
                      ? `${categoryBgClass} text-white` 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {showFilters ? 'Filter ausblenden' : 'Filter anzeigen'}
                </button>
              </div>
              
              {showFilters && (
                <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Früheste Anreise
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent"
                      value={startDateFilter}
                      onChange={(e) => setStartDateFilter(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Späteste Rückreise
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent"
                      value={endDateFilter}
                      onChange={(e) => setEndDateFilter(e.target.value)}
                    />
                  </div>
                  <div className="flex items-end">
                    <button className={`w-full ${categoryBgClass} text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-300 flex items-center justify-center`}>
                      <Search className="h-3 w-3 mr-2" />
                      Reisen filtern
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Price Table für Thermenreisen */}
            {trip.category === 'therme' && filteredPriceEntries && filteredPriceEntries.length > 0 ? (
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-primary/10">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  <Calendar className="h-3 w-3 mr-1" />
                  Termine & Preise
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-primary/20 to-primary/10">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">
                          Datum
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-bold text-gray-800 uppercase tracking-wider">
                          Tage
                        </th>
                        {trip.hotels.map((hotel) => (
                          <th key={hotel.id} className="px-6 py-4 text-center text-sm font-bold text-gray-800 uppercase tracking-wider">
                            <div className={`text-xl font-bold ${categoryColorClass} mb-1`}>
                              <span className="mb-1">{hotel.stars}★ {hotel.name}</span>
                              <div className="flex items-center">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                                ))}
                                <div className="text-xs text-gray-500">
                                </div>
                              </div>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredPriceEntries.map((entry, index) => (
                        <tr key={entry.id} className={`hover:bg-primary/5 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-semibold text-gray-800">{entry.datum}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                              {entry.tage}
                            </span>
                          </td>
                          {trip.hotels.map((hotel) => {
                            const hotelPrice = entry.hotel_preise.find(hp => hp.hotel?.id === hotel.id);
                            return (
                              <td key={hotel.id} className="px-6 py-4 whitespace-nowrap text-center">
                                {hotelPrice ? (
                                  <div className="flex flex-col items-center">
                                    <span className={`text-xl font-bold ${categoryColorClass} drop-shadow-sm`}>
                                      € {hotelPrice.preis},-
                                    </span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                      hotelPrice.verfuegbar 
                                        ? 'bg-green-100 text-green-800 border border-green-200' 
                                        : 'bg-red-100 text-red-800 border border-red-200'
                                    }`}>
                                      {hotelPrice.verfuegbar ? 'Verfügbar' : 'Ausgebucht'}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-gray-400 text-sm italic">Nicht verfügbar</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-primary/10 px-6 py-4 border-t border-primary/20">
                  <p className="text-sm text-gray-600 text-center">
                    <strong>💡 Hinweis:</strong> Alle Preise verstehen sich pro Person im Doppelzimmer. Einzelzimmerzuschlag auf Anfrage.
                  </p>
                </div>
              </div>
            ) : trip.category === 'sightseeing' && trip.dates && trip.dates.length > 0 ? (
              /* Einfache Termine-Liste für Besichtigungsreisen */
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-primary/10">
                <div className="space-y-4 p-8">
                  {trip.dates.map((date, index) => (
                    <div key={date.id} className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
                      date.available 
                        ? 'border-green-200 bg-green-50 hover:border-green-300' 
                        : 'border-red-200 bg-red-50'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800 mb-2">
                            {date.date}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {trip.dates.length > 1 ? `${trip.dates[0]?.date || ''} Tage` : 'Mehrtägig'}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              date.available 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {date.available ? 'Verfügbar' : 'Ausgebucht'}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-3xl font-bold ${categoryColorClass} mb-1`}>
                            € {date.price},-
                          </div>
                          <div className="text-sm text-gray-500">
                            pro Person
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-primary/10 px-6 py-4 border-t border-primary/20">
                  <p className="text-xs text-gray-600 text-center">
                    <strong>💡 Hinweis:</strong> Alle Preise verstehen sich pro Person im Doppelzimmer. Einzelzimmerzuschlag auf Anfrage.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-gray-100 rounded-2xl p-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-600 mb-4">Keine Termine & Preise verfügbar</h3>
                  <p className="text-gray-500 mb-4 text-sm">
                    {hasActiveFilters 
                      ? 'Keine Termine entsprechen Ihren Filterkriterien. Versuchen Sie andere Daten oder entfernen Sie den Filter.'
                      : trip.category === 'therme' 
                        ? 'Die Preiseinträge werden noch geladen oder sind nicht verfügbar.'
                        : 'Die Termine werden noch geladen oder sind nicht verfügbar.'
                    }
                  </p>
                  <button 
                    onClick={() => {
                      if (hasActiveFilters) {
                        setStartDateFilter('');
                        setEndDateFilter('');
                      } else {
                        window.location.reload();
                      }
                    }}
                    className={`${categoryBgClass} text-white px-4 py-2 rounded-full font-semibold hover:opacity-90 transition-opacity duration-300 text-sm`}
                  >
                    {hasActiveFilters ? 'Filter zurücksetzen' : 'Seite neu laden'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hotel Modal */}
      {selectedHotel && renderHotelModal(selectedHotel)}
    </div>
  );
};