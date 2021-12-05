import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Answers from './AnswersPage';
import * as actionsPeople from '../../redux/actions/peopleAction';

const mapStateToProps = state => ({
  answerData: state.people.answerData,
  isSaveDataAnswer: state.people.isSaveDataAnswer,
  errorSaveDataAnswer: state.people.errorSaveDataAnswer,
  loadingGetSaveDataAnswer: state.people.loadingGetSaveDataAnswer,
});

const mapDispatchToProps = dispatch => {
  const { getStartAnswerData, saveDataAnswer, getSaveDataAnswer } = bindActionCreators(
    actionsPeople,
    dispatch
  );

  return {
    getStartAnswerData,
    saveDataAnswer,
    getSaveDataAnswer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Answers);
