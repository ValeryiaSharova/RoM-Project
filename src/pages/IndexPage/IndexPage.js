import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VictimAndQuestions from './Components/Victim&Questions';
import Buttons from './Components/Buttons';
import {
  deleteQuestion,
  fetchQuestions,
  getErrorQuestions,
  getLoadedQuestionsData,
  getLoadingQuestions,
  getQuestionsData,
} from '../../redux/questions';
import {
  checkAnswer,
  fetchPeople,
  getAnswerData,
  getErrorPeople,
  getLoadingPeople,
  getPeopleData,
  getStartAnswerData,
} from '../../redux/people';

const store = require('store');

const IndexPage = () => {
  const dispatch = useDispatch();
  const loadedQuestionsData = useSelector(getLoadedQuestionsData());
  const questionsData = useSelector(getQuestionsData());
  const loadingQuestions = useSelector(getLoadingQuestions());
  const errorQuestions = useSelector(getErrorQuestions());
  const answerData = useSelector(getAnswerData());
  const peopleData = useSelector(getPeopleData());
  const loadingPeople = useSelector(getLoadingPeople());
  const errorPeople = useSelector(getErrorPeople());

  useEffect(() => {
    if (!loadedQuestionsData) {
      dispatch(fetchQuestions());
    }
    if (!store.get('test') || !answerData) {
      dispatch(getStartAnswerData());
    }
    if (!peopleData) {
      dispatch(fetchPeople());
    }
    dispatch(checkAnswer());
  }, []);

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

  useEffect(() => {
    if (question !== '') {
      const newData = [...questionsData.filter((q, index) => index !== 0)];
      console.log(newData);
      dispatch(deleteQuestion(newData));
    }
  }, [victim]);

  const handle = () => {
    setClick(0);
    const index = Math.floor(Math.random() * (peopleData.length - 1)) + 1;
    setVictim(peopleData[index - 1]);
    peopleData.splice(index - 1, 1);
    setQuestion(questionsData[0]);
    // dispatch(deleteQuestion());
    // questionsData.splice(0, 1);
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

export default IndexPage;
