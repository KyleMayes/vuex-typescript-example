# vuex-typescript-example

An example of strongly typed usage of Vuex with TypeScript.

This project was generated with the Vue CLI using the TypeScript option.<br/>
The code described below has been added to showcase how one can use Vuex from
TypeScript.

### Typings

A set of typescript types is defined which can be used to define the type of
the root Vuex module and and child modules.<br/>The code is
[here](https://github.com/KyleMayes/vuex-typescript-example/blob/master/src/store/common.ts).

### Root Module Definition

These typings are then used to define the root module and a child module.<br/>
The code for the root module is
[here](https://github.com/KyleMayes/vuex-typescript-example/blob/master/src/store/index.ts)
and the code for the child module is
[here](https://github.com/KyleMayes/vuex-typescript-example/blob/master/src/store/submodule.ts).

### Usage in Class Component

Now that we have a strongly typed definition of a root module and a child module,
we can use the store and these types from a class component.</br>
The code to do so in the App component is
[here](https://github.com/KyleMayes/vuex-typescript-example/blob/master/src/App.vue).
