// Actions for logging in.
import Auth from '@aws-amplify/auth';
import { ATTEMPT, SUCCESS, FAILED } from '../constants/Consts'
import { AMAZON_API } from 'react-native-dotenv';

export function isLoading() {
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
        fetch(AMAZON_API + '/users/get?id=' + id)
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
    fetch(AMAZON_API + '/users/get?id=' + id)
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

export function getRegistrations(id) {
  return (dispatch) => {
    dispatch(isLoading());
    fetch(AMAZON_API + '/registration/queryStudent?id=' + id)
      .then((response) => response.json())
      .then((response) => {
        console.log('getRegistration success');
        dispatch(getRegistrationSuccess(response));
      })
      .catch(err => {
        console.log('getRegistration failed');
        dispatch(registrationFailed(err));
      })
  }
}

export function getRegistrationSuccess(response) {
  return {
    type: 'registrationSuccess',
    response
  }
}

export function registrationFailed(err) {
  return {
    type: 'registrationFailed',
    err
  }
}

export function registerUser(id, eventID) {
  return (dispatch) => {
    dispatch(isLoading());
    const body = JSON.stringify({
      id,
      eventID,
      registrationStatus: 'registered'
    })
    fetch(AMAZON_API + '/registration/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: body
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        if (response.message == 'Update succeeded') {
          dispatch(getRegistrations(id));
        } else {
          dispatch(registrationFailed(err));
        }
      })
      .catch(err => {
        console.log('registration failed');
        dispatch(registrationFailed(err));
      })
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
