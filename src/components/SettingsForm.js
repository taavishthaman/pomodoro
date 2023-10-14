import styled from "styled-components";
import { useForm } from "react-hook-form";
import Form from "./Form";
import NumericInput from "./NumericInput";
import { colors } from "../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fontFamiliy, fontWeights } from "../utils/fonts";
import TickIcon from "../assets/icons/tick.svg";
import {
  setPomodoroTime,
  setPomodoroCurrentTime,
  setShortTime,
  setShortCurrentTime,
  setLongTime,
  setLongCurrentTime,
  setTheme,
  setFont,
} from "../appSlice";
import { clamp } from "../utils/clamp";

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
  font-family: ${(props) => fontFamiliy[props.font]};
  font-weight: ${(props) => fontWeights[props.font]};
  @media screen and (max-width: 31em) {
    padding-top: 2.4rem;
    padding-left: 2.4rem;
    padding-bottom: 2.4rem;
    font-size: 2rem;
  }
`;

const TimeContainer = styled.div`
  margin: 2.8rem 3.8rem 0 4rem;
  display: flex;
  flex-direction: column;
  gap: 2.54rem;
  @media screen and (max-width: 31em) {
    margin: 2.4rem 2.4rem 0 2.4rem;
    gap: 8px;
  }
`;

const Heading = styled.div`
  color: var(--color-dark);
  font-size: 1.3rem;
  font-style: normal;
  line-height: normal;
  letter-spacing: 5px;
  text-transform: uppercase;
  font-family: ${(props) => fontFamiliy[props.font]};
  font-weight: ${(props) => fontWeights[props.font]};
  @media screen and (max-width: 31em) {
    text-align: center;
  }
`;

const TimeRow = styled.div`
  display: flex;
  gap: 2.1rem;
  justify-content: space-between;
  border-bottom: 1px solid #e3e1e1;
  padding-bottom: 2.4rem;
  @media screen and (max-width: 31em) {
    flex-direction: column;
    gap: 8px;
  }
`;

const TimeType = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media screen and (max-width: 31em) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const TimeTypeHeading = styled.div`
  color: var(--color-dark);
  font-size: 1.2rem;
  font-style: normal;
  line-height: normal;
  opacity: 0.4;
  font-family: ${(props) => fontFamiliy[props.font]};
  font-weight: ${(props) => fontWeights[props.font]};
`;

const FontRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e3e1e1;
  padding-bottom: 2.4rem;
  @media screen and (max-width: 31em) {
    flex-direction: column;
    gap: 1.8rem;
  }
`;

const SelectFont = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.6rem;
  align-items: center;
`;

const ButtonBorder = styled.div`
  padding: 5px;
  transition: all 0s;
  &:hover {
    border: 1px solid var(--color-btn-background);
    border-radius: 10rem;
  }
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
  font-size: 1.5rem;
  color: ${(props) =>
    props.selected === true
      ? "var(--color-white)"
      : "var(--color-text-secondary)"};

  font-family: ${(props) => fontFamiliy[props.type]};
  font-weight: ${(props) => fontWeights[props.type]};

  /* &:hover {
    border: 1px solid var(--color-btn-background);
  } */
`;

const ColorRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2.4rem;
  @media screen and (max-width: 31em) {
    flex-direction: column;
    gap: 1.8rem;
  }
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
  font-family: ${(props) => fontFamiliy[props.font]};
  font-weight: ${(props) => fontWeights[props.font]};
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

const Tick = styled.img`
  height: 1.4rem;
  width: 1.4rem;
`;

function SettingsForm({ onCloseModal }) {
  const { pomodoroTime, shortBreakTime, longBreakTime, theme, font } =
    useSelector((state) => state.app);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm({});

  const [newFont, setNewFont] = useState(font);
  const [newTheme, setNewTheme] = useState(theme);

  function onSubmit(data) {
    //Update the redux here
    let { pomodoro, short, long } = data;
    pomodoro = clamp(pomodoro, 1, 60);
    short = clamp(short, 1, 60);
    long = clamp(long, 1, 60);
    dispatch(setPomodoroTime(pomodoro * 60));
    dispatch(setPomodoroCurrentTime(pomodoro * 60));
    dispatch(setShortTime(short * 60));
    dispatch(setShortCurrentTime(short * 60));
    dispatch(setLongTime(long * 60));
    dispatch(setLongCurrentTime(long * 60));
    dispatch(setTheme(newTheme));
    dispatch(setFont(newFont));

    //Save to local storage

    onCloseModal?.();
  }

  function onError(error) {
    //console.log("Here", error);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FromHeading font={font}>Settings</FromHeading>
      <TimeContainer>
        <Heading font={font}>Time (Minutes)</Heading>
        <TimeRow>
          <TimeType>
            <TimeTypeHeading font={font}>pomodoro</TimeTypeHeading>
            <NumericInput
              defaultValue={pomodoroTime / 60}
              register={register}
              name={"pomodoro"}
            />
          </TimeType>
          <TimeType>
            <TimeTypeHeading font={font}>short break</TimeTypeHeading>
            <NumericInput
              defaultValue={shortBreakTime / 60}
              register={register}
              name={"short"}
            />
          </TimeType>
          <TimeType>
            <TimeTypeHeading font={font}>long break</TimeTypeHeading>
            <NumericInput
              defaultValue={longBreakTime / 60}
              register={register}
              name={"long"}
            />
          </TimeType>
        </TimeRow>
        <FontRow>
          <Heading font={font}>Font</Heading>
          <SelectFont>
            <ButtonBorder>
              <SelectFontButton
                selected={newFont === "first"}
                type="first"
                onClick={() => setNewFont("first")}
              >
                Aa
              </SelectFontButton>
            </ButtonBorder>
            <ButtonBorder>
              <SelectFontButton
                selected={newFont === "second"}
                type="second"
                onClick={() => setNewFont("second")}
              >
                Aa
              </SelectFontButton>
            </ButtonBorder>
            <ButtonBorder>
              <SelectFontButton
                selected={newFont === "third"}
                type="third"
                onClick={() => setNewFont("third")}
              >
                Aa
              </SelectFontButton>
            </ButtonBorder>
          </SelectFont>
        </FontRow>
        <ColorRow>
          <Heading font={font}>Color</Heading>
          <SelectFont>
            <ButtonBorder>
              <SelectColorButton
                color={"primary"}
                onClick={() => setNewTheme("primary")}
              >
                {newTheme === "primary" && <Tick src={TickIcon} />}
              </SelectColorButton>
            </ButtonBorder>
            <ButtonBorder>
              <SelectColorButton
                color={"secondary"}
                onClick={() => setNewTheme("secondary")}
              >
                {newTheme === "secondary" && <Tick src={TickIcon} />}
              </SelectColorButton>
            </ButtonBorder>
            <ButtonBorder>
              <SelectColorButton
                color={"tertiary"}
                onClick={() => setNewTheme("tertiary")}
              >
                {newTheme === "tertiary" && <Tick src={TickIcon} />}
              </SelectColorButton>
            </ButtonBorder>
          </SelectFont>
        </ColorRow>
      </TimeContainer>
      <ApplyBtn theme={theme} type="submit" font={font}>
        Apply
      </ApplyBtn>
    </Form>
  );
}

export default SettingsForm;
