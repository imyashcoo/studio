'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

interface LocationSearchInputProps {
    onSelect: (result: { address: string; pincode: string }) => void;
}

const LocationSearchInput: React.FC<LocationSearchInputProps> = ({ onSelect }) => {
    const autocompleteInput = useRef<HTMLInputElement>(null);
    const scriptLoaded = useRef(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && !scriptLoaded.current) {
            if (!GOOGLE_MAPS_API_KEY) {
                console.error("Google Maps API key is not defined. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable.");
                return;
            }
            
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
                        document.head.removeChild(scripts[i]);
                    }
                }
            }
        } else if (scriptLoaded.current) {
            initializeAutocomplete();
        }
    }, []);

    const initializeAutocomplete = () => {
        if (!window.google || !window.google.maps || !window.google.maps.places) {
            console.warn("Google Maps script not loaded yet.");
            return;
        }

        if (autocompleteInput.current) {
            const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInput.current, {
                types: ['geocode'],
                componentRestrictions: { country: 'in' },
            });

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                if (place && place.formatted_address && place.address_components) {
                    const pincodeComponent = place.address_components.find(component =>
                        component.types.includes('postal_code')
                    );
                    onSelect({
                        address: place.formatted_address,
                        pincode: pincodeComponent ? pincodeComponent.long_name : '',
                    });
                }
            });
        }
    };

    return (
        <Input
            ref={autocompleteInput}
            type="text"
            placeholder="Start typing your address..."
            className="w-full"
        />
    );
};

export default LocationSearchInput;
