/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalConsumer } from '../../context/ModalContext';
import ModalElement from './Components/Modal';
import good from '../../images/heart.png';
import bad from '../../images/skull.png';
import {
  getAnswerData,
  getSaveDataAnswer,
  getStartAnswerData,
  saveDataAnswer,
} from '../../redux/people';

const store = require('store');

const AnswersPage = () => {
  const dispatch = useDispatch();
  const markData = useSelector(getAnswerData());

  useEffect(() => {
    if (!store.get('test')) {
      dispatch(getStartAnswerData());
    }
  }, []);

  const handleClick = () => {
    dispatch(getSaveDataAnswer());
  };

  return (
    <>
      <h1 className="title">
        Ваши <em>ОТВЕТЫ</em>
      </h1>
      <div className="group-button">
        <ModalConsumer>
          {({ showModal }) => (
            <button
              className="group-button__button"
              type="button"
              onClick={() => showModal(ModalElement, { saveDataAnswer })}
            >
              Сохранить ответы
            </button>
          )}
        </ModalConsumer>
        <button className="group-button__button" type="button" onClick={handleClick}>
          Загрузить ответы
        </button>
      </div>

      <div className="container card-list-wrapper">
        {markData ? (
          Object.keys(markData).map((person, index) => (
            <div className="card-list" key={person}>
              <h2 className="card-list__item-count">{index + 1}</h2>
              <h4 className="card-list__item-name">{person}</h4>
              <div className="card-list-item-answers">
                <p className="card-list-item-answers__all-answers">Все : {markData[person].all}</p>
                {markData[person].mark > 0 ? (
                  <>
                    <img src={good} alt="Good" className="card-list-item-answers__img" /> x{' '}
                    {markData[person].mark}
                  </>
                ) : markData[person].mark === 0 ? (
                  <p className="card-list-item-answers__no-answer">Нет ответов :(</p>
                ) : (
                  <>
                    <img src={bad} alt="Bad" className="card-list-item-answers__img" /> x{' '}
                    {markData[person].mark * -1}
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Нет данных, перезагрузите страницу или проверьте сервер</p>
        )}
      </div>
    </>
  );
};

export default AnswersPage;
