/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    loadedData: false,
    loading: false,
    error: null,
    questionsData: [],
  },
  reducers: {
    requestQuestions: state => {
      state.loading = true;
    },
    receiveQuestions: (state, actions) => {
      state.questionsData = actions.payload;
      state.loading = false;
      state.loadedData = true;
    },
    failLoadQuestions: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteQuestion: (state, action) => {
      console.log(action.payload);
      state.questionsData = action.payload;
    },
  },
});

const { actions, reducer: questionsReducer } = questionsSlice;
const { failLoadQuestions, receiveQuestions, requestQuestions } = actions;
export const { deleteQuestion } = actions;

export const fetchQuestions = () => async dispatch => {
  dispatch(requestQuestions());
  try {
    const { data: questions } = await axios.get(
      'https://api.jsonbin.io/b/61994fb462ed886f91521e9e/latest'
    );
    dispatch(receiveQuestions(questions));
  } catch (error) {
    dispatch(failLoadQuestions(error));
  }
};

export const getLoadedQuestionsData = () => state => state.questions.loadedData;
export const getQuestionsData = () => state => state.questions.questionsData;
export const getLoadingQuestions = () => state => state.questions.loading;
export const getErrorQuestions = () => state => state.questions.error;

export default questionsReducer;
