import { connect } from 'react-redux';
import Header from './Header';

const mapStateToProps = state => ({
  isMarks: state.people.isMarks,
  isAdmin: state.user.isAdmin,
  subject: state.user.subject,
});

export default connect(mapStateToProps)(Header);
