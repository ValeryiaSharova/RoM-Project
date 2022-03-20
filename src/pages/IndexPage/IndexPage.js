import React, { useState, useEffect } from 'react';
import PropTypes from 'proptypes';
import VictimAndQuestions from './Components/Victim&Questions';
import Buttons from './Components/Buttons';

const IndexPage = props => {
  const {
    peopleData,
    loadingPeople,
    errorPeople,
    questionsData,
    loadingQuestions,
    loadedQuestionsData,
    errorQuestions,
    fetchPeople,
    fetchQuestions,
    checkAnswer,
    subject,
  } = props;
  useEffect(() => {
    if (!loadedQuestionsData) {
      fetchQuestions(subject);
    }
    if (!peopleData) {
      fetchPeople();
    }
    checkAnswer();
  }, []);

  const [victim, setVictim] = useState('');
  const [question, setQuestion] = useState('');
  const [click, setClick] = useState(0);

  const goodAnswer = () => {
    checkAnswer(1, victim);
    questionsData.splice(0, 1);
    setClick(1);
  };

  const sosoAnswer = () => {
    checkAnswer(2, victim);
    questionsData.splice(0, 1);
    setClick(1);
  };

  const badAnswer = () => {
    checkAnswer(3, victim);
    questionsData.splice(0, 1);
    setClick(1);
  };

  const handle = () => {
    setClick(0);
    const index = Math.floor(Math.random() * (peopleData.length - 1)) + 1;
    setVictim(peopleData[index - 1]);
    peopleData.splice(index - 1, 1);
    setQuestion(questionsData[0]);

    if (peopleData.length <= 5 && peopleData.length > 0) {
      fetchPeople();
    }
  };

  const handleSkip = () => {
    setClick(0);
    const index = Math.floor(Math.random() * (peopleData.length - 1)) + 1;

    setVictim(peopleData[index - 1]);
    peopleData.splice(index - 1, 1);
    if (peopleData.length <= 5 && peopleData.length > 0) {
      fetchPeople();
    }
  };

  if (loadingPeople || loadingQuestions) {
    return <p>Загрузка...</p>;
  }

  if (errorPeople || errorQuestions) {
    return <p>{errorPeople.message || errorQuestions.message}</p>;
  }

  return (
    <div className="container">
      <h2 className="home-title">
        Кто будет <em>СЛЕДУЮЩИМ?</em>
      </h2>
      {peopleData ? (
        <div className="question-card-wrapper">
          <div className="question-card">
            <VictimAndQuestions
              question={question}
              victim={victim}
              goodAnswer={goodAnswer}
              badAnswer={badAnswer}
              sosoAnswer={sosoAnswer}
              click={click}
            />
            <Buttons handle={handle} victim={victim} handleSkip={handleSkip} />
          </div>
        </div>
      ) : (
        <div>Ошибка :(</div>
      )}
    </div>
  );
};

IndexPage.propTypes = {
  peopleData: PropTypes.array,
  loadingPeople: PropTypes.bool.isRequired,
  errorPeople: PropTypes.object,
  fetchPeople: PropTypes.func.isRequired,
  questionsData: PropTypes.arrayOf(PropTypes.string).isRequired,
  loadingQuestions: PropTypes.bool.isRequired,
  loadedQuestionsData: PropTypes.bool.isRequired,
  errorQuestions: PropTypes.object,
  fetchQuestions: PropTypes.func.isRequired,
  checkAnswer: PropTypes.func.isRequired,
  subject: PropTypes.string.isRequired,
};

IndexPage.defaultProps = {
  errorPeople: null,
  errorQuestions: null,
  peopleData: null,
};

export default IndexPage;
