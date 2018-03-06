export default function combineReducers(reducers) {
    return function complain(...args) {
        const state = args.length > 0 && args[0] !== undefined ? args[0] : {};
        const action = args[1];
        const nextState = {};
        let haschanged = false;
        const reducersKeys = Object.keys(reducers);
        for (let i = 0, len = reducersKeys.length; i < len; i++) {
            const key = reducersKeys[i];
            const reducer = reducers[key];
            const prevStateForKey = state[key];
            const nextStateForReducer = reducer(prevStateForKey, action);
            haschanged = prevStateForKey !== nextStateForReducer || haschanged;
            nextState[key] = nextStateForReducer;
        }
        return haschanged ? nextState : state;
    };
}
