// This TypeScript utilizes some fairly advanced features of the TypeScript type
// system which permits strongly typed usage of Vuex from TypeScript.

type InferPayload<T> = T extends (payload: infer R) => any ? R : any;

export type IGetters = { [key: string]: any };
export type IMutations = { [key: string]: (payload?: any) => void };
export type IActions = { [key: string]: (payload?: any) => any };

export type IModules<
  RootState,
  RootGetters,
  Modules extends IModules<RootState, RootGetters, Modules>
> = { [key: string]: Module<RootState, RootGetters, Modules, any> };

export type Commit<
  Mutations extends IMutations,
  Modules extends IModules<RootState, RootGetters, Modules>,
  RootState,
  RootGetters
> = <T extends keyof Mutations>(type: T | string, payload?: InferPayload<Mutations[T]>) => void;

export type Dispatch<
  Actions extends IActions,
  Modules extends IModules<RootState, RootGetters, Modules>,
  RootState,
  RootGetters
> = <T extends keyof Actions>(
  type: T | string,
  payload?: InferPayload<Actions[T]>,
) => ReturnType<Actions[T]>;

export interface Context<
  State,
  Getters extends IGetters,
  Mutations extends IMutations,
  Actions extends IActions,
  Modules extends IModules<RootState, RootGetters, Modules>,
  RootState,
  RootGetters
> {
  commit: Commit<Mutations, Modules, RootState, RootGetters>;
  dispatch: Dispatch<Actions, Modules, RootState, RootGetters>;
  state: State;
  getters: Getters;
  rootState: RootState;
  rootGetters: RootGetters;
}

export type MapGetters<
  State,
  Getters extends IGetters,
  RootState = State,
  RootGetters = Getters
> = {
  [P in keyof Getters]: (
    state: State,
    getters: Getters,
    rootState: RootState,
    rootGetters: RootGetters,
  ) => Getters[P];
};

export type MapMutations<State, Mutations extends IMutations> = {
  [P in keyof Mutations]: (state: State, payload: InferPayload<Mutations[P]>) => void;
};

export type MapActions<
  State,
  Getters extends IGetters,
  Mutations extends IMutations,
  Actions extends IActions,
  Modules extends IModules<RootState, RootGetters, Modules>,
  RootState = State,
  RootGetters = Getters
> = {
  [P in keyof Actions]: (
    context: Context<State, Getters, Mutations, Actions, Modules, RootState, RootGetters>,
    payload: InferPayload<Actions[P]>,
  ) => ReturnType<Actions[P]>;
};

export interface Store<
  State,
  Getters extends { [key: string]: any },
  Mutations extends IMutations,
  Actions extends { [key: string]: (payload?: any) => any },
  Modules extends { [key: string]: Module<State, Getters, any, any> }
> {
  strict: boolean;
  state: State;
  getters: MapGetters<State, Getters>;
  mutations: MapMutations<State, Mutations>;
  actions: MapActions<State, Getters, Mutations, Actions, Modules>;
  modules: Modules;
}

export interface Module<
  RootState,
  RootGetters,
  Modules extends IModules<RootState, RootGetters, Modules>,
  State,
  Getters extends IGetters = any,
  Mutations extends IMutations = any,
  Actions extends IActions = any
> {
  namespaced: true;
  state: State | (() => State);
  getters: MapGetters<State, Getters, RootState, RootGetters>;
  mutations: MapMutations<State, Mutations>;
  actions: MapActions<State, Getters, Mutations, Actions, Modules, RootState, RootGetters>;
  modules?: Modules;
}
