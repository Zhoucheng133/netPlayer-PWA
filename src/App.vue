<template>
  <div id="app">
    <loadingView v-if="login==null" />
    <loginView v-else-if="login==false" @toMain="routerToMain" />
    <mainView v-else 
    :url="url" 
    :username="username" 
    :salt="salt" 
    :token="token" />

  </div>
</template>

<script>
import loadingView from '@/components/_loadingView.vue';
import loginView from '@/components/loginView.vue';
import mainView from './components/_mainView.vue';
const axios=require("axios");

export default {
  components:{
    loadingView,
    loginView,
    mainView
  },
  data() {
    return {
      login: null,

      username: '',
      url: '',
      salt: '',
      token: ''
    }
  },
  methods: {
    routerToMain(){
      this.login=true;
      this.url=localStorage.getItem("url");
      this.username=localStorage.getItem("username");
      this.token=localStorage.getItem("token");
      this.salt=localStorage.getItem("salt");
    },
    async getUserInfo(){
      if(localStorage.getItem("url")==null || localStorage.getItem("username")==null || localStorage.getItem("token")==null || localStorage.getItem("salt")==null){
        this.login=false;
        return;
      }
      var url=localStorage.getItem("url");
      this.url=url;
      var username=localStorage.getItem("username");
      this.username=username;
      var token=localStorage.getItem("token");
      this.token=token;
      var salt=localStorage.getItem("salt");
      this.salt=salt;
      
      var flag=false;
      await axios.get(url+'/rest/ping.view?v=1.12.0&c=netPlayer&f=json&u='+username+'&t='+token+'&s='+salt)
      .then((response)=>{
        if(response.data['subsonic-response'].status=='ok'){
          flag=true;
        }else{
          localStorage.clear();
          flag=false;
        }
      })
      .catch(()=>{
        flag=false;
      })

      this.login=flag;
    }
  },
  created() {
    this.getUserInfo();
  },
}
</script>

<style>
body{
  margin: 0;
  overflow: hidden;
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
