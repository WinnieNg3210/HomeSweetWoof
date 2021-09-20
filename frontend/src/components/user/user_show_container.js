import { connect } from "react-redux";
import { fetchUser, fetchUsers } from "../../actions/user_actions";
import UserShow from "./user_show";


const mSTP = (state, ownProps) => {
    return {
        user: state.entities.users,
        ownProps
    }
};

const mDTP = dispatch => {
    return {
        fetchUser: id => dispatch(fetchUser(id)),
    }
};


export default connect(mSTP, mDTP)(UserShow);