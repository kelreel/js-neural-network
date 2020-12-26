import { createEvent, createStore, merge } from "effector";
import { ActivateFunction, NeuralNetwork, Neuron, Ridge } from ".";
import { setSpeed, speed$, store$, variant$ } from "../models/variant";

let neurons: Neuron[] = [
  new Neuron(0),
  new Neuron(1),
  new Neuron(2),
  new Neuron(3),
  new Neuron(4),
];

let var1: Ridge[] = [
  new Ridge(100, -0.5, null, neurons[0], true, false),
  new Ridge(101, 0.6, null, neurons[0], false, true, 0),
  new Ridge(102, 0.3, null, neurons[0], false, true, 1),
  new Ridge(110, 0.8, null, neurons[1], false, true, 0),
  new Ridge(111, -0.8, null, neurons[1], false, true, 1),
  new Ridge(112, 0.1, null, neurons[1], true, false),
  new Ridge(200, 0.7, null, neurons[2], true),
  new Ridge(201, 0.4, neurons[0], neurons[2]),
  new Ridge(202, -0.3, neurons[1], neurons[2]),
  new Ridge(210, 1, neurons[0], neurons[3]),
  new Ridge(211, 0.7, neurons[1], neurons[3]),
  new Ridge(212, -0.2, null, neurons[3], true),
  new Ridge(300, -0.3, null, neurons[4], true),
  new Ridge(301, 0.9, neurons[2], neurons[4]),
  new Ridge(302, 0.1, neurons[3], neurons[4]),
];

const reluF: ActivateFunction = (val) => {
  return val > 0 ? val : 0;
};

export let Net = new NeuralNetwork(neurons, var1, reluF, speed$.getState());
export const network$ = createStore<NeuralNetwork>(Net);

export const neurons$ = createStore<Neuron[]>([...Net.neurons]);

export const fit = createEvent();
export const backPropagation = createEvent();

store$.watch((val) => {
  Net = new NeuralNetwork(neurons, var1, reluF, val.speed)
})


network$
  .on(fit, (network, payload) => {
    network.fit(store$.getState().input);
    console.log(network.neurons[network.neurons.length - 1]._value);
  })
  .on(backPropagation, (network, payload) => {
    network.backPropagation(store$.getState().input, store$.getState().output);
  });

neurons$.on(fit, (_, data) => [...Net.neurons]);
neurons$.on(backPropagation, (_, data) => [...Net.neurons]);

neurons$.watch(console.log)

// merge([fit, backPropagation]).watch(() => {
//     console.log(network$.getState().neurons);
// });

// for (let i = 0; i < 10; i++) {
//   console.log(n.fit([0.1, 0.9]));
//   n.backPropagation([0.1, 0.9], 1);
// }
// console.log(n.neurons);
// console.log(n.ridges);
