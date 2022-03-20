import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Marks from './MarksPage';
import * as actionsPeople from '../../redux/actions/peopleAction';

const mapStateToProps = state => ({
  marks: state.people.marks,
  answerData: state.people.answerData,
  isAdmin: state.user.isAdmin,
});

const mapDispatchToProps = dispatch => {
  const { calcMarks, resetMarks } = bindActionCreators(actionsPeople, dispatch);

  return {
    calcMarks,
    resetMarks,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Marks);
