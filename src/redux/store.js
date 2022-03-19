import { configureStore, combineReducers } from '@reduxjs/toolkit';
import peopleReducer from './people';
import questionsReducer from './questions';

const rootReducer = combineReducers({
  people: peopleReducer,
  questions: questionsReducer,
});

function createStore() {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
  });
}

export default createStore;
