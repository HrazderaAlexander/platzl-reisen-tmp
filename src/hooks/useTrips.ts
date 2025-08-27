import { useState, useEffect } from 'react';
import { strapiService } from '../lib/strapi';
import { Trip, Hotel, TripDate } from '../types';

export const useTrips = (category?: 'therme' | 'sightseeing') => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('=== LOADING STRAPI DATA ===');
        console.log('Strapi URL:', import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337');
        
        const response = await strapiService.getTrips(category);
        console.log('=== STRAPI RESPONSE ===');
        console.log('Response:', response);
        
        if (!response.data) {
          throw new Error('No data received from Strapi');
        }
        
        const transformedTrips: Trip[] = response.data
          .map((trip: any) => strapiService.transformTrip(trip))
          .filter((trip: Trip | null) => trip !== null) as Trip[];
        
        console.log('=== TRANSFORMED TRIPS ===');
        console.log('Trips count:', transformedTrips.length);
        transformedTrips.forEach(trip => {
          console.log(`Trip: ${trip.title}`);
          console.log(`Hotels: ${trip.hotels.length}`);
          console.log(`Thermen: ${trip.thermen.length}`);
          console.log(`Price entries: ${trip.price_entries.length}`);
        });
        
        setTrips(transformedTrips);
      } catch (err) {
        console.error('Error fetching trips:', err);
        setError(err instanceof Error ? err.message : 'Fehler beim Laden der Daten');
        setTrips([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [category]);

  return { trips, loading, error };
};

export const useTrip = (id: string) => {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<'therme' | 'sightseeing' | null>(null);


  useEffect(() => {
    const fetchTrip = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('=== LOADING SINGLE TRIP ===');
        console.log('Trip ID:', id);
        console.log('Preferred category from context:', category);
        
        const response = await strapiService.getTrip(id, category === null ? undefined : category);
        console.log('Single trip response data exists:', !!response.data);
        console.log('Single trip response title:', response.data?.attributes?.titel || response.data?.titel);
        
        if (!response.data) {
          throw new Error('Trip not found');
        }
        
        const transformedTrip = strapiService.transformTrip(response.data);
        
        if (transformedTrip) {
          console.log('=== TRANSFORMED SINGLE TRIP ===');
          console.log(`Trip ID: ${transformedTrip.id}`);
          console.log(`Trip Title: ${transformedTrip.title}`);
          console.log(`Trip Category: ${transformedTrip.category}`);
          console.log(`Hotels: ${transformedTrip.hotels.length}`);
          console.log(`Dates: ${transformedTrip.dates.length}`);
          
          setCategory(transformedTrip.category);
          setTrip(transformedTrip);
        } else {
          throw new Error('Invalid trip data');
        }
      } catch (err) {
        console.error('Error fetching trip:', err);
        setError(err instanceof Error ? err.message : 'Fehler beim Laden der Reise');
        setTrip(null);
        setCategory(null);
      } finally {
        setLoading(false);
      }
    };

    if (id && id.trim() !== '') {
      fetchTrip();
    } else {
      setLoading(false);
      setTrip(null);
      setError(null);
      setCategory(null);
    }
  }, [id, category]);

  return { trip, loading, error, category };
};