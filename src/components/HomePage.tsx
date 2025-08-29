import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, Star, ChevronLeft, ChevronRight, Award, Heart, ThumbsUp, Shield, Play, Pause, Phone, Mail, ArrowRight, Eye, X } from 'lucide-react';
import { useHomepage } from '../hooks/useHomepage';
import { useGallery } from '../hooks/useGallery';

interface HomePageProps {
  onNavigate: (page: 'therme' | 'sightseeing' | 'galerie') => void;
}

const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    users: Users,
    star: Star,
    calendar: Calendar,
    'map-pin': MapPin,
    shield: Shield,
    award: Award,
    heart: Heart,
    'thumbs-up': ThumbsUp,
  };
  return iconMap[iconName] || Star;
};

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  // Alle useState Hooks zuerst
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  // Dann alle anderen Hooks
  const { homepageData, loading, error, usingMockData } = useHomepage();
  const { getFeaturedImages } = useGallery();
  const featuredImages = getFeaturedImages();

  // Dann alle useEffect Hooks
  useEffect(() => {
    if (!homepageData || !isPlaying) return;
    
    const interval = setInterval(() => {
      nextImage();
    }, homepageData.diashow_geschwindigkeit);

    return () => clearInterval(interval);
  }, [isPlaying, homepageData?.diashow_geschwindigkeit, homepageData?.hero_bilder?.length]);

  // Funktionen nach den Hooks
  const nextImage = () => {
    if (!homepageData?.hero_bilder) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % homepageData.hero_bilder.length);
      setIsTransitioning(false);
    }, 150);
  };

  const prevImage = () => {
    if (!homepageData?.hero_bilder) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev - 1 + homepageData.hero_bilder.length) % homepageData.hero_bilder.length);
      setIsTransitioning(false);
    }, 150);
  };

  const goToImage = (index: number) => {
    if (!homepageData?.hero_bilder || index === currentImageIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setIsTransitioning(false);
    }, 150);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-primary/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-accent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">
            {usingMockData ? 'Verwende Demo-Daten...' : 'Homepage wird geladen...'}
          </p>
        </div>
      </div>
    );
  }

  // Error state - use mock data
  if (!homepageData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-primary/20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Fehler beim Laden der Homepage-Daten</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  function prevGalleryImage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.stopPropagation();
    if (featuredImages.length === 0 || selectedImage == null) return;
    const currentIndex = featuredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + featuredImages.length) % featuredImages.length;
    setSelectedImage(featuredImages[prevIndex]);
    setCurrentGalleryIndex(prevIndex);
  }

  function nextGalleryImage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.stopPropagation();
    if (featuredImages.length === 0 || selectedImage == null) return;
    const currentIndex = featuredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % featuredImages.length;
    setSelectedImage(featuredImages[nextIndex]);
    setCurrentGalleryIndex(nextIndex);
  }

  function closeImageModal(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.stopPropagation();
    setSelectedImage(null);
  }
  return (
    <div className="min-h-screen">
      {/* CMS Status Indicator */}
      {usingMockData && (
        <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>⚠️ Mock-Daten werden verwendet:</strong> {error}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Hero Section with Slideshow */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Slideshow */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <img
              src={homepageData.hero_bilder[currentImageIndex]}
              alt={`Hero Bild ${currentImageIndex + 1}`}
              className={`w-full h-full object-cover transition-all duration-500 ${
                isTransitioning ? 'opacity-90 scale-105' : 'opacity-100 scale-100'
              }`}
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40" />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
          <div className="absolute top-40 left-20 w-24 h-24 bg-accent/10 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-40 right-40 w-20 h-20 bg-white/10 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-accent/5 rounded-full animate-bounce delay-700"></div>
        </div>

        {/* Navigation Controls */}
        <button
          onClick={prevImage}
          className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 shadow-2xl border border-white/20 group"
        >
          <ChevronLeft className="h-6 w-6 group-hover:-translate-x-0.5 transition-transform duration-300" />
        </button>
        
        <button
          onClick={nextImage}
          className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 shadow-2xl border border-white/20 group"
        >
          <ChevronRight className="h-6 w-6 group-hover:translate-x-0.5 transition-transform duration-300" />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute right-8 bottom-32 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 shadow-2xl border border-white/20 group"
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
          ) : (
            <Play className="h-5 w-5 ml-0.5 group-hover:scale-110 transition-transform duration-300" />
          )}
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10 bg-black/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-2xl">
          {homepageData.hero_bilder.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentImageIndex 
                  ? 'bg-white scale-125 shadow-lg ring-2 ring-white/50' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Hero Content - Centered */}
        <div className="relative container mx-auto px-4 min-h-screen flex items-center justify-center z-10">
          <div className="text-center max-w-5xl">
            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-white leading-tight tracking-tight drop-shadow-2xl">
              {homepageData.hero_titel}
            </h1>
            
            {/* Slogan */}
            <p className="text-xl md:text-3xl text-orange-400 font-medium mb-16 tracking-wide drop-shadow-lg">
              {homepageData.hero_untertitel}
            </p>
            
            {/* Contact Information */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-20">
              <a 
                href={`tel:${homepageData.telefon.replace(/\s/g, '')}`}
                className="group flex items-center space-x-3 bg-white/15 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/30 hover:bg-white/25 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                <Phone className="h-6 w-6 text-orange-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-white font-medium text-lg">{homepageData.telefon}</span>
              </a>
              <a 
                href={`mailto:${homepageData.email}`}
                className="group flex items-center space-x-3 bg-white/15 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/30 hover:bg-white/25 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                <Mail className="h-6 w-6 text-orange-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-white font-medium text-lg">{homepageData.email}</span>
              </a>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <button 
                onClick={() => onNavigate('therme')}
                className="group relative bg-gradient-to-r from-orange-500 to-orange-600 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10 flex items-center justify-center">
                  <span className="mr-3 text-2xl">🏊‍♀️</span>
                  {homepageData.cta_therme_text}
                  <ArrowRight className="h-6 w-6 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
              <button 
                onClick={() => onNavigate('sightseeing')}
                className="group relative bg-white/15 backdrop-blur-md text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-white/25 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 border border-white/30 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10 flex items-center justify-center">
                  <span className="mr-3 text-2xl">🏛️</span>
                  {homepageData.cta_sightseeing_text}
                  <ArrowRight className="h-6 w-6 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Enhanced */}
        <div className="absolute bottom-8 left-8 z-10 group">
          <div className="animate-bounce">
            <div className="w-8 h-12 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm bg-white/10 group-hover:border-white group-hover:bg-white/20 transition-all duration-300">
              <div className="w-1.5 h-4 bg-white/80 rounded-full mt-2 animate-pulse group-hover:bg-white transition-colors duration-300"></div>
            </div>
          </div>
          <div className="mt-2 text-white/70 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
            Scrollen
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-24 bg-gradient-to-b from-white via-primary/10 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-40 h-40 bg-accent/5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-32 h-32 bg-primary/20 rounded-full animate-bounce delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
              {homepageData.features_titel}
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-accent to-accent/80 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Entdecken Sie, warum Tausende von Kunden uns vertrauen
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {homepageData.features.map((feature, index) => {
              const IconComponent = getIconComponent(feature.icon);
              return (
                <div 
                  key={index} 
                  className="text-center group relative"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Background Card */}
                  <div className="absolute inset-0 bg-white rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 opacity-0 group-hover:opacity-100"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 p-8">
                    <div className="bg-gradient-to-br from-accent to-accent/80 p-6 rounded-3xl w-20 h-20 flex items-center justify-center mx-auto mb-8 group-hover:from-accent/90 group-hover:to-accent/70 transition-all duration-500 group-hover:scale-110 shadow-xl group-hover:shadow-2xl group-hover:rotate-3">
                      <IconComponent className="h-8 w-8 text-white transition-all duration-500 group-hover:scale-110" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-accent transition-colors duration-300">
                      {feature.titel}
                    </h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {feature.beschreibung}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section - Enhanced */}
      <section className="py-24 bg-gradient-to-b from-white via-primary/20 to-primary/10 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-10 w-36 h-36 bg-therme/5 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-40 right-10 w-28 h-28 bg-sightseeing/5 rounded-full animate-bounce delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
              Unsere Reisekategorien
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-accent to-accent/80 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Wählen Sie zwischen Wellness und Kultur
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div 
              className="group bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-500 hover:shadow-3xl border border-gray-100 relative"
              onClick={() => onNavigate('therme')}
            >
              {/* Floating Badge */}
              <div className="absolute top-6 right-6 bg-therme text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg z-10">
                Wellness
              </div>
              
              <div className="h-48 bg-gradient-to-br from-therme via-therme/80 to-therme/60 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full -translate-y-20 translate-x-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="text-4xl mb-2">🏊‍♀️</div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-therme transition-colors duration-300">
                  Thermenreisen
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Entspannung pur in den schönsten Thermalquellen Europas. 
                  Wellness, Gesundheit und Erholung in erstklassigen Hotels.
                </p>
                <div className="flex items-center text-therme font-bold group-hover:text-therme/80 transition-colors duration-300">
                  <span>{homepageData.cta_therme_text}</span>
                  <ArrowRight className="h-5 w-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </div>

            <div 
              className="group bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-500 hover:shadow-3xl border border-gray-100 relative"
              onClick={() => onNavigate('sightseeing')}
            >
              {/* Floating Badge */}
              <div className="absolute top-6 right-6 bg-sightseeing text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg z-10">
                Kultur
              </div>
              
              <div className="h-48 bg-gradient-to-br from-sightseeing via-sightseeing/80 to-sightseeing/60 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full -translate-y-20 translate-x-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="text-4xl mb-2">🏛️</div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-sightseeing transition-colors duration-300">
                  Besichtigungsreisen
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Kulturelle Höhepunkte und historische Schätze entdecken. 
                  Geführte Touren zu den faszinierendsten Orten Europas.
                </p>
                <div className="flex items-center text-sightseeing font-bold group-hover:text-sightseeing/80 transition-colors duration-300">
                  <span>{homepageData.cta_sightseeing_text}</span>
                  <ArrowRight className="h-5 w-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gallery Section - Enhanced */}
      {featuredImages.length > 0 && (
        <section className="py-24 bg-gradient-to-b from-primary/10 to-white relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-20 w-44 h-44 bg-purple-500/5 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-36 h-36 bg-accent/5 rounded-full animate-bounce delay-700"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                Unsere schönsten Reisefotos
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-purple-600 to-purple-500 mx-auto rounded-full mb-4"></div>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Lassen Sie sich von den Eindrücken unserer Busreisen inspirieren
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {featuredImages.slice(0, 8).map((image, index) => (
                <div
                  key={image.id}
                  onClick={() => {
                    setSelectedImage(image);
                    setCurrentGalleryIndex(index);
                  }}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 cursor-pointer relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={image.bild_url}
                      alt={image.titel}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Favorit Badge */}
                    <div className="absolute top-3 right-3 bg-yellow-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-lg">
                      ⭐
                    </div>
                    
                    {/* View Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                        <Eye className="h-6 w-6" />
                      </div>
                    </div>
                    
                    {/* Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-bold text-sm mb-1">{image.titel}</h3>
                      <div className="flex items-center text-xs">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{image.ort}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-16">
              <button 
                onClick={() => onNavigate('galerie')}
                className="group relative bg-gradient-to-r from-purple-600 to-purple-700 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10 flex items-center justify-center">
                  <span className="mr-3 text-xl">📸</span>
                  Alle Fotos ansehen
                  <ArrowRight className="h-5 w-5 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img
              src={selectedImage.bild_url}
              alt={selectedImage.titel}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            {featuredImages.length > 1 && (
              <>
                <button
                  onClick={prevGalleryImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                
                <button
                  onClick={nextGalleryImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
            
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 text-2xl"
            >
              ×
            </button>
            
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white p-4 rounded-lg max-w-md">
              <h3 className="font-bold mb-1">{selectedImage.titel}</h3>
              {selectedImage.beschreibung && (
                <p className="text-white/90 text-sm mb-2">{selectedImage.beschreibung}</p>
              )}
              <div className="flex items-center space-x-4 text-sm text-white/80">
                <span className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {selectedImage.ort}
                </span>
                <span className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {selectedImage.reise_datum}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};