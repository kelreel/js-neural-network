import { useEvent, useStore } from "effector-react";
import React, { useState } from "react";
import styled from "styled-components";
import { fit, Net, network$, neurons$ } from "../../../core/network-service";
import Neuron from "../../Neuron/Neuron";

const NetContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  /* justify-content: center; */
  align-items: center;
  margin-top: 10px;

`;

export default function Network() {
  const [, rerender] = useState("");

  const neurons = useStore(neurons$);
  return (
    <NetContainer>
      {neurons.map((neuron) => (
        <Neuron key={neuron.id} neuron={neuron} />
      ))}
    </NetContainer>
  );
}
