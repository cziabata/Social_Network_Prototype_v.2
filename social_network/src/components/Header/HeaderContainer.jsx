import React from "react";
import { Header } from "./Header";
import { connect } from "react-redux";
import { setAuthData } from "../../redux/authReducer";
import * as axios from "axios";

class HeaderContainer extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true,
        }).then(response => {
            let {email, id, login} = response.data.data;
            if(response.data.resultCode === 0) {
                this.props.setAuthData(email, id, login);
            }
        })
    }
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

export default connect(mapStateToProps, {setAuthData})(HeaderContainer);