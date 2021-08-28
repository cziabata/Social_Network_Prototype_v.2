import React from "react";
import { Field, reduxForm } from 'redux-form';
import { maxLenghtCreator, required } from "../../common/utils/validators/validators";
import { Input } from "../common/FormControls/FormControls";
import { connect } from "react-redux";
import { login } from "../../redux/authReducer";
import { Redirect } from "react-router-dom";
import classes from "../common/FormControls/FormControls.module.css";

let maxLegth30 = maxLenghtCreator(30);
let LoginForm = props => {
    const { handleSubmit } = props
    return <form onSubmit={handleSubmit}>
        <div>
            <Field  placeholder="Email" name="email" validate={[required, maxLegth30]} component={Input} />
        </div>
        <div>
            <Field placeholder="password" name="password" validate={[required, maxLegth30]} component={Input} />
        </div>
        <div>
            <Field name="rememberMe" component="input" type="checkbox" />
        </div>
        {props.error && <div className={classes.commonError}>{props.error}</div>}
        <button type="submit">Submit</button>
    </form>
  }
  
  let LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if(props.isAuth) {
        return <Redirect to="/profile" />
    }
    return (
        <>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </>
    )      
}

let mapStateToProps = (state) => ({
    isAuth: state.authReducer.isAuth
})

export default connect(mapStateToProps, {login})(Login)