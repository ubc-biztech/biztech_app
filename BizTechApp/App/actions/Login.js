// Actions for logging in.
import Auth from '@aws-amplify/auth';
import { ATTEMPT, SUCCESS, FAILED } from '../constants/Consts'

export function isLoading()  {
    return {
        type: ATTEMPT,
    }
}

export function loginSuccess(user) {
    return {
        type: SUCCESS,
        user
    }
}

export function loginFailed(err) {
    return {
        type: FAILED,
        err
    }
}

export function doLogin(values) {
    return (dispatch) => {
        dispatch(isLoading());
        const { email, pass } = values;
        return Auth.signIn(email, pass)
            .then((user) => {
                dispatch(loginSuccess(user));
                console.log('login success');
                console.log(user);
            }).catch(err => {
                console.log("login error");
                console.log(err);
                dispatch(loginFailed(err));
            })
    }
}