import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
import config from "@/config";

export class SecureStorage extends SecureLS {
  constructor(config) {
    super(config);
    super.ls = config.useSessionStore ? sessionStorage : localStorage;
  }
}

const ls = new SecureStorage({
  isCompression: false,
});

const ss = new SecureStorage({
  isCompression: false,
  useSessionStore: true,
});

export const persistedState = ({ moduleLS = [], moduleSS = [] }) => [
  createPersistedState({
    key: config.KEY_STORE_NAME,
    reducer(state) {
      let stateFilter = {};
      moduleLS.forEach((item) => {
        stateFilter = { ...stateFilter, [item]: state[item] };
      });

      return stateFilter;
    },
    storage: {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.remove(key),
    },
  }),
  createPersistedState({
    key: config.KEY_STORE_NAME,
    reducer(state) {
      let stateFilter = {};
      moduleSS.forEach((item) => {
        stateFilter = { ...stateFilter, [item]: state[item] };
      });

      return stateFilter;
    },
    storage: {
      getItem: (key) => ss.get(key),
      setItem: (key, value) => ss.set(key, value),
      removeItem: (key) => ss.remove(key),
    },
  }),
];
