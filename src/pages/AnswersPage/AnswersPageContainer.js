import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Answers from './AnswersPage';
import * as actionsPeople from '../../redux/actions/peopleAction';

const mapStateToProps = state => ({
  answerData: state.people.answerData,
  loadingGetSaveDataAnswer: state.people.loadingGetSaveDataAnswer,
  isAdmin: state.user.isAdmin,
});

const mapDispatchToProps = dispatch => {
  const { saveDataAnswer, getSaveDataAnswer, checkAnswer } = bindActionCreators(
    actionsPeople,
    dispatch
  );

  return {
    saveDataAnswer,
    getSaveDataAnswer,
    checkAnswer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Answers);
