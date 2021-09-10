import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Index from './IndexPage';
import * as actionsPeople from '../../redux/actions/peopleAction';
import * as actionsQuestions from '../../redux/actions/questionAction';

const mapStateToProps = state => ({
  peopleData: state.people.peopleData,
  loadingPeople: state.people.loading,
  loadedPeopleData: state.people.loadedData,
  errorPeople: state.people.error,
  questionsData: state.questions.questionsData,
  loadingQuestions: state.questions.loading,
  loadedQuestionsData: state.questions.loadedData,
  errorQuestions: state.questions.error,
});

const mapDispatchToProps = dispatch => {
  const { fetchPeople, getVictim, getMark, getAnswer } = bindActionCreators(
    actionsPeople,
    dispatch
  );
  const { fetchQuestions } = bindActionCreators(actionsQuestions, dispatch);

  return {
    fetchPeople,
    getVictim,
    fetchQuestions,
    getMark,
    getAnswer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
