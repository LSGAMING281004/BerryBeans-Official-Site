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
                backgroundColor="rgba(255,255,255,0)"
                globeImageUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
                showAtmosphere={false}

                // Land representation using hex polygons for a premium vector look
                hexPolygonsData={countries.features}
                hexPolygonResolution={3}
                hexPolygonMargin={0.2}
                hexPolygonColor={() => 'rgba(200, 200, 200, 0.9)'} // Light gray-white landmasses

                // Labels for locations
                labelsData={locations}
                labelLat={d => d.lat}
                labelLng={d => d.lng}
                labelText={d => d.name}
                labelSize={d => locations.findIndex(l => l.name === d.name) === activeLocationIndex ? 1.8 : 1.2}
                labelDotRadius={d => locations.findIndex(l => l.name === d.name) === activeLocationIndex ? 0.9 : 0.55}
                labelColor={d => locations.findIndex(l => l.name === d.name) === activeLocationIndex ? '#f05a66' : '#111111'}
                labelResolution={3}
                labelAltitude={0.015}

                width={400}
                height={400}
            />
        </div>
    );
};

export default WorldGlobe;
