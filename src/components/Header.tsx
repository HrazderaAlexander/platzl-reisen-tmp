import React, { useState, useEffect } from 'react';
import { Bus, MapPin, ChevronDown, ArrowRight, Phone, Mail, Globe } from 'lucide-react';
import { useTrips } from '../hooks/useTrips';

interface HeaderProps {
  currentPage: 'home' | 'therme' | 'sightseeing' | 'trip';
  onNavigate: (page: 'home' | 'therme' | 'sightseeing') => void;
  onTripSelect?: (trip: any) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, onTripSelect }) => {
  const [showThermeDropdown, setShowThermeDropdown] = useState(false);
  const [showSightseeingDropdown, setShowSightseeingDropdown] = useState(false);
  
  const { trips: thermeTrips } = useTrips('therme');
  const { trips: sightseeingTrips } = useTrips('sightseeing');

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowThermeDropdown(false);
      setShowSightseeingDropdown(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleTripClick = (trip: any) => {
    setShowThermeDropdown(false);
    setShowSightseeingDropdown(false);
    if (onTripSelect) {
      onTripSelect(trip);
    }
  };

  return (
    <header className="bg-primary shadow-xl border-b-4 border-accent relative z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img 
                src="/20250210-0001-2-freisteller.png" 
                alt="Platzl Reisen Logo" 
                className="h-16 w-auto object-contain drop-shadow-lg hover:drop-shadow-xl transition-all duration-300 hover:scale-105"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-accent">
                Platzl Reisen
              </h1>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 bg-white/50 backdrop-blur-sm px-2 py-1 rounded-full">
                  <Phone className="h-3 w-3 text-accent" />
                  <span className="text-gray-700 text-xs font-medium">0732 / 27 27 17</span>
                </div>
                <div className="flex items-center space-x-1 bg-white/50 backdrop-blur-sm px-2 py-1 rounded-full">
                  <Mail className="h-3 w-3 text-accent" />
                  <span className="text-gray-700 text-xs font-medium">linz@platzl-reisen.at</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            <button
              onClick={() => onNavigate('home')}
              className={`group px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 relative overflow-hidden ${
                currentPage === 'home' 
                  ? 'bg-accent text-white shadow-xl' 
                  : 'text-gray-700 hover:bg-white/70 hover:text-accent hover:shadow-lg'
              }`}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span className="text-lg">🏠</span>
                <span>Home</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button
              onClick={() => onNavigate('sonstiges')}
              className={`group px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 relative overflow-hidden ${
                currentPage === 'sonstiges' 
                  ? 'bg-gray-600 text-white shadow-xl' 
                  : 'text-gray-700 hover:bg-white/70 hover:text-gray-600 hover:shadow-lg'
              }`}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span className="text-lg">📋</span>
                <span>Sonstiges</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 to-gray-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button
              onClick={() => onNavigate('galerie')}
              className={`group px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 relative overflow-hidden ${
                currentPage === 'galerie' 
                  ? 'bg-purple-600 text-white shadow-xl' 
                  : 'text-gray-700 hover:bg-white/70 hover:text-purple-600 hover:shadow-lg'
              }`}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span className="text-lg">📸</span>
                <span>Galerie</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            {/* Thermenreisen Dropdown */}
            <div 
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onMouseEnter={() => setShowThermeDropdown(true)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                  currentPage === 'therme' 
                    ? 'bg-therme text-white shadow-xl' 
                    : 'text-gray-700 hover:bg-white/50 hover:text-therme hover:shadow-lg'
                }`}
              >
                <span>🏊‍♀️ Thermenreisen</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showThermeDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showThermeDropdown && (
                <div 
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-top-4 duration-300"
                  onMouseEnter={() => setShowThermeDropdown(true)}
                  onMouseLeave={() => setShowThermeDropdown(false)}
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-therme to-therme/80 px-4 py-3 text-white">
                    <div className="flex items-center space-x-2">
                      <div className="bg-white/20 p-1.5 rounded-lg">
                        <Bus className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">Thermenreisen</h3>
                        <p className="text-white/90 text-xs">Wellness & Entspannung</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-3">
                    {/* Alle anzeigen Button */}
                    <button
                      onClick={() => {
                        onNavigate('therme');
                        setShowThermeDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-therme/10 transition-all duration-300 group border-b border-gray-100"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="bg-therme/20 p-1.5 rounded-lg group-hover:bg-therme/30 transition-colors duration-300">
                            <MapPin className="h-4 w-4 text-therme" />
                          </div>
                          <div>
                            <div className="font-medium text-sm text-gray-800 group-hover:text-therme transition-colors duration-300">
                              📋 Alle Thermenreisen anzeigen
                            </div>
                            <div className="text-xs text-gray-500">
                              Komplette Übersicht aller Angebote
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-therme opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                      </div>
                    </button>
                    
                    {/* Beliebte Reisen */}
                    {thermeTrips.length > 0 && (
                      <>
                        <div className="px-4 py-2 bg-gray-50">
                          <div className="text-xs text-gray-500 uppercase tracking-wider font-medium flex items-center">
                            ⭐ Beliebte Thermenreisen
                          </div>
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                          {thermeTrips.slice(0, 5).map((trip) => (
                            <button
                              key={trip.id}
                              onClick={() => handleTripClick(trip)}
                              className="w-full px-4 py-3 text-left hover:bg-therme/10 transition-all duration-300 group"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-sm text-gray-800 group-hover:text-therme transition-colors duration-300 truncate">
                                    {trip.title}
                                  </div>
                                  <div className="text-xs text-gray-600 mt-1 flex items-center space-x-2">
                                    <span className="bg-accent/10 text-accent px-2 py-0.5 rounded-full text-xs font-medium">
                                      ab €{trip.base_price},-
                                    </span>
                                    <span className="text-gray-500 text-xs">
                                      {trip.featured_date}
                                    </span>
                                  </div>
                                </div>
                                <ArrowRight className="h-3 w-3 text-therme opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 ml-2" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Besichtigungsreisen Dropdown */}
            <div 
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onMouseEnter={() => setShowSightseeingDropdown(true)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                  currentPage === 'sightseeing' 
                    ? 'bg-sightseeing text-white shadow-xl' 
                    : 'text-gray-700 hover:bg-white/50 hover:text-sightseeing hover:shadow-lg'
                }`}
              >
                <span>🏛️ Besichtigungsreisen</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showSightseeingDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showSightseeingDropdown && (
                <div 
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-top-4 duration-300"
                  onMouseEnter={() => setShowSightseeingDropdown(true)}
                  onMouseLeave={() => setShowSightseeingDropdown(false)}
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-sightseeing to-sightseeing/80 px-4 py-3 text-white">
                    <div className="flex items-center space-x-2">
                      <div className="bg-white/20 p-1.5 rounded-lg">
                        <Bus className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">Besichtigungsreisen</h3>
                        <p className="text-white/90 text-xs">Kultur & Geschichte</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-3">
                    {/* Alle anzeigen Button */}
                    <button
                      onClick={() => {
                        onNavigate('sightseeing');
                        setShowSightseeingDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-sightseeing/10 transition-all duration-300 group border-b border-gray-100"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="bg-sightseeing/20 p-1.5 rounded-lg group-hover:bg-sightseeing/30 transition-colors duration-300">
                            <MapPin className="h-4 w-4 text-sightseeing" />
                          </div>
                          <div>
                            <div className="font-medium text-sm text-gray-800 group-hover:text-sightseeing transition-colors duration-300">
                              📋 Alle Besichtigungsreisen anzeigen
                            </div>
                            <div className="text-xs text-gray-500">
                              Komplette Übersicht aller Angebote
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-sightseeing opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                      </div>
                    </button>
                    
                    {/* Beliebte Reisen */}
                    {sightseeingTrips.length > 0 && (
                      <>
                        <div className="px-4 py-2 bg-gray-50">
                          <div className="text-xs text-gray-500 uppercase tracking-wider font-medium flex items-center">
                            ⭐ Beliebte Besichtigungsreisen
                          </div>
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                          {sightseeingTrips.slice(0, 5).map((trip) => (
                            <button
                              key={trip.id}
                              onClick={() => handleTripClick(trip)}
                              className="w-full px-4 py-3 text-left hover:bg-sightseeing/10 transition-all duration-300 group"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-sm text-gray-800 group-hover:text-sightseeing transition-colors duration-300 truncate">
                                    {trip.title}
                                  </div>
                                  <div className="text-xs text-gray-600 mt-1 flex items-center space-x-2">
                                    <span className="bg-accent/10 text-accent px-2 py-0.5 rounded-full text-xs font-medium">
                                      ab €{trip.base_price},-
                                    </span>
                                    <span className="text-gray-500 text-xs">
                                      {trip.featured_date}
                                    </span>
                                  </div>
                                </div>
                                <ArrowRight className="h-3 w-3 text-sightseeing opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 ml-2" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="hidden lg:flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-lg">
            <Globe className="h-4 w-4 text-accent" />
            <span className="text-gray-700 font-medium text-sm">platzl-reisen.at</span>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <nav className="lg:hidden mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('home')}
            className={`px-4 py-2 text-xs rounded-lg font-medium transition-all duration-300 ${
              currentPage === 'home' 
                ? 'bg-accent text-white shadow-lg' 
                : 'text-gray-700 hover:bg-white/50 hover:text-accent'
            }`}
          >
            🏠 Home
          </button>
          <button
            onClick={() => onNavigate('therme')}
            className={`px-4 py-2 text-xs rounded-lg font-medium transition-all duration-300 ${
              currentPage === 'therme' 
                ? 'bg-therme text-white shadow-lg' 
                : 'text-gray-700 hover:bg-white/50 hover:text-therme'
            }`}
          >
            🏊‍♀️ Thermen
          </button>
          <button
            onClick={() => onNavigate('sightseeing')}
            className={`px-4 py-2 text-xs rounded-lg font-medium transition-all duration-300 ${
              currentPage === 'sightseeing' 
                ? 'bg-sightseeing text-white shadow-lg' 
                : 'text-gray-700 hover:bg-white/50 hover:text-sightseeing'
            }`}
          >
            🏛️ Besichtigung
          </button>
          <button
            onClick={() => onNavigate('sonstiges')}
            className={`px-4 py-2 text-xs rounded-lg font-medium transition-all duration-300 ${
              currentPage === 'sonstiges' 
                ? 'bg-gray-600 text-white shadow-lg' 
                : 'text-gray-700 hover:bg-white/50 hover:text-gray-600'
            }`}
          >
            📋 Sonstiges
          </button>
          <button
            onClick={() => onNavigate('galerie')}
            className={`px-4 py-2 text-xs rounded-lg font-medium transition-all duration-300 ${
              currentPage === 'galerie' 
                ? 'bg-purple-600 text-white shadow-lg' 
                : 'text-gray-700 hover:bg-white/50 hover:text-purple-600'
            }`}
          >
            📸 Galerie
          </button>
        </nav>
      </div>
    </header>
  );
};