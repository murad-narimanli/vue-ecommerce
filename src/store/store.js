import Vue from "vue"
import Vuex from "vuex"
import {state} from "@/store/state";
import * as getters from "./getters/index"
import * as mutations from "./mutations"
import * as actions from "./actions"
import * as modules from "./modules"
Vue.use(Vuex)

export const store = new Vuex.Store({
    // inithial
    state,
    // call for computed
    getters,
    // mutations
    mutations,
    // for using actions $store.dispatch("actionname" , value)
    actions,
    // for using modules
    modules
})