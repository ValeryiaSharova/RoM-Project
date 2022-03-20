import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './Header';
import * as actionsUser from '../../redux/actions/userAction';
import * as actionsPeople from '../../redux/actions/peopleAction';
import * as actionsQuestions from '../../redux/actions/questionAction';

const mapStateToProps = state => ({
  isMarks: state.people.isMarks,
  isAdmin: state.user.isAdmin,
  subject: state.user.subject,
});

const mapDispatchToProps = dispatch => {
  const { swapSubject, changeStatus } = bindActionCreators(actionsUser, dispatch);
  const { getSaveDataAnswer, checkAnswer } = bindActionCreators(actionsPeople, dispatch);
  const { fetchQuestions } = bindActionCreators(actionsQuestions, dispatch);

  return {
    swapSubject,
    changeStatus,
    getSaveDataAnswer,
    fetchQuestions,
    checkAnswer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
