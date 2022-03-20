/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import PropTypes from 'proptypes';
import { toast } from 'react-toastify';
import good from '../../images/heart.png';
import bad from '../../images/skull.png';

const store = require('store');

const AnswersPage = props => {
  const { saveDataAnswer, getSaveDataAnswer, isAdmin, loadingGetSaveDataAnswer, checkAnswer } =
    props;
  const markData = store.get('test');
  useEffect(async () => {
    if (!store.get('test')) {
      await getSaveDataAnswer();
    }
    checkAnswer();
  }, []);

  const handleCLick = () => {
    saveDataAnswer();
    toast.info('Данные сохранены');
  };

  if (loadingGetSaveDataAnswer) {
    return <h1 className="title">Загрузка...</h1>;
  }

  return (
    <>
      <h1 className="title">
        Ваши <em>ОТВЕТЫ</em>
      </h1>
      <div className="group-button">
        {isAdmin ? (
          <button className="group-button__button" type="button" onClick={handleCLick}>
            Сохранить ответы
          </button>
        ) : null}
      </div>

      <div className="container card-list-wrapper mt-4">
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

AnswersPage.propTypes = {
  saveDataAnswer: PropTypes.func.isRequired,
  getSaveDataAnswer: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  loadingGetSaveDataAnswer: PropTypes.bool.isRequired,
  checkAnswer: PropTypes.func.isRequired,
};

export default AnswersPage;
