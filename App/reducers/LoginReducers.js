//Login Reducer.
import { ATTEMPT, SUCCESS, FAILED } from '../constants/Consts';

const initialState = {
  events: null,
  isLoggedIn: false,
  isLoading: false,
  user: null,
  error: undefined,
  isVerified: false,
  showSuccess: false
}

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case ATTEMPT:
      return Object.assign({}, state, {
        isLoading: true
      })
    case 'stopLoading':
      return Object.assign({}, state, {
        isLoading: false
      })
    case SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        user: action.user,
        isLoggedIn: true
      })
    case FAILED:
      return Object.assign({}, state, {
        user: {
          email: action.email
        },
        isLoading: false,
        error: action.err
      })
    case 'logout':
      console.log('logout, state cleared')
      return Object.assign({}, state, initialState)
    case 'verified':
      console.log('verified called')
      return Object.assign({}, state, {
        isVerified: true,
        error: null
      })
    case 'unverified':
      console.log('unverified called')
      return Object.assign({}, state, {
        isVerified: false,
        error: null
      })
    case 'events':
      return Object.assign({}, state, {
        events: action.events
      })
    case 'hideSuccess':
      return Object.assign({}, state, {
        showSuccess: false
      })
    case 'unhideSuccess':
      return Object.assign({}, state, {
        showSuccess: true
      })
    default:
      return state
  }
}
