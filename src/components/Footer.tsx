import React from 'react';
import { Phone, Mail, MapPin, Download, FileText, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-accent">Platzl Reisen</h3>
            <p className="text-gray-300 text-sm mb-4">
              Ihr zuverlässiger Partner für unvergessliche Busreisen seit über 30 Jahren.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-accent" />
                <span>0732 27 27 17</span>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-accent" />
                <span>linz@platzl-reisen.at</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2 text-accent" />
                <span>Linz, Österreich</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Schnellzugriff</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('home')}
                  className="text-gray-300 hover:text-accent transition-colors duration-300"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('therme')}
                  className="text-gray-300 hover:text-accent transition-colors duration-300"
                >
                  Thermenreisen
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('sightseeing')}
                  className="text-gray-300 hover:text-accent transition-colors duration-300"
                >
                  Besichtigungsreisen
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('sonstiges')}
                  className="text-gray-300 hover:text-accent transition-colors duration-300"
                >
                  Sonstiges
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="text-gray-300 hover:text-accent transition-colors duration-300"
                >
                  Kontakt
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('download')}
                  className="text-gray-300 hover:text-accent transition-colors duration-300 flex items-center"
                >
                  <Download className="h-3 w-3 mr-2" />
                  Katalog Download
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="text-gray-300 hover:text-accent transition-colors duration-300 flex items-center"
                >
                  <MessageCircle className="h-3 w-3 mr-2" />
                  Kontaktformular
                </button>
              </li>
              <li>
                <span className="text-gray-300">Reiseberatung</span>
              </li>
              <li>
                <span className="text-gray-300">Gruppenreisen</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Rechtliches</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('agb')}
                  className="text-gray-300 hover:text-accent transition-colors duration-300 flex items-center"
                >
                  <FileText className="h-3 w-3 mr-2" />
                  AGB
                </button>
              </li>
              <li>
                <span className="text-gray-300">Datenschutz</span>
              </li>
              <li>
                <span className="text-gray-300">Impressum</span>
              </li>
              <li>
                <span className="text-gray-300">Reisebedingungen</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div>
              © 2024 Platzl Reisen. Alle Rechte vorbehalten.
            </div>
            <div className="mt-2 md:mt-0">
              Entwickelt mit ❤️ für unvergessliche Reiseerlebnisse
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};