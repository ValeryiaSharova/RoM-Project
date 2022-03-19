/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const store = require('store');

const peopleSlice = createSlice({
  name: 'people',
  initialState: {
    loading: false,
    error: null,
    peopleData: null,
    loadingGetSaveDataAnswer: false,
    loadingStartAnswerData: false,
    errorStartAnswerData: null,
    marks: null,
    answerData: null,
    isSaveDataAnswer: false,
    errorSaveDataAnswer: null,
    isMarks: false,
  },
  reducers: {
    requestPeople: state => {
      state.loading = true;
    },
    receivePeople: (state, action) => {
      state.peopleData = action.payload;
      state.loading = false;
    },
    failLoadPeople: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    requestStartAnswerData: state => {
      state.loadingStartAnswerData = true;
    },
    receiveStartAnswerData: (state, action) => {
      state.answerData = action.payload;
      state.loadingStartAnswerData = false;
    },
    failStartAnswerData: (state, action) => {
      state.errorStartAnswerData = action.payload;
    },
    receiveCalcMarks: (state, action) => {
      state.marks = action.payload;
    },
    receiveResetMarks: (state, action) => {
      state.marks = null;
      state.answerData = action.payload;
      state.peopleData = null;
      state.isMarks = false;
    },
    receiveSaveDataAnswer: state => {
      state.isSaveDataAnswer = true;
    },
    failSaveDataAnswer: (state, action) => {
      state.errorSaveDataAnswer = action.payload;
    },
    requestGetSaveDataAnswer: state => {
      state.loadingGetSaveDataAnswer = true;
    },
    receiveGetSaveDataAnswer: (state, action) => {
      state.answerData = action.payload;
      state.loadingGetSaveDataAnswer = false;
      state.peopleData = null;
    },
    receiveCheckAnswer: (state, action) => {
      state.answerData = action.payload.answerData;
      state.isMarks = action.payload.isMarks;
    },
    failGetSaveDataAnswer: (state, action) => {
      state.errorSaveDataAnswer = action.payload;
    },
    deleteMarks: state => {
      state.marks = null;
    },
  },
});

const { actions, reducer: peopleReducer } = peopleSlice;
const {
  failGetSaveDataAnswer,
  failLoadPeople,
  failSaveDataAnswer,
  failStartAnswerData,
  receiveCalcMarks,
  receiveCheckAnswer,
  receiveGetSaveDataAnswer,
  receivePeople,
  receiveResetMarks,
  receiveSaveDataAnswer,
  receiveStartAnswerData,
  requestGetSaveDataAnswer,
  requestPeople,
  requestStartAnswerData,
} = actions;

export const { deleteMarks } = actions;

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
  const isMarks = Object.keys(answers).some(person => answers[person].all === 5);
  dispatch(receiveCheckAnswer(answers, isMarks));
};

export const getIsMarks = () => state => state.people.isMarks;
export const getMarks = () => state => state.people.marks;
export const getAnswerData = () => state => state.people.answerData;
export const getPeopleData = () => state => state.people.peopleData;
export const getLoadingPeople = () => state => state.people.loading;
export const getErrorPeople = () => state => state.people.error;

export default peopleReducer;
