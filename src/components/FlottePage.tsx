import React, { useState } from 'react';
import { ArrowLeft, Bus, Star, Calendar, Users, Eye, ChevronLeft, ChevronRight, Check, Settings, Shield, Award } from 'lucide-react';
import { useFlotte } from '../hooks/useFlotte';

interface FlottePageProps {
  onBack: () => void;
}

export const FlottePage: React.FC<FlottePageProps> = ({ onBack }) => {
  const { fahrzeuge, flottenSettings, loading, error, usingMockData, getFahrzeugeByCategory, getCategoryTitle } = useFlotte();
  const [selectedFahrzeug, setSelectedFahrzeug] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageModal, setImageModal] = useState<{src: string, alt: string} | null>(null);

  // Icon mapping für Ausstattung
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      'air-conditioning': Settings,
      'wifi': Settings,
      'toilet': Settings,
      'kitchen': Settings,
      'tv': Eye,
      'radio': Settings,
      'seats': Users,
      'safety': Shield,
      'navigation': Settings,
      'dvd': Eye,
      'coffee': Settings,
      'fridge': Settings,
      'heating': Settings,
      'usb': Settings,
      'power': Settings,
      'luggage': Settings
    };
    return iconMap[iconName] || Settings;
  };

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < count ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const nextImage = () => {
    if (selectedFahrzeug?.galerie_bilder) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedFahrzeug.galerie_bilder.length);
    }
  };

  const prevImage = () => {
    if (selectedFahrzeug?.galerie_bilder) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedFahrzeug.galerie_bilder.length) % selectedFahrzeug.galerie_bilder.length);
    }
  };

  const openImageModal = (src: string, alt: string) => {
    setImageModal({ src, alt });
  };

  const closeImageModal = () => {
    setImageModal(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-primary/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-accent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Flotte wird geladen...</p>
        </div>
      </div>
    );
  }

  if (!flottenSettings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-primary/20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Fehler beim Laden der Flotten-Daten</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  const categories: Array<{ key: any }> = [
    { key: 'reisebus' },
    { key: 'kleinbus' },
    { key: 'pkw' }
  ];

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
              <Bus className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">{flottenSettings.titel}</h1>
              <p className="text-white/90 text-lg mt-2">{flottenSettings.untertitel}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hauptbild - Hero Style */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={flottenSettings.hauptbild || 'https://images.pexels.com/photos/1098365/pexels-photo-1098365.jpeg?auto=compress&cs=tinysrgb&w=1200'}
          alt="Unsere Flotte"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-8 left-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Moderne Fahrzeugflotte</h2>
          <p className="text-white/90 text-lg">Komfort und Sicherheit für Ihre Reise</p>
        </div>
      </div>

      {/* Allgemeine Ausstattung */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-accent/10 p-2 rounded-lg">
                <Award className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">{flottenSettings.ausstattung_titel}</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {flottenSettings.allgemeine_ausstattung.map((item, index) => {
                const IconComponent = getIconComponent(item.icon);
                return (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-accent/10 p-2 rounded-lg">
                      <IconComponent className="h-4 w-4 text-accent" />
                    </div>
                    <span className="text-gray-700 text-sm font-medium">{item.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>


      {/* Fahrzeuge nach Kategorien */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-6xl mx-auto space-y-16">
          {categories.map(({ key }) => {
            const vehicles = getFahrzeugeByCategory(key);
            if (vehicles.length === 0) return null;

            return (
              <div key={key} className="space-y-8">
                {/* Category Title */}
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-accent mb-2">
                    {getCategoryTitle(key)}
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent/80 mx-auto rounded-full"></div>
                </div>

                {/* Fahrzeuge Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {vehicles.map((fahrzeug) => (
                    <div
                      key={fahrzeug.id}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                      onClick={() => {
                        setSelectedFahrzeug(fahrzeug);
                        setCurrentImageIndex(0);
                      }}
                    >
                      {/* Fahrzeug Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={fahrzeug.hauptbild || 'https://images.pexels.com/photos/1098365/pexels-photo-1098365.jpeg?auto=compress&cs=tinysrgb&w=800'}
                          alt={fahrzeug.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        
                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex space-x-2">
                          <div className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold">
                            {fahrzeug.marke}
                          </div>
                          {fahrzeug.featured && (
                            <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                              ⭐ Featured
                            </div>
                          )}
                        </div>
                        
                        {fahrzeug.sterne > 0 && (
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                            <div className="flex items-center space-x-1">
                              {renderStars(fahrzeug.sterne)}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Fahrzeug Info */}
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                          {fahrzeug.name}
                        </h3>
                        <p className="text-accent font-medium text-sm mb-3">
                          {fahrzeug.modell} • Baujahr {fahrzeug.baujahr}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{fahrzeug.sitzplaetze} Plätze</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{fahrzeug.baujahr}</span>
                          </div>
                        </div>

                        {/* Top Ausstattung */}
                        <div className="space-y-2">
                          {fahrzeug.ausstattung.slice(0, 3).map((item, index) => {
                            const IconComponent = getIconComponent(item.icon);
                            return (
                              <div key={index} className="flex items-center text-xs text-gray-600">
                                <Check className="h-3 w-3 mr-2 text-green-600" />
                                <span>{item.name}</span>
                              </div>
                            );
                          })}
                          {fahrzeug.ausstattung.length > 3 && (
                            <div className="text-xs text-gray-500 italic">
                              +{fahrzeug.ausstattung.length - 3} weitere Features
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fahrzeug Detail Modal */}
      {selectedFahrzeug && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
            {/* Modal Header mit großem Hauptbild */}
            <div className="relative h-96">
              {selectedFahrzeug.galerie_bilder && selectedFahrzeug.galerie_bilder.length > 0 ? (
                <>
                  {/* Hauptbild anzeigen */}
                  <img
                    src={selectedFahrzeug.hauptbild || 'https://images.pexels.com/photos/1098365/pexels-photo-1098365.jpeg?auto=compress&cs=tinysrgb&w=1200'}
                    alt={`${selectedFahrzeug.name} - Hauptbild`}
                    className="w-full h-full object-cover"
                  />
                </>
              ) : (
                <>
                  {/* Hauptbild als Fallback */}
                  <img
                    src={selectedFahrzeug.hauptbild || 'https://images.pexels.com/photos/1098365/pexels-photo-1098365.jpeg?auto=compress&cs=tinysrgb&w=800'}
                    alt={selectedFahrzeug.name}
                    className="w-full h-full object-cover"
                  />
                </>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedFahrzeug(null)}
                className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                ×
              </button>
              
              {/* Fahrzeug Info Overlay */}
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-3xl font-bold mb-2">{selectedFahrzeug.name}</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {renderStars(selectedFahrzeug.sterne)}
                  </div>
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    {selectedFahrzeug.marke} {selectedFahrzeug.modell}
                  </span>
                  <span className="bg-accent/80 px-3 py-1 rounded-full text-sm font-bold">
                    {selectedFahrzeug.baujahr}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-8 max-h-96 overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Beschreibung */}
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Beschreibung</h4>
                  {selectedFahrzeug.beschreibung ? (
                    <div 
                      className="text-gray-700 leading-relaxed text-sm"
                      dangerouslySetInnerHTML={{ __html: selectedFahrzeug.beschreibung }}
                    />
                  ) : (
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {selectedFahrzeug.marke} {selectedFahrzeug.modell} aus dem Jahr {selectedFahrzeug.baujahr} 
                      mit {selectedFahrzeug.sitzplaetze} Sitzplätzen.
                    </p>
                  )}
                </div>

                {/* Technische Daten */}
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Technische Daten</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 text-sm">Baujahr:</span>
                      <span className="font-medium text-sm">{selectedFahrzeug.baujahr}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 text-sm">Sitzplätze:</span>
                      <span className="font-medium text-sm">
                        {selectedFahrzeug.sitzplaetze}
                        {selectedFahrzeug.reiseleiter_sitz && ' + 1 Reiseleitersitz'}
                      </span>
                    </div>
                    {selectedFahrzeug.technische_daten.map((data: any, index: number) => (
                      <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600 text-sm">{data.bezeichnung}:</span>
                        <span className="font-medium text-sm">{data.wert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Galerie-Bilder Sektion */}
              {selectedFahrzeug.galerie_bilder && selectedFahrzeug.galerie_bilder.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <Eye className="h-5 w-5 mr-2 text-accent" />
                    Galerie ({selectedFahrzeug.galerie_bilder.length} Bilder)
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {selectedFahrzeug.galerie_bilder.map((image: string, index: number) => (
                      <div 
                        key={index}
                        className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden cursor-pointer group shadow-md hover:shadow-lg transition-all duration-300"
                        onClick={() => openImageModal(image, `${selectedFahrzeug.name} - Galerie ${index + 1}`)}
                      >
                        <img
                          src={image}
                          alt={`${selectedFahrzeug.name} - Galerie ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
                          {index + 1}
                        </div>
                        <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm text-white w-6 h-6 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          🔍
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Extra Abstand unter der Galerie */}
                  <div className="h-8"></div>
                </div>
              )}
              {/* Ausstattung */}
              {selectedFahrzeug.ausstattung && selectedFahrzeug.ausstattung.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Ausstattung</h4>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {selectedFahrzeug.ausstattung.map((item: any, index: number) => {
                      const IconComponent = getIconComponent(item.icon);
                      return (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-100">
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-gray-700 text-sm">{item.name}</span>
                        </div>
                      );
                    })}
                  </div>
                  {/* Extra Abstand unter der Ausstattung */}
                  <div className="h-8"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bild-Modal für vergrößerte Ansicht */}
      {imageModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img
              src={imageModal.src}
              alt={imageModal.alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 text-2xl"
            >
              ×
            </button>
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
              <p className="font-medium">{imageModal.alt}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};