// Actions for logging in.
import Auth from '@aws-amplify/auth';
import { loginConsts } from '../constants/consts.js';

export function isLoading()  {
    return {
        type: loginConsts.ATTEMPT,
    }
}

export function loginSuccess(user) {
    return {
        type: loginConst.SUCCESS,
        user
    }
}

export function loginFailed(err) {
    return {
        type: LOGIN_FAILED,
        err
    }
}

export function doLogin(values) {
    return dispatch => {
        dispatch(isLoading());
        const { email, pass } = values;
        return Auth.signIn(email, pass)
            .then((user) => {
                dispatch(loginSuccess(user));
                console.log('login success');
            }).catch(err => {
                console.log(err);
                dispatch(loginFailed(err));
            })
    }
}