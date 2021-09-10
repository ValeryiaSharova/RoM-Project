import { createAction } from 'redux-actions';
import axios from '../axiosInstanse';

const store = require('store');

export const requestPeople = createAction('PEOPLE/REQUEST_PEOPLE');
export const receivePeople = createAction('PEOPLE/RECEIVE_PEOPLE', people => people);
export const failLoadPeople = createAction('PEOPLE/FAIL_LOAD_PEOPLE', error => error);
export const receiveIndexVictim = createAction('PEOPLE/RECEIVE_PEOPLE_ID', id => id);
export const receiveAnswer = createAction('PEOPLE/RECEIVE_ANSWER');
export const receiveCalcMarks = createAction('PEOPLE/RECEIVE_CALC_MARKS');

export const fetchPeople = () => async dispatch => {
  dispatch(requestPeople());
  try {
    const { data: people } = await axios.get('/people.json');
    const newList = [];
    people.map((stud, index) => {
      const marks = store.get('test');
      if (marks[stud].all < 5) {
        newList.push(people[index]);
      }
      return newList;
    });
    dispatch(receivePeople(newList));
  } catch (error) {
    dispatch(failLoadPeople(error));
  }
};

export const getVictim = () => async dispatch => {
  const { data: people } = await axios.get('/people.json');
  const index = Math.floor(Math.random() * (people.length - 1)) + 1;
  dispatch(receiveIndexVictim(index));
};

export const getAnswer = () => async dispatch => {
  const { data: people } = await axios.get('/people.json');
  const answerTemp = people.map(current => {
    const temp = {};
    temp[current] = { all: 0, mark: 0 };
    return { ...temp };
  });
  const answer = answerTemp.reduce((res, item) => {
    const key = Object.keys(item)[0];
    res[key] = item[key];
    return res;
  });
  store.set('test', answer);
  dispatch(receiveAnswer());
};

export const calcMarks = dispatch => {
  const answers = store.get('test');
  const marks = {};
  Object.keys(answers).map(person => {
    switch (answers[person].all - answers[person].mark) {
      case 0:
        marks[person] = 9;
        break;
      case 1:
        marks[person] = 8;
        break;
      case 2:
        marks[person] = 7;
        break;
      case 3:
        marks[person] = 6;
        break;
      case 4:
        marks[person] = 5;
        break;
      default:
        marks[person] = 0;
        break;
    }

    return marks;
  });
  store.set('marks', marks);
  dispatch(receiveCalcMarks());
};
