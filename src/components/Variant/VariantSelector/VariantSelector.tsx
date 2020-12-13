import { useStore } from "effector-react";
import React from "react";
import {
  ActivateFunctionEnum,
  setActFunction,
  setOutputVal,
  setSpeed,
  setVariant,
  store$,
} from "../../../models/variant";
import { Selector } from "./styled";

export default function VariantSelector() {
  const store = useStore(store$);
  return (
    <div>
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
        onChange={(e) => setActFunction(e.target.value as ActivateFunctionEnum)}
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
      <input type="number" value={0.5} />
      <input type="number" value={0.9} />
      <h4>Выходное значение (Y-real):</h4>
      <input
        type="number"
        value={store.output}
        onChange={(e) => setOutputVal(+e.target.value)}
      />
      {store.speed}
    </div>
  );
}
