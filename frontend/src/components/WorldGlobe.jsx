import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';

const locations = [
    { name: 'India', lat: 20.5937, lng: 78.9629, color: '#f05a66' },
    { name: 'Singapore', lat: 1.3521, lng: 103.8198, color: '#f05a66' },
    { name: 'Malaysia', lat: 4.2105, lng: 101.9758, color: '#f05a66' },
    { name: 'US', lat: 37.0902, lng: -95.7129, color: '#f05a66' },
    { name: 'UK', lat: 51.5074, lng: -0.1278, color: '#f05a66' },
    { name: 'Qatar', lat: 25.2854, lng: 51.5310, color: '#f05a66' },
    { name: 'Congo', lat: -4.2634, lng: 15.2832, color: '#f05a66' },
    { name: 'Dubai', lat: 25.2048, lng: 55.2708, color: '#f05a66' },
    { name: 'Netherlands', lat: 52.0907, lng: 5.1214, color: '#f05a66' },
];

const WorldGlobe = ({ activeLocationIndex }) => {
    const globeRef = useRef();
    const [countries, setCountries] = useState({ features: [] });

    useEffect(() => {
        // Load world data for hex polygons
        fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
            .then(res => res.json())
            .then(setCountries);
    }, []);

    useEffect(() => {
        if (globeRef.current) {
            globeRef.current.controls().autoRotate = true;
            globeRef.current.controls().autoRotateSpeed = 0.8;
            globeRef.current.controls().enableZoom = false;

            const loc = locations[activeLocationIndex];
            if (loc) {
                globeRef.current.pointOfView({ lat: loc.lat, lng: loc.lng, altitude: 1.8 }, 1000);
            }
        }
    }, [activeLocationIndex]);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <Globe
                ref={globeRef}
                backgroundColor="rgba(0,0,0,0)"
                showAtmosphere={true}
                atmosphereColor="#aedd4c"
                atmosphereAltitude={0.15}

                // Land representation using hex polygons for a premium vector look
                hexPolygonsData={countries.features}
                hexPolygonResolution={3}
                hexPolygonMargin={0.3}
                hexPolygonColor={() => '#aedd4c'} // Brand Green

                // Markers for locations
                htmlElementsData={locations}
                htmlElement={(d, index) => {
                    const isActive = locations.findIndex(l => l.name === d.name) === activeLocationIndex;
                    const el = document.createElement('div');
                    el.innerHTML = `
            <div class="flex flex-col items-center group">
              <div class="relative">
                ${isActive ? '<div class="absolute inset-0 bg-[#f05a66] rounded-full blur-md opacity-60 scale-150 animate-pulse"></div>' : ''}
                <div class="w-3 h-3 ${isActive ? 'bg-[#f05a66] scale-125' : 'bg-gray-400'} rounded-full border-2 border-white shadow-lg transition-all duration-500 relative z-10"></div>
              </div>
              <div class="mt-1.5 px-2 py-0.5 ${isActive ? 'bg-[#f05a66] text-white' : 'bg-white/90 text-gray-900'} backdrop-blur-sm rounded-md text-[9px] font-black uppercase tracking-tighter border ${isActive ? 'border-[#f05a66]' : 'border-gray-200'} shadow-sm whitespace-nowrap transition-all duration-500">
                ${d.name}
              </div>
            </div>
          `;
                    return el;
                }}

                width={300}
                height={300}
            />
        </div>
    );
};

export default WorldGlobe;
