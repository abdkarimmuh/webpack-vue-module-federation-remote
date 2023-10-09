import { createStore } from "vuex";
// import { persistedState } from "./plugins";

// Store Module
import counter from "./counter";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    counter,
  },
  // plugins: [...persistedState({ moduleLS: ["counter"] })],
});
