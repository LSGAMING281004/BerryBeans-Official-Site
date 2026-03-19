import React, { useEffect, useRef, useState, useCallback } from 'react';
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

// Stable constant — defined once outside component
const HEX_COLOR = () => 'rgba(200, 200, 200, 0.9)';
const LABEL_LAT = d => d.lat;
const LABEL_LNG = d => d.lng;
const LABEL_TEXT = d => d.name;

const WorldGlobe = ({ activeLocationIndex }) => {
    const globeRef = useRef();
    const [countries, setCountries] = useState({ features: [] });

    useEffect(() => {
        // Load world data for hex polygons
        fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
            .then(res => res.json())
            .then(setCountries);
    }, []);

    // Stable callbacks that only change when activeLocationIndex changes
    const getHtmlElement = useCallback(d => {
        const el = document.createElement('div');
        const isActive = locations.findIndex(l => l.name === d.name) === activeLocationIndex;
        
        // Use CSS/HTML for perfect typographical clarity and boldness
        el.innerHTML = `
          <div style="
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            transform: translate(-50%, -100%);
            pointer-events: none;
          ">
            <div style="
              font-weight: 900; 
              font-family: 'Inter', system-ui, sans-serif; 
              font-size: ${isActive ? '22px' : '12px'}; 
              color: ${isActive ? '#f05a66' : '#4b5563'}; 
              background: rgba(255, 255, 255, 0.85);
              backdrop-filter: blur(4px);
              padding: ${isActive ? '4px 14px' : '2px 8px'};
              border-radius: 100px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
              white-space: nowrap;
              border: 1px solid ${isActive ? 'rgba(240, 90, 102, 0.4)' : 'rgba(255,255,255,0.8)'};
            ">
              ${d.name}
            </div>
            <div style="
              width: ${isActive ? '14px' : '8px'}; 
              height: ${isActive ? '14px' : '8px'}; 
              background-color: ${isActive ? '#f05a66' : '#9ca3af'}; 
              border-radius: 50%; 
              margin-top: ${isActive ? '10px' : '6px'}; 
              border: 2px solid white; 
              box-shadow: 0 2px 6px rgba(0,0,0,0.2); 
              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            "></div>
          </div>
        `;
        return el;
    }, [activeLocationIndex]);

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
                backgroundColor="rgba(255,255,255,0)"
                globeImageUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
                showAtmosphere={false}

                hexPolygonsData={countries.features}
                hexPolygonResolution={3}
                hexPolygonMargin={0.2}
                hexPolygonColor={HEX_COLOR}

                htmlElementsData={locations}
                htmlLat={LABEL_LAT}
                htmlLng={LABEL_LNG}
                htmlElement={getHtmlElement}
                htmlAltitude={0.015}

                width={400}
                height={400}
            />
        </div>
    );
};

export default WorldGlobe;
