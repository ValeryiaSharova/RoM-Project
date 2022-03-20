import React from 'react';
import PropTypes from 'proptypes';
import { ModalConsumer } from '../../context/ModalContext';
import ModalElement from './Components/Modal';

const store = require('store');

const SettingsPage = ({ swapSubject, changeStatus, fetchQuestions, getSaveDataAnswer }) => {
  const handleClick = () => {
    swapSubject();
    fetchQuestions(store.get('subject'));
    getSaveDataAnswer(store.get('subject'));
  };
  return (
    <div>
      <h1 className="title">
        <em>НАСТРОЙКИ</em>
      </h1>

      <div className="group-button mt-4">
        <ModalConsumer>
          {({ showModal }) => (
            <button
              className="group-button__button"
              type="button"
              onClick={() => showModal(ModalElement, { changeStatus })}
            >
              Ввести пароль администратора
            </button>
          )}
        </ModalConsumer>

        <button className="group-button__button" type="button" onClick={handleClick}>
          Сменить предмет
        </button>
      </div>
    </div>
  );
};

SettingsPage.propTypes = {
  swapSubject: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  getSaveDataAnswer: PropTypes.func.isRequired,
};

export default SettingsPage;
