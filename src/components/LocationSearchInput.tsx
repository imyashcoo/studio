
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

interface LocationSearchInputProps {
  onSelect: (result: { address: string; pincode: string }) => void;
  initialValue?: string;
}

const LocationSearchInput: React.FC<LocationSearchInputProps> = ({ onSelect, initialValue = '' }) => {
  const autocompleteInput = useRef<HTMLInputElement>(null);
  const scriptLoaded = useRef(false);
  const [inputValue, setInputValue] = useState(initialValue);
  
  // A simple check to see if we should even attempt to load the Google script
  const canUseGoogleMaps = !!GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (!canUseGoogleMaps || typeof window === 'undefined') {
      return;
    }

    if (!scriptLoaded.current) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        scriptLoaded.current = true;
        initializeAutocomplete();
      };
      document.head.appendChild(script);

      return () => {
        // Clean up the script when the component unmounts
        const scripts = document.head.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
          if (scripts[i].src.includes('maps.googleapis.com')) {
            try {
                document.head.removeChild(scripts[i]);
            } catch (e) {
                console.log("Error removing google maps script");
            }
          }
        }
      };
    } else {
      initializeAutocomplete();
    }
  }, [canUseGoogleMaps]);

  const initializeAutocomplete = () => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      console.warn('Google Maps script not loaded yet.');
      return;
    }

    if (autocompleteInput.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInput.current, {
        types: ['geocode'],
        componentRestrictions: { country: 'in' },
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place && place.formatted_address) {
          const pincodeComponent = place.address_components?.find(component =>
            component.types.includes('postal_code')
          );
          const address = place.formatted_address;
          const pincode = pincodeComponent ? pincodeComponent.long_name : '';
          setInputValue(address);
          onSelect({ address, pincode });
        }
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const address = e.target.value;
    setInputValue(address);
    // When user types manually, we pass the raw address and empty pincode
    onSelect({ address, pincode: '' });
  };
  
  if (!canUseGoogleMaps) {
      return (
        <Input 
            type="text" 
            placeholder="Enter location manually" 
            value={inputValue}
            onChange={handleChange}
        />
      );
  }

  return (
    <Input
      ref={autocompleteInput}
      type="text"
      placeholder="Start typing your address..."
      className="w-full"
      value={inputValue}
      onChange={handleChange}
    />
  );
};

export default LocationSearchInput;
