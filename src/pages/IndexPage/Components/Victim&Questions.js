import React from 'react';
import PropTypes from 'proptypes';

const VictimAndQuestions = props => {
  const { victim, question, goodAnswer, badAnswer, sosoAnswer, click } = props;

  return (
    <div>
      {!victim ? (
        <h2>No victim</h2>
      ) : (
        <div>
          <h2>{victim}</h2>
          {!click ? (
            <div>
              <button className="main-button-slider" type="button" onClick={goodAnswer}>
                Good
              </button>
              <button className="main-button-slider" type="button" onClick={sosoAnswer}>
                So-So
              </button>
              <button className="main-button-slider" type="button" onClick={badAnswer}>
                Bad
              </button>
            </div>
          ) : null}
          {!question ? (
            <div>
              <h2>No questions :(</h2>
            </div>
          ) : (
            <div>
              <h2>{question}</h2>
            </div>
          )}
        </div>
      )}
    </div>
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
