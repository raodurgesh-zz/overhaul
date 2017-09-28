

<template>
  <div>
    <div >
      <ul  class="header">
        <li @click="goto('contestList')" class="home">
          <a> Home </a>
        </li>
        <li  class="middle">
          <a></a>
        </li>
         <li class="right">
          <ul>
            <li @click="goto('contestCreate')" ><a>Create</a></li>
            <li @click="goto('logout')"><a>Logout</a></li>
          </ul>
        </li>
      </ul>
    </div>
      <router-view></router-view>
    <div v-show="showLoader" class="backdrop">
        <loader class="loader"  v-show="true"></loader>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Loader from '../../loader';

export default {
  components:{  
    loader : Loader
  },
  methods :{
    goto(name){
      if(name.indexOf('contestList') >-1 )
        this.$store.dispatch('filter', 'all');
      this.$router.push({name})
    }
  },   
  computed: {
    ...mapGetters({ 
        isLoggedIn :'isLoggedIn',
        showLoader : 'contestInProgress'
    })
  },
  mounted(){
    if(!this.isLoggedIn)
        this.goto('logout'); 
  }
}

</script>

<style>

.home{
  padding-left: 20px;
}
.middle{
  flex: 1;
  cursor: default;
}
.logout{
  padding-right: 10px;
}

.loader{
  position: absolute;
  margin-top: 100px;
  margin-left: 40%
}

</style>
