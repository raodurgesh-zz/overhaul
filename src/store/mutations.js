

import { setAuthToken } from '../services/endpoints'

export const AUTH_PROGRESS = "AUTH_PROGRESS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";


export const CONTEST_PROGRESS = "CONTEST_PROGRESS";
export const FETCH_CONTEST_SUCCESS = "FETCH_CONTEST_SUCCESS";
export const FETCH_CONTEST_FAIL = "FETCH_CONTEST_FAIL";
export const CONTEST_FILTER = "CONTEST_FILTER";
export const FETCH_CONTEST_DETAIL = "FETCH_CONTEST_DETAIL";
export const DELETE_CONTEST_SUCCESS = "DELETE_CONTEST_SUCCESS";



const InitialState = {
  auth: {
    isLoggedIn: false,
    token: null,
    inProgress: false,
    error: false
  },
  app: {
    contest: {},
    inProgress: false,
    error: false,
    filter: null,
    moreData: false,
    isLoaded: false,
  }
}

export const mutation = {

  /***************** Auth  *****************************/
  [AUTH_PROGRESS](state, status) {

    state.auth = {
      ...state.auth,
      inProgress: status,
      error : status ? false  : state.auth.error
    }

  },
  [LOGIN_SUCCESS](state, token) {

    state.auth = {
      ...state.auth,
      isLoggedIn: true,
      token: token
    }
  },
  [LOGIN_FAIL](state, msg) {

    state.auth = {
      ...state.auth,
      error: msg
    }
  },
  [LOGOUT](state) {
    setAuthToken('');
    state.auth = { ...InitialState.auth }
  },


  /***************** Auth  *****************************/

  /***************** contest  *****************************/



  [CONTEST_PROGRESS](state, status) {
    state.app = {
      ...state.app,
      inProgress: status,

    }
  },

  [FETCH_CONTEST_SUCCESS](state, { list, moreData = state.app.moreData }) {
    state.app = {
      ...state.app,
      contest: Object.assign({}, state.app.contest, ...list.map(c => ({ [c.contest_id]: c }))),
      moreData,
      isLoaded: true,
    }
  },



  [FETCH_CONTEST_FAIL](state, msg) {
    state.app = {
      ...state.app,
      inProgress: false,
      error: msg,
    }
  },

  [DELETE_CONTEST_SUCCESS](state, id){

    let contest = {...state.app.contest};
    delete contest[id];

    state.app = { 
      ...state.app,
      contest
    }
  },



  [CONTEST_FILTER](state, filter) {
    state.app = {
      ...state.app,
      filter,
      isLoaded: false,
      inProgress: false,
      contest: []
    }
  },

  [FETCH_CONTEST_DETAIL](state, contest) {
    state.app = {
      ...state.app,
      contest: { ...state.app.contest, [contest.contest_id]: contest }
    }
  },









  /***************** contest  *****************************/



}