const service = require("@/services/signalIndicator").default;

const TIMEOUT_SIZE = 15000;

// eslint-disable-next-line
export const getSignal = async ({ rootGetters, dispatch, commit }, payload) => {
  console.log("masuk");
  const metadata = rootGetters.metadataForSignal();
  const res = await service.getSignalIndicator({ metadata });
  commit("setTime", res);

  // call ourself again in 5s
  if (typeof isTimeout === "undefined") {
    const timeoutSignal = setTimeout(() => {
      dispatch("getSignal", true);
    }, TIMEOUT_SIZE);
    commit("setSignalTimeout", timeoutSignal);
  }
};

export const clearSignalRequest = async ({ getters }) => {
  for (let i = 0; i <= getters.getSinalTimeout.length; i++) {
    clearTimeout(getters.getSinalTimeout[i]);
  }
};
