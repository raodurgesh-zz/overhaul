

import  Vue from 'vue';
import * as service from '../services';
import {setAuthToken} from '../services/endpoints'
import * as type from './mutations';


const toastConfig = {
  horizontalPosition :'center'
}



export const login =  async({ commit },creds) => {
  commit(type.AUTH_PROGRESS, true); 
  let res = await service.loginService(creds);
    if(res.data.status != "error"){
      let token = res.data.result['X-Token'];
        setAuthToken(token);
        router.push({name:'contestList'});
        commit(type.LOGIN_SUCCESS,token );
    }else{
      let error = Array.isArray(res.data.errors) ? res.data.errors[0] : res.data.errors;
      let msg = error && error.description;
      commit(type.LOGIN_FAIL, msg);  
     // Vue.toast(msg, toastConfig);
    }
    commit(type.AUTH_PROGRESS, false); 
}

export const logout =  async({ commit },creds) => {
  commit(type.AUTH_PROGRESS, true); 
  commit(type.LOGOUT); 
  commit(type.AUTH_PROGRESS, false); 
}



export const loadcontest =  async({ commit },params) => {
  commit(type.CONTEST_PROGRESS , true);
  let res = await service.getContest(params);
    if(res.data.status != "error"){
       let { contest_list : list  , count  } = res.data.result;
       commit(type.FETCH_CONTEST_SUCCESS ,{list ,moreData : count > 0});
    }else{
      let msg = res.data.errors[0].description;
      commit(type.FETCH_CONTEST_FAIL, msg);
      Vue.toast(msg , toastConfig);
    }
  commit(type.CONTEST_PROGRESS , false);
}


export const contestDetail =  async({ commit },params) => {
  commit(type.CONTEST_PROGRESS , true);
  let res = await service.contestDetail(params);
    if(res.data.status != "error"){
       let detail = {...res.data.result, isDetailInfo : true , contest_id : params.id}
        commit(type.FETCH_CONTEST_DETAIL ,detail);
    }else{
      let msg = res.data.errors[0].description;
      commit(type.FETCH_CONTEST_FAIL, msg);  
      Vue.toast(msg, toastConfig);
    }
    commit(type.CONTEST_PROGRESS , false);
}

export const createContest =  async({ commit },params) => {
  commit(type.CONTEST_PROGRESS , true);
  let res = await service.createContest(params);
    if(res.data.status != "error"){
      router.push('/app/contest/'+res.data.result.contest_id);
    }else{
      let msg = res.data.errors[0].description;
      commit(type.FETCH_CONTEST_FAIL, msg);  
      Vue.toast(msg, toastConfig);
    }
    commit(type.CONTEST_PROGRESS , false);
}
 

export const updateContest =  async({ commit },params) => {
  commit(type.CONTEST_PROGRESS , true);
  let res = await service.editContest(params);
    if(res.data.status != "error"){
       commit(type.FETCH_CONTEST_SUCCESS ,{list : [res.data.result]});
       router.push({name:'contestDetail', id : params.id });
    }else{
      let msg = res.data.errors[0].description;
      commit(type.FETCH_CONTEST_FAIL, msg);  
      Vue.toast(msg, toastConfig);
    }
    commit(type.CONTEST_PROGRESS , false);
} 

export const deleteContest =  async({ commit },params) => {
  if(confirm('Are sure you want to delete this contest?') == false) return;
  commit(type.CONTEST_PROGRESS , true);
  let res = await service.deleteContest(params);
    if(res.data.status != "error"){
      commit(type.DELETE_CONTEST_SUCCESS, params.id);
    }else{
      let msg = res.data.errors[0].description;
      commit(type.FETCH_CONTEST_FAIL, msg);  
      Vue.toast(msg, toastConfig);
    }
    commit(type.CONTEST_PROGRESS , false);
    router.push({name:'contestList'});
} 

export const expireContest =  async({ commit },params) => {
  if(confirm('Are sure you want to expire this contest?') == false) return;
  commit(type.CONTEST_PROGRESS , true);
  let res = await service.expireContest(params);
    if(res.data.status != "error"){
     // commit(type.DELETE_CONTEST_SUCCESS, params.id);
    }else{
      let msg = res.data.errors[0].description;
      commit(type.FETCH_CONTEST_FAIL, msg);  
      Vue.toast(msg, toastConfig);
    }
    commit(type.CONTEST_PROGRESS , false);
}



export const filter =  async({ commit },filter) => {
 // commit(type.CONTEST_PROGRESS , true);
  commit(type.CONTEST_FILTER , filter); 
 // commit(type.CONTEST_PROGRESS , false);
}
