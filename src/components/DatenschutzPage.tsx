import React from 'react';
import { ArrowLeft, Shield, Phone, Mail, MapPin, FileText, Building } from 'lucide-react';
import { useDatenschutz } from '../hooks/useDatenschutz';

interface DatenschutzPageProps {
  onBack: () => void;
}

export const DatenschutzPage: React.FC<DatenschutzPageProps> = ({ onBack }) => {
  const { datenschutzData, loading, error, usingMockData } = useDatenschutz();

  // Farb-Mapping für Abschnitte
  const getColorClasses = (farbe: string) => {
    const colorMap: { [key: string]: { bg: string; border: string; text: string } } = {
      rot: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600' },
      blau: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600' },
      gruen: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600' },
      grau: { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-600' }
    };
    return colorMap[farbe] || colorMap.rot;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-primary/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-accent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Datenschutz wird geladen...</p>
        </div>
      </div>
    );
  }

  if (!datenschutzData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-primary/20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Fehler beim Laden der Datenschutz-Daten</p>
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
              <h1 className="text-4xl font-bold">{datenschutzData.titel}</h1>
              <p className="text-white/90 text-lg mt-2">{datenschutzData.untertitel}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Content - Strukturierte Abschnitte */}
            <div className="lg:col-span-3 space-y-8">
              {datenschutzData.abschnitte.map((abschnitt, index) => {
                const colors = getColorClasses(abschnitt.farbe);
                
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    {/* Abschnitt Header */}
                    <div className={`${colors.bg} ${colors.border} border-b px-8 py-6`}>
                      <h2 className={`text-2xl font-bold ${colors.text} uppercase tracking-wide`}>
                        {abschnitt.titel}
                      </h2>
                    </div>
                    
                    {/* Abschnitt Content */}
                    <div className="p-8">
                      <div 
                        className="datenschutz-content prose prose-lg max-w-none text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: abschnitt.inhalt }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Kontakt für Datenschutz-Fragen */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-accent/10 p-2 rounded-lg">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm">Datenschutz-Fragen?</h3>
                </div>
                
                <p className="text-gray-700 text-sm mb-4">
                  Bei Fragen zum Datenschutz kontaktieren Sie uns:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-accent" />
                    <span className="font-medium">{datenschutzData.telefon}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-accent" />
                    <span className="font-medium">{datenschutzData.email}</span>
                  </div>
                  <div className="flex items-start text-sm">
                    <Building className="h-4 w-4 mr-2 text-accent mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium">{datenschutzData.firmenname}</div>
                      <div>{datenschutzData.adresse}</div>
                      <div>{datenschutzData.plz_ort}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ihre Rechte */}
              <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl p-6 border border-accent/20">
                <h3 className="text-lg font-bold text-gray-800 mb-4">{datenschutzData.ihre_rechte_titel}</h3>
                <div className="space-y-3 text-sm">
                  {datenschutzData.ihre_rechte_liste.map((recht, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Shield className="h-4 w-4 text-accent mt-0.5" />
                      <div>
                        <span className="text-gray-700 font-medium">{recht.text}</span>
                        {recht.beschreibung && (
                          <p className="text-gray-600 text-xs mt-1">{recht.beschreibung}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Letzte Aktualisierung */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="text-center">
                  <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <h3 className="font-bold text-gray-800 mb-2 text-sm">Letzte Aktualisierung</h3>
                  <p className="text-gray-600 text-sm">
                    {datenschutzData.letzte_aktualisierung}
                  </p>
                </div>
              </div>

              {/* Aufsichtsbehörde */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h3 className="font-bold text-blue-800 mb-3 text-sm">{datenschutzData.aufsichtsbehoerde_titel}</h3>
                <div className="text-blue-700 text-sm space-y-1">
                  <p className="font-medium">{datenschutzData.aufsichtsbehoerde_name}</p>
                  {datenschutzData.aufsichtsbehoerde_adresse.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};