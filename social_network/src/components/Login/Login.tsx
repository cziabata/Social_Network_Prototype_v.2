import React from "react";
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { maxLenghtCreator, required } from "../../common/utils/validators/validators";
import { Input } from "../common/FormControls/FormControls";
import { connect } from "react-redux";
import { login } from "../../redux/authReducer";
import { Redirect } from "react-router-dom";
import classes from "../common/FormControls/FormControls.module.css";
import { AppStateType } from "../../redux/store";

let maxLegth30 = maxLenghtCreator(30);
let LoginForm:React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps>&LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
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
        {captchaUrl && <img src={captchaUrl} alt={"captcha"} />}
        {captchaUrl && <Field placeholder="Enter anti-bot symbols" name="captcha" validate={[required]} component={Input}/>}
        {error && <div className={classes.commonError}>{error}</div>}
        <button type="submit">Submit</button>
    </form>
  }
  
  let LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)

type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}
type MapDispatchPropsType = {
    login: (email:string, password:string, rememberMe:boolean, captcha:string)=>void
}
type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captchaUrl: string 
}
type LoginFormOwnProps = {
    captchaUrl: string | null
}

const Login:React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captchaUrl)
    }
    if(props.isAuth) {
        return <Redirect to="/profile" />
    }
    return (
        <>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </>
    )      
}

let mapStateToProps = (state:AppStateType) => ({
    //@ts-ignore
    isAuth: state.authReducer.isAuth,
    //@ts-ignore
    captchaUrl: state.authReducer.captchaUrl
})

export default connect(mapStateToProps, {login})(Login)