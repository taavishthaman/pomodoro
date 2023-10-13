import styled from "styled-components";

const StyledInput = styled.input`
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  height: 4.8rem;
  width: 14rem;
  border: none;
  border-radius: 10px;
  background-color: var(--color-btn-background);
  padding: 0 1.6rem;
  font-size: 1.4rem;
  font-weight: 700;

  &:focus {
    outline: none;
  }
`;

function NumericInput({ defaultValue }) {
  return <StyledInput type="number" defaultValue={defaultValue}></StyledInput>;
}

export default NumericInput;
