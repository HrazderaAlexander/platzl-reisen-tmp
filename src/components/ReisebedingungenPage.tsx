import React from 'react';
import { ArrowLeft, FileText, Phone, Mail, Clock, AlertTriangle, MapPin, Cigarette, Award, User, Info, Bus, Calendar, Shield, Star, Heart, Check } from 'lucide-react';
import { useReisebedingungen } from '../hooks/useReisebedingungen';

interface ReisebedingungenPageProps {
  onBack: () => void;
}

export const ReisebedingungenPage: React.FC<ReisebedingungenPageProps> = ({ onBack }) => {
  const { reisebedingungenData, loading, error, usingMockData } = useReisebedingungen();

  const getIconComponent = (iconType: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      warning: AlertTriangle, info: Info, location: MapPin, smoking: Cigarette,
      bus: Bus, phone: Phone, clock: Clock, user: User, check: Check,
      alert: AlertTriangle, 'map-pin': MapPin, calendar: Calendar,
      shield: Shield, star: Star, heart: Heart
    };
    return iconMap[iconType] || Info;
  };

  const getColorClasses = (farbe: string) => {
    const colorMap: { [key: string]: { bg: string; border: string; icon: string } } = {
      gelb: { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: 'text-yellow-600' },
      gruen: { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-600' },
      rot: { bg: 'bg-red-50', border: 'border-red-200', icon: 'text-red-600' },
      blau: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600' },
      grau: { bg: 'bg-gray-50', border: 'border-gray-200', icon: 'text-gray-600' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'text-orange-600' },
      lila: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'text-purple-600' }
    };
    return colorMap[farbe] || colorMap.grau;
  };

  if (loading || !reisebedingungenData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-primary/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-accent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Reisebedingungen werden geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-primary/20">
      {usingMockData && (
        <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4">
          <p className="text-sm text-yellow-700"><strong>⚠️ Mock-Daten werden verwendet:</strong> {error}</p>
        </div>
      )}

      <div className="bg-gradient-to-r from-accent to-accent/80 text-white py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <button onClick={onBack} className="group flex items-center text-white/90 hover:text-white mb-8 transition-all duration-300 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl hover:bg-white/20 hover:scale-105">
            <ArrowLeft className="h-4 w-4 mr-3 transform group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium text-sm">Zurück</span>
          </button>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-white/20 p-3 rounded-2xl"><FileText className="h-6 w-6 text-white" /></div>
            <div>
              <h1 className="text-4xl font-bold">{reisebedingungenData.titel}</h1>
              <p className="text-white/90 text-lg mt-2">Wichtige Informationen für Ihre Reise</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              {reisebedingungenData.inhaltsblocks.map((block, index) => {
                const IconComponent = getIconComponent(block.icon_typ);
                const colors = getColorClasses(block.farbe);
                
                return (
                  <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className={`${colors.bg} ${colors.border} border p-2 rounded-lg`}>
                        <IconComponent className={`h-5 w-5 ${colors.icon}`} />
                      </div>
                      <h2 className="text-xl font-bold text-gray-800">{block.titel}</h2>
                    </div>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                         dangerouslySetInnerHTML={{ __html: block.text }} />
                  </div>
                );
              })}
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-r from-accent to-accent/80 text-white rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-white/20 p-2 rounded-lg"><Award className="h-5 w-5 text-white" /></div>
                  <h3 className="font-bold text-sm">{reisebedingungenData.service_titel}</h3>
                </div>
                
                <div className="space-y-3">
                  {reisebedingungenData.service_punkte.map((punkt, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="bg-white/20 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">✓</div>
                      <p className="text-white/90 text-sm leading-relaxed">{punkt.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-accent/10 p-2 rounded-lg"><User className="h-5 w-5 text-accent" /></div>
                  <h3 className="font-bold text-gray-800 text-sm">{reisebedingungenData.ansprechpartner_titel}</h3>
                </div>
                
                <div className="flex items-start space-x-4">
                  <img src={reisebedingungenData.ansprechpartner_foto} alt={reisebedingungenData.ansprechpartner_name} className="w-16 h-16 rounded-full object-cover shadow-lg" />
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1 text-sm">{reisebedingungenData.ansprechpartner_name}</h4>
                    <p className="text-gray-600 text-xs mb-3 leading-relaxed">{reisebedingungenData.ansprechpartner_position}</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center"><Phone className="h-3 w-3 mr-2 text-accent" /><span>{reisebedingungenData.ansprechpartner_telefon}</span></div>
                      <div className="flex items-center"><Phone className="h-3 w-3 mr-2 text-accent" /><span>{reisebedingungenData.ansprechpartner_mobil}</span></div>
                      <div className="flex items-center"><Mail className="h-3 w-3 mr-2 text-accent" /><span>{reisebedingungenData.ansprechpartner_email}</span></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};