import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Marks from './MarksPage';
import * as actionsPeople from '../../redux/actions/peopleAction';

const mapStateToProps = state => ({
  marks: state.people.marks,
});

const mapDispatchToProps = dispatch => {
  const { calcMarks, deleteMarks, resetMarks } = bindActionCreators(actionsPeople, dispatch);

  return {
    calcMarks,
    deleteMarks,
    resetMarks,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Marks);
