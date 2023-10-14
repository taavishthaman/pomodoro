import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pomodoroTime: 1500,
  shortBreakTime: 300,
  longBreakTime: 900,
  active: "pomodoro",
  currentPomodoroTime: 1500,
  currentShortBreakTime: 300,
  currentLongBreakTime: 900,
  timerState: "paused", //Can be running, paused, finished
  theme: "primary",
  timerId: null,
  font: "first",
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
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setFont(state, action) {
      state.font = action.payload;
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
  setTheme,
  setFont,
} = appSlice.actions;

export default appSlice.reducer;
