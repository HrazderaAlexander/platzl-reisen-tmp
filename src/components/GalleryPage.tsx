import React, { useState } from 'react';
import { ArrowLeft, Camera, Filter, Search, MapPin, Calendar, Eye, X, ChevronLeft, ChevronRight, Mail } from 'lucide-react';
import { useGallery } from '../hooks/useGallery';
import { GalleryFilter } from '../types/gallery';

interface GalleryPageProps {
  onBack: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onBack }) => {
  const [filters, setFilters] = useState<GalleryFilter>({});
  const [showFilters, setShowFilters] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const { images, gallerySettings, loading, error, usingMockData, getImagesByReiseDatum, getUniqueMonths, getUniqueYears, getUniqueLocations } = useGallery(filters);

  const handleFilterChange = (key: keyof GalleryFilter, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value || undefined
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const openImageModal = (image: any, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    setSelectedImage(images[currentImageIndex + 1] || images[0]);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    setSelectedImage(images[currentImageIndex - 1] || images[images.length - 1]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-primary/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-accent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Galerie wird geladen...</p>
        </div>
      </div>
    );
  }

  if (!gallerySettings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-primary/20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Fehler beim Laden der Galerie-Daten</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  const groupedImages = getImagesByReiseDatum();
  const hasActiveFilters = Object.values(filters).some(value => value !== undefined && value !== '');

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
              <Camera className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-accent">{gallerySettings.titel}</h1>
              <p className="text-white/90 text-lg mt-2">{gallerySettings.untertitel}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Intro Text */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <p className="text-gray-700 text-sm mb-4">
              {gallerySettings.intro_text}
              <a 
                href={`mailto:${gallerySettings.email_kontakt.replace('(at)', '@')}`}
                className="text-accent hover:text-accent/80 font-medium ml-1"
              >
                {gallerySettings.email_kontakt}
              </a>
            </p>
            <p className="text-gray-600 text-sm italic">
              {gallerySettings.hinweis_text}
            </p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <Filter className="h-4 w-4 mr-2 text-accent" />
                Filter & Suche
              </h3>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                  showFilters 
                    ? 'bg-accent text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {showFilters ? 'Filter ausblenden' : 'Filter anzeigen'}
              </button>
            </div>
            
            {showFilters && (
              <div className="grid md:grid-cols-5 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Suchbegriff
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm"
                    placeholder="Suchen..."
                    value={filters.searchTerm || ''}
                    onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monat
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm"
                    value={filters.monat || ''}
                    onChange={(e) => handleFilterChange('monat', e.target.value)}
                  >
                    <option value="">Alle Monate</option>
                    {getUniqueMonths().map(month => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jahr
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm"
                    value={filters.jahr || ''}
                    onChange={(e) => handleFilterChange('jahr', e.target.value ? parseInt(e.target.value) : undefined)}
                  >
                    <option value="">Alle Jahre</option>
                    {getUniqueYears().map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ort
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm"
                    value={filters.ort || ''}
                    onChange={(e) => handleFilterChange('ort', e.target.value)}
                  >
                    <option value="">Alle Orte</option>
                    {getUniqueLocations().map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button 
                    onClick={clearFilters}
                    className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center text-sm"
                  >
                    <X className="h-3 w-3 mr-2" />
                    Filter zurücksetzen
                  </button>
                </div>
              </div>
            )}
            
            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Aktive Filter:</span>
                  {filters.searchTerm && (
                    <span className="bg-accent/10 text-accent px-2 py-1 rounded-full text-xs">
                      Suche: {filters.searchTerm}
                    </span>
                  )}
                  {filters.monat && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {filters.monat}
                    </span>
                  )}
                  {filters.jahr && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      {filters.jahr}
                    </span>
                  )}
                  {filters.ort && (
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                      {filters.ort}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Gallery Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Sidebar mit Archiv */}
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Gallery */}
            <div className="lg:col-span-3">
              {groupedImages.length > 0 ? (
                <div className="space-y-12">
                  {groupedImages.map((group, groupIndex) => (
                    <div key={group.reise_datum} className="space-y-6">
                      {/* Reise Datum Header */}
                      <div className="text-center">
                        <h2 className="text-2xl font-bold text-accent mb-2 uppercase">
                          {group.reise_datum}
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent/80 mx-auto rounded-full"></div>
                      </div>

                      {/* Images Grid */}
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {group.images.map((image, imageIndex) => (
                          <div
                            key={image.id}
                            onClick={() => openImageModal(image, imageIndex)}
                            className="group bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                          >
                            <div className="relative aspect-square overflow-hidden">
                              <img
                                src={image.bild_url}
                                alt={image.titel}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                              
                              {/* Favorit Badge */}
                              {image.favorit && (
                                <div className="absolute top-2 right-2 bg-yellow-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                                  ⭐
                                </div>
                              )}
                              
                              {/* Hover Overlay */}
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg">
                                  <Eye className="h-4 w-4" />
                                </div>
                              </div>
                            </div>
                            
                            <div className="p-4">
                              <h3 className="font-semibold text-gray-800 text-sm mb-1 group-hover:text-accent transition-colors duration-300">
                                {image.titel}
                              </h3>
                              <div className="flex items-center text-xs text-gray-500">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span>{image.ort}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="bg-gray-100 rounded-2xl p-12">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-600 mb-2">Keine Bilder gefunden</h3>
                    <p className="text-gray-500 text-sm mb-4">
                      {hasActiveFilters 
                        ? 'Keine Bilder entsprechen Ihren Filterkriterien. Versuchen Sie andere Filter oder entfernen Sie sie.'
                        : 'Noch keine Bilder in der Galerie verfügbar.'
                      }
                    </p>
                    {hasActiveFilters && (
                      <button 
                        onClick={clearFilters}
                        className="bg-accent text-white px-4 py-2 rounded-lg font-semibold hover:bg-accent/90 transition-colors duration-300 text-sm"
                      >
                        Filter zurücksetzen
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Archiv */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-8">
                <h3 className="text-lg font-bold text-accent mb-4">{gallerySettings.archiv_titel}</h3>
                
                <div className="space-y-4">
                  {getUniqueYears().map(year => {
                    const yearImages = images.filter(img => img.jahr === year);
                    const yearMonths = [...new Set(yearImages.map(img => img.monat))];
                    
                    return (
                      <div key={year} className="space-y-2">
                        <h4 className="font-bold text-gray-800 text-sm">{year}</h4>
                        <div className="space-y-1 pl-4">
                          {yearMonths.map(month => {
                            const monthImages = yearImages.filter(img => img.monat === month);
                            const locations = [...new Set(monthImages.map(img => img.ort))];
                            
                            return (
                              <div key={`${year}-${month}`} className="space-y-1">
                                <button
                                  onClick={() => setFilters({ monat: month, jahr: year })}
                                  className="text-accent hover:text-accent/80 font-medium text-sm transition-colors duration-300 flex items-center"
                                >
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {month} {year}
                                </button>
                                <div className="pl-4 space-y-1">
                                  {locations.map(location => (
                                    <button
                                      key={location}
                                      onClick={() => setFilters({ monat: month, jahr: year, ort: location })}
                                      className="block text-gray-600 hover:text-accent text-xs transition-colors duration-300"
                                    >
                                      ✓ {location}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img
              src={selectedImage.bild_url}
              alt={selectedImage.titel}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            
            {/* Navigation */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 text-2xl"
            >
              ×
            </button>
            
            {/* Image Info */}
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