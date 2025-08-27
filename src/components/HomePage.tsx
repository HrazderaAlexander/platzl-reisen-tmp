import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, Star, ChevronLeft, ChevronRight, Award, Heart, ThumbsUp, Shield, Play, Pause, Phone, Mail, ArrowRight } from 'lucide-react';
import { useHomepage } from '../hooks/useHomepage';

interface HomePageProps {
  onNavigate: (page: 'therme' | 'sightseeing') => void;
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

  // Dann alle anderen Hooks
  const { homepageData, loading, error, usingMockData } = useHomepage();

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
      <section className="relative h-screen overflow-hidden">
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
            <div className="absolute inset-0 bg-black/50" />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
          </div>
        </div>

        {/* Navigation Controls */}
        <button
          onClick={prevImage}
          className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 shadow-xl border border-white/20"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <button
          onClick={nextImage}
          className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 shadow-xl border border-white/20"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute right-8 bottom-24 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 shadow-xl border border-white/20"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10 bg-black/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          {homepageData.hero_bilder.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white scale-125 shadow-lg' 
                  : 'bg-white/40 hover:bg-white/70 hover:scale-110'
              }`}
            />
          ))}
        </div>

        {/* Hero Content - Centered */}
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center z-10">
          <div className="text-center max-w-4xl">
            {/* Main Title */}
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white leading-tight tracking-tight">
              {homepageData.hero_titel}
            </h1>
            
            {/* Slogan */}
            <p className="text-xl md:text-2xl text-orange-400 font-medium mb-12 tracking-wide">
              {homepageData.hero_untertitel}
            </p>
            
            {/* Contact Information */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <Phone className="h-5 w-5 text-orange-400" />
                <span className="text-white font-medium text-lg">{homepageData.telefon}</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <Mail className="h-5 w-5 text-orange-400" />
                <span className="text-white font-medium text-lg">{homepageData.email}</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => onNavigate('therme')}
                className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105 backdrop-blur-sm border border-orange-400/20"
              >
                <span className="flex items-center justify-center">
                  {homepageData.cta_therme_text}
                  <ArrowRight className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
              <button 
                onClick={() => onNavigate('sightseeing')}
                className="group bg-white/10 backdrop-blur-md text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105 border border-white/30"
              >
                <span className="flex items-center justify-center">
                  {homepageData.cta_sightseeing_text}
                  <ArrowRight className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-8 animate-bounce z-10">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm">
            <div className="w-1 h-3 bg-white/75 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-primary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
              {homepageData.features_titel}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent/80 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {homepageData.features.map((feature, index) => {
              const IconComponent = getIconComponent(feature.icon);
              return (
                <div key={index} className="text-center group">
                  <div className="bg-gradient-to-br from-primary to-primary/60 p-5 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:from-accent group-hover:to-accent/80 transition-all duration-500 group-hover:scale-110 shadow-xl group-hover:shadow-2xl">
                    <IconComponent className="h-7 w-7 text-accent group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-gray-800 group-hover:text-accent transition-colors duration-300">
                    {feature.titel}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {feature.beschreibung}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-b from-primary/20 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
              Unsere Reisekategorien
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent/80 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div 
              className="group bg-white rounded-3xl shadow-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-500 hover:shadow-3xl border border-gray-100"
              onClick={() => onNavigate('therme')}
            >
              <div className="h-40 bg-gradient-to-br from-therme to-therme/60 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-3xl mb-2">🏊‍♀️</div>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-white font-medium text-sm">Wellness</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-therme transition-colors duration-300">
                  Thermenreisen
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                  Entspannung pur in den schönsten Thermalquellen Europas. 
                  Wellness, Gesundheit und Erholung in erstklassigen Hotels.
                </p>
                <div className="flex items-center text-therme font-semibold group-hover:text-therme/80 transition-colors duration-300 text-sm">
                  <span>{homepageData.cta_therme_text}</span>
                  <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </div>

            <div 
              className="group bg-white rounded-3xl shadow-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-500 hover:shadow-3xl border border-gray-100"
              onClick={() => onNavigate('sightseeing')}
            >
              <div className="h-40 bg-gradient-to-br from-sightseeing to-sightseeing/60 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-3xl mb-2">🏛️</div>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-white font-medium text-sm">Kultur</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-sightseeing transition-colors duration-300">
                  Besichtigungsreisen
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                  Kulturelle Höhepunkte und historische Schätze entdecken. 
                  Geführte Touren zu den faszinierendsten Orten Europas.
                </p>
                <div className="flex items-center text-sightseeing font-semibold group-hover:text-sightseeing/80 transition-colors duration-300 text-sm">
                  <span>{homepageData.cta_sightseeing_text}</span>
                  <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};