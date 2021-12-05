import { createAction } from 'redux-actions';
import axios from '../axiosInstanse';

const store = require('store');

export const requestPeople = createAction('PEOPLE/REQUEST_PEOPLE');
export const receivePeople = createAction('PEOPLE/RECEIVE_PEOPLE', people => people);
export const failLoadPeople = createAction('PEOPLE/FAIL_LOAD_PEOPLE', error => error);
export const requestStartAnswerData = createAction('MARKS/REQUEST_START_ANSWER_DATA');
export const receiveStartAnswerData = createAction(
  'MARKS/RECEIVE_START_ANSWER_DATA',
  answerData => answerData
);
export const failStartAnswerData = createAction('MARKS/FAIL_START_ANSWER_DATA', error => error);
export const deleteMarks = createAction('MARKS/DELETE_MARKS');
export const receiveCalcMarks = createAction('MARKS/RECEIVE_CALC_MARKS', marks => marks);
export const receiveResetMarks = createAction(
  'MARKS/RECEIVE_RESET_MARKS',
  answerData => answerData
);
export const receiveSaveDataAnswer = createAction('MARKS/RECEIVE_SAVE_DATA_ANSWER');
export const failSaveDataAnswer = createAction('MARKS/FAIL_SAVE_DATA_ANSWER', error => error);
export const requestGetSaveDataAnswer = createAction('MARKS/REQUEST_GET_SAVE_DATA_ANSWER');
export const receiveGetSaveDataAnswer = createAction(
  'MARKS/RECEIVE_GET_SAVE_DATA_ANSWER',
  answerData => answerData
);
export const failGetSaveDataAnswer = createAction(
  'MARKS/FAIL_GET_SAVE_DATA_ANSWER',
  error => error
);
export const receiveCheckAnswer = createAction(
  'MARKS/RECEIVE_CHECK_ANSWER',
  answerData => answerData
);

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

export const getSaveDataAnswer = () => async dispatch => {
  dispatch(requestGetSaveDataAnswer());
  try {
    const { data: answerData } = await axios.get(
      'https://api.jsonbin.io/b/619967eb62ed886f91522914/latest',
      {
        headers: {
          'Content-Type': 'application/json',
          'secret-key': '$2b$10$DmD.XOZCf7sWxoFopdcxsOVq4D6GVx7hj2PzYZ04pzp/bV1JziGTK',
        },
      }
    );
    store.set('test', answerData);
    dispatch(receiveGetSaveDataAnswer(answerData));
  } catch (error) {
    dispatch(failGetSaveDataAnswer(error));
  }
};

export const getStartAnswerData = () => async dispatch => {
  if (!store.get('test')) {
    dispatch(requestStartAnswerData());
    try {
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
      dispatch(receiveStartAnswerData(answer));
    } catch (error) {
      dispatch(failStartAnswerData(error));
    }
  } else {
    dispatch(receiveStartAnswerData(store.get('test')));
  }
};

export const calcMarks = () => dispatch => {
  const answers = store.get('test');
  const marks = {};
  if (!answers) {
    return;
  }
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
  dispatch(receiveResetMarks(answers));
};

export const saveDataAnswer = () => async dispatch => {
  try {
    await axios.put('https://api.jsonbin.io/b/619967eb62ed886f91522914', store.get('test'), {
      headers: {
        'Content-Type': 'application/json',
        'secret-key': '$2b$10$DmD.XOZCf7sWxoFopdcxsOVq4D6GVx7hj2PzYZ04pzp/bV1JziGTK',
      },
    });
    dispatch(receiveSaveDataAnswer());
  } catch (error) {
    dispatch(failSaveDataAnswer(error));
  }
};

export const checkAnswer = (num, victim) => dispatch => {
  const answers = store.get('test');
  switch (num) {
    case 1:
      answers[victim].mark += 1;
      answers[victim].all += 1;
      store.set('test', { ...answers });
      break;
    case 2:
      answers[victim].all += 1;
      store.set('test', { ...answers });
      break;
    case 3:
      answers[victim].mark -= 1;
      answers[victim].all += 1;
      store.set('test', { ...answers });
      break;
    default:
  }
  dispatch(receiveCheckAnswer(answers));
};
