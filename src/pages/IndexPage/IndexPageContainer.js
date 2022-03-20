import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Index from './IndexPage';
import * as actionsPeople from '../../redux/actions/peopleAction';
import * as actionsQuestions from '../../redux/actions/questionAction';

const mapStateToProps = state => ({
  peopleData: state.people.peopleData,
  loadingPeople: state.people.loading,
  errorPeople: state.people.error,
  answerData: state.people.answerData,
  questionsData: state.questions.questionsData,
  loadingQuestions: state.questions.loading,
  loadedQuestionsData: state.questions.loadedData,
  errorQuestions: state.questions.error,
  subject: state.user.subject,
});

const mapDispatchToProps = dispatch => {
  const { fetchPeople, checkAnswer, getSaveDataAnswer } = bindActionCreators(
    actionsPeople,
    dispatch
  );
  const { fetchQuestions } = bindActionCreators(actionsQuestions, dispatch);

  return {
    fetchPeople,
    fetchQuestions,
    checkAnswer,
    getSaveDataAnswer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
