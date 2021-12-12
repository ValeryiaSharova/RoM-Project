import { connect } from 'react-redux';
import Header from './Header';

const mapStateToProps = state => ({
  isMarks: state.people.isMarks,
});

export default connect(mapStateToProps)(Header);
