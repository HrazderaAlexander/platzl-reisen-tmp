import React from 'react';
import { ArrowLeft, Leaf, CheckCircle, ExternalLink, Award } from 'lucide-react';
import { useUmweltbeitrag } from '../hooks/useUmweltbeitrag';

interface UmweltbeitragPageProps {
  onBack: () => void;
}

export const UmweltbeitragPage: React.FC<UmweltbeitragPageProps> = ({ onBack }) => {
  const { umweltbeitragData, loading, error, usingMockData } = useUmweltbeitrag();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-primary/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Umweltbeitrag wird geladen...</p>
        </div>
      </div>
    );
  }

  if (!umweltbeitragData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-primary/20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Fehler beim Laden der Umweltbeitrag-Daten</p>
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
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-16 relative overflow-hidden">
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
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">{umweltbeitragData.titel}</h1>
              <p className="text-white/90 text-lg mt-2">{umweltbeitragData.untertitel}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Haupttext */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="prose prose-lg max-w-none">
                  <div 
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: umweltbeitragData.haupttext }}
                  />
                </div>
              </div>

              {/* Maßnahmen */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">{umweltbeitragData.massnahmen_titel}</h2>
                </div>
                
                <div className="space-y-4">
                  {umweltbeitragData.massnahmen.map((massnahme, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-100">
                      <div className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                        ✓
                      </div>
                      <p className="text-gray-700 leading-relaxed text-sm flex-1">
                        {massnahme.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schlusswort */}
              {umweltbeitragData.schlusswort && (
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 border border-green-200">
                  <div className="prose prose-lg max-w-none">
                    <div 
                      className="text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: umweltbeitragData.schlusswort }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Info Link */}
              {umweltbeitragData.info_link_text && (
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="text-center">
                    <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ExternalLink className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-3 text-sm">Weitere Informationen</h3>
                    {umweltbeitragData.info_link_url ? (
                      <a
                        href={umweltbeitragData.info_link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700 font-medium text-sm underline"
                      >
                        {umweltbeitragData.info_link_text}
                      </a>
                    ) : (
                      <p className="text-green-600 font-medium text-sm">
                        {umweltbeitragData.info_link_text}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Zertifikate */}
              {umweltbeitragData.zertifikat_bilder && umweltbeitragData.zertifikat_bilder.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  {/*<div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-700">
                      <strong>Debug:</strong> {umweltbeitragData.zertifikat_bilder.length} Bilder gefunden
                    </p>
                    <div className="text-xs text-blue-600 mt-1">
                      {umweltbeitragData.zertifikat_bilder.map((url, i) => (
                        <div key={i}>Bild {i + 1}: {url.substring(0, 50)}...</div>
                      ))}
                    </div>
                  </div>*/}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Award className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="font-bold text-gray-800">Zertifikate & Auszeichnungen</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {umweltbeitragData.zertifikat_bilder.map((image, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={image}
                          alt={`Zertifikat ${index + 1}`}
                          className="w-full h-auto object-contain bg-gray-50"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Kontakt für Umweltfragen */}
              <div className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-2xl p-6">
                <h3 className="font-bold mb-3">Fragen zur Nachhaltigkeit?</h3>
                <p className="text-white/90 text-sm mb-4">
                  Kontaktieren Sie uns für weitere Informationen zu unseren Umweltmaßnahmen.
                </p>
                <div className="space-y-2 text-sm">
                  <p>📞 0732 27 27 17</p>
                  <p>✉️ linz@platzl-reisen.at</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};