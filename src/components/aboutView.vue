<template>
  <div class="content">
    <img src="@/assets/logo.png" alt="" width="100px">
    <div class="title">netPlayer Web (PWA)</div>
    <div class="version">Develop v0.1</div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.version{
  margin-top: 10px;
  color: rgb(170, 170, 170);

}
.title{
  margin-top: 20px;
  font-size: 18px;
}
.content{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>