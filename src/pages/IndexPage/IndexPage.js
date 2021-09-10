import React, { useState, useEffect } from 'react';
import PropTypes from 'proptypes';
import VictimAndQuestions from './Components/Victim&Questions';
import Buttons from './Components/Buttons';

const store = require('store');

const IndexPage = props => {
  const {
    peopleData,
    loadingPeople,
    loadedPeopleData,
    errorPeople,
    fetchPeople,
    questionsData,
    loadingQuestions,
    loadedQuestionsData,
    errorQuestions,
    fetchQuestions,
    getAnswer,
  } = props;

  useEffect(() => {
    if (!loadedQuestionsData) {
      fetchQuestions();
    }
    if (!store.get('test')) {
      getAnswer();
    }
    if (!loadedPeopleData) {
      fetchPeople();
    }
  }, [fetchPeople, loadedPeopleData, fetchQuestions, loadedQuestionsData, getAnswer, peopleData]);

  const [victim, setVictim] = useState('');
  const [question, setQuestion] = useState('');
  const [click, setClick] = useState(0);

  const goodAnswer = () => {
    const marks = store.get('test');
    marks[victim].mark += 1;
    marks[victim].all += 1;
    store.set('test', { ...marks });
    setClick(1);
  };

  const sosoAnswer = () => {
    const marks = store.get('test');
    marks[victim].all += 1;
    store.set('test', { ...marks });
    setClick(1);
  };

  const badAnswer = () => {
    const marks = store.get('test');
    marks[victim].mark -= 1;
    marks[victim].all += 1;
    store.set('test', { ...marks });
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
            {peopleData.length ? (
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
  peopleData: PropTypes.arrayOf(PropTypes.string).isRequired,
  loadingPeople: PropTypes.bool.isRequired,
  loadedPeopleData: PropTypes.bool.isRequired,
  errorPeople: PropTypes.object,
  fetchPeople: PropTypes.func.isRequired,
  questionsData: PropTypes.arrayOf(PropTypes.string).isRequired,
  loadingQuestions: PropTypes.bool.isRequired,
  loadedQuestionsData: PropTypes.bool.isRequired,
  errorQuestions: PropTypes.object,
  fetchQuestions: PropTypes.func.isRequired,
  getAnswer: PropTypes.func.isRequired,
};

IndexPage.defaultProps = {
  errorPeople: null,
  errorQuestions: null,
};

export default IndexPage;
