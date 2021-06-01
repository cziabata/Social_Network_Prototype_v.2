import { connect } from "react-redux";
import { followAC, setUsersAC, unfollowAC } from "../../../redux/usersReducer";
import { Users } from "./Users";

let mapStateToProps = (state) => {
    return {
        users: state.usersReducer.users,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (id) => {dispatch(followAC(id))},
        unfollow: (id) => {dispatch(unfollowAC(id))},
        setUsers: (users) => {dispatch(setUsersAC(users))}
    }
}

export const UsersComtainer = connect(mapStateToProps, mapDispatchToProps)(Users)