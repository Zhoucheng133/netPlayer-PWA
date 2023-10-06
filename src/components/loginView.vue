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
            <input type="text" class="inputContent" v-model="inputURL">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputURL: '',
    }
  },
}
</script>

<style scoped>
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
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
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