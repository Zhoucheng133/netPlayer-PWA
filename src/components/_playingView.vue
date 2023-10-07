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
    hidePlayingView(){},
    touchMove(e){
      if(this.touchY==0){
        this.touchY=e.changedTouches[0].pageY;
        return;
      }else{
        if(e.changedTouches[0].pageY-10>this.touchY){
          this.$emit("hidePlayingView");
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
  height: 100%;
  width: 100%;
  background-color: white;
}
</style>