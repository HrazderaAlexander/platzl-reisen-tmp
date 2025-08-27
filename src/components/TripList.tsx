import React from 'react';
import { Calendar, Euro, MapPin, ArrowRight } from 'lucide-react';
import { useTrips } from '../hooks/useTrips';
import { Trip } from '../types';

interface TripListProps {
  category: 'therme' | 'sightseeing';
  title: string;
  onTripSelect: (trip: Trip) => void;
}

export const TripList: React.FC<TripListProps> = ({ category, title, onTripSelect }) => {
  const { trips, loading, error } = useTrips(category);

  if (loading) {
    return (
      <div className="min-h-screen bg-primary/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-gray-600">Reisen werden geladen...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-primary/10 flex items-center justify-center">
        <div className="text-center">
          <div className="p-4 rounded-lg mb-4 bg-red-100 border border-red-400">
            <p className="text-red-800 font-semibold mb-2">
              ❌ Fehler beim Laden
            </p>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            Stellen Sie sicher, dass Strapi läuft und die API erreichbar ist.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-accent text-white px-6 py-3 rounded-full hover:bg-accent/90 transition-colors duration-300"
          >
            Erneut versuchen
          </button>
        </div>
      </div>
    );
  }

  if (trips.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-primary/10">
        <div className={`text-white py-16 relative overflow-hidden ${
          category === 'therme' 
            ? 'bg-gradient-to-r from-therme to-therme/80' 
            : 'bg-gradient-to-r from-sightseeing to-sightseeing/80'
        }`}>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-6">{title}</h1>
            <p className="text-white/90 text-xl">
              Wählen Sie aus unserem vielfältigen Angebot die perfekte Reise für Sie
            </p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Keine Reisen verfügbar.</p>
            <p className="text-gray-500 text-sm">
              Fügen Sie Reisen über das Strapi Admin Panel hinzu.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary/10">
      <div className={`text-white py-16 relative overflow-hidden ${
        category === 'therme' 
          ? 'bg-gradient-to-r from-therme to-therme/80' 
          : 'bg-gradient-to-r from-sightseeing to-sightseeing/80'
      }`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">{title}</h1>
          <p className="text-white/90 text-xl">
            Wählen Sie aus unserem vielfältigen Angebot die perfekte Reise für Sie
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
              onClick={() => onTripSelect(trip)}
            >
              <div className="md:flex items-center">
                <div className="md:flex-1 p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {trip.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">{trip.subtitle}</p>
                    </div>
                    <div className="text-right ml-6">
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                        category === 'therme' 
                          ? 'bg-therme/10 text-therme' 
                          : 'bg-sightseeing/10 text-sightseeing'
                      }`}>
                        {trip.featured_date}
                      </div>
                      <div className="text-xl font-bold text-accent">
                        ab €{trip.base_price},-
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 line-clamp-2 text-sm leading-relaxed">
                    {trip.short_description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-gray-500 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Mehrere Termine</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{trip.hotels.length} Hotels verfügbar</span>
                      </div>
                    </div>
                    
                    <div className={`flex items-center font-semibold transition-colors duration-300 text-sm ${
                      category === 'therme' 
                        ? 'text-therme hover:text-therme/80' 
                        : 'text-sightseeing hover:text-sightseeing/80'
                    }`}>
                      <span>Details ansehen</span>
                      <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};