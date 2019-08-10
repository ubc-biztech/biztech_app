//Login Reducer.
import { ATTEMPT, SUCCESS, FAILED } from '../constants/Consts';

const initialState = {
    isLoggedIn: false,
    isLoading: false,
    user: null,
    error: undefined,
    isVerified: false
}

export default function loginReducer(state=initialState, action) {
    switch(action.type) {
        case ATTEMPT:
            return Object.assign({}, state, {
                isLoading: true
            })
        case SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                user: action.user,
                isLoggedIn: true
            })
        case FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                error: action.err
            })
        case 'logout':
          console.log('logout: state cleared')
          return Object.assign({}, state, initialState)
        case 'verified':
          console.log('verified called')
          return Object.assign({}, state, {
            isVerified: true
          })
        default:
            return state
    }
}
