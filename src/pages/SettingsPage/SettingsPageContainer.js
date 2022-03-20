import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SettingsPage from './SettingsPage';
import * as actionsUser from '../../redux/actions/userAction';
import * as actionsPeople from '../../redux/actions/peopleAction';
import * as actionsQuestions from '../../redux/actions/questionAction';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => {
  const { swapSubject, changeStatus } = bindActionCreators(actionsUser, dispatch);
  const { getSaveDataAnswer } = bindActionCreators(actionsPeople, dispatch);
  const { fetchQuestions } = bindActionCreators(actionsQuestions, dispatch);

  return {
    swapSubject,
    changeStatus,
    getSaveDataAnswer,
    fetchQuestions,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
