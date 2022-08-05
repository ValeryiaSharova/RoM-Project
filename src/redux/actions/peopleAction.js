import { createAction } from 'redux-actions';
import axios from '../axiosInstanse';

const store = require('store');

export const requestPeople = createAction('PEOPLE/REQUEST_PEOPLE');
export const receivePeople = createAction('PEOPLE/RECEIVE_PEOPLE', people => people);
export const failLoadPeople = createAction('PEOPLE/FAIL_LOAD_PEOPLE', error => error);
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
  (answerData, isMarks) => ({ answerData, isMarks })
);

export const fetchPeople = () => async dispatch => {
  dispatch(requestPeople());
  try {
    const { data: people } = await axios.get(`${process.env.REACT_APP_LIST_OF_STUDENTS}/latest`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': `$2b$10$DmD${process.env.REACT_APP_SECRET_KEY}`,
        'X-Bin-Meta': false,
      },
    });
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

export const getSaveDataAnswer = subject => async dispatch => {
  dispatch(requestGetSaveDataAnswer());
  if (subject === 'ИПО') {
    try {
      const { data: answerData } = await axios.get(`${process.env.REACT_APP_ANSWERS_IPO}/latest`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': `$2b$10$DmD${process.env.REACT_APP_SECRET_KEY}`,
          'X-Bin-Meta': false,
        },
      });
      store.set('test', answerData);
      dispatch(receiveGetSaveDataAnswer(answerData));
    } catch (error) {
      dispatch(failGetSaveDataAnswer(error));
    }
  } else {
    try {
      const { data: answerData } = await axios.get(`${process.env.REACT_APP_ANSWERS_OAIP}/latest`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': `$2b$10$DmD${process.env.REACT_APP_SECRET_KEY}`,
          'X-Bin-Meta': false,
        },
      });
      store.set('test', answerData);
      dispatch(receiveGetSaveDataAnswer(answerData));
    } catch (error) {
      dispatch(failGetSaveDataAnswer(error));
    }
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

export const saveDataAnswer = subject => async dispatch => {
  if (subject === 'ИПО') {
    try {
      await axios.put(process.env.REACT_APP_ANSWERS_IPO, store.get('test'), {
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': `$2b$10$DmD${process.env.REACT_APP_SECRET_KEY}`,
          'X-Bin-Meta': false,
        },
      });
      dispatch(receiveSaveDataAnswer());
    } catch (error) {
      dispatch(failSaveDataAnswer(error));
    }
  } else {
    try {
      await axios.put(process.env.REACT_APP_ANSWERS_OAIP, store.get('test'), {
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': `$2b$10$DmD${process.env.REACT_APP_SECRET_KEY}`,
          'X-Bin-Meta': false,
        },
      });
      dispatch(receiveSaveDataAnswer());
    } catch (error) {
      dispatch(failSaveDataAnswer(error));
    }
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
  const isMarks = Object.keys(answers).some(person => answers[person].all === 5);
  dispatch(receiveCheckAnswer(answers, isMarks));
};
