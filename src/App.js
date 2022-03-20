import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ModalProvider } from './context/ModalContext';
import ModalRoot from './context/ModalRoot';
import Header from './sharedComponents/Header/HeaderContainer';
import Footer from './sharedComponents/Footer/Footer';
import Index from './pages/IndexPage/IndexPageContainer';
import Answers from './pages/AnswersPage/AnswersPageContainer';
import Marks from './pages/MarksPage/MarksPageContainer';
import store from './redux/store';
import ProtectedRoute from './sharedComponents/protectedRouteContainer';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <ModalProvider>
        <ModalRoot />
        <Header />
        <Switch>
          <ProtectedRoute path="/" exact component={Index} />
          <Route path="/answers" exact component={Answers} />
          <Route path="/marks" exact component={Marks} />
        </Switch>
        <Footer />
      </ModalProvider>
    </BrowserRouter>
  </Provider>
);
export default App;
