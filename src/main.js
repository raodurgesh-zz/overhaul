// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import infiniteScroll from 'vue-infinite-scroll';
import VueAxios from 'vue-axios';
import axios from 'axios';
import Toast from 'vue-easy-toast';  
import 'vue-easy-toast/dist/vue-easy-toast.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import './styles/app.scss'

import App from './App';
import router from './router';
import {lodash} from './plugins.js';
import store from './store';
import {registerHttpInterceptors}  from './services/endpoints';

Vue.use(infiniteScroll);
Vue.use(VueAxios, axios)
Vue.use(lodash);
Vue.use(Toast);

Vue.config.productionTip = false

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created(){
    registerHttpInterceptors();
  }
})
