import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Answers from './AnswersPage';
import * as actionsPeople from '../../redux/actions/peopleAction';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => {
  const { getMark } = bindActionCreators(actionsPeople, dispatch);

  return {
    getMark,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Answers);
