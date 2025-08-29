import React, { useState, useEffect } from 'react';
import { Bus, MapPin, ChevronDown, ArrowRight, Phone, Mail, Globe, Menu, X } from 'lucide-react';
import { useTrips } from '../hooks/useTrips';

interface HeaderProps {
  currentPage: 'home' | 'therme' | 'sightseeing' | 'trip' | 'galerie' | 'sonstiges';
  onNavigate: (page: 'home' | 'therme' | 'sightseeing' | 'galerie' | 'sonstiges') => void;
  onTripSelect?: (trip: any) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, onTripSelect }) => {
  const [showThermeDropdown, setShowThermeDropdown] = useState(false);
  const [showSightseeingDropdown, setShowSightseeingDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
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
    setShowMobileMenu(false);
    if (onTripSelect) {
      onTripSelect(trip);
    }
  };

  const handleNavigateAndClose = (page: any) => {
    setShowMobileMenu(false);
    onNavigate(page);
  };

  return (
    <header className="bg-primary shadow-lg border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section - Modernized */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <img 
              src="/20250210-0001-2-freisteller.png" 
              alt="Platzl Reisen Logo" 
              className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-105 drop-shadow-md"
            />
            <div>
              <h1 className="text-xl font-bold text-accent leading-tight">
                Platzl Reisen
              </h1>
              <p className="text-gray-600 text-xs font-medium">
                Ihr Reisepartner seit 1990
              </p>
            </div>
          </div>
          
          {/* Desktop Navigation - Clean & Modern */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* Thermenreisen Dropdown */}
            <div 
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onMouseEnter={() => setShowThermeDropdown(true)}
               onMouseEnter={() => {
                 setShowThermeDropdown(true);
                 setShowSightseeingDropdown(false);
               }}
              onMouseLeave={() => setShowThermeDropdown(false)}
                className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                  currentPage === 'therme' 
                    ? 'bg-therme text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-white/80 hover:text-therme hover:shadow-md'
                }`}
              >
                <span>🏊‍♀️</span>
                <span>Thermenreisen</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showThermeDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showThermeDropdown && (
                <div 
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-top-4 duration-300"
                  onMouseEnter={() => setShowThermeDropdown(true)}
                  onMouseLeave={() => setShowThermeDropdown(false)}
                >
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
               onMouseEnter={() => {
                 setShowSightseeingDropdown(true);
                 setShowThermeDropdown(false);
               }}
              onMouseLeave={() => setShowSightseeingDropdown(false)}
                className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                  currentPage === 'sightseeing' 
                    ? 'bg-sightseeing text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-white/80 hover:text-sightseeing hover:shadow-md'
                }`}
              >
                <span>🏛️</span>
                <span>Besichtigungsreisen</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showSightseeingDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showSightseeingDropdown && (
                <div 
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-top-4 duration-300"
                  onMouseEnter={() => setShowSightseeingDropdown(true)}
                  onMouseLeave={() => setShowSightseeingDropdown(false)}
                >
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

            {/* Other Navigation Items */}
            <button
              onClick={() => onNavigate('galerie')}
              className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                currentPage === 'galerie' 
                  ? 'bg-purple-600 text-white shadow-lg' 
                  : 'text-gray-700 hover:bg-white/80 hover:text-purple-600 hover:shadow-md'
              }`}
            >
              <span className="flex items-center space-x-2">
                <span>📸</span>
                <span>Galerie</span>
              </span>
            </button>
            
            <button
              onClick={() => onNavigate('sonstiges')}
              className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                currentPage === 'sonstiges' 
                  ? 'bg-gray-600 text-white shadow-lg' 
                  : 'text-gray-700 hover:bg-white/80 hover:text-gray-600 hover:shadow-md'
              }`}
            >
              <span className="flex items-center space-x-2">
                <span>📋</span>
                <span>Sonstiges</span>
              </span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden p-2 rounded-xl bg-white/60 hover:bg-white/80 transition-all duration-300"
          >
            {showMobileMenu ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="lg:hidden py-4 border-t border-gray-200 bg-white/90 backdrop-blur-sm rounded-b-2xl mt-2 shadow-lg animate-in slide-in-from-top-4 duration-300">
            <nav className="flex flex-col space-y-2">
              <button
                onClick={() => handleNavigateAndClose('therme')}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  currentPage === 'therme' 
                    ? 'bg-therme text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>🏊‍♀️</span>
                <span>Thermenreisen</span>
              </button>
              <button
                onClick={() => handleNavigateAndClose('sightseeing')}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  currentPage === 'sightseeing' 
                    ? 'bg-sightseeing text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>🏛️</span>
                <span>Besichtigungsreisen</span>
              </button>
              <button
                onClick={() => handleNavigateAndClose('galerie')}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  currentPage === 'galerie' 
                    ? 'bg-purple-600 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>📸</span>
                <span>Galerie</span>
              </button>
              <button
                onClick={() => handleNavigateAndClose('sonstiges')}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  currentPage === 'sonstiges' 
                    ? 'bg-gray-600 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>📋</span>
                <span>Sonstiges</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};