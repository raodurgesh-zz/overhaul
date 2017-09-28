
import Vue from 'vue';


let baseURL = 'http://139.59.0.105:6543';

export const endPoint = {
  login: 'api/v1/admin/auth',
  outlet: 'api/v1/admin/findoutlet',
  createContest: 'api/v1/admin/contest',
  contest: 'api/v1/admin/contest'
}

export const getUrl = (url) => {
  return `${baseURL}/${url}`
}


export const setAuthToken = function (token) {
  localStorage['token'] = token;
}

export const getAuthToken = function () {
  return localStorage['token'];
}

export const getErrorResponse = (error)=>{
    return error.response ||{data :{ status : "error",errors : [{description :'error!'}] }}
}



function updateRequestConfig(config){
    config.headers['X-Token'] = getAuthToken();
    config.data = {...config.data ,"tz":"Asia/Kolkata" , "et": Date.now()+'' }
    return config;
}



export function registerHttpInterceptors(){
// Add a request interceptor
Vue.axios.interceptors.request.use(function (config) {

  config = updateRequestConfig(config);
  return config;
}, function (error) {
  return Promise.reject(error);
});

Vue.axios.interceptors.response.use((response) => { // intercept the global error
    return response
  }, function (error) {
    let originalRequest = error.config
    if (error.message == "Network Error"){
      Vue.toast("Unauthorized request !",{horizontalPosition :"center"});
      store.dispatch('logout'); 
      router.push({name :'login'});
      return;
    }
    let errorName = error.response && error.response.data && error.response.data.errors &&  error.response.data.errors[0].name;     
    if(errorName == "X-Token") {
      store.dispatch('logout'); 
      router.push({name :"login"})
    };  
    
    return Promise.resolve(getErrorResponse(error));

  })




// Vue.axios.interceptors.response.use((response) => { // intercept the global error
//     return response
//   }, function (error) {
//     let originalRequest = error.config
//     if (error.response.status === 401 && !originalRequest._retry) { // if the error is 401 and hasent already been retried
//       originalRequest._retry = true // now it can be retried 
//       return Vue.axios.post('/users/token', null).then((data) => {
//         store.dispatch('authfalse') 
//         store.dispatch('authtruth', data.data)
//         originalRequest.headers['Authorization'] = 'Bearer ' + store.state.token // new header new token
//         return Vue.axios(originalRequest) // retry the request that errored out
//       }).catch((error) => {
//         for (let i = 0; i < error.response.data.errors.length; i++) {
//           if (error.response.data.errors[i] === 'TOKEN-EXPIRED') {
//             auth.logout()
//             return
//           }
//         }
//       })
//     }
//     if (error.response.status === 404 && !originalRequest._retry) {
//       originalRequest._retry = true
//       window.location.href = '/'
//       return
//     }
//     return Promise.reject(error)
//   })

}

