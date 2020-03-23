import Vue from "vue";
import Vuex from "vuex";

import submodule from "./submodule";
import { IActions, IGetters, IMutations, Module, Store } from "./common";

Vue.use(Vuex);

// The type of a child module for our root module.
// This allows strongly typed access to the root module from child modules.
export type ChildModule<S, G extends IGetters, M extends IMutations, A extends IActions> = Module<
  State,
  Getters,
  Modules,
  S,
  G,
  M,
  A
>;

// Our strongly typed Vuex state for the root module.
export interface State {
  counter: number;
}

// Our strongly typed Vuex getters for the root module.
export type Getters = {
  doubledCounter: number;
  quadrupledCounter: number;
};

// Our strongly typed Vuex mutations for the root module.
export type Mutations = {
  incrementCounter(): void;
  decrementCounter(): void;
  resetCounter(): void;
  setCounter(payload: { counter: number }): void;
};

// Our strongly typed Vuex actions for the root module.
export type Actions = {
  setCounterPromise(payload: { counter: Promise<number> }): Promise<number>;
};

// Our strongly typed submodules.
export type Modules = {
  submodule: typeof submodule;
};

// Our strongly typed root module with our initial values and implementations.
const store: Store<State, Getters, Mutations, Actions, Modules> = {
  strict: process.env.NODE_ENV !== "production",
  state: {
    counter: 0,
  },
  getters: {
    doubledCounter(state) {
      return state.counter * 2;
    },
    quadrupledCounter(_state, getters) {
      return getters.doubledCounter * 2;
    },
  },
  mutations: {
    incrementCounter(state) {
      state.counter += 1;
    },
    decrementCounter(state) {
      state.counter -= 1;
    },
    resetCounter(state) {
      state.counter = 0;
    },
    setCounter(state, { counter }) {
      state.counter = counter;
    },
  },
  actions: {
    async setCounterPromise(context, { counter }) {
      const value = await counter;
      // Unfortunately invoking mutations and actions through the Vuex context
      // is *not* strongly typed. There is no good away around this until Vue 3
      // is released which is supposed to support TypeScript better and might
      // obsolete these Vuex bindings.
      context.commit("setCounter", { counter: value });
      return value;
    },
  },
  modules: {
    submodule,
  },
};

export default new Vuex.Store<State>(store as any);
