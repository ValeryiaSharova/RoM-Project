import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Answers from './AnswersPage';
import * as actionsPeople from '../../redux/actions/peopleAction';
import * as actionsMarks from '../../redux/actions/markAction';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => {
  const { getAnswer } = bindActionCreators(actionsPeople, dispatch);
  const { saveMarks, getSaveMarks } = bindActionCreators(actionsMarks, dispatch);

  return {
    getAnswer,
    saveMarks,
    getSaveMarks,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Answers);
