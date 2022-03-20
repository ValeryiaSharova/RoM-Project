/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'proptypes';
import { ModalConsumer } from '../../context/ModalContext';
import ModalElement from './Components/Modal';

const Header = ({
  isMarks,
  isAdmin,
  subject,
  changeStatus,
  swapSubject,
  fetchQuestions,
  getSaveDataAnswer,
  checkAnswer,
}) => {
  return (
    <header className="menu">
      <p className="menu__logo">
        ROULETTE<span className="menu__logo-subject">{subject}</span>
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
          <ModalConsumer>
            {({ showModal }) => (
              <li className="menu-items__item">
                <span
                  className="menu-items__item-link"
                  type="button"
                  onClick={() =>
                    showModal(ModalElement, {
                      changeStatus,
                      swapSubject,
                      fetchQuestions,
                      getSaveDataAnswer,
                      isAdmin,
                      checkAnswer,
                    })
                  }
                >
                  Настройки
                </span>
              </li>
            )}
          </ModalConsumer>
        </ul>
      </div>
    </header>
  );
};

Header.propTypes = {
  isMarks: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  subject: PropTypes.string.isRequired,
  changeStatus: PropTypes.func.isRequired,
  swapSubject: PropTypes.func.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  getSaveDataAnswer: PropTypes.func.isRequired,
  checkAnswer: PropTypes.func.isRequired,
};

export default Header;
