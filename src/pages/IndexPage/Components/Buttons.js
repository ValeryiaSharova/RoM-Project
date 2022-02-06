import React from 'react';
import PropTypes from 'proptypes';

const Buttons = props => {
  const { handle, victim, handleSkip } = props;
  return (
    <div className="question-card-buttons-for-action">
      <button className="question-card-buttons-for-action__button" type="button" onClick={handle}>
        {victim ? 'Следующий вопрос' : 'Нажмите, чтобы выбрать отвечающего!'}
      </button>
      {victim ? (
        <button
          className="question-card-buttons-for-action__button"
          type="button"
          onClick={handleSkip}
        >
          Пропустить отвечающего
        </button>
      ) : null}
    </div>
  );
};

Buttons.propTypes = {
  victim: PropTypes.string.isRequired,
  handle: PropTypes.func.isRequired,
  handleSkip: PropTypes.func.isRequired,
};

export default Buttons;
