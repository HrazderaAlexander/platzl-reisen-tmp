import React, { useState } from 'react';
import { ArrowLeft, Phone, Mail, MapPin, Clock, Send, CheckCircle, User, MessageCircle } from 'lucide-react';

interface ContactPageProps {
  onBack: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    anrede: '',
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    adresse: '',
    plz: '',
    ort: '',
    nachricht: '',
    newsletter: false,
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
      // Send to server endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Fehler beim Senden der Nachricht');
      }
      
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
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
          nachricht: '',
          newsletter: false,
          datenschutz: false
        });
      }, 3000);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-primary/20">
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
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Kontakt</h1>
              <p className="text-white/90 text-lg mt-2">Wir sind für Sie da - persönlich und kompetent</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Kontaktinformationen</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-accent/10 p-3 rounded-xl">
                      <Phone className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Telefon</h3>
                      <p className="text-gray-600 text-sm">0732 27 27 17</p>
                      <p className="text-gray-500 text-xs mt-1">Mo-Fr: 9:00-17:00 Uhr</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-accent/10 p-3 rounded-xl">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">E-Mail</h3>
                      <p className="text-gray-600 text-sm">linz@platzl-reisen.at</p>
                      <p className="text-gray-500 text-xs mt-1">Antwort innerhalb von 24h</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-accent/10 p-3 rounded-xl">
                      <MapPin className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Adresse</h3>
                      <p className="text-gray-600 text-sm">
                        Platzl Reisen GmbH<br />
                        Musterstraße 123<br />
                        4020 Linz, Österreich
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-accent/10 p-3 rounded-xl">
                      <Clock className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Öffnungszeiten</h3>
                      <div className="text-gray-600 text-sm space-y-1">
                        <p>Montag - Freitag: 9:00 - 17:00 Uhr</p>
                        <p>Samstag: 9:00 - 12:00 Uhr</p>
                        <p>Sonntag: Geschlossen</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl p-8 border border-accent/20">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Schnelle Beratung gewünscht?</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Rufen Sie uns an oder besuchen Sie uns in unserem Büro. 
                  Wir beraten Sie gerne persönlich zu Ihren Reisewünschen.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:0732272717"
                    className="bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-accent/90 transition-colors duration-300 text-center text-sm"
                  >
                    Jetzt anrufen
                  </a>
                  <a
                    href="mailto:linz@platzl-reisen.at"
                    className="bg-white text-accent px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300 text-center border border-accent/20 text-sm"
                  >
                    E-Mail schreiben
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Nachricht senden</h2>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Nachricht gesendet!</h3>
                  <p className="text-gray-600 text-sm">
                    Vielen Dank für Ihre Nachricht. Wir melden uns schnellstmöglich bei Ihnen.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Anrede */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Anrede *
                    </label>
                    <select
                      name="anrede"
                      value={formData.anrede}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors duration-300 text-sm"
                    >
                      <option value="">Bitte wählen</option>
                      <option value="herr">Herr</option>
                      <option value="frau">Frau</option>
                      <option value="firma">Firma</option>
                    </select>
                  </div>

                  {/* Vorname und Nachname */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vorname *
                      </label>
                      <input
                        type="text"
                        name="vorname"
                        value={formData.vorname}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors duration-300 text-sm"
                        placeholder="Ihr Vorname"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nachname *
                      </label>
                      <input
                        type="text"
                        name="nachname"
                        value={formData.nachname}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors duration-300 text-sm"
                        placeholder="Ihr Nachname"
                      />
                    </div>
                  </div>

                  {/* E-Mail und Telefon */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        E-Mail *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors duration-300 text-sm"
                        placeholder="ihre@email.at"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon/Mobil
                      </label>
                      <input
                        type="tel"
                        name="telefon"
                        value={formData.telefon}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors duration-300 text-sm"
                        placeholder="0732 123 456"
                      />
                    </div>
                  </div>

                  {/* Adresse */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse
                    </label>
                    <input
                      type="text"
                      name="adresse"
                      value={formData.adresse}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors duration-300 text-sm"
                      placeholder="Straße und Hausnummer"
                    />
                  </div>

                  {/* PLZ und Ort */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PLZ
                      </label>
                      <input
                        type="text"
                        name="plz"
                        value={formData.plz}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors duration-300 text-sm"
                        placeholder="1234"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ort
                      </label>
                      <input
                        type="text"
                        name="ort"
                        value={formData.ort}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors duration-300 text-sm"
                        placeholder="Ihr Wohnort"
                      />
                    </div>
                  </div>

                  {/* Nachricht */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nachricht *
                    </label>
                    <textarea
                      name="nachricht"
                      value={formData.nachricht}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors duration-300 resize-none text-sm"
                      placeholder="Teilen Sie uns Ihre Wünsche und Fragen mit..."
                    />
                  </div>

                  {/* Newsletter Checkbox */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="newsletter"
                      id="newsletter"
                      checked={formData.newsletter}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent/20"
                    />
                    <label htmlFor="newsletter" className="text-sm text-gray-600">
                      Ja, ich möchte den Newsletter abonnieren.
                    </label>
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
                      Ich habe die <span className="text-accent font-medium">Datenschutzbestimmungen</span> gelesen und akzeptiert. *
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent text-white px-6 py-4 rounded-xl font-bold hover:bg-accent/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg tracking-wide"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Wird gesendet...
                      </>
                    ) : (
                      'ANFRAGE SENDEN'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};