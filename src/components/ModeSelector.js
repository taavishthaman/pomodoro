import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { colors } from "../utils/colors";
import {
  setCurrent,
  setTimerId,
  setPomodoroCurrentTime,
  setShortCurrentTime,
  setLongCurrentTime,
} from "../appSlice";
import { fontFamiliy, fontWeights } from "../utils/fonts";

const StyledSelectorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5.5rem;
  position: relative;
  z-index: 2;
`;

const Selector = styled.div`
  width: 37.3rem;
  height: 6.3rem;
  background-color: var(--color-dark);
  border-radius: 3.15rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 7px;
`;

const SelectBtn = styled.div`
  height: 4.8rem;
  width: 12rem;
  justify-content: center;
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  border-radius: 2.65rem;
  color: ${(props) =>
    props.selected === true
      ? "var(--color-background)"
      : "var(--color-text-primary)"};

  background-color: ${(props) =>
    props.selected === true ? `${colors[props.theme]}` : "var(--color-dark)"};
  cursor: pointer;
  font-family: ${(props) => fontFamiliy[props.font]};
  font-weight: ${(props) => fontWeights[props.font]};
`;

function ModeSelector() {
  const { pomodoroTime, shortTime, longTime, active, theme, timerId, font } =
    useSelector((state) => state.app);
  const dispatch = useDispatch();
  function setActive(mode) {
    //If a timer is active disable it
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
    //Reset the current timer value
    if (active === "pomodoro") {
      dispatch(setPomodoroCurrentTime(pomodoroTime));
    } else if (active === "short") {
      dispatch(setShortCurrentTime(shortTime));
    } else {
      dispatch(setLongCurrentTime(longTime));
    }
    dispatch(setCurrent(mode));
  }
  return (
    <StyledSelectorContainer>
      <Selector>
        <SelectBtn
          onClick={() => setActive("pomodoro")}
          selected={active === "pomodoro"}
          theme={theme}
          font={font}
        >
          pomodoro
        </SelectBtn>
        <SelectBtn
          onClick={() => setActive("short")}
          selected={active === "short"}
          theme={theme}
          font={font}
        >
          short break
        </SelectBtn>
        <SelectBtn
          onClick={() => setActive("long")}
          selected={active === "long"}
          theme={theme}
          font={font}
        >
          long break
        </SelectBtn>
      </Selector>
    </StyledSelectorContainer>
  );
}

export default ModeSelector;
