import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsMarks } from '../../redux/people';

const Header = () => {
  const isMarks = useSelector(getIsMarks());
  return (
    <header className="menu">
      <p className="menu__logo">Roullete</p>
      <div className="container menu-items-container">
        <ul className="menu-items">
          <li className="menu-items__item">
            <Link to="/" className="menu-items__item-link">
              Главная
            </Link>
          </li>
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
        </ul>
      </div>
    </header>
  );
};
export default Header;
