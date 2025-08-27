import React from 'react';
import { ArrowLeft, Download, FileText, Calendar, MapPin, Star, Eye, File } from 'lucide-react';
import { useDownloads } from '../hooks/useDownloads';

interface DownloadPageProps {
  onBack: () => void;
}

export const DownloadPage: React.FC<DownloadPageProps> = ({ onBack }) => {
  const { downloads, downloadSettings, loading, error, usingMockData, getDownloadsByCategory, getCategoryTitle, handleDownload } = useDownloads();

  // Icon mapping für Dateitypen
  const getFileTypeIcon = (fileType: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      pdf: FileText,
      doc: FileText,
      docx: FileText,
      xls: FileText,
      xlsx: FileText,
      zip: File,
      jpg: Eye,
      png: Eye
    };
    return iconMap[fileType] || FileText;
  };

  // Farb-Mapping für Dateitypen
  const getFileTypeColor = (fileType: string) => {
    const colorMap: { [key: string]: string } = {
      pdf: 'text-red-600',
      doc: 'text-blue-600',
      docx: 'text-blue-600',
      xls: 'text-green-600',
      xlsx: 'text-green-600',
      zip: 'text-purple-600',
      jpg: 'text-orange-600',
      png: 'text-orange-600'
    };
    return colorMap[fileType] || 'text-gray-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-primary/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-accent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Downloads werden geladen...</p>
        </div>
      </div>
    );
  }

  if (!downloadSettings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-primary/20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Fehler beim Laden der Download-Daten</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  const categories: Array<{ key: any }> = [
    { key: 'katalog' },
    { key: 'formular' },
    { key: 'agb' },
    { key: 'info' },
    { key: 'sonstiges' }
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
              <Download className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">{downloadSettings.titel}</h1>
              <p className="text-white/90 text-lg mt-2">{downloadSettings.untertitel}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hauptbild - Hero Style */}
      {downloadSettings.hauptbild && (
        <div className="relative h-80 overflow-hidden">
          <img
            src={downloadSettings.hauptbild}
            alt="Downloads"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-3xl font-bold mb-2">Kataloge & Dokumente</h2>
            <p className="text-white/90 text-lg">Kostenlos zum Download verfügbar</p>
          </div>
        </div>
      )}

      {/* Info Text */}
      {downloadSettings.info_text && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-xl">
              <div className="flex items-start">
                <FileText className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Kostenlose Downloads</h3>
                  <div 
                    className="text-blue-700 text-sm"
                    dangerouslySetInnerHTML={{ __html: downloadSettings.info_text }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Downloads nach Kategorien */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-6xl mx-auto space-y-16">
          {categories.map(({ key }) => {
            const categoryDownloads = getDownloadsByCategory(key);
            if (categoryDownloads.length === 0) return null;

            return (
              <div key={key} className="space-y-8">
                {/* Category Title */}
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-accent mb-2">
                    {getCategoryTitle(key)}
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent/80 mx-auto rounded-full"></div>
                </div>

                {/* Downloads List - Wie im Bild */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <div className="space-y-6">
                    {categoryDownloads.map((download) => {
                      const FileIcon = getFileTypeIcon(download.dateityp);
                      const fileColor = getFileTypeColor(download.dateityp);
                      
                      return (
                        <div key={download.id} className="group">
                          {/* Jahr/Kategorie Header */}
                          {download.jahr && (
                            <div className="mb-3">
                              <h3 className="text-lg font-bold text-accent">
                                Katalog {download.jahr}
                              </h3>
                            </div>
                          )}
                          
                          {/* Download Item - Wie im Bild */}
                          <div 
                            className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer group-hover:shadow-md"
                            onClick={() => handleDownload(download)}
                          >
                            {/* PDF Icon */}
                            <div className={`flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center ${fileColor}`}>
                              <FileIcon className="h-6 w-6" />
                              <div className="absolute -bottom-1 -right-1 bg-red-600 text-white text-xs px-1 rounded">
                                {download.dateityp.toUpperCase()}
                              </div>
                            </div>
                            
                            {/* Download Info */}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-lg font-semibold text-gray-800 group-hover:text-accent transition-colors duration-300 underline">
                                {download.titel}
                              </h4>
                              {download.beschreibung && (
                                <p className="text-gray-600 text-sm mt-1">
                                  {download.beschreibung}
                                </p>
                              )}
                              
                              {/* File Details */}
                              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                {download.seitenzahl > 0 && (
                                  <span className="flex items-center">
                                    <FileText className="h-3 w-3 mr-1" />
                                    {download.seitenzahl} Seiten
                                  </span>
                                )}
                                {download.dateigroesse && (
                                  <span>{download.dateigroesse}</span>
                                )}
                                {download.download_zaehler > 0 && (
                                  <span className="flex items-center">
                                    <Download className="h-3 w-3 mr-1" />
                                    {download.download_zaehler}x heruntergeladen
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {/* Download Button */}
                            <div className="flex-shrink-0">
                              <div className="bg-accent/10 text-accent px-4 py-2 rounded-lg font-semibold group-hover:bg-accent group-hover:text-white transition-all duration-300 flex items-center text-sm">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Kontakt Section */}
      {downloadSettings.kontakt_titel && (
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl p-8 border border-accent/20">
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-800 mb-4">{downloadSettings.kontakt_titel}</h2>
                <p className="text-gray-700 mb-6 text-sm">
                  {downloadSettings.kontakt_text}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <div className="flex items-center text-sm">
                    <div className="bg-accent/20 p-2 rounded-lg mr-3">
                      <MapPin className="h-4 w-4 text-accent" />
                    </div>
                    <span className="font-medium">Büro: Linz, Österreich</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="bg-accent/20 p-2 rounded-lg mr-3">
                      <FileText className="h-4 w-4 text-accent" />
                    </div>
                    <span className="font-medium">0732 27 27 17</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};