// Actions for logging in.
import Auth from '@aws-amplify/auth';
import { ATTEMPT, SUCCESS, FAILED } from '../constants/Consts'
import { AMAZON_API } from 'react-native-dotenv';

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
                let id = (user.signInUserSession.idToken.payload.nickname);
                fetch(AMAZON_API+'/users/get?id='+id)
            	      .then((response) => response.json())
            	      .then((response) => {
                      dispatch(loginSuccess(response));
                      console.log('login success');
                      console.log(response);
            	      })

                // console.log(user.signInUserSession.idToken.payload);
            }).catch(err => {
                console.log("login error");
                console.log(err);
                dispatch(loginFailed(err));
            })
    }
}
