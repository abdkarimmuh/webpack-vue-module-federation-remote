import { createStore } from "vuex";
// import { persistedState } from "./plugins";

// Store Module
import counter from "./counter";
import signalIndicator from "./signalIndicator";
import config from "@/config";

export default createStore({
  state: {
    metadata: {
      clientname: "nds-ui",
      frontendip: "172.18.127.19",
      activityid: "3e607467-54f2-428c-92e1-058e061bde03",
      traceid: { id: "-", route: "-", date: "-" },
      traceidHistory: [],
      fullUrl: "",
    },
  },
  getters: {
    metadataForSignal: (state) => () => {
      const metadata = {
        clientname: state.metadata.clientname,
        frontendip: state.metadata.frontendip,
        activityid: "3e607467-54f2-428c-92e1-058e061bde03",
        "x-trace-id": state.metadata.traceid.id,
        "x-app-version": config.appVersion,
      };

      if (config.isUseFETimeout) {
        return {
          ...metadata,
          "grpc-timeout": "1000000m",
        };
      }
      return metadata;
    },
  },
  mutations: {},
  actions: {},
  modules: {
    counter,
    signalIndicator,
  },
  // plugins: [...persistedState({ moduleLS: ["counter"] })],
});
