import { createAction } from 'redux-actions';
import axios from '../axiosInstanse';

const store = require('store');

export const deleteMarks = createAction('PEOPLE/DELETE_MARKS');
export const receiveCalcMarks = createAction('PEOPLE/RECEIVE_CALC_MARKS', marks => marks);
export const receiveResetMarks = createAction('PEOPLE/RESET_MARKS');
export const requestSavePeople = createAction('PEOPLE/REQUEST_SAVE_PEOPLE');
export const requestGetSavePeople = createAction('PEOPLE/REQUEST_GET_SAVE_PEOPLE');

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

export const saveMarks = () => async dispatch => {
  try {
    await axios.put('https://api.jsonbin.io/b/619967eb62ed886f91522914', store.get('test'), {
      headers: {
        'Content-Type': 'application/json',
        'secret-key': '$2b$10$DmD.XOZCf7sWxoFopdcxsOVq4D6GVx7hj2PzYZ04pzp/bV1JziGTK',
      },
    });
    dispatch(requestSavePeople());
  } catch (error) {
    console.log(error);
  }
};

export const getSaveMarks = () => async dispatch => {
  try {
    const { data: marks } = await axios.get(
      'https://api.jsonbin.io/b/619967eb62ed886f91522914/latest',
      {
        headers: {
          'Content-Type': 'application/json',
          'secret-key': '$2b$10$DmD.XOZCf7sWxoFopdcxsOVq4D6GVx7hj2PzYZ04pzp/bV1JziGTK',
        },
      }
    );
    store.set('test', marks);
    dispatch(requestGetSavePeople());
  } catch (error) {
    console.log(error);
  }
};
