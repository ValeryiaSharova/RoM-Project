import { connect } from 'react-redux';
import ProtectedRoute from './protectedRoute';

const mapStateToProps = state => ({
  isAdmin: state.user.isAdmin,
});

export default connect(mapStateToProps)(ProtectedRoute);
