// 📌 Файл: src/components/Map/Map.tsx

import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface Claim {
  id: number;
  title: string;
  description: string;
  lat: number;
  lng: number;
  status: string;
}

const Map = ({ claims }: { claims: Claim[] }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current!,
      style: {
        version: 8,
        sources: {
          "raster-tiles": {
            type: "raster",
            tiles: [
              "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            ],
            tileSize: 256,
            attribution: "© OpenStreetMap contributors"
          }
        },
        layers: [
          {
            id: "osm-tiles",
            type: "raster",
            source: "raster-tiles",
            minzoom: 0,
            maxzoom: 19
          }
        ]
      },
      center: [18.0686, 59.3293],
      zoom: 12
    });
  }, []);

  useEffect(() => {
    if (!map.current) return;

    claims.forEach((claim) => {
      new maplibregl.Marker()
        .setLngLat([claim.lng, claim.lat])
        .setPopup(
          new maplibregl.Popup().setHTML(`
            <strong>${claim.title}</strong><br/>
            ${claim.description}<br/>
            <small>${claim.status}</small>
          `)
        )
        .addTo(map.current!);
    });
  }, [claims]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: "100%",
        height: "400px",
        borderRadius: "16px"
      }}
    />
  );
};

export default Map;
