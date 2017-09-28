<template>
<div>
    <router-view></router-view>
</div>  
</template>

<script>
import {mapGetters} from 'vuex';
export default {
        
computed: {
    ...mapGetters({ 
        isLoggedIn :'isLoggedIn'
    })
  },
  mounted(){
    if(this.isLoggedIn)
        this.$router.push({name:'contestList'});
    else
        this.$store.dispatch('logout'); 
  }
}
</script>

<style>

</style>
