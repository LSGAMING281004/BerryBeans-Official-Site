import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';
import * as topojson from 'topojson-client';

const locations = [
  { name: 'India', lat: 28.6139, lng: 77.2090, color: '#f05a66' },          // New Delhi
  { name: 'Singapore', lat: 1.3521, lng: 103.8198, color: '#f05a66' },      // Singapore
  { name: 'Malaysia', lat: 3.1390, lng: 101.6869, color: '#f05a66' },       // Kuala Lumpur
  { name: 'US', lat: 38.9072, lng: -77.0369, color: '#f05a66' },            // Washington DC
  { name: 'UK', lat: 51.5074, lng: -0.1278, color: '#f05a66' },             // London
  { name: 'Qatar', lat: 25.2854, lng: 51.5310, color: '#f05a66' },          // Doha
  { name: 'Congo', lat: -4.4419, lng: 15.2663, color: '#f05a66' },          // Brazzaville
  { name: 'Dubai', lat: 25.2048, lng: 55.2708, color: '#f05a66' },          // Dubai
  { name: 'Netherlands', lat: 52.3676, lng: 4.9041, color: '#f05a66' },     // Amsterdam
];

// Arcs connecting locations
const generateArcs = (activeIndex) => {
  const arcs = [];
  const activeLocation = locations[activeIndex];
  if (!activeLocation) return arcs;

  locations.forEach((loc, i) => {
    if (i !== activeIndex) {
      arcs.push({
        startLat: activeLocation.lat,
        startLng: activeLocation.lng,
        endLat: loc.lat,
        endLng: loc.lng,
        color: ['rgba(240, 90, 102, 0.5)', 'rgba(174, 221, 76, 0.25)'],
      });
    }
  });
  return arcs;
};

// Stable constants — defined outside component
const LABEL_LAT = d => d.lat;
const LABEL_LNG = d => d.lng;

// White globe hex color — dark gray for high contrast on white
const HEX_COLOR = () => 'rgba(50, 60, 75, 0.65)';

const WorldGlobe = ({ activeLocationIndex }) => {
  const globeRef = useRef();
  const [countries, setCountries] = useState({ features: [] });
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 550, height: 550 });

  useEffect(() => {
    // Load world TopoJSON and convert to GeoJSON features
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(res => res.json())
      .then(data => {
        const geoFeatures = topojson.feature(data, data.objects.countries);
        setCountries(geoFeatures);
      })
      .catch(() => {
        // Fallback source
        fetch('https://unpkg.com/world-atlas@2/countries-110m.json')
          .then(res => res.json())
          .then(data => {
            const geoFeatures = topojson.feature(data, data.objects.countries);
            setCountries(geoFeatures);
          });
      });
  }, []);

  // Responsive sizing
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const size = Math.min(rect.width, rect.height, 600);
        setDimensions({ width: Math.max(size, 240), height: Math.max(size, 240) });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Arc data
  const arcsData = useMemo(() => generateArcs(activeLocationIndex), [activeLocationIndex]);

  // HTML label elements
  const getHtmlElement = useCallback(d => {
    const el = document.createElement('div');
    const isActive = locations.findIndex(l => l.name === d.name) === activeLocationIndex;

    el.innerHTML = `
          <div style="
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            transform: translate(-50%, -100%);
            pointer-events: none;
            opacity: ${isActive ? '1' : '0.5'};
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            filter: ${isActive ? 'drop-shadow(0 4px 16px rgba(240, 90, 102, 0.35))' : 'none'};
          ">
            ${isActive ? `
            <div style="
              font-weight: 800; 
              font-family: 'Inter', system-ui, sans-serif; 
              font-size: 14px; 
              letter-spacing: 0.04em;
              color: #ffffff; 
              background: linear-gradient(135deg, #f05a66, #e04050);
              backdrop-filter: blur(8px);
              padding: 5px 14px;
              border-radius: 100px;
              box-shadow: 0 4px 18px rgba(240, 90, 102, 0.4);
              transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
              white-space: nowrap;
              border: none;
              text-transform: uppercase;
            ">
              ${d.name}
            </div>
            ` : ''}
            ${isActive ? `
              <div style="
                width: 12px; height: 12px;
                background: #f05a66;
                border-radius: 50%;
                margin-top: 5px;
                border: 2.5px solid white;
                box-shadow: 0 0 0 4px rgba(240, 90, 102, 0.2), 0 3px 10px rgba(240, 90, 102, 0.35);
                animation: globePulse 2s ease-in-out infinite;
              "></div>
              <div style="
                width: 2px;
                height: 16px;
                background: linear-gradient(to bottom, #f05a66, transparent);
                margin-top: -2px;
              "></div>
            ` : `
              <div style="
                width: 6px; 
                height: 6px; 
                background-color: #6b7280; 
                border-radius: 50%; 
                margin-top: 5px; 
                border: 2px solid white; 
                box-shadow: 0 1px 4px rgba(0,0,0,0.15); 
                transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
              "></div>
            `}
          </div>
        `;
    return el;
  }, [activeLocationIndex]);

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.6;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.minPolarAngle = Math.PI * 0.3;
      controls.maxPolarAngle = Math.PI * 0.7;

      const loc = locations[activeLocationIndex];
      if (loc) {
        globeRef.current.pointOfView({ lat: loc.lat, lng: loc.lng, altitude: 2.0 }, 1200);
      }
    }
  }, [activeLocationIndex]);

  // Style globe material for a clean white look
  const onGlobeReady = useCallback(() => {
    if (globeRef.current) {
      const globeMaterial = globeRef.current.globeMaterial();
      if (globeMaterial) {
        // Create a white texture via canvas
        const canvas = document.createElement('canvas');
        canvas.width = 4;
        canvas.height = 4;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#f5f6f8';
        ctx.fillRect(0, 0, 4, 4);
        const whiteTexture = new THREE.CanvasTexture(canvas);

        globeMaterial.map = whiteTexture;
        globeMaterial.color = new THREE.Color('#ffffff');
        globeMaterial.emissive = new THREE.Color('#f8f9fa');
        globeMaterial.emissiveIntensity = 0.4;
        globeMaterial.shininess = 5;
        globeMaterial.needsUpdate = true;
      }
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center globe-container">
      <style>{`
        @keyframes globePulse {
          0%, 100% { box-shadow: 0 0 0 4px rgba(240, 90, 102, 0.2), 0 3px 10px rgba(240, 90, 102, 0.35); transform: scale(1); }
          50% { box-shadow: 0 0 0 8px rgba(240, 90, 102, 0.08), 0 4px 16px rgba(240, 90, 102, 0.4); transform: scale(1.12); }
        }
      `}</style>
      <Globe
        ref={globeRef}
        onGlobeReady={onGlobeReady}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="/white-globe.png"
        showAtmosphere={true}
        atmosphereColor="rgba(160, 175, 200, 0.25)"
        atmosphereAltitude={0.12}
        hexPolygonsData={countries.features}
        hexPolygonResolution={3}
        hexPolygonMargin={0.25}
        hexPolygonColor={HEX_COLOR}
        hexPolygonAltitude={0.006}
        htmlElementsData={locations}
        htmlLat={LABEL_LAT}
        htmlLng={LABEL_LNG}
        htmlElement={getHtmlElement}
        htmlAltitude={0.05}
        arcsData={arcsData}
        arcColor={'color'}
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2500}
        arcStroke={0.5}
        arcAltitudeAutoScale={0.3}
        width={dimensions.width}
        height={dimensions.height}
        animateIn={true}
        rendererConfig={{ antialias: true, alpha: true }}
      />
    </div>
  );
};

export default WorldGlobe;
