export type ActivateFunction = (val: number) => number;

export class NeuralNetwork {
  activateFunction: Function;
  speed: number;

  constructor(
    neurons: Neuron[],
    ridges: Ridge[],
    activate: ActivateFunction,
    speed: number
  ) {
    this.neurons = neurons;
    this.ridges = ridges;
    this.activateFunction = activate;
    this.speed = speed;
  }
  // input: number[] = [];
  ridges: Ridge[];
  neurons: Neuron[];

  getNeuronById = (id: number) => this.neurons.find((n) => n.id === id);

  findInRidgesForNeuron = (id: number) =>
    this.ridges.filter((r) => r.toNeuron?.id === id);

  findOutRidgesFromNeuron = (id: number) =>
    this.ridges.filter((r) => r.fromNeuron?.id === id);

  fit(input_values: number[]) {
    this.ridges.forEach((ridge, index) => {
      if (ridge.isInput) {
        let n = new Neuron(0 - index, true);
        n._value = input_values[ridge.inId!];
        this.ridges[index].fromNeuron = n;
      }
    });

    for (let i = 0; i < this.neurons.length; i++) {
      let n = this.neurons[i];
      let ridges = this.findInRidgesForNeuron(n.id);

      let neurVal = 0;

      ridges.forEach((r) => {
        if (r.bias) {
          neurVal += r.weight * 1;
        } else {
          neurVal += r.weight * r.fromNeuron!._value;
        }
      });

      n._value = this.activateFunction(neurVal);
    }

    return this.neurons[this.neurons.length - 1]._value;
  }

  backPropagation(input_val: number[], right_val: number) {
    const calculateLastNeuronError = (n: Neuron): number =>
      n._value >= 0 ? -(right_val - n._value) : 0;

    this.neurons = this.neurons.reverse();

    this.neurons.forEach((n, index) => {
      if (index === 0) {
        this.neurons[0].error = calculateLastNeuronError(this.neurons[0]);
        return;
      }

      if (n._value <= 0) {
        this.neurons[index].error = 0;
      } else {
        let ridges = this.findOutRidgesFromNeuron(n.id);

        let err = 0;
        ridges.forEach((r) => {
          err += r.weight * this.getNeuronById(r!.toNeuron!.id)!.error!;
        });

        this.neurons[index].error = err;
      }
    });

    this.neurons = this.neurons.reverse();

    this.ridges = this.ridges.map((ridge, index) => {
      let rightError = this.getNeuronById(ridge!.toNeuron!.id)!.error;
      let leftVal: number;

      if (ridge.isInput) {
        // @ts-ignore
        leftVal = input_val[ridge?.inId];
      } else if (ridge.bias) {
        leftVal = 1;
      } else {
        // @ts-ignore
        leftVal = this.getNeuronById(ridge.fromNeuron.id)._value;
      }

      return {
        ...ridge,
        weight: ridge.weight + -this.speed * rightError! * leftVal,
      };
    });
  }
}

export class Neuron {
  id: number;
  inputLayer: boolean;
  _value: number;
  error: number | null = null;

  constructor(id: number, inputLayer: boolean = false) {
    this.id = id;
    this.inputLayer = inputLayer;
    // @ts-ignore
    this._value = undefined;
  }
}

export class Ridge {
  id: number;
  weight: number;
  bias: boolean;
  isInput: boolean;
  inId: number | null; // input Id

  fromNeuron: Neuron | null;
  toNeuron: Neuron | null;

  constructor(
    id: number,
    weight: number,
    fromNeuron: Neuron | null,
    toNeuron: Neuron,
    bias: boolean = false,
    isInput: boolean = false,
    inId: number | null = null
  ) {
    this.id = id;
    this.weight = weight;
    this.fromNeuron = fromNeuron;
    this.toNeuron = toNeuron;
    this.bias = bias;
    this.isInput = isInput;
    this.inId = inId;
  }
}
