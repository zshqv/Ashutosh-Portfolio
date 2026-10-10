import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './DottedGlobe.css';

function isOnline() {
  const now = new Date();
  const istMinutes = (now.getUTCHours() * 60 + now.getUTCMinutes() + 330) % 1440;
  return istMinutes >= 480;
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
    const context = canvas.getContext('2d')!;
    const containerSize = size;
    const radius = containerSize / 2.5;
    const cx = containerSize / 2;
    const cy = containerSize / 2;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = containerSize * dpr;
    canvas.height = containerSize * dpr;
    canvas.style.width = `${containerSize}px`;
    canvas.style.height = `${containerSize}px`;
    context.scale(dpr, dpr);

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([cx, cy])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection).context(context);
    const graticule = d3.geoGraticule()();
    const TWO_PI = 2 * Math.PI;
    const PI_HALF = Math.PI / 2;

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

    const allDots: [number, number][] = [];
    let landFeatures: any;

    const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

    const render = () => {
      context.clearRect(0, 0, containerSize, containerSize);
      const currentScale = projection.scale();
      const scaleFactor = currentScale / radius;
      const dark = isDark();

      const oceanColor = dark ? '#1a1a1e' : 'rgba(56, 54, 44, 0.04)';
      const borderColor = dark ? 'rgba(212, 208, 188, 0.2)' : 'rgba(56, 54, 44, 0.15)';
      const gratColor = dark ? 'rgba(212, 208, 188, 0.06)' : 'rgba(56, 54, 44, 0.06)';
      const dotColor = dark ? 'rgba(212, 208, 188, 0.5)' : 'rgba(56, 54, 44, 0.35)';

      // ocean
      context.beginPath();
      context.arc(cx, cy, currentScale, 0, TWO_PI);
      context.fillStyle = oceanColor;
      context.fill();
      context.strokeStyle = borderColor;
      context.lineWidth = 1 * scaleFactor;
      context.stroke();

      if (landFeatures) {
        // graticule
        context.beginPath();
        path(graticule);
        context.strokeStyle = gratColor;
        context.lineWidth = 0.4 * scaleFactor;
        context.stroke();

        // land dots — single batched path
        const dotR = Math.max(0.5, 1 * scaleFactor);
        context.fillStyle = dotColor;
        context.beginPath();
        for (const dot of allDots) {
          const projected = projection(dot);
          if (projected) {
            context.moveTo(projected[0] + dotR, projected[1]);
            context.arc(projected[0], projected[1], dotR, 0, TWO_PI);
          }
        }
        context.fill();

        // Mumbai marker
        const mumbai: [number, number] = [72.8777, 19.076];
        const rot = projection.rotate();
        const dist = d3.geoDistance(mumbai, [-rot[0], -rot[1]]);
        if (dist < PI_HALF) {
          const mp = projection(mumbai);
          if (mp) {
            const statusOnline = isOnline();
            const dotRadius = 4 * scaleFactor;

            const glow = context.createRadialGradient(mp[0], mp[1], dotRadius, mp[0], mp[1], dotRadius * 3);
            glow.addColorStop(0, statusOnline ? 'rgba(74, 222, 128, 0.4)' : 'rgba(248, 113, 113, 0.4)');
            glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
            context.beginPath();
            context.arc(mp[0], mp[1], dotRadius * 3, 0, TWO_PI);
            context.fillStyle = glow;
            context.fill();

            context.beginPath();
            context.arc(mp[0], mp[1], dotRadius, 0, TWO_PI);
            context.fillStyle = statusOnline ? '#4ade80' : '#f87171';
            context.fill();

            context.beginPath();
            context.arc(mp[0] - dotRadius * 0.2, mp[1] - dotRadius * 0.2, dotRadius * 0.35, 0, TWO_PI);
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
          const bounds = d3.geoBounds(feature);
          const [[minLng, minLat], [maxLng, maxLat]] = bounds;
          const step = 2;
          for (let lng = minLng; lng <= maxLng; lng += step) {
            for (let lat = minLat; lat <= maxLat; lat += step) {
              const point: [number, number] = [lng, lat];
              if (pointInFeature(point, feature)) allDots.push(point);
            }
          }
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
