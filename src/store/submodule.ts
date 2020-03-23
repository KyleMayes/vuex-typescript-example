import { ChildModule } from "./index";

// Our strongly typed Vuex state for the submodule.
export interface State {
  name: string;
}

// Our strongly typed Vuex getters for the submodule.
export type Getters = {
  upperName: string;
};

// Our strongly typed Vuex mutations for the submodule.
export type Mutations = {
  setName(payload: { name: string }): void;
};

// Our strongly typed Vuex actions for the submodule.
export type Actions = {};

// Our strongly typed submodule with our initial values and implementations.
const submodule: ChildModule<State, Getters, Mutations, Actions> = {
  namespaced: true,
  state: {
    name: "Kyle Mayes",
  },
  getters: {
    upperName(state) {
      return state.name.toUpperCase();
    },
  },
  mutations: {
    setName(state, { name }) {
      state.name = name;
    },
  },
  actions: {},
};

export default submodule;
