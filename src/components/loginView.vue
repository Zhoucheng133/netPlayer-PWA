<template>
  <div class="main">
    <div class="container">
      <div class="titles">
        <div class="title">登录到你的音乐服务器</div>
        <div class="subtitle">输入你的音乐服务器信息来登录</div>
      </div>
      <div class="inputs">
        <div class="input">
          <div class="inputName">服务器URL地址</div>
          <div class="inputArea">
            <a-icon type="global" class="inputIcon" />
            <form>
              <input type="text" class="inputContent" v-model="inputURL" autocomplete="off">
            </form>
          </div>
        </div>
        <div class="input" style="margin-top: 30px;">
          <div class="inputName">用户名</div>
          <div class="inputArea">
            <a-icon type="user" class="inputIcon" />
            <form>
              <input type="text" class="inputContent" v-model="inputName" autocomplete="off">
            </form>
          </div>
        </div>
        <div class="input" style="margin-top: 30px;">
          <div class="inputName">密码</div>
          <div class="inputArea">
            <a-icon type="key" class="inputIcon" />
            <form>
              <input type="password" class="inputContent" v-model="inputPass" autocomplete="off">
            </form>
          </div>
        </div>
      </div>
      <div class="loginButton" @click="loginController">
        <div>登录</div>
        <a-icon type="right" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
var CryptoJS=require('crypto-js');
export default {
  data() {
    return {
      inputURL: '',
      inputName: '',
      inputPass: '',
    }
  },
  methods: {
    // 生成随机数
    generateRandomString(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }
      return result;
    },
    loginController(){
      if(this.inputURL==''){
        this.$message.error("没有输入URL地址");
        return;
      }else if(this.inputName==''){
        this.$message.error("没有输入用户名");
        return;
      }else if(this.inputPass==''){
        this.$message.error("没有输入密码");
        return;
      }
      if(this.inputURL.slice(-1)=='/'){
        this.inputURL=this.inputURL.slice(0,-1);
      }
      const salt = this.generateRandomString(6);
      const token = CryptoJS.MD5(this.inputPass + salt).toString();
      axios.get(this.inputURL+'/rest/ping.view?v=1.12.0&c=netPlayer&f=json&u='+this.inputName+'&t='+token+'&s='+salt)
      .then((response)=>{
        if(response.data['subsonic-response'].status=='ok'){
          this.$message.success("登录成功");
          localStorage.setItem("username", this.inputName);
          localStorage.setItem('url', this.inputURL);
          localStorage.setItem('token', token);
          localStorage.setItem('salt', salt);
          this.$emit("toMain");
        }else{
          this.$message.error("账户或密码错误");
        }
      })
      .catch(()=>{
        this.$message.error("服务器连接错误");
      })
    }
  },
}
</script>

<style scoped>
.loginButton{
  align-self: flex-end;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100px;
  background-color: rgb(24, 144, 255);
  border-radius: 10px;
  color: white;
  font-size: 17px;
  font-weight: bold;
  margin-top: 20px;
}
.inputContent:focus-visible{
  border: none;
}
.inputContent, .inputContent:focus{
  margin-left: 5px;
  border: none;
  outline: medium;
}
.inputIcon{
  font-size: 20px;
}
.inputArea{
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.inputName{
  color: rgb(170, 170, 170);
}
.container{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.input{
  display: flex;
  flex-direction: column;
  padding: 12px 12px 12px 12px;
  align-items: flex-start;
  /* justify-content: center; */
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
  height: 80px;
  width: 250px;
}
.inputs{
  margin-top: 40px;
}
.titles{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.subtitle{
  color: rgb(170, 170, 170);
}
.title{
  font-weight: bolder;
  font-size: 20px;
}
.main{
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(250, 250, 250);
}
</style>