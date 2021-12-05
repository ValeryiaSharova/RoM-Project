import React, { useState, useEffect } from 'react';
import PropTypes from 'proptypes';
import VictimAndQuestions from './Components/Victim&Questions';
import Buttons from './Components/Buttons';

const store = require('store');

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
    getStartAnswerData,
    answerData,
    checkAnswer,
  } = props;

  useEffect(() => {
    if (!loadedQuestionsData) {
      fetchQuestions();
    }
    if (!store.get('test') || !answerData) {
      getStartAnswerData();
    }
    if (!peopleData) {
      fetchPeople();
    }
  }, [
    fetchPeople,
    fetchQuestions,
    loadedQuestionsData,
    getStartAnswerData,
    peopleData,
    answerData,
  ]);

  const [victim, setVictim] = useState('');
  const [question, setQuestion] = useState('');
  const [click, setClick] = useState(0);

  const goodAnswer = () => {
    checkAnswer(1, victim);
    setClick(1);
  };

  const sosoAnswer = () => {
    checkAnswer(2, victim);
    setClick(1);
  };

  const badAnswer = () => {
    checkAnswer(3, victim);
    setClick(1);
  };

  const handle = () => {
    setClick(0);
    const index = Math.floor(Math.random() * (peopleData.length - 1)) + 1;
    setVictim(peopleData[index - 1]);
    peopleData.splice(index - 1, 1);
    setQuestion(questionsData[0]);
    questionsData.splice(0, 1);
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
    return <p>loading...</p>;
  }

  if (errorPeople || errorQuestions) {
    return <p>{errorPeople.message || errorQuestions.message}</p>;
  }

  return (
    <div id="container">
      <div className="left-image-decor" />

      <div className="right-image-decor" />
      <section className="section" id="testimonials">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="center-heading">
                <h2>
                  Who is <em>NEXT?</em>
                </h2>
              </div>
            </div>
            {peopleData ? (
              <div className="item service-item">
                <div className="testimonial-content">
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
              <div className="item service-item">
                <div className="testimonials-nopeople">Nonononono</div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

IndexPage.propTypes = {
  peopleData: PropTypes.object.isRequired,
  loadingPeople: PropTypes.bool.isRequired,
  errorPeople: PropTypes.object,
  fetchPeople: PropTypes.func.isRequired,
  answerData: PropTypes.object.isRequired,
  questionsData: PropTypes.arrayOf(PropTypes.string).isRequired,
  loadingQuestions: PropTypes.bool.isRequired,
  loadedQuestionsData: PropTypes.bool.isRequired,
  errorQuestions: PropTypes.object,
  fetchQuestions: PropTypes.func.isRequired,
  getStartAnswerData: PropTypes.func.isRequired,
  checkAnswer: PropTypes.func.isRequired,
};

IndexPage.defaultProps = {
  errorPeople: null,
  errorQuestions: null,
};

export default IndexPage;
