import React from 'react';
import { ArrowLeft, Info, Leaf, Mail, Download, Shield, Users, Phone, Award, Gift, FileText, Building } from 'lucide-react';
import { UmweltbeitragPage } from './UmweltbeitragPage';

interface SonstigesPageProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

export const SonstigesPage: React.FC<SonstigesPageProps> = ({ onBack, onNavigate }) => {
  const menuItems = [
    {
      id: 'umweltbeitrag',
      title: 'Unser Umweltbeitrag',
      description: 'Nachhaltigkeit und Umweltschutz bei Platzl Reisen',
      icon: Leaf,
      color: 'from-green-500 to-green-600',
      isPage: true
    },
    {
      id: 'newsletter',
      title: 'Newsletter-Abo',
      description: 'Bleiben Sie über aktuelle Angebote und Reisen informiert',
      icon: Mail,
      color: 'from-blue-500 to-blue-600',
      isPage: true
    },
    {
      id: 'downloads',
      title: 'Downloads',
      description: 'Kataloge, Formulare und nützliche Dokumente',
      icon: Download,
      color: 'from-purple-500 to-purple-600',
      isPage: true
    },
    {
      id: 'reisebedingungen',
      title: 'Reisebedingungen',
      description: 'Wichtige Informationen zu unseren Reisebedingungen',
      icon: FileText,
      color: 'from-gray-500 to-gray-600',
      isPage: true
    },
    {
      id: 'reiseversicherung',
      title: 'Reiseversicherung',
      description: 'Schutz für Ihre Reise - Versicherungsoptionen',
      icon: Shield,
      color: 'from-red-500 to-red-600',
      isPage: true
    },
    {
      id: 'kontakt',
      title: 'Anfrage & Kontakt',
      description: 'Persönliche Beratung und individuelle Anfragen',
      icon: Phone,
      color: 'from-accent to-accent/80',
      content: `
        <h3>Persönliche Beratung</h3>
        <p>Unser erfahrenes Team berät Sie gerne:</p>
        <ul>
          <li><strong>Telefon:</strong> 0732 27 27 17</li>
          <li><strong>E-Mail:</strong> linz@platzl-reisen.at</li>
          <li><strong>Öffnungszeiten:</strong> Mo-Fr 9:00-17:00, Sa 9:00-12:00</li>
          <li><strong>Persönliche Beratung:</strong> Nach Terminvereinbarung</li>
        </ul>
        <div class="mt-4 p-4 bg-accent/10 rounded-lg">
          <p><strong>Individuelle Anfragen:</strong> Nutzen Sie unser <a href="#contact" class="text-accent">Kontaktformular</a> für spezielle Wünsche.</p>
        </div>
      `
    },
    {
      id: 'impressum',
      title: 'Impressum',
      description: 'Rechtliche Informationen und Firmendaten',
      icon: Info,
      color: 'from-gray-600 to-gray-700',
      isPage: true
    },
    {
      id: 'about-us',
      title: 'Über Platzl Reisen',
      description: 'Unser Unternehmen, Service und Leistungen',
      icon: Building,
      color: 'from-accent to-accent/80',
      isPage: true
    },
    {
      id: 'team',
      title: 'Team',
      description: 'Lernen Sie unser erfahrenes Reise-Team kennen',
      icon: Users,
      color: 'from-orange-500 to-orange-600',
      isPage: true
    },
    {
      id: 'flotte',
      title: 'Flotte',
      description: 'Unsere modernen und komfortablen Reisebusse',
      icon: Award,
      color: 'from-blue-600 to-blue-700',
      isPage: true
    },
    {
      id: 'gutscheine',
      title: 'Gutscheine bestellen',
      description: 'Verschenken Sie unvergessliche Reiseerlebnisse',
      icon: Gift,
      color: 'from-pink-500 to-pink-600',
      isPage: true
    }
  ];

  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

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
              <Info className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Sonstiges</h1>
              <p className="text-white/90 text-lg mt-2">Weitere Informationen und Services</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {!selectedItem ? (
            /* Menu Grid */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (item.id === 'downloads' && onNavigate) {
                        onNavigate('download');
                      } else if (item.id === 'about-us' && onNavigate) {
                        onNavigate('about-us');
                      } else if (item.id === 'gutscheine' && onNavigate) {
                        onNavigate('gutscheine');
                      } else if (item.id === 'reiseversicherung' && onNavigate) {
                        onNavigate('reiseversicherung');
                      } else if (item.isPage && onNavigate) {
                        onNavigate(item.id);
                      } else {
                        setSelectedItem(item.id);
                      }
                    }}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
                  >
                    <div className={`h-20 bg-gradient-to-r ${item.color} relative`}>
                      <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-full -translate-y-8 translate-x-8"></div>
                      <div className="absolute bottom-4 left-4">
                        <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-accent transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center mt-4 text-accent font-semibold group-hover:text-accent/80 transition-colors duration-300 text-sm">
                        <span>Mehr erfahren</span>
                        <ArrowLeft className="h-4 w-4 ml-2 rotate-180 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Detail View */
            <div className="max-w-4xl mx-auto">
              <button
                onClick={() => setSelectedItem(null)}
                className="group flex items-center text-gray-600 hover:text-accent mb-8 transition-all duration-300 bg-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105"
              >
                <ArrowLeft className="h-4 w-4 mr-3 transform group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="font-medium text-sm">Zurück zur Übersicht</span>
              </button>

              {(() => {
                const item = menuItems.find(i => i.id === selectedItem);
                if (!item) return null;
                
                const IconComponent = item.icon;
                
                return (
                  <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                    <div className={`bg-gradient-to-r ${item.color} p-8 text-white relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                      <div className="relative">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="bg-white/20 p-3 rounded-xl">
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold">{item.title}</h2>
                            <p className="text-white/90 text-sm mt-1">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div 
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: item.content ?? "" }}
                      />
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};