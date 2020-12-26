import { useStore } from "effector-react";
import React from "react";
import {
  ActivateFunctionEnum,
  setActFunction,
  setInputValues,
  setOutputVal,
  setSpeed,
  setVariant,
  store$,
} from "../../../models/variant";
import "../../../core/network-service";
import VariantImage from "../Image";
import { Button, Selector, VariantContainer, VariantForm } from "./styled";
import { backPropagation, fit } from "../../../core/network-service";

export default function VariantSelector() {
  const store = useStore(store$);
  return (
    <VariantContainer>
      <VariantForm>
        <h3>Выберите вариант:</h3>
        <Selector
          onChange={(e) => setVariant(+e.target.value)}
          value={store.variant}
        >
          <option value={1}>1 вариант</option>
          <option value={2}>2 вариант</option>
          <option value={3}>3 вариант</option>
          <option value={4}>4 вариант</option>
          <option value={5}>5 вариант</option>
        </Selector>
        <h4>Функция активации:</h4>
        <Selector
          value={store.func}
          onChange={(e) =>
            setActFunction(e.target.value as ActivateFunctionEnum)
          }
        >
          <option value={ActivateFunctionEnum.relu}>ReLu</option>
          <option value={ActivateFunctionEnum.sigmoid}>Sigmoid</option>
          <option value={ActivateFunctionEnum.tanh}>tanh</option>
        </Selector>
        <h4>Скорость обучения:</h4>
        <input
          type="number"
          value={store.speed}
          step={0.1}
          min={0.1}
          max={1}
          onChange={(e) => setSpeed(+e.target.value)}
        />
        <h4>Входные значения:</h4>
        <input
          type="number"
          onChange={(e) => {
            const vals = store.input.map((val, i) => {
              if (i === 0) return +e.target.value;
              return val;
            });
            setInputValues(vals);
          }}
          value={store.input[0]}
        />
        <input
          type="number"
          onChange={(e) => {
            const vals = store.input.map((val, i) => {
              if (i === 1) return +e.target.value;
              return val;
            });
            setInputValues(vals);
          }}
          value={store.input[1]}
        />
        {/* <input
          onChange={(e) => {
            const vals = store.input.map((val, i) => {
              if (i === 2) return +e.target.value;
              return val;
            });
            setInputValues(vals);
          }}
          type="number"
          value={store.input[2]}
        /> */}
        <h4>Выходное значение (Y-real):</h4>
        <input
          type="number"
          value={store.output}
          onChange={(e) => setOutputVal(+e.target.value)}
        />
        <Button onClick={() => fit()}>Fit</Button>
        <Button onClick={() => backPropagation()}>Back Propagation</Button>
      </VariantForm>
      <VariantImage variant={store.variant} />
    </VariantContainer>
  );
}
