import React from "react";
import { connect } from "react-redux";
import { UserProfile } from "./UserProfile";
import { chooseUserProfile } from "./../../../../redux/usersReducer";
import { withRouter } from "react-router-dom";

class UserProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        this.props.chooseUserProfile(userId)
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

export default connect(mapDispatchToProps, {chooseUserProfile})(WithUrlDataUserProfileContainer);