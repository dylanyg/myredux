const INIT_STORE = "INIT_STORE";

export default function createStore(rootReducer, preloadedState) {
    const listeners = [];
    const currentReducer = rootReducer;
    let currentState = preloadedState;

    function subscribe(listener) {
        listeners.push(listener);
    }
    function dispatch(action) {
        currentState = currentReducer(currentState, action);
        listeners.forEach((listener) => {
            listener();
        });
    }

    function getState() {
        return currentState;
    }
    dispatch({ type: INIT_STORE });

    return {
        subscribe,
        dispatch,
        getState,
    };
}
