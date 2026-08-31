// 📌 Файл: src/components/Map/Map.tsx

import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface Claim {
  id: number;
  title: string;
  description: string;
  address?: string;
  lat: number;
  lng: number;
  status: string;
}

const Map = ({ claims, selecting, onSelectLocation, selectedLocation }: { claims: Claim[]; selecting?: boolean; onSelectLocation?: (lat: number, lng: number) => void; selectedLocation?: { lat: number; lng: number } | null }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const tempMarkerRef = useRef<maplibregl.Marker | null>(null);

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

  // Рисуем маркеры заявок
  useEffect(() => {
    if (!map.current) return;

    // remove existing markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    claims.forEach((claim) => {
      const popupHtml = `
        <div style="min-width:160px">
          <strong>${claim.title}</strong><br/>
          ${claim.address ? `<em>${claim.address}</em><br/>` : ""}
          <div style="margin-top:6px">${claim.description}</div>
          <div style="margin-top:8px"><small>Статус: ${claim.status || "Заявка на рассмотрении"}</small></div>
        </div>
      `;

      const marker = new maplibregl.Marker()
        .setLngLat([claim.lng, claim.lat])
        .setPopup(new maplibregl.Popup().setHTML(popupHtml))
        .addTo(map.current!);

      markersRef.current.push(marker);
    });
  }, [claims]);

  // Обработчик выбора точки на карте
  useEffect(() => {
    if (!map.current) return;

    const m = map.current;

    function onMapClick(e: maplibregl.MapMouseEvent) {
      const { lngLat } = e;
      // повесим временный маркер
      if (tempMarkerRef.current) tempMarkerRef.current.remove();
      tempMarkerRef.current = new maplibregl.Marker({ color: "#ff0000" })
        .setLngLat([lngLat.lng, lngLat.lat])
        .addTo(m);

      if (onSelectLocation) onSelectLocation(lngLat.lat, lngLat.lng);
    }

    if (selecting) {
      m.getCanvas().style.cursor = "crosshair";
      m.on("click", onMapClick);
    }

    return () => {
      m.getCanvas().style.cursor = "";
      m.off("click", onMapClick);
    };
  }, [selecting, onSelectLocation]);

  // Показываем выбранную точку (если есть)
  useEffect(() => {
    if (!map.current) return;

    if (tempMarkerRef.current) {
      tempMarkerRef.current.remove();
      tempMarkerRef.current = null;
    }

    if (selectedLocation) {
      tempMarkerRef.current = new maplibregl.Marker({ color: "#ff0000" })
        .setLngLat([selectedLocation.lng, selectedLocation.lat])
        .addTo(map.current!);

      // подвинуть карту к точке
      map.current!.flyTo({ center: [selectedLocation.lng, selectedLocation.lat], zoom: 15 });
    }
  }, [selectedLocation]);

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
