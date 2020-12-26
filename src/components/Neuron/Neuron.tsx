import React from "react";
import styled from "styled-components";
import { Neuron as NeuronType } from "../../core";

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  margin: 10px;
  border: 1px solid black;
  border-radius: 5px;
  width: 200px;
`;

const Id = styled.p`
  color: black;
  font-weight: 700;
`;

const Val = styled.p`
  color: green;
  font-weight: 600;
`;

const Err = styled.p`
  color: red;
  font-weight: 600;
`;

const round = (val: number) => Math.round(val * 100000) / 100000;

export default function Neuron({ neuron }: { neuron: NeuronType }) {
  return (
    <Container>
      <Id>ID: {neuron.id}</Id>
      <Val>Value: {neuron._value && round(neuron._value!)}</Val>
      <Err>Error: {neuron.error && round(neuron.error!)}</Err>
      {/* <pre>{JSON.stringify(neuron, null, 2)}</pre> */}
    </Container>
  );
}
