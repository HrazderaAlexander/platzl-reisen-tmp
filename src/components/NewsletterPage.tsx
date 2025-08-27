import React, { useState } from 'react';
import { ArrowLeft, Mail, CheckCircle, User, Phone, MapPin, Shield, ExternalLink } from 'lucide-react';
import { useNewsletter } from '../hooks/useNewsletter';

interface NewsletterPageProps {
  onBack: () => void;
}

export const NewsletterPage: React.FC<NewsletterPageProps> = ({ onBack }) => {
  const { newsletterSettings, loading, error, usingMockData } = useNewsletter();
  const [formData, setFormData] = useState({
    anrede: '',
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    adresse: '',
    plz: '',
    ort: '',
    datenschutz: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validierung
    if (!formData.datenschutz) {
      alert('Bitte akzeptieren Sie die Datenschutzbestimmungen.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Send to newsletter endpoint
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: 'newsletter_anmeldung'
        }),
      });
      
      if (!response.ok) {
        throw new Error('Fehler beim Anmelden für den Newsletter');
      }
      
      setIsSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          anrede: '',
          vorname: '',
          nachname: '',
          email: '',
          telefon: '',
          adresse: '',
          plz: '',
          ort: '',
          datenschutz: false
        });
      }, 5000);
    } catch (error) {
      console.error('Error submitting newsletter:', error);
      alert('Fehler beim Anmelden für den Newsletter. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-primary/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-accent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Newsletter wird geladen...</p>
        </div>
      </div>
    );
  }

  if (!newsletterSettings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-primary/20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Fehler beim Laden der Newsletter-Daten</p>
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
              <Mail className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">{newsletterSettings.titel}</h1>
              <p className="text-white/90 text-lg mt-2">{newsletterSettings.untertitel}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hauptbild - Hero Style */}
      {newsletterSettings.hauptbild && (
        <div className="relative h-80 overflow-hidden">
          <img
            src={newsletterSettings.hauptbild}
            alt="Newsletter"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-3xl font-bold mb-2">Newsletter Anmeldung</h2>
            <p className="text-white/90 text-lg">Immer bestens informiert über neue Angebote</p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Newsletter Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-accent mb-6">{newsletterSettings.titel}</h2>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{newsletterSettings.erfolg_titel}</h3>
                  <p className="text-gray-600 text-sm">
                    {newsletterSettings.erfolg_text}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Anrede */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                      Anrede
                    </label>
                    <select
                      name="anrede"
                      value={formData.anrede}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors duration-300 text-sm bg-gray-50"
                    >
                      <option value="">Bitte wählen</option>
                      <option value="herr">Herr</option>
                      <option value="frau">Frau</option>
                      <option value="firma">Firma</option>
                    </select>
                  </div>

                  {/* Vorname */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                      Vorname *
                    </label>
                    <input
                      type="text"
                      name="vorname"
                      value={formData.vorname}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors duration-300 text-sm bg-gray-50"
                    />
                  </div>

                  {/* Nachname */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                      Nachname *
                    </label>
                    <input
                      type="text"
                      name="nachname"
                      value={formData.nachname}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors duration-300 text-sm bg-gray-50"
                    />
                  </div>

                  {/* E-Mail */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors duration-300 text-sm bg-gray-50"
                    />
                  </div>

                  {/* Telefon/Mobil */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                      Telefon/Mobil *
                    </label>
                    <input
                      type="tel"
                      name="telefon"
                      value={formData.telefon}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors duration-300 text-sm bg-gray-50"
                    />
                  </div>

                  {/* Adresse */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                      Adresse
                    </label>
                    <input
                      type="text"
                      name="adresse"
                      value={formData.adresse}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors duration-300 text-sm bg-gray-50"
                    />
                  </div>

                  {/* PLZ und Ort */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                        PLZ
                      </label>
                      <input
                        type="text"
                        name="plz"
                        value={formData.plz}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors duration-300 text-sm bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                        Ort
                      </label>
                      <input
                        type="text"
                        name="ort"
                        value={formData.ort}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors duration-300 text-sm bg-gray-50"
                      />
                    </div>
                  </div>

                  {/* Datenschutz Checkbox */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="datenschutz"
                      id="datenschutz"
                      checked={formData.datenschutz}
                      onChange={handleInputChange}
                      required
                      className="mt-1 w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent/20"
                    />
                    <label htmlFor="datenschutz" className="text-sm text-gray-600">
                      Ich habe die <span className="text-accent font-medium">DATENSCHUTZBESTIMMUNGEN</span> gelesen und akzeptiert. *
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent text-white px-6 py-4 rounded-none font-bold hover:bg-accent/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg tracking-wider uppercase"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Wird angemeldet...
                      </>
                    ) : (
                      'JETZT ANMELDEN'
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Info Section */}
            <div className="space-y-8">
              {/* Intro Text */}
              {newsletterSettings.intro_text && (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-accent/10 p-2 rounded-lg">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="font-bold text-gray-800">Newsletter-Information</h3>
                  </div>
                  <div 
                    className="text-gray-700 text-sm"
                    dangerouslySetInnerHTML={{ __html: newsletterSettings.intro_text }}
                  />
                </div>
              )}

              {/* Vorteile */}
              {newsletterSettings.vorteile_text && (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="font-bold text-gray-800">{newsletterSettings.vorteile_titel}</h3>
                  </div>
                  <div 
                    className="text-gray-700 text-sm"
                    dangerouslySetInnerHTML={{ __html: newsletterSettings.vorteile_text }}
                  />
                </div>
              )}

              {/* Kontakt Info */}
              <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl p-8 border border-accent/20">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Persönliche Beratung</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Haben Sie Fragen? Kontaktieren Sie uns gerne direkt:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-accent" />
                    <span className="font-medium">0732 27 27 17</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-accent" />
                    <span className="font-medium">linz@platzl-reisen.at</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-accent" />
                    <span className="font-medium">Linz, Österreich</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Datenschutz Section */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-accent/10 p-2 rounded-lg">
                <Shield className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-xl font-bold text-accent">{newsletterSettings.datenschutz_titel}</h2>
            </div>
            
            <div 
              className="text-gray-700 text-sm leading-relaxed mb-6"
              dangerouslySetInnerHTML={{ __html: newsletterSettings.datenschutz_text }}
            />

            {/* Abmeldeformular Link */}
            {newsletterSettings.abmeldeformular_link_text && (
              <div className="pt-4 border-t border-gray-200">
                <a
                  href={newsletterSettings.abmeldeformular_link_url || '#'}
                  className="inline-flex items-center text-accent hover:text-accent/80 font-medium text-sm transition-colors duration-300"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {newsletterSettings.abmeldeformular_link_text}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};