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

    // cache graticule
    const graticule = d3.geoGraticule()();

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

    interface DotData {
      lng: number;
      lat: number;
      bright: number; // pre-computed 0-1
    }

    const allDots: DotData[] = [];
    let landFeatures: any;

    const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';
    const PI_HALF = Math.PI / 2;
    const TWO_PI = 2 * Math.PI;

    const render = () => {
      context.clearRect(0, 0, containerSize, containerSize);
      const currentScale = projection.scale();
      const scaleFactor = currentScale / radius;
      const dark = isDark();

      if (dark) {
        // --- NIGHT MODE ---
        context.beginPath();
        context.arc(cx, cy, currentScale, 0, TWO_PI);
        context.fillStyle = '#0a0a12';
        context.fill();
        context.strokeStyle = 'rgba(100, 140, 255, 0.15)';
        context.lineWidth = 1 * scaleFactor;
        context.stroke();

        // atmospheric glow
        const atmo = context.createRadialGradient(cx, cy, currentScale * 0.95, cx, cy, currentScale * 1.08);
        atmo.addColorStop(0, 'rgba(80, 130, 255, 0)');
        atmo.addColorStop(0.7, 'rgba(80, 130, 255, 0.06)');
        atmo.addColorStop(1, 'rgba(80, 130, 255, 0)');
        context.beginPath();
        context.arc(cx, cy, currentScale * 1.08, 0, TWO_PI);
        context.fillStyle = atmo;
        context.fill();

        if (landFeatures) {
          context.beginPath();
          path(graticule);
          context.strokeStyle = 'rgba(60, 80, 140, 0.1)';
          context.lineWidth = 0.4 * scaleFactor;
          context.stroke();

          context.beginPath();
          landFeatures.features.forEach((feature: any) => { path(feature); });
          context.strokeStyle = 'rgba(80, 100, 160, 0.25)';
          context.lineWidth = 0.5 * scaleFactor;
          context.stroke();

          // city lights — two batched passes (glow + core)
          context.fillStyle = 'rgba(255, 200, 80, 0.08)';
          context.beginPath();
          for (const dot of allDots) {
            const projected = projection([dot.lng, dot.lat]);
            if (projected) {
              const r = Math.max(0.5, (0.8 + dot.bright * 1.2) * scaleFactor * 2);
              context.moveTo(projected[0] + r, projected[1]);
              context.arc(projected[0], projected[1], r, 0, TWO_PI);
            }
          }
          context.fill();

          context.fillStyle = 'rgba(255, 220, 120, 0.7)';
          context.beginPath();
          for (const dot of allDots) {
            const projected = projection([dot.lng, dot.lat]);
            if (projected) {
              const r = Math.max(0.3, (0.5 + dot.bright * 0.6) * scaleFactor);
              context.moveTo(projected[0] + r, projected[1]);
              context.arc(projected[0], projected[1], r, 0, TWO_PI);
            }
          }
          context.fill();
        }
      } else {
        // --- DAY MODE ---
        context.beginPath();
        context.arc(cx, cy, currentScale, 0, TWO_PI);
        context.fillStyle = '#1a3a5c';
        context.fill();
        context.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        context.lineWidth = 1.5 * scaleFactor;
        context.stroke();

        if (landFeatures) {
          context.beginPath();
          path(graticule);
          context.strokeStyle = 'rgba(255, 255, 255, 0.1)';
          context.lineWidth = 0.4 * scaleFactor;
          context.stroke();

          // filled land
          context.beginPath();
          landFeatures.features.forEach((feature: any) => { path(feature); });
          context.fillStyle = '#3a7a4f';
          context.fill();
          context.strokeStyle = 'rgba(255, 255, 255, 0.3)';
          context.lineWidth = 0.6 * scaleFactor;
          context.stroke();

          // terrain dots — single batched path
          const dotR = 0.8 * scaleFactor;
          context.fillStyle = 'rgba(80, 160, 90, 0.5)';
          context.beginPath();
          for (const dot of allDots) {
            const projected = projection([dot.lng, dot.lat]);
            if (projected) {
              context.moveTo(projected[0] + dotR, projected[1]);
              context.arc(projected[0], projected[1], dotR, 0, TWO_PI);
            }
          }
          context.fill();
        }
      }

      // Mumbai marker
      if (landFeatures) {
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
          const step = 2; // ~2 degree steps — much fewer dots, still looks good at 280px
          for (let lng = minLng; lng <= maxLng; lng += step) {
            for (let lat = minLat; lat <= maxLat; lat += step) {
              const point: [number, number] = [lng, lat];
              if (pointInFeature(point, feature)) {
                allDots.push({
                  lng,
                  lat,
                  bright: ((lng * 13 + lat * 7) % 3) / 3,
                });
              }
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
