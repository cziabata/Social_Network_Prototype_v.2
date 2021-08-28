import React from "react";
import { Header } from "./Header";
import { connect } from "react-redux";
import { logout } from "../../redux/authReducer";

class HeaderContainer extends React.Component {
    render() {
        
        return <Header {...this.props}/>
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuth,
        login: state.authReducer.login,
    }
}

export default connect(mapStateToProps, {logout})(HeaderContainer);