import { combineReducers } from "../../xredux";
import { INCREASE_NUM, DECREASE_NUM } from "./types";

const defaultState = { num: 0 };
function counter(state = defaultState, action) {
    switch (action.type) {
    case INCREASE_NUM:
        return { ...state, num: state.num + action.input };
    case DECREASE_NUM:
        return { ...state, num: state.num - action.input };
    default:
        return state;
    }
}
export default combineReducers({ counter });
