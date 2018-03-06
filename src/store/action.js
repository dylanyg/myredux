import { DECREASE_NUM, INCREASE_NUM } from "./types";

export function decreateNum(input) {
    return {
        type: DECREASE_NUM,
        input,
    };
}
export function increateNum(input) {
    return {
        type: INCREASE_NUM,
        input,
    };
}
