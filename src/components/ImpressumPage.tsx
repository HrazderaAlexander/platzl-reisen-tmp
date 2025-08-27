import React from 'react';
import { ArrowLeft, Building, Phone, Mail, MapPin, FileText, ExternalLink, Shield } from 'lucide-react';
import { useImpressum } from '../hooks/useImpressum';

interface ImpressumPageProps {
  onBack: () => void;
}

export const ImpressumPage: React.FC<ImpressumPageProps> = ({ onBack }) => {
  const { impressumData, loading, error, usingMockData } = useImpressum();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-primary/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-accent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Impressum wird geladen...</p>
        </div>
      </div>
    );
  }

  if (!impressumData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-primary/20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Fehler beim Laden der Impressum-Daten</p>
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
              <h1 className="text-4xl font-bold">{impressumData.titel}</h1>
              <p className="text-white/90 text-lg mt-2">{impressumData.untertitel}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Firmenname */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-accent mb-6">{impressumData.firmenname}</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Büro Linz */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-accent">{impressumData.buero_linz_titel}</h3>
                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-4 w-4 text-accent mt-1" />
                    <p className="text-gray-700 text-sm">{impressumData.buero_linz_adresse}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-accent" />
                    <p className="text-gray-700 text-sm">{impressumData.buero_linz_email}</p>
                  </div>
                </div>
              </div>

              {/* Büro St. Marien */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-accent">{impressumData.buero_st_marien_titel}</h3>
                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-4 w-4 text-accent mt-1" />
                    <p className="text-gray-700 text-sm">{impressumData.buero_st_marien_adresse}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-accent" />
                    <p className="text-gray-700 text-sm">{impressumData.buero_st_marien_email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Telefon */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-accent" />
                <p className="text-gray-700 font-medium">{impressumData.telefon}</p>
              </div>
            </div>
          </div>

          {/* Rechtliche Informationen */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Rechtliche Informationen</h3>
            
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <p className="text-gray-700">{impressumData.fb_nummer}</p>
                <p className="text-gray-700">{impressumData.fb_gericht}</p>
                <p className="text-gray-700">{impressumData.behoerde_text}</p>
                <p className="text-gray-700">{impressumData.uid}</p>
              </div>
              <div className="space-y-3">
                <p className="text-gray-700">{impressumData.geschaeftsfuehrer}</p>
                <p className="text-gray-700">{impressumData.konzession}</p>
                <p className="text-gray-700">{impressumData.wirtschaftskammer}</p>
              </div>
            </div>
          </div>

          {/* Website Design */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-lg font-bold text-accent mb-4">{impressumData.webdesign_titel}</h3>
            <p className="text-gray-700 text-sm">{impressumData.webdesign_agentur}</p>
          </div>

          {/* Haftungsausschluss */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-accent/10 p-2 rounded-lg">
                <Shield className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-xl font-bold text-accent">{impressumData.haftungsausschluss_titel}</h2>
            </div>
            
            <div className="space-y-6">
              <div 
                className="impressum-content"
                dangerouslySetInnerHTML={{ __html: impressumData.zugang_download }}
              />
              
              <div 
                className="impressum-content"
                dangerouslySetInnerHTML={{ __html: impressumData.copyright }}
              />
              
              <div 
                className="impressum-content"
                dangerouslySetInnerHTML={{ __html: impressumData.inhalt_onlineangebotes }}
              />
              
              <div 
                className="impressum-content"
                dangerouslySetInnerHTML={{ __html: impressumData.verweise_links }}
              />
              
              <div 
                className="impressum-content"
                dangerouslySetInnerHTML={{ __html: impressumData.urheber_kennzeichenrecht }}
              />
              
              <div 
                className="impressum-content"
                dangerouslySetInnerHTML={{ __html: impressumData.rechtswirksamkeit }}
              />
              
              <div 
                className="impressum-content"
                dangerouslySetInnerHTML={{ __html: impressumData.online_streitbeilegung }}
              />
              
              <div 
                className="impressum-content"
                dangerouslySetInnerHTML={{ __html: impressumData.aussergerichtliche_streitbeilegung }}
              />
            </div>
          </div>

          {/* Beschwerdestelle */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">{impressumData.beschwerdestelle_titel}</h3>
            <div className="space-y-2">
              <p className="text-gray-700 font-medium text-sm">{impressumData.beschwerdestelle_name}</p>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-accent mt-1" />
                <p className="text-gray-700 text-sm whitespace-pre-line">{impressumData.beschwerdestelle_adresse}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};