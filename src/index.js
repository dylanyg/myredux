import { createStore } from "../xredux";
import reducer from "./store/reducer";
import { decreateNum, increateNum } from "./store/action";

const store = createStore(reducer);

store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(decreateNum(10));

store.dispatch(increateNum(5));

