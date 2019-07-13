//Login Reducer.
import { loginConsts } from '../constants/consts.js';

const initialState = {
    isLoggedIn: false,
    isLoading: false,
    user: null,
    error: undefined
}

export default function loginReducer(state=initialState, action) {
    console.log(action.type);
    switch(action.type) {
        case loginConsts.ATTEMPT:
            return Object.assign({}, state, {
                isLoading: true
            })
        case loginConsts.SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                user: action.user
            })
        case loginConsts.FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                error: action.err
            })
        default:
            return state
    }
}
