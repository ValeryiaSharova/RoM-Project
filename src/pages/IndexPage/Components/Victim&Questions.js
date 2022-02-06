import React from 'react';
import PropTypes from 'proptypes';

const VictimAndQuestions = props => {
  const { victim, question, goodAnswer, badAnswer, sosoAnswer, click } = props;

  return (
    <>
      {!victim ? (
        <h2 className="question-card__title">Нет отвечающего</h2>
      ) : (
        <div>
          <h2 className="question-card__title">{victim}</h2>
          {!click ? (
            <div className="question-card-buttons-for-marks">
              <button
                className="question-card-buttons-for-marks__button"
                type="button"
                onClick={goodAnswer}
              >
                Отлично
              </button>
              <button
                className="question-card-buttons-for-marks__button"
                type="button"
                onClick={sosoAnswer}
              >
                Так себе
              </button>
              <button
                className="question-card-buttons-for-marks__button"
                type="button"
                onClick={badAnswer}
              >
                Плохо
              </button>
            </div>
          ) : null}
          <h2 className="question-card__question">{question || 'Больше нет вопросов'}</h2>
        </div>
      )}
    </>
  );
};

VictimAndQuestions.propTypes = {
  victim: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  goodAnswer: PropTypes.func.isRequired,
  badAnswer: PropTypes.func.isRequired,
  sosoAnswer: PropTypes.func.isRequired,
  click: PropTypes.number.isRequired,
};

export default VictimAndQuestions;
