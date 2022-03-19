import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ModalProvider } from './context/ModalContext';
import ModalRoot from './context/ModalRoot';
import Header from './sharedComponents/Header/Header';
import Footer from './sharedComponents/Footer/Footer';
import Index from './pages/IndexPage/IndexPage';
import Answers from './pages/AnswersPage/AnswersPage';
import Marks from './pages/MarksPage/MarksPage';

const App = () => (
  <ModalProvider>
    <ModalRoot />
    <Header />
    <Switch>
      <Route path="/" exact component={Index} />
      <Route path="/answers" exact component={Answers} />
      <Route path="/marks" exact component={Marks} />
    </Switch>
    <Footer />
  </ModalProvider>
);
export default App;
