<template>
  <div class="main" @touchmove="touchMove">
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      touchY: 0,
    }
  },
  methods: {
    touchMove(e){
      if(this.touchY==0){
        this.touchY=e.changedTouches[0].pageY;
        return;
      }else{
        if(e.changedTouches[0].pageY-10>this.touchY){
          this.$emit("hideSongOperation");
          this.touchY=0;
          return;
        }else{
          this.touchY=0;
          return;
        }
      }
    }
  },
}
</script>

<style scoped>
.main{
  height: 300px;
  width: 100%;
  background-color: white;
  box-shadow: 0 0px 10px 1px rgba(97, 97, 97, 0.1);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
</style>