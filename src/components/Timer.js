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
import { setPomodoroCurrentTime, setTimerState, setTimerId } from "../appSlice";

const StyledTimerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4.5rem;
  flex-direction: column;
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
`;

const StyledTimerInner = styled.div`
  height: 36.6rem;
  width: 36.6rem;
  border-radius: 36.6rem;
  background-color: var(--color-dark);
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
  font-weight: 700;
  line-height: normal;
  letter-spacing: -5px;
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
`;

const SettingsImg = styled.img`
  padding-top: 6.3rem;
  cursor: pointer;
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
  const { pomodoroTime, timerState, theme } = useSelector((state) => state.app);
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
      <StyledClock>
        {minutes}:{seconds}
      </StyledClock>
      <StatusText theme={theme} onClick={handleTimer}>
        {timerState === "paused" && "Start"}
        {timerState === "running" && "Pause"}
        {timerState === "finished" && "Restart"}
      </StatusText>
    </ClockContainer>
  );
}

export default Timer;
