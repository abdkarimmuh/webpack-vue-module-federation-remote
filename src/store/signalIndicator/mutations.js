export const setTime = (state, value) => {
  state.signal = value;
};

export const setSignalTimeout = (state, value) => {
  state.signalTimeout.push(value);
};
