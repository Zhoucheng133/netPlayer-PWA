<template>
  <div id="app">
    <loadingView v-if="login==null" />
    <loginView />
  </div>
</template>

<script>
import loadingView from '@/components/_loadingView.vue';
import loginView from '@/components/loginView.vue';
// const axios=require("axios");

export default {
  components:{
    loadingView,
    loginView,
  },
  data() {
    return {
      login: null,
    }
  },
  methods: {
    getUserInfo(){
      if(localStorage.getItem("username")==null || localStorage.getItem("token")==null || localStorage.getItem("salt")==null){
        return false;
      }
    }
  },
  created() {
    this.getUserInfo();
    if(!this.getUserInfo()){
      this.login=false;
    }
  },
}
</script>

<style>
body{
  margin: 0;
}
#app {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
