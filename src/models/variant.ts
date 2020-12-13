import { combine, createEvent, createStore } from "effector";

export const setVariant = createEvent<number>();
export const variant$ = createStore<number>(1);

variant$.on(setVariant, (_, val) => val);

export enum ActivateFunctionEnum {
  relu = 'relu',
  sigmoid = 'sigmoid',
  tanh = 'tanh'
}

export const setActFunction = createEvent<ActivateFunctionEnum>();
export const actFunction$ = createStore(ActivateFunctionEnum.relu);

actFunction$.on(setActFunction, (_, func) => func);

export const setSpeed = createEvent<number>();
export const speed$ = createStore<number>(0.9);

speed$.on(setSpeed, (_, speed) => speed);

export const setInputValues = createEvent<number[]>();
export const inputValues$ = createStore<number[]>([0.5, 0.6]);

inputValues$.on(setInputValues, (_, val) => val);

export const setOutputVal = createEvent<number>();
export const outputVal$ = createStore<number>(1.7);

outputVal$.on(setOutputVal, (_, val) => val);

export const store$ = combine({
    variant: variant$,
    func: actFunction$,
    speed: speed$,
    input: inputValues$,
    output: outputVal$
})