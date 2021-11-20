import { createAction } from 'redux-actions';
import axios from '../axiosInstanse';

const store = require('store');

export const requestPeople = createAction('PEOPLE/REQUEST_PEOPLE');
export const receivePeople = createAction('PEOPLE/RECEIVE_PEOPLE', people => people);
export const failLoadPeople = createAction('PEOPLE/FAIL_LOAD_PEOPLE', error => error);
export const receiveIndexVictim = createAction('PEOPLE/RECEIVE_PEOPLE_ID', id => id);
export const receiveAnswer = createAction('PEOPLE/RECEIVE_ANSWER');
export const receiveCalcMarks = createAction('PEOPLE/RECEIVE_CALC_MARKS', marks => marks);
export const deleteMarks = createAction('PEOPLE/DELETE_MARKS');
export const receiveResetMarks = createAction('PEOPLE/RESET_MARKS');

export const fetchPeople = () => async dispatch => {
  dispatch(requestPeople());
  try {
    const { data: people } = await axios.get(
      'https://api.jsonbin.io/b/61994f880ddbee6f8b0f54d8/latest'
    );
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
  const { data: people } = await axios.get(
    'https://api.jsonbin.io/b/61994f880ddbee6f8b0f54d8/latest'
  );
  const index = Math.floor(Math.random() * (people.length - 1)) + 1;
  dispatch(receiveIndexVictim(index));
};

export const getAnswer = () => async dispatch => {
  const { data: people } = await axios.get(
    'https://api.jsonbin.io/b/61994f880ddbee6f8b0f54d8/latest'
  );
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

export const calcMarks = () => dispatch => {
  const answers = store.get('test');
  const marks = {};
  Object.keys(answers).map(person => {
    if (answers[person].all === 5) {
      switch (answers[person].mark) {
        case 5:
          marks[person] = 10;
          break;
        case 4:
          marks[person] = 9;
          break;
        case 3:
          marks[person] = 8;
          break;
        case 2:
          marks[person] = 7;
          break;
        case 1:
          marks[person] = 6;
          break;
        case 0:
          marks[person] = 5;
          break;
        case -1:
          marks[person] = 4;
          break;
        case -2:
          marks[person] = 3;
          break;
        case -3:
          marks[person] = 2;
          break;
        case -4:
          marks[person] = 1;
          break;
        default:
          marks[person] = 0;
          break;
      }
    }
    return marks;
  });
  dispatch(receiveCalcMarks(Object.keys(marks).length ? marks : null));
};

export const resetMarks = () => dispatch => {
  const answers = store.get('test');
  Object.keys(answers).forEach(person => {
    if (answers[person].all === 5) {
      answers[person].all = 0;
      answers[person].mark = 0;
    }
  });
  store.set('test', answers);
  dispatch(receiveResetMarks());
};
