<template>
  <div>
    <!-- <input type="text" maxlength="10" v-model="creds.mob">
    <input type="text" v-model="creds.pswd">
    <button @click="validate">Login</button> -->

<div class="login-page">
  <div class="form">
    <form class="login-form">
      <input type="text" placeholder="mobile number" maxlength="10" v-model="creds.mob">
      <input type="password" placeholder="password"  v-model="creds.pswd">
      <button @click.prevent="validate" class="button-success pure-button" >Login</button>
      <div style="margin-left:85px; margin-top:10px">
        <loader v-show ="showLoader" ></loader>
      </div>
        <div class="error" v-for ="error in errors" :key ="error" >
          {{error}}
        </div>
      <div  class="error" v-if ="loginError">
        {{loginError}}
      </div>
    </form>
  </div>
</div>

  </div>
</template>

<script>

import {mapGetters} from 'vuex';
import { validator } from '../../common/validator'
import Loader from '../loader';

export default {

  components:{
      'loader': Loader
  },
  data() {
    return {
      creds: {
        mob:  '',
        pswd: ''
      },
      errors:[]
    }
  },
  methods: {
    validCredential() {
      let isValid = true;

      if (this.creds.mob.trim().length == 0) {
        isValid = false;
        this.errors.push("mobile number is required!");
      }
      if (this.creds.pswd.trim().length == 0) {
        this.errors.push("password is required!");
        isValid = false;
      }

      setTimeout(()=>{ this.errors =[] },5000);


      return isValid;
    },
    validate: function() {
      this.errors = [];
      if(!this.validCredential()) return;
      this.$store.dispatch("login", this.creds);
    }
  },
  computed:{
        ...mapGetters({ 
        showLoader :'loginInProgress',
        loginError :'loginError'
    })
    
  }
}
</script>

<style scoped lang="scss">

.login-page {
    width: 360px;
    padding: 8% 0 0;
    margin: auto;
    .error {
      color: #FF5722;
     // text-align: left;
    }
    .form {
        position: relative;
        z-index: 1;
        background: #FFFFFF;
        max-width: 360px;
        margin: 0 auto 100px;
        padding: 45px;
        text-align: center;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
        background-color: #795548;
     input {
          font-family: "Roboto", sans-serif;
          outline: 0;
          background: #f2f2f2;
          width: 100%;
          border: 0;
          margin: 0 0 15px;
          padding: 15px;
          box-sizing: border-box;
          font-size: 14px;
      }
    }
}



</style>

