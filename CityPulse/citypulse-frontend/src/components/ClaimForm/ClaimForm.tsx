import { useState } from "react";
import "./ClaimForm.css";
import { createClaim } from "../../api/claims";

interface NewClaim {
  id?: number;
  title: string;
  description: string;
  address?: string;
  lat: number;
  lng: number;
  status?: string;
}

const ClaimForm = ({ onCreate, onRequestMapSelection, selectedCoords }: { onCreate?: (c: NewClaim) => void; onRequestMapSelection?: () => void; selectedCoords?: { lat: number; lng: number } | null }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [useSelectedCoords, setUseSelectedCoords] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Простая геокодировка через Nominatim (OpenStreetMap)
  async function geocodeAddress(query: string) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
      query
    )}`;

    const res = await fetch(url, {
      headers: {
        "Accept-Language": "ru",
        "User-Agent": "CityPulse-frontend/1.0"
      }
    });

    if (!res.ok) return null;
    const data = await res.json();
    if (!data || data.length === 0) return null;
    const item = data[0];
    return {
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon)
    };
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !description || (!address && !selectedCoords)) {
      setError("Пожалуйста, заполните название, описание и адрес или выберите точку на карте");
      return;
    }

    setLoading(true);

    try {
      let coords = null as { lat: number; lng: number } | null;

      if (selectedCoords && useSelectedCoords) {
        coords = selectedCoords;
      } else if (address) {
        coords = await geocodeAddress(address);
      }

      if (!coords) {
        setError("Не удалось определить координаты ни по адресу, ни по выбранной точке. Уточните адрес или выберите точку на карте.");
        setLoading(false);
        return;
      }

      const dto = {
        title,
        description,
        address,
        lat: coords.lat,
        lng: coords.lng
      };

      const created = await createClaim(dto as any);

      const claim: NewClaim = {
        id: created?.id,
        title: created?.title || title,
        description: created?.description || description,
        address: created?.address || address,
        lat: created?.lat ?? coords.lat,
        lng: created?.lng ?? coords.lng,
        status: created?.status || "Заявка на рассмотрении"
      };

      // очистка формы
      setTitle("");
      setDescription("");
      setAddress("");

      if (onCreate) onCreate(claim);

      alert("Заявка создана");
    } catch (err) {
      console.error(err);
      setError("Ошибка при отправке заявки");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="claim-form" onSubmit={handleSubmit}>
      <h3>Создать заявку</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <label>Название проблемы</label>
      <input
        type="text"
        placeholder="Например: Яма на дороге"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Адрес</label>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          placeholder="Улица, дом, город"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ flex: 1 }}
        />
        <button type="button" onClick={() => onRequestMapSelection && onRequestMapSelection()} style={{ whiteSpace: "nowrap" }}>
          Выбрать на карте
        </button>
      </div>

      {selectedCoords && (
        <div style={{ marginTop: 8 }}>
          <label style={{ fontSize: 12, color: "#333" }}>Выбранная точка: {selectedCoords.lat.toFixed(6)}, {selectedCoords.lng.toFixed(6)}</label>
          <div>
            <label style={{ fontSize: 12 }}>
              <input type="checkbox" checked={useSelectedCoords} onChange={(e) => setUseSelectedCoords(e.target.checked)} /> Использовать выбранную точку
            </label>
          </div>
        </div>
      )}

      <label style={{ marginTop: 12 }}>Описание</label>
      <textarea
        placeholder="Опишите проблему подробнее"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Отправка..." : "Отправить"}
      </button>
    </form>
  );
};

export default ClaimForm;
