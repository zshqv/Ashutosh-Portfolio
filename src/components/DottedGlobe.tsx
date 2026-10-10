import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './DottedGlobe.css';

function isOnline() {
  const now = new Date();
  const istMinutes = (now.getUTCHours() * 60 + now.getUTCMinutes() + 330) % 1440;
  return istMinutes >= 480; // 08:00 = 480 mins, online from 08:00 to 00:00
}

interface DottedGlobeProps {
  size?: number;
}

export function DottedGlobe({ size = 280 }: DottedGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [online, setOnline] = useState(isOnline);

  useEffect(() => {
    const id = setInterval(() => setOnline(isOnline()), 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    const containerSize = size;
    const radius = containerSize / 2.5;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = containerSize * dpr;
    canvas.height = containerSize * dpr;
    canvas.style.width = `${containerSize}px`;
    canvas.style.height = `${containerSize}px`;
    context.scale(dpr, dpr);

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerSize / 2, containerSize / 2])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection).context(context);

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point;
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }
      return inside;
    };

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry;
      if (geometry.type === 'Polygon') {
        if (!pointInPolygon(point, geometry.coordinates[0])) return false;
        for (let i = 1; i < geometry.coordinates.length; i++) {
          if (pointInPolygon(point, geometry.coordinates[i])) return false;
        }
        return true;
      } else if (geometry.type === 'MultiPolygon') {
        for (const polygon of geometry.coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false;
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) { inHole = true; break; }
            }
            if (!inHole) return true;
          }
        }
      }
      return false;
    };

    const generateDotsInPolygon = (feature: any, dotSpacing = 16) => {
      const dots: [number, number][] = [];
      const bounds = d3.geoBounds(feature);
      const [[minLng, minLat], [maxLng, maxLat]] = bounds;
      const stepSize = dotSpacing * 0.08;
      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat];
          if (pointInFeature(point, feature)) dots.push(point);
        }
      }
      return dots;
    };

    interface DotData { lng: number; lat: number }
    const allDots: DotData[] = [];
    let landFeatures: any;

    const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

    const render = () => {
      context.clearRect(0, 0, containerSize, containerSize);
      const currentScale = projection.scale();
      const scaleFactor = currentScale / radius;
      const dark = isDark();

      const strokeColor = dark ? '#d4d0bc' : '#38362c';
      const dotColor = dark ? '#a8a48e' : '#999999';
      const bgColor = dark ? '#1a1a1e' : '#000000';

      context.beginPath();
      context.arc(containerSize / 2, containerSize / 2, currentScale, 0, 2 * Math.PI);
      context.fillStyle = bgColor;
      context.fill();
      context.strokeStyle = strokeColor;
      context.lineWidth = 1.5 * scaleFactor;
      context.stroke();

      if (landFeatures) {
        const graticule = d3.geoGraticule();
        context.beginPath();
        path(graticule());
        context.strokeStyle = strokeColor;
        context.lineWidth = 0.5 * scaleFactor;
        context.globalAlpha = 0.15;
        context.stroke();
        context.globalAlpha = 1;

        context.beginPath();
        landFeatures.features.forEach((feature: any) => { path(feature); });
        context.strokeStyle = strokeColor;
        context.lineWidth = 0.8 * scaleFactor;
        context.stroke();

        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat]);
          if (projected) {
            context.beginPath();
            context.arc(projected[0], projected[1], 1 * scaleFactor, 0, 2 * Math.PI);
            context.fillStyle = dotColor;
            context.fill();
          }
        });

        // Mumbai marker (72.8777°E, 19.0760°N)
        const mumbai: [number, number] = [72.8777, 19.076];
        const rot = projection.rotate();
        const dist = d3.geoDistance(mumbai, [-rot[0], -rot[1]]);
        if (dist < Math.PI / 2) {
          const mp = projection(mumbai);
          if (mp) {
            const statusOnline = isOnline();
            const dotRadius = 4 * scaleFactor;

            // outer glow
            const glow = context.createRadialGradient(mp[0], mp[1], dotRadius, mp[0], mp[1], dotRadius * 3);
            glow.addColorStop(0, statusOnline ? 'rgba(74, 222, 128, 0.4)' : 'rgba(248, 113, 113, 0.4)');
            glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
            context.beginPath();
            context.arc(mp[0], mp[1], dotRadius * 3, 0, 2 * Math.PI);
            context.fillStyle = glow;
            context.fill();

            // solid dot
            context.beginPath();
            context.arc(mp[0], mp[1], dotRadius, 0, 2 * Math.PI);
            context.fillStyle = statusOnline ? '#4ade80' : '#f87171';
            context.fill();

            // white center highlight
            context.beginPath();
            context.arc(mp[0] - dotRadius * 0.2, mp[1] - dotRadius * 0.2, dotRadius * 0.35, 0, 2 * Math.PI);
            context.fillStyle = 'rgba(255, 255, 255, 0.5)';
            context.fill();
          }
        }
      }
    };

    const loadWorldData = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json'
        );
        if (!response.ok) return;
        landFeatures = await response.json();
        landFeatures.features.forEach((feature: any) => {
          const dots = generateDotsInPolygon(feature, 16);
          dots.forEach(([lng, lat]) => allDots.push({ lng, lat }));
        });
        render();
      } catch {}
    };

    const rotation: [number, number] = [0, 0];
    let autoRotate = true;

    const rotationTimer = d3.timer(() => {
      if (autoRotate) {
        rotation[0] += 0.3;
        projection.rotate(rotation);
        render();
      }
    });

    const handleMouseDown = (event: MouseEvent) => {
      autoRotate = false;
      const startX = event.clientX;
      const startY = event.clientY;
      const startRotation: [number, number] = [...rotation];

      const handleMouseMove = (e: MouseEvent) => {
        rotation[0] = startRotation[0] + (e.clientX - startX) * 0.5;
        rotation[1] = Math.max(-90, Math.min(90, startRotation[1] - (e.clientY - startY) * 0.5));
        projection.rotate(rotation);
        render();
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        setTimeout(() => { autoRotate = true; }, 10);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    loadWorldData();

    const observer = new MutationObserver(() => render());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      rotationTimer.stop();
      canvas.removeEventListener('mousedown', handleMouseDown);
      observer.disconnect();
    };
  }, [size]);

  return (
    <div className="dotted-globe">
      <div className="dotted-globe__wrap">
        <canvas ref={canvasRef} className="dotted-globe__canvas" />
      </div>
      <span className="mono-label dotted-globe__label">
        {online ? 'Available' : 'Away'} · Mumbai, IST
      </span>
    </div>
  );
}
