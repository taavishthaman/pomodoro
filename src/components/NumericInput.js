import { useSelector } from "react-redux";
import styled from "styled-components";
import { fontFamiliy, fontWeights } from "../utils/fonts";

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
  font-family: ${(props) => fontFamiliy[props.font]};
  font-weight: ${(props) => fontWeights[props.font]};

  &:focus {
    outline: none;
  }
`;

function NumericInput({ defaultValue, register, name }) {
  const { font } = useSelector((state) => state.app);
  return (
    <StyledInput
      type="number"
      font={font}
      defaultValue={defaultValue}
      {...register(name, {
        required: "This field is required",
      })}
    ></StyledInput>
  );
}

export default NumericInput;
