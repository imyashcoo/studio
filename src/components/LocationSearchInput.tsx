'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

interface LocationSearchInputProps {
  onLocationSelect: (address: string, pincode: string | null) => void;
}

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export function LocationSearchInput({ onLocationSelect }: LocationSearchInputProps) {
  const [query, setQuery] = useState('');
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [loading, setLoading] = useState(false);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !scriptLoaded.current) {
      if (!GOOGLE_MAPS_API_KEY) {
        console.error("Google Maps API key is not defined. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable.");
        return;
      }
      
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
      (window as any).initMap = () => {
        autocompleteService.current = new google.maps.places.AutocompleteService();
        placesService.current = new google.maps.places.PlacesService(document.createElement('div'));
        scriptLoaded.current = true;
      };
      document.head.appendChild(script);

      return () => {
        delete (window as any).initMap;
        if (document.body.contains(script)) {
          document.head.removeChild(script);
        }
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2 && autocompleteService.current) {
      autocompleteService.current.getPlacePredictions(
        { input: e.target.value, componentRestrictions: { country: 'in' } },
        (results) => {
          setPredictions(results || []);
        }
      );
    } else {
      setPredictions([]);
    }
  };

  const handleSelect = (prediction: google.maps.places.AutocompletePrediction) => {
    setLoading(true);
    setQuery(prediction.description);
    setPredictions([]);
    
    if (placesService.current) {
      placesService.current.getDetails({ placeId: prediction.place_id }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          const pincodeComponent = place.address_components?.find(c => c.types.includes('postal_code'));
          const pincode = pincodeComponent ? pincodeComponent.long_name : null;
          onLocationSelect(prediction.description, pincode);
        }
        setLoading(false);
      });
    }
  };

  if (!GOOGLE_MAPS_API_KEY) {
    return <Input placeholder="e.g., Downtown, Metro City" disabled />;
  }

  return (
    <div className="relative">
      <Input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a location..."
        disabled={loading}
      />
      {loading && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-muted-foreground" />}
      {predictions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-card border rounded-md shadow-lg">
          {predictions.map((p) => (
            <li
              key={p.place_id}
              onClick={() => handleSelect(p)}
              className="px-4 py-2 cursor-pointer hover:bg-muted"
            >
              {p.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
