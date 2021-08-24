import React from "react";
import { Field, reduxForm } from 'redux-form';

let LoginForm = props => {
    const { handleSubmit } = props
    return <form onSubmit={handleSubmit}>
        <div>
            <Field  placeholder="Login" name="login" component="input" />
        </div>
        <div>
            <Field placeholder="password" name="password" component="input" />
        </div>
        <div>
            <Field name="rememberMe" component="input" type="checkbox" />
        </div>
        <button type="submit">Submit</button>
    </form>
  }
  
  let LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

export const Login = () => {
    const onSubmit = (formData) => {
        console.log(formData)
    }
    return (
        <>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </>
    )      
}