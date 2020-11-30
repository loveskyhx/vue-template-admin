import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
Vue.use(Vuex);
const state = {
//数据存放点
};
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
})