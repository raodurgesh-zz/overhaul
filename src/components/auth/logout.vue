<template>
<div>
   
</div>  
</template>

<script>
import {mapGetters} from 'vuex';
export default {
        
  mounted(){
      this.$store.dispatch('logout'); 
      this.$router.push({name:'login'});
  }
}
</script>

<style>

</style>
