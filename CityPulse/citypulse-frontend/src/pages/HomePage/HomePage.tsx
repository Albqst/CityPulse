import "./HomePage.css";
import { useEffect, useState } from "react";

import Map from "../../components/Map/Map";
import ClaimForm from "../../components/ClaimForm/ClaimForm";
import { getClaims } from "../../api/claims";
import type { Claim } from "../../api/claims";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";

const HomePage = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  useEffect(() => {
    if (!token) return;

    async function loadClaims() {
      try {
        const data = await getClaims();
        setClaims(data);
      } catch (error) {
        console.error("Ошибка загрузки заявок:", error);
      }
    }

    loadClaims();
  }, [token]);

  if (!token) {
    return (
      <div className="home">
        <section className="hero-text">
          <h1>Ваш город — в ваших руках</h1>
          <p>Отмечайте проблемы на карте и следите за их решением.</p>
        </section>

        <div className="auth-center">
          <div className="auth-switch">
            <button className={authMode === "login" ? "active" : ""} onClick={() => setAuthMode("login")}>Вход</button>
            <button className={authMode === "register" ? "active" : ""} onClick={() => setAuthMode("register")}>Регистрация</button>
          </div>

          <div className="auth-card">
            {authMode === "login" ? <LoginPage /> : <RegisterPage />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <section className="hero-text">
        <h1>Ваш город — в ваших руках</h1>
        <p>Отмечайте проблемы на карте и следите за их решением.</p>
      </section>

      <section className="hero-row">
        <div className="claim-form-wrapper">
          <ClaimForm />
        </div>

        <div className="map-wrapper">
          <Map claims={claims} />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
