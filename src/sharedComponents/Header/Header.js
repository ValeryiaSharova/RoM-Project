import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'proptypes';

const Header = ({ isMarks, isAdmin, subject }) => {
  return (
    <header className="menu">
      <p className="menu__logo">
        Roullete<span className="menu__logo-subject">{subject}</span>
      </p>

      <div className="container menu-items-container">
        <ul className="menu-items">
          {isAdmin ? (
            <li className="menu-items__item">
              <Link to="/" className="menu-items__item-link">
                Главная
              </Link>
            </li>
          ) : null}
          <li className="menu-items__item">
            <Link to="/answers" className="menu-items__item-link">
              Ответы
            </Link>
          </li>
          {isMarks ? (
            <li className="menu-items__item">
              <Link to="/marks" className="menu-items__item-link">
                Оценки
              </Link>
            </li>
          ) : null}
          <li className="menu-items__item">
            <Link to="/settings" className="menu-items__item-link">
              Настройки
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

Header.propTypes = {
  isMarks: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  subject: PropTypes.string.isRequired,
};

export default Header;
