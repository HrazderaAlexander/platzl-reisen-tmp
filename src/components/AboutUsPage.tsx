import React from 'react';
import { ArrowLeft, Building, Clock, Phone, Mail, MapPin, Award, Check, ArrowRight, Star, Ship, Users, Bus } from 'lucide-react';
import { useAboutUs } from '../hooks/useAboutUs';

interface AboutUsPageProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onBack, onNavigate }) => {
  const { aboutUsData, loading, error, usingMockData } = useAboutUs();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-primary/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-accent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Über uns wird geladen...</p>
        </div>
      </div>
    );
  }

  if (!aboutUsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-primary/20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Fehler beim Laden der Über uns-Daten</p>
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
              <Building className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">{aboutUsData.titel}</h1>
              <p className="text-white/90 text-lg mt-2">{aboutUsData.untertitel}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      {aboutUsData.hero_bild && (
        <div className="relative h-80 overflow-hidden">
          <img
            src={aboutUsData.hero_bild}
            alt="Platzl Reisen"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-3xl font-bold mb-2">Seit 80 Jahren Ihr Reisepartner</h2>
            <p className="text-white/90 text-lg">Familienbetrieb mit Tradition und Qualität</p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Öffnungszeiten */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-accent/10 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                  <h2 className="text-xl font-bold text-accent">{aboutUsData.oeffnungszeiten_titel}</h2>
                </div>
                
                <div 
                  className="text-gray-700 text-sm mb-6"
                  dangerouslySetInnerHTML={{ __html: aboutUsData.oeffnungszeiten_text }}
                />
                
                <div className="space-y-4">
                  <div className="bg-accent/5 p-4 rounded-lg">
                    <p className="font-bold text-accent text-sm uppercase tracking-wide">
                      {aboutUsData.montag_donnerstag}
                    </p>
                  </div>
                  <div className="bg-accent/5 p-4 rounded-lg">
                    <p className="font-bold text-accent text-sm uppercase tracking-wide">
                      {aboutUsData.freitag}
                    </p>
                  </div>
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <p className="font-bold text-red-600 text-sm uppercase tracking-wide">
                      {aboutUsData.betriebsurlaub}
                    </p>
                  </div>
                </div>
              </div>

              {/* Büro Linz */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-accent/10 p-2 rounded-lg">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <h2 className="text-xl font-bold text-accent">{aboutUsData.buero_linz_titel}</h2>
                </div>
                
                <div 
                  className="text-gray-700 text-sm mb-4"
                  dangerouslySetInnerHTML={{ __html: aboutUsData.buero_linz_text }}
                />
                
                <div className="space-y-2 text-sm">
                  <p className="text-gray-800 font-medium">{aboutUsData.buero_linz_adresse}</p>
                  <p className="text-gray-800 font-medium">{aboutUsData.buero_linz_plz_ort}</p>
                  <p className="text-accent font-bold">{aboutUsData.buero_linz_telefon}</p>
                </div>
              </div>
            </div>

            {/* Center Column */}
            <div className="space-y-8">
              {/* Service */}
              <div className="bg-gradient-to-r from-accent to-accent/80 text-white rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold">{aboutUsData.service_titel}</h2>
                </div>
                
                <div className="space-y-3">
                  {aboutUsData.service_punkte.map((punkt, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="bg-white/20 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                        ✓
                      </div>
                      <p className="text-white/90 text-sm leading-relaxed">
                        {punkt.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reisen mit Komfort */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-accent/10 p-2 rounded-lg">
                    <Bus className="h-5 w-5 text-accent" />
                  </div>
                  <h2 className="text-xl font-bold text-accent">{aboutUsData.reisen_komfort_titel}</h2>
                </div>
                
                <div 
                  className="text-gray-700 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: aboutUsData.reisen_komfort_text }}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Thermenreisen */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-accent mb-3">{aboutUsData.thermenreisen_titel}</h3>
                <div 
                  className="text-gray-700 text-sm mb-4"
                  dangerouslySetInnerHTML={{ __html: aboutUsData.thermenreisen_text }}
                />
                <button
                  onClick={() => onNavigate?.('therme')}
                  className="flex items-center text-accent hover:text-accent/80 font-bold text-sm transition-colors duration-300"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  {aboutUsData.thermenreisen_link_text}
                </button>
              </div>

              {/* Städte-, Kultur- und Naturreisen */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-accent mb-3">{aboutUsData.stadte_kultur_titel}</h3>
                <div 
                  className="text-gray-700 text-sm mb-4"
                  dangerouslySetInnerHTML={{ __html: aboutUsData.stadte_kultur_text }}
                />
                <button
                  onClick={() => onNavigate?.('sightseeing')}
                  className="flex items-center text-accent hover:text-accent/80 font-bold text-sm transition-colors duration-300"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  {aboutUsData.stadte_kultur_link_text}
                </button>
              </div>

              {/* Kreuzfahrten */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-accent mb-3">{aboutUsData.kreuzfahrten_titel}</h3>
                <div 
                  className="text-gray-700 text-sm mb-4"
                  dangerouslySetInnerHTML={{ __html: aboutUsData.kreuzfahrten_text }}
                />
                
                {aboutUsData.kreuzfahrten_auszeichnung && (
                  <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg mb-4">
                    <div className="flex items-start space-x-2">
                      <Star className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div 
                        className="text-yellow-800 text-xs"
                        dangerouslySetInnerHTML={{ __html: aboutUsData.kreuzfahrten_auszeichnung }}
                      />
                    </div>
                  </div>
                )}
                
                <button className="flex items-center text-accent hover:text-accent/80 font-bold text-sm transition-colors duration-300">
                  <Ship className="h-4 w-4 mr-2" />
                  {aboutUsData.kreuzfahrten_link_text}
                </button>
              </div>

              {/* Gruppenreisen */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-accent mb-3">{aboutUsData.gruppenreisen_titel}</h3>
                <div 
                  className="text-gray-700 text-sm mb-4"
                  dangerouslySetInnerHTML={{ __html: aboutUsData.gruppenreisen_text }}
                />
                
                <div className="space-y-2 mb-4">
                  {aboutUsData.gruppenreisen_arten.map((art, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="h-3 w-3 text-accent" />
                      <span className="text-gray-700 text-sm">{art.text}</span>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => onNavigate?.('contact')}
                  className="flex items-center text-accent hover:text-accent/80 font-bold text-sm transition-colors duration-300"
                >
                  <Users className="h-4 w-4 mr-2" />
                  {aboutUsData.kontakt_link_text}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};