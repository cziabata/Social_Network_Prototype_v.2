import React from "react";
import { connect } from "react-redux";
import { UserProfile } from "./UserProfile";
import { setIsFetching, setUserProfile } from "./../../../../redux/usersReducer";
import * as axios from "axios";
import { withRouter } from "react-router-dom";

class UserProfileContainer extends React.Component {
    componentDidMount() {
        this.props.setIsFetching(true);
        let userId = this.props.match.params.userId;
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId).then( response => {
            this.props.setIsFetching(false);
            this.props.setUserProfile(response.data)
        })
    }
    render() {
        return (
            <>
                <UserProfile userProfile={this.props.userProfile}/>
            </>
        )
    }
}

let mapDispatchToProps = (state) => {
    return {
        isFetching: state.usersReducer.isFetching,
        userProfile: state.usersReducer.userProfile,
    }
}

let WithUrlDataUserProfileContainer = withRouter(UserProfileContainer)

export default connect(mapDispatchToProps, {setIsFetching, setUserProfile})(WithUrlDataUserProfileContainer);