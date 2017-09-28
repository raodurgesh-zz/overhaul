
import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

import { getAuthToken} from '../services/endpoints'

Vue.use(Vuex)

const state = {
  auth :{
    isLoggedIn : !!getAuthToken(),
    token :getAuthToken(),
    inProgress : false,
    error : false
  },
  app :{
    contest: {},
    inProgress: false,
    error : false,
    filter :null,
    moreData : false,
    isLoaded : false
  }
}

 global.store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations : mutations.mutation
})

export default global.store;
