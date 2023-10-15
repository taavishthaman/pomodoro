import styled from "styled-components";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import SettingsIcon from "../assets/icons/settings.svg";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import SettingsForm from "./SettingsForm";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../utils/colors";
import { fontFamiliy, fontWeights } from "../utils/fonts";
import { setPomodoroCurrentTime, setTimerState, setTimerId } from "../appSlice";

const StyledTimerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4.5rem;
  flex-direction: column;
  @media screen and (max-width: 50em) {
    margin-top: 10.9em;
  }
  @media screen and (max-width: 31em) {
    margin-top: 4.8em;
  }
`;

const StyledTimer = styled.div`
  height: 41rem;
  width: 41rem;
  border-radius: 41rem;
  background: linear-gradient(315deg, #2e325a 0%, #0e112a 100%);
  box-shadow: 50px 50px 100px 0px #121530, -50px -50px 100px 0px #272c5a;
  justify-content: center;
  align-items: center;
  display: flex;
  @media screen and (max-width: 31em) {
    height: 30rem;
    width: 30rem;
  }
`;

const StyledTimerInner = styled.div`
  height: 36.6rem;
  width: 36.6rem;
  border-radius: 36.6rem;
  background-color: var(--color-dark);
  padding: 1.35rem;
  @media screen and (max-width: 31em) {
    height: 26.7rem;
    width: 26.7rem;
  }
`;

const ClockContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledClock = styled.div`
  color: var(--color-text-primary);
  font-size: 10rem;
  font-style: normal;
  line-height: normal;
  letter-spacing: -5px;
  font-family: ${(props) => fontFamiliy[props.font]};
  font-weight: ${(props) => fontWeights[props.font]};
  @media screen and (max-width: 31em) {
    font-size: 8rem;
  }
`;

const StatusText = styled.div`
  color: var(--color-text-primary);
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 1.5rem;
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    color: ${(props) => colors[props.theme]};
  }
  font-family: ${(props) => fontFamiliy[props.font]};
  font-weight: ${(props) => fontWeights[props.font]};
  @media screen and (max-width: 31em) {
    font-size: 1.4rem;
  }
`;

const SettingsImg = styled.img`
  padding-top: 6.3rem;
  cursor: pointer;
  @media screen and (max-width: 50em) {
    padding-top: 14.4em;
  }
  @media screen and (max-width: 31em) {
    padding-top: 7.9rem;
  }
`;

function Timer() {
  const {
    active,
    pomodoroTime,
    currentPomodoroTime,
    shortBreakTime,
    currentShortBreakTime,
    longBreakTime,
    currentLongBreakTime,
    timerState,
    timerId,
    theme,
  } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const [time, setTime] = useState(() => {
    if (active === "pomodoro") {
      return currentPomodoroTime;
    } else if (active === "short") {
      return currentShortBreakTime;
    } else {
      return currentLongBreakTime;
    }
  });

  const [totalTime, setTotalTime] = useState(() => {
    if (active === "pomodoro") {
      return pomodoroTime;
    } else if (active === "short") {
      return shortBreakTime;
    } else {
      return longBreakTime;
    }
  });

  useEffect(() => {
    setTime((time) => {
      if (active === "pomodoro") {
        return pomodoroTime;
      } else if (active === "short") {
        return shortBreakTime;
      } else {
        return longBreakTime;
      }
    });

    setTotalTime((time) => {
      if (active === "pomodoro") {
        return pomodoroTime;
      } else if (active === "short") {
        return shortBreakTime;
      } else {
        return longBreakTime;
      }
    });

    dispatch(setTimerState("paused"));
  }, [active, dispatch, longBreakTime, pomodoroTime, shortBreakTime]);

  useEffect(() => {
    if (timerState === "running" && !timerId) {
      const id = setInterval(() => {
        setTime((time) => {
          if (time === 1) {
            clearInterval(id);
            dispatch(setTimerId(null));
            dispatch(setPomodoroCurrentTime(time));
            dispatch(setTimerState("finished"));
          }
          return time - 1;
        });
      }, 1000);
      if (!timerId) {
        dispatch(setTimerId(id));
      }
    } else if (timerState === "paused" && timerId) {
      clearInterval(timerId);
      dispatch(setTimerId(null));
      dispatch(setPomodoroCurrentTime(time));
    }
  }, [dispatch, pomodoroTime, time, timerId, timerState]);

  return (
    <StyledTimerContainer>
      <StyledTimer>
        <StyledTimerInner>
          <CircularProgressbarWithChildren
            value={Math.floor((time / totalTime) * 100)}
            strokeWidth={3}
            styles={buildStyles({
              pathColor: colors[theme],
              trailColor: "var(--color-dark)",
            })}
          >
            <Clock time={time} setTime={setTime} />
          </CircularProgressbarWithChildren>
        </StyledTimerInner>
      </StyledTimer>
      <Modal>
        <Modal.Open opens="settings">
          <SettingsImg src={SettingsIcon} />
        </Modal.Open>
        <Modal.Window name="settings">
          <SettingsForm />
        </Modal.Window>
      </Modal>
    </StyledTimerContainer>
  );
}

function Clock({ time, setTime }) {
  const { pomodoroTime, timerState, theme, font } = useSelector(
    (state) => state.app
  );
  const dispatch = useDispatch();
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, 0);
  const seconds = (time % 60).toString().padStart(2, 0);
  function handleTimer() {
    if (timerState === "paused") {
      dispatch(setTimerState("running"));
    } else if (timerState === "running") {
      dispatch(setTimerState("paused"));
    } else {
      setTime(pomodoroTime);
      dispatch(setPomodoroCurrentTime(pomodoroTime));
      dispatch(setTimerState("running"));
      dispatch(setTimerId(null));
    }
  }
  return (
    <ClockContainer>
      <StyledClock font={font}>
        {minutes}:{seconds}
      </StyledClock>
      <StatusText theme={theme} onClick={handleTimer} font={font}>
        {timerState === "paused" && "Start"}
        {timerState === "running" && "Pause"}
        {timerState === "finished" && "Restart"}
      </StatusText>
    </ClockContainer>
  );
}

export default Timer;
