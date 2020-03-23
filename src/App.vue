<template>
  <div id="app">
    <div>Counter: {{ counter }}</div>
    <div>Counter (doubled): {{ doubledCounter }}</div>
    <div>Counter (quadrupled): {{ quadrupledCounter }}</div>
    <button @click="incrementCounter()">Increment</button>
    <button @click="decrementCounter()">Decrement</button>
    <button @click="resetCounter()">Reset</button>
    <button @click="invokeSetCounterPromise(322)">Set to 322 (1 second)</button>

    <h3>Submodule</h3>
    <div>Name: {{ name }}</div>
    <div>Name (uppercase): {{ upperName }}</div>
    <input :value="name" @input="setName({ name: $event.target.value })" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter, Mutation, State, namespace } from "vuex-class";

// Import our modules so we can reuse the types we defined there.
import * as root from "./store";
import * as submodule from "./store/submodule";

// Define the vuex-class namespace for accessing our submodule.
const submoduleNS = namespace("submodule");

@Component
export default class App extends Vue {
  // Here we use vuex-class decorators to access our root module.
  //
  // Note that we have strong typing that is guaranteed to stay in sync with the
  // types for the root module because we are reusing the types we defined for
  // our root module. If a mutation, getter, action, etc. is ever renamed or the
  // type changes, the TypeScript compiler will raise an error in this
  // component.

  @State counter!: root.State["counter"];
  @Getter doubledCounter!: root.Getters["doubledCounter"];
  @Getter quadrupledCounter!: root.Getters["quadrupledCounter"];
  @Mutation incrementCounter!: root.Mutations["incrementCounter"];
  @Mutation decrementCounter!: root.Mutations["decrementCounter"];
  @Mutation resetCounter!: root.Mutations["resetCounter"];
  @Action setCounterPromise!: root.Actions["setCounterPromise"];

  invokeSetCounterPromise(value: number) {
    this.setCounterPromise({
      counter: new Promise(resolve => {
        setTimeout(() => resolve(value), 1000);
      }),
    });
  }

  // Here we use the vuex-class namespace we created to access our submodule.
  //
  // Like before, this is strongly typed and will always be in sync with our
  // submodule.

  @submoduleNS.State name!: submodule.State["name"];
  @submoduleNS.Getter upperName!: submodule.Getters["upperName"];
  @submoduleNS.Mutation setName!: submodule.Mutations["setName"];
}
</script>
