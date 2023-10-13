import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pomodoroTime: 1500,
  shortBreakTime: 300,
  longBreakTime: 1800,
  active: "pomodoro",
  currentPomodoroTime: 1500,
  currentShortBreakTime: 300,
  currentLongBreakTime: 1800,
  timerState: "paused", //Can be running, paused, finished
  theme: "primary",
  timerId: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setPomodoroTime(state, action) {
      state.pomodoroTime = action.payload;
    },
    setShortTime(state, action) {
      state.shortBreakTime = action.payload;
    },
    setLongTime(state, action) {
      state.longBreakTime = action.payload;
    },
    setPomodoroCurrentTime(state, action) {
      state.currentPomodoroTime = action.payload;
    },
    setShortCurrentTime(state, action) {
      state.currentShortBreakTime = action.payload;
    },
    setLongCurrentTime(state, action) {
      state.currentLongBreakTime = action.payload;
    },
    setCurrent(state, action) {
      state.active = action.payload;
    },
    setTimerState(state, action) {
      state.timerState = action.payload;
    },
    setTimerId(state, action) {
      state.timerId = action.payload;
    },
  },
});

export const {
  setPomodoroTime,
  setShortTime,
  setLongTime,
  setPomodoroCurrentTime,
  setShortCurrentTime,
  setLongCurrentTime,
  setCurrent,
  setTimerState,
  setTimerId,
} = appSlice.actions;

export default appSlice.reducer;
