export const increment = ({ state, commit }) => {
  commit("setCounter", state.counter + 1);
};

export const decrement = ({ state, commit }) => {
  commit("setCounter", state.counter - 1);
};
