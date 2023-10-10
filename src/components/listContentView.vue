<template>
  <div>
    <div class="backArrow" @click="backMain"><i class="bi bi-arrow-left-short backIcon"></i></div>
    <div class="appBar">
      <div class="name">Hello</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    backMain(){
      console.log("??");
      this.$emit("backMain");
    }
  },
}
</script>

<style scoped>
.backIcont{
  transform: translate(0, -2px);
}
.backArrow{
  color: rgb(24, 144, 255);
  position: fixed;
  z-index: 10;
  height: 60px;
  display: flex;
  align-items: center;
  font-size: 32px;
  margin-left: 10px;
}
.appBar{
  position: fixed;
  width: 100vw;
  height: 60px;
  justify-content: center;
  display: flex;
  align-items: center;
  color: rgb(24, 144, 255);
  font-size: 18px;
}
</style>