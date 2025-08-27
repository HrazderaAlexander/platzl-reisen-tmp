import React from 'react';
import { ArrowLeft, Shield, Phone, Mail, MapPin, ExternalLink, Heart, Plane, Package, AlertTriangle, Check, Award, Star } from 'lucide-react';
import { useReiseversicherung } from '../hooks/useReiseversicherung';

interface ReiseversicherungPageProps {
  onBack: () => void;
}

export const ReiseversicherungPage: React.FC<ReiseversicherungPageProps> = ({ onBack }) => {
  const { reiseversicherungSettings, loading, error, usingMockData } = useReiseversicherung();

  // Icon mapping für Versicherungsarten
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      shield: Shield,
      heart: Heart,
      plane: Plane,
      luggage: Package,
      medical: Heart,
      home: Shield,
      car: Shield,
      umbrella: Shield
    };
    return iconMap[iconName] || Shield;
  };

  // Farb-Mapping für Versicherungsarten
  const getColorClasses = (farbe: string) => {
    const colorMap: { [key: string]: { bg: string; border: string; text: string; gradient: string } } = {
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', gradient: 'from-blue-500 to-blue-600' },
      green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', gradient: 'from-green-500 to-green-600' },
      red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', gradient: 'from-red-500 to-red-600' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', gradient: 'from-orange-500 to-orange-600' },
      purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', gradient: 'from-purple-500 to-purple-600' },
      teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-600', gradient: 'from-teal-500 to-teal-600' }
    };
    return colorMap[farbe] || colorMap.blue;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-primary/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-accent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Reiseversicherung wird geladen...</p>
        </div>
      </div>
    );
  }

  if (!reiseversicherungSettings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-primary/20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Fehler beim Laden der Reiseversicherung-Daten</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-primary/20">
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

      {/* Header */}
      <div className="bg-gradient-to-r from-accent to-accent/80 text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="container mx-auto px-4">
          <button
            onClick={onBack}
            className="group flex items-center text-white/90 hover:text-white mb-8 transition-all duration-300 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl hover:bg-white/20 hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4 mr-3 transform group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium text-sm">Zurück</span>
          </button>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-white/20 p-3 rounded-2xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">{reiseversicherungSettings.titel}</h1>
              <p className="text-white/90 text-lg mt-2">{reiseversicherungSettings.untertitel}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hauptbild - Hero Style */}
      {reiseversicherungSettings.hauptbild && (
        <div className="relative h-80 overflow-hidden">
          <img
            src={reiseversicherungSettings.hauptbild}
            alt="Reiseversicherung"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-3xl font-bold mb-2">Reiseversicherung</h2>
            <p className="text-white/90 text-lg">Sicher reisen mit dem richtigen Schutz</p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Intro Text */}
              {reiseversicherungSettings.intro_text && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-xl">
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold text-blue-800 mb-2">Reiseversicherung</h3>
                      <div 
                        className="text-blue-700 text-sm"
                        dangerouslySetInnerHTML={{ __html: reiseversicherungSettings.intro_text }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Versicherungsarten */}
              <div>
                <h2 className="text-2xl font-bold text-accent mb-8 text-center">
                  {reiseversicherungSettings.versicherungsarten_titel}
                </h2>
                
                <div className="space-y-6">
                  {reiseversicherungSettings.versicherungsarten.map((versicherung, index) => {
                    const IconComponent = getIconComponent(versicherung.icon);
                    const colors = getColorClasses(versicherung.farbe);
                    
                    return (
                      <div
                        key={index}
                        className={`bg-white rounded-2xl shadow-lg p-8 border border-gray-100 ${colors.bg} ${colors.border} relative overflow-hidden`}
                      >
                        {/* Empfohlen Badge */}
                        {versicherung.empfohlen && (
                          <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            ⭐ Empfohlen
                          </div>
                        )}
                        
                        <div className="flex items-start space-x-6">
                          {/* Icon */}
                          <div className={`${colors.bg} ${colors.border} border p-4 rounded-xl`}>
                            <IconComponent className={`h-8 w-8 ${colors.text}`} />
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                  {versicherung.name}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                  {versicherung.beschreibung}
                                </p>
                              </div>
                              {versicherung.preis_info && (
                                <div className={`${colors.bg} ${colors.border} border px-4 py-2 rounded-lg`}>
                                  <span className={`font-bold text-sm ${colors.text}`}>
                                    {versicherung.preis_info}
                                  </span>
                                </div>
                              )}
                            </div>
                            
                            {/* Leistungen */}
                            {versicherung.leistungen && (
                              <div className="bg-white/60 rounded-lg p-4 border border-gray-200">
                                <h4 className="font-semibold text-gray-800 mb-2 text-sm">Leistungen:</h4>
                                <div 
                                    // 👇 HIER: Die 'prose'-Klasse kümmert sich um das Styling der Liste
                                    className="prose prose-sm max-w-none prose-li:marker:text-gray-600"
                                    dangerouslySetInnerHTML={{ __html: versicherung.leistungen }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Empfehlung */}
              {reiseversicherungSettings.empfehlung_text && (
                <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-xl">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
                    <div 
                      className="text-green-700 text-sm"
                      dangerouslySetInnerHTML={{ __html: reiseversicherungSettings.empfehlung_text }}
                    />
                  </div>
                </div>
              )}

              {/* Wichtige Hinweise */}
              {reiseversicherungSettings.wichtige_hinweise && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
                    <div 
                      className="text-yellow-700 text-sm"
                      dangerouslySetInnerHTML={{ __html: reiseversicherungSettings.wichtige_hinweise }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Beratung */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-accent/10 p-2 rounded-lg">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm">{reiseversicherungSettings.beratung_titel}</h3>
                </div>
                
                <div 
                  className="text-gray-700 text-sm"
                  dangerouslySetInnerHTML={{ __html: reiseversicherungSettings.beratung_text }}
                />
              </div>

              {/* Kontakt */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-accent/10 p-2 rounded-lg">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm">{reiseversicherungSettings.kontakt_titel}</h3>
                </div>
                
                <div 
                  className="text-gray-700 text-sm mb-4 reiseversicherung-content"
                  dangerouslySetInnerHTML={{ __html: reiseversicherungSettings.kontakt_text }}
                />
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-accent" />
                    <span className="font-medium">{reiseversicherungSettings.telefon}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-accent" />
                    <span className="font-medium">{reiseversicherungSettings.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-accent" />
                    <span className="font-medium">Linz, Österreich</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
