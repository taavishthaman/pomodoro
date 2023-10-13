import styled from "styled-components";
import { useForm } from "react-hook-form";
import Form from "./Form";
import NumericInput from "./NumericInput";
import { colors } from "../utils/colors";
import { useSelector } from "react-redux";

const FromHeading = styled.div`
  color: var(--color-dark);
  font-size: 2.8rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding-bottom: 3.1rem;
  border-bottom: 1px solid #e3e1e1;
  padding-top: 3.4rem;
  padding-left: 4rem;
`;

const TimeContainer = styled.div`
  margin: 2.8rem 3.8rem 0 4rem;
  display: flex;
  flex-direction: column;
  gap: 2.54rem;
`;

const Heading = styled.div`
  color: var(--color-dark);
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 5px;
  text-transform: uppercase;
`;

const TimeRow = styled.div`
  display: flex;
  gap: 2.1rem;
  justify-content: space-between;
  border-bottom: 1px solid #e3e1e1;
  padding-bottom: 2.4rem;
`;

const TimeType = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TimeTypeHeading = styled.div`
  color: var(--color-dark);
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  opacity: 0.4;
`;

const FontRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e3e1e1;
  padding-bottom: 2.4rem;
`;

const SelectFont = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.6rem;
  align-items: center;
`;

const SelectFontButton = styled.div`
  height: 4rem;
  width: 4rem;
  background-color: ${(props) =>
    props.selected === true
      ? "var(--color-dark)"
      : "var(--color-btn-background)"};
  border-radius: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ColorRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2.4rem;
`;

const SelectColorButton = styled.div`
  height: 4rem;
  width: 4rem;
  background-color: var(--color-primary);
  background-color: ${(props) => colors[props.color]};
  border-radius: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ApplyBtn = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  height: 5.3rem;
  width: 14rem;
  border-radius: 2.65rem;
  background-color: ${(props) => colors[props.theme]};
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-white);
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
  &:hover {
    &:before {
      background: rgba(255, 255, 255, 0.203);
      content: "";
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: -1;
      border-radius: 2.65rem;
    }
  }
`;

function SettingsForm() {
  const { pomodoroTime, shortBreakTime, longBreakTime, theme } = useSelector(
    (state) => state.app
  );

  const { register, handleSubmit, reset, getValues, formState } = useForm();
  function onSubmit(data) {
    console.log("Data ", data);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FromHeading>Settings</FromHeading>
      <TimeContainer>
        <Heading>Time (Minutes)</Heading>
        <TimeRow>
          <TimeType>
            <TimeTypeHeading>pomodoro</TimeTypeHeading>
            <NumericInput defaultValue={pomodoroTime} />
          </TimeType>
          <TimeType>
            <TimeTypeHeading>short break</TimeTypeHeading>
            <NumericInput defaultValue={shortBreakTime} />
          </TimeType>
          <TimeType>
            <TimeTypeHeading>long break</TimeTypeHeading>
            <NumericInput defaultValue={longBreakTime} />
          </TimeType>
        </TimeRow>
        <FontRow>
          <Heading>Font</Heading>
          <SelectFont>
            <SelectFontButton selected={true}></SelectFontButton>
            <SelectFontButton></SelectFontButton>
            <SelectFontButton></SelectFontButton>
          </SelectFont>
        </FontRow>
        <ColorRow>
          <Heading>Color</Heading>
          <SelectFont>
            <SelectColorButton color={"primary"}></SelectColorButton>
            <SelectColorButton color={"secondary"}></SelectColorButton>
            <SelectColorButton color={"tertiary"}></SelectColorButton>
          </SelectFont>
        </ColorRow>
      </TimeContainer>
      <ApplyBtn theme={theme}>Apply</ApplyBtn>
    </Form>
  );
}

export default SettingsForm;
