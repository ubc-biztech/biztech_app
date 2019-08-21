// Actions for logging in.
import Auth from '@aws-amplify/auth';
import { ATTEMPT, SUCCESS, FAILED } from '../constants/Consts'
import { AMAZON_API } from 'react-native-dotenv';

export function isLoading()  {
    return {
        type: ATTEMPT,
    }
}

export function stopLoading() {
    return {
        type: 'stopLoading'
    }
}

export function loginSuccess(user) {
    return {
        type: SUCCESS,
        user
    }
}

export function loginFailed(email, err) {
    return {
        type: FAILED,
        email,
        err
    }
}

export function doLogin(values) {
    return (dispatch) => {
        dispatch(isLoading());
        const { email, pass } = values;
        return Auth.signIn(email, pass)
            .then((user) => {
              console.log(user.signInUserSession.idToken.payload);
              let id = (user.signInUserSession.idToken.payload.nickname);
              user.signInUserSession.idToken.payload.email_verified ? dispatch(doVerify()) : null;
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
                dispatch(loginFailed(email, err));
            })
    }
}

export function populateUser(id) {
    return (dispatch) => {
      fetch(AMAZON_API+'/users/get?id='+id)
  	      .then((response) => response.json())
  	      .then((response) => {
            dispatch(loginSuccess(response));
            console.log('populate success');
            console.log(response);
  	      })
    }
}

export function logout() {
    return {
        type: 'logout'
    }
}

export function doVerify() {
    return {
        type: 'verified'
    }
}

export function unverify() {
    return {
        type: 'unverified'
    }
}

export function populateEvents(events) {
    return {
        type: 'events',
        events
    }
}

export function hideSuccess() {
    return {
        type: 'hideSuccess'
    }
}

export function unhideSuccess() {
    return {
        type: 'unhideSuccess'
    }
}
