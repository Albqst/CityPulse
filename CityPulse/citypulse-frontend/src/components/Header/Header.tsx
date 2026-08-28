import logo from "../../assets/logo.png";
import "./Header.css";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo-block">
        <img src={logo} alt="CityPulse" className="logo-image" />
        <span className="logo-text">CityPulse</span>
      </div>

      <nav className="nav">
        <Link to="/">Главная</Link>
        <Link to="/login">Войти</Link>
        <Link to="/register">Регистрация</Link>
        <Link to="/my-claims">Мои заявки</Link>
      </nav>
    </header>
  );
};

export default Header;
