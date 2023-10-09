export const signal = (state) => {
  const data = state.signal;

  if (data >= 1000) {
    return 3;
  }
  if (data == null || data == undefined) {
    return null;
  }
  if (data > 499 && data < 1000) {
    return 1;
  }
  return 0;
};

export const getRealTime = (state) => state.signal;
export const getSinalTimeout = (state) => state.signalTimeout;
