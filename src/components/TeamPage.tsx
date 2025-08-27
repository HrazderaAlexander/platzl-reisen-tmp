import React from 'react';
import { ArrowLeft, Users, Phone, Mail, Clock, MapPin } from 'lucide-react';
import { useTeam } from '../hooks/useTeam';

interface TeamPageProps {
  onBack: () => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ onBack }) => {
  const { teamMembers, teamSettings, loading, error, usingMockData, getMembersByCategory, getCategoryTitle } = useTeam();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-primary/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-accent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Team wird geladen...</p>
        </div>
      </div>
    );
  }

  if (!teamSettings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/30 via-white to-primary/20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Fehler beim Laden der Team-Daten</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  const categories: Array<{ key: any; hasOfficeInfo?: boolean }> = [
    { key: 'geschaeftsfuehrung' },
    { key: 'buero_st_marien', hasOfficeInfo: true },
    { key: 'buero_linz', hasOfficeInfo: true },
    { key: 'fahrer' },
    { key: 'kleinbusfahrer' },
    { key: 'reiseleiter' }
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
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">{teamSettings.titel}</h1>
              <p className="text-white/90 text-lg mt-2">{teamSettings.untertitel}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Photo */}
      {teamSettings.team_foto && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <img
              src={teamSettings.team_foto}
              alt="Unser Team"
              className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Team Members by Category */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-6xl mx-auto space-y-16">
          {categories.map(({ key, hasOfficeInfo }) => {
            const members = getMembersByCategory(key);
            if (members.length === 0) return null;

            return (
              <div key={key} className="space-y-8">
                {/* Category Title */}
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-accent mb-2">
                    {getCategoryTitle(key)}
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent/80 mx-auto rounded-full"></div>
                </div>

                {/* Office Information */}
                {hasOfficeInfo && (
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Öffnungszeiten */}
                      <div className="flex items-start space-x-3">
                        <div className="bg-accent/10 p-2 rounded-lg">
                          <Clock className="h-5 w-5 text-accent" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-2 text-sm">Öffnungszeiten</h3>
                          <div 
                            className="text-gray-600 text-sm"
                            dangerouslySetInnerHTML={{ 
                              __html: key === 'buero_st_marien' 
                                ? teamSettings.buero_st_marien_oeffnungszeiten 
                                : teamSettings.buero_linz_oeffnungszeiten 
                            }}
                          />
                        </div>
                      </div>

                      {/* Betriebsurlaub */}
                      <div className="flex items-start space-x-3">
                        <div className="bg-accent/10 p-2 rounded-lg">
                          <MapPin className="h-5 w-5 text-accent" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-2 text-sm">Betriebsurlaub</h3>
                          <p className="text-gray-600 text-sm">
                            {key === 'buero_st_marien' 
                              ? teamSettings.buero_st_marien_betriebsurlaub 
                              : teamSettings.buero_linz_betriebsurlaub}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Team Members Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      {/* Member Photo */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={member.foto || 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'}
                          alt={`${member.vorname} ${member.nachname}`}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      </div>

                      {/* Member Info */}
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-1">
                          {member.vorname} {member.nachname}
                        </h3>
                        <p className="text-accent font-medium text-sm mb-3">
                          {member.position}
                        </p>
                        
                        {member.aufgaben && (
                          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                            {member.aufgaben}
                          </p>
                        )}

                        {/* Contact Information */}
                        <div className="space-y-2">
                          {member.telefon && (
                            <div className="flex items-center text-sm">
                              <Phone className="h-3 w-3 mr-2 text-accent" />
                              <span className="text-gray-700">Tel.: {member.telefon}</span>
                            </div>
                          )}
                          {member.mobil && (
                            <div className="flex items-center text-sm">
                              <Phone className="h-3 w-3 mr-2 text-accent" />
                              <span className="text-gray-700">Mobil: {member.mobil}</span>
                            </div>
                          )}
                          {member.email && (
                            <div className="flex items-center text-sm">
                              <Mail className="h-3 w-3 mr-2 text-accent" />
                              <a 
                                href={`mailto:${member.email}`}
                                className="text-accent hover:text-accent/80 transition-colors duration-300"
                              >
                                {member.email}
                              </a>
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
    </div>
  );
};