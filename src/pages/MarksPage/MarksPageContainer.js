import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Marks from './MarksPage';
import * as marksActions from '../../redux/actions/markAction';

const mapStateToProps = state => ({
  marks: state.marks.marks,
});

const mapDispatchToProps = dispatch => {
  const { calcMarks, deleteMarks, resetMarks } = bindActionCreators(marksActions, dispatch);

  return {
    calcMarks,
    deleteMarks,
    resetMarks,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Marks);
