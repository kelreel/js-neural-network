import styled from "styled-components";

export const VariantContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

export const VariantForm = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

export const Selector = styled.select`
  margin-bottom: 5px;
  /* color: red; */
`;

export const Button = styled.button`
  border: 1px solid #ccc;
  margin-top: 10px;
  padding-top: 5px;
  border-radius: 3px;
  padding-bottom: 5px;
  margin-bottom: 10px;
  transition: 0.3s;

  &:hover {
    background-color: #c3b7b7;
  }
`;
