import React, { useState } from 'react';
import { ArrowLeft, Gift, Phone, Mail, MapPin, Star, Heart, Award, Calendar, Users, CreditCard, Check, Send } from 'lucide-react';
import { useGutscheine } from '../hooks/useGutscheine';

interface GutscheinePageProps {
  onBack: () => void;
}

export const GutscheinePage: React.FC<GutscheinePageProps> = ({ onBack }) => {
  const { gutscheinSettings, loading, error, usingMockData } = useGutscheine();
  const [selectedGutschein, setSelectedGutschein] = useState<any>(null);
  const [formData, setFormData] = useState({
    gutschein_art: '',
    betrag: '',
    empfaenger_name: '',
    empfaenger_anlass: '',
    widmung: '',
    besteller_name: '',
    besteller_email: '',
    besteller_telefon: '',
    versand_art: 'email'
  });

  // Icon mapping für Gutschein-Arten
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      gift: Gift,
      heart: Heart,
      star: Star,
      award: Award,
      calendar: Calendar,
      'map-pin': MapPin,
      users: Users,
      'credit-card': CreditCard
    };
    return iconMap[iconName] || Gift;
  };

  // Farb-Mapping für Gutschein-Arten
  const getColorClasses = (farbe: string) => {
    const colorMap: { [key: string]: { bg: string; border: string; text: string; gradient: string } } = {
      pink: { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-600', gradient: 'from-pink-500 to-pink-600' },
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', gradient: 'from-blue-500 to-blue-600' },
      green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', gradient: 'from-green-500 to-green-600' },
      purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', gradient: 'from-purple-500 to-purple-600' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', gradient: 'from-orange-500 to-orange-600' },
      red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', gradient: 'from-red-500 to-red-600' }
    };
    return colorMap[farbe] || colorMap.pink;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Send gutschein order to server
      const response = await fetch('/api/gutschein-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Fehler beim Bestellen des Gutscheins');
      }
      
      alert('Gutschein-Bestellung erfolgreich gesendet! Wir melden uns in Kürze bei Ihnen.');
      
      // Reset form
      setFormData({
        gutschein_art: '',
        betrag: '',
        empfaenger_name: '',
        empfaenger_anlass: '',
        widmung: '',
        besteller_name: '',
        besteller_email: '',
        besteller_telefon: '',
        versand_art: 'email'
      });
      setSelectedGutschein(null);
    } catch (error) {
      console.error('Error ordering gutschein:', error);
      alert('Fehler beim Bestellen des Gutscheins. Bitte versuchen Sie es erneut.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-primary/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-accent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Gutscheine werden geladen...</p>
        </div>
      </div>
    );
  }

  if (!gutscheinSettings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-primary/20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Fehler beim Laden der Gutschein-Daten</p>
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
      <div className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-16 relative overflow-hidden">
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
              <Gift className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">{gutscheinSettings.titel}</h1>
              <p className="text-white/90 text-lg mt-2">{gutscheinSettings.untertitel}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hauptbild - Hero Style */}
      {gutscheinSettings.hauptbild && (
        <div className="relative h-80 overflow-hidden">
          <img
            src={gutscheinSettings.hauptbild}
            alt="Gutscheine"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-3xl font-bold mb-2">Reise-Gutscheine</h2>
            <p className="text-white/90 text-lg">Das perfekte Geschenk für jeden Anlass</p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {!selectedGutschein ? (
            <div className="space-y-12">
              {/* Intro Text */}
              {gutscheinSettings.intro_text && (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <div 
                    className="text-gray-700 text-center"
                    dangerouslySetInnerHTML={{ __html: gutscheinSettings.intro_text }}
                  />
                </div>
              )}

              {/* Gutschein-Arten */}
              <div>
                <h2 className="text-2xl font-bold text-accent mb-8 text-center">
                  {gutscheinSettings.gutschein_arten_titel}
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {gutscheinSettings.gutschein_arten.map((gutschein, index) => {
                    const IconComponent = getIconComponent(gutschein.icon);
                    const colors = getColorClasses(gutschein.farbe);
                    
                    return (
                      <div
                        key={index}
                        onClick={() => setSelectedGutschein(gutschein)}
                        className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100 overflow-hidden relative"
                      >
                        {/* Beliebte Badge */}
                        {gutschein.beliebt && (
                          <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                            ⭐ Beliebt
                          </div>
                        )}
                        
                        {/* Header */}
                        <div className={`h-20 bg-gradient-to-r ${colors.gradient} relative`}>
                          <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-full -translate-y-8 translate-x-8"></div>
                          <div className="absolute bottom-4 left-4">
                            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                              <IconComponent className="h-5 w-5 text-white" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors duration-300">
                            {gutschein.name}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            {gutschein.beschreibung}
                          </p>
                          
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="text-sm text-gray-600">
                              €{gutschein.preis_von} - €{gutschein.preis_bis}
                            </div>
                            <div className="text-pink-600 font-semibold group-hover:text-pink-500 transition-colors duration-300 text-sm">
                              Bestellen →
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bestellung Info */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="bg-pink-100 p-2 rounded-lg">
                      <Gift className="h-5 w-5 text-pink-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">{gutscheinSettings.bestellung_titel}</h2>
                  </div>
                  
                  <div 
                    className="text-gray-700 text-sm mb-6"
                    dangerouslySetInnerHTML={{ __html: gutscheinSettings.bestellung_text }}
                  />
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600" />
                      <span className="text-gray-700">Gültigkeit: {gutscheinSettings.gueltigkeitsdauer}</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600" />
                      <span className="text-gray-700">Betrag: €{gutscheinSettings.mindestbetrag} - €{gutscheinSettings.hoechstbetrag}</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600" />
                      <span className="text-gray-700">Für alle Reisen einlösbar</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="bg-accent/10 p-2 rounded-lg">
                      <Phone className="h-5 w-5 text-accent" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">{gutscheinSettings.kontakt_titel}</h2>
                  </div>
                  
                  <div 
                    className="text-gray-700 text-sm mb-6"
                    dangerouslySetInnerHTML={{ __html: gutscheinSettings.kontakt_text }}
                  />
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-accent" />
                      <span className="font-medium">{gutscheinSettings.telefon}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-accent" />
                      <span className="font-medium">{gutscheinSettings.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-accent" />
                      <span className="font-medium">Linz, Österreich</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Bestellformular */
            <div className="max-w-4xl mx-auto">
              <button
                onClick={() => setSelectedGutschein(null)}
                className="group flex items-center text-gray-600 hover:text-accent mb-8 transition-all duration-300 bg-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105"
              >
                <ArrowLeft className="h-4 w-4 mr-3 transform group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="font-medium text-sm">Zurück zur Auswahl</span>
              </button>

              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                {/* Header */}
                <div className={`bg-gradient-to-r ${getColorClasses(selectedGutschein.farbe).gradient} p-8 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="relative">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-white/20 p-3 rounded-xl">
                        {React.createElement(getIconComponent(selectedGutschein.icon), { className: "h-6 w-6 text-white" })}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{selectedGutschein.name}</h2>
                        <p className="text-white/90 text-sm mt-1">{selectedGutschein.beschreibung}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Bestellformular */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Gutschein Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Gutschein-Details</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Betrag (€{selectedGutschein.preis_von} - €{selectedGutschein.preis_bis}) *
                        </label>
                        <input
                          type="number"
                          name="betrag"
                          value={formData.betrag}
                          onChange={handleInputChange}
                          min={selectedGutschein.preis_von}
                          max={selectedGutschein.preis_bis}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-colors duration-300 text-sm"
                          placeholder={`Betrag zwischen €${selectedGutschein.preis_von} und €${selectedGutschein.preis_bis}`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Empfänger Name *
                        </label>
                        <input
                          type="text"
                          name="empfaenger_name"
                          value={formData.empfaenger_name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-colors duration-300 text-sm"
                          placeholder="Für wen ist der Gutschein?"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Anlass
                        </label>
                        <input
                          type="text"
                          name="empfaenger_anlass"
                          value={formData.empfaenger_anlass}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-colors duration-300 text-sm"
                          placeholder="z.B. Geburtstag, Hochzeit, Weihnachten"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Persönliche Widmung
                        </label>
                        <textarea
                          name="widmung"
                          value={formData.widmung}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-colors duration-300 resize-none text-sm"
                          placeholder="Ihre persönliche Nachricht für den Gutschein..."
                        />
                      </div>
                    </div>

                    {/* Besteller Informationen */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Ihre Kontaktdaten</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ihr Name *
                        </label>
                        <input
                          type="text"
                          name="besteller_name"
                          value={formData.besteller_name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-colors duration-300 text-sm"
                          placeholder="Ihr vollständiger Name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          E-Mail *
                        </label>
                        <input
                          type="email"
                          name="besteller_email"
                          value={formData.besteller_email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-colors duration-300 text-sm"
                          placeholder="ihre@email.at"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Telefon *
                        </label>
                        <input
                          type="tel"
                          name="besteller_telefon"
                          value={formData.besteller_telefon}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-colors duration-300 text-sm"
                          placeholder="0732 123 456"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Versand-Art *
                        </label>
                        <select
                          name="versand_art"
                          value={formData.versand_art}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-colors duration-300 text-sm"
                        >
                          <option value="email">Per E-Mail (PDF)</option>
                          <option value="post">Per Post</option>
                          <option value="abholung">Abholung im Büro</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-pink-600 to-pink-500 text-white px-6 py-4 rounded-xl font-bold hover:from-pink-700 hover:to-pink-600 transition-all duration-300 flex items-center justify-center text-lg tracking-wide"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      GUTSCHEIN BESTELLEN
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};