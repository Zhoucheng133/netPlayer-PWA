<template>
  <div class="main" @touchmove="touchMove">
    <div class="hideButton" @click="hidePlayingView">
      <i class="bi bi-arrow-bar-down"></i>
    </div>
    <div class="cover">
      <img v-if="playList.length==0" src="@/assets/blank.jpg" alt="cover" width="250px" class="coverImg">
      <img v-else :src="getCoverLink()" alt="cover" width="250px" class="coverImg">
    </div>
    <div class="title">
      {{ getTitle() }}
    </div>
    <div class="artist">
      {{ getArtist() }}
    </div>
    <div class="controls">
      <div class="control" @click="preSong"><i class="bi bi-skip-start-fill"></i></div>
      <div class="control" @click="toggleSong">
        <i class="bi bi-play-fill" style="font-size: 60px;" v-if="!isPlay"></i>
        <i class="bi bi-pause-fill" style="font-size: 60px;" v-else></i>
      </div>
      <div class="control" @click="nextSong"><i class="bi bi-skip-end-fill"></i></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    url: String,
    username: String,
    salt: String,
    token: String,
    playList: Array,
    playIndex: Number,
    isPlay: Boolean
  },
  data() {
    return {
      touchY: 0,
    }
  },
  methods: {
    preSong(){
      this.$emit('preSong');
    },
    nextSong(){
      this.$emit('nextSong');
    },
    toggleSong(){
      this.$emit('toggleSong');
    },
    getArtist(){
      return this.playList.length==0 ? '/' : this.playList[this.playIndex].artist;
    },
    getTitle(){
      return this.playList.length==0 ? '没有正在播放的歌曲' : this.playList[this.playIndex].title;
    },
    getCoverLink(){
      return this.url+'/rest/getCoverArt?v=1.12.0&c=netPlayer&f=json&u='+this.username+'&t='+this.token+'&s='+this.salt+'&id='+this.playList[this.playIndex].id;
    },
    hidePlayingView(){
      this.$emit("hidePlayingView");
    },
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
.control{
  display: flex;
  justify-self: center;
  align-items: center;
}
.controls{
  margin-top: 40px;
  width: 230px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  font-size: 40px;
}
.artist{
  max-width: 85vw;
  color: rgb(170, 170, 170);
  margin-top: 10px;
  overflow: hidden;
  font-size: 18px;
	white-space:nowrap;
	text-overflow: ellipsis;
}
.title{
  max-width: 85vw;
  font-size: 25px;
  font-weight: bold;
  margin-top: 30px;
  overflow: hidden;
	white-space:nowrap;
	text-overflow: ellipsis;
}
.hideButton{
  position: fixed;
  margin: 0 auto;
  top: 20px;
  /* margin-top: 20px; */
  font-size: 30px;
}
.coverImg{
  border-radius: 20px;
}
.main{
  height: 100%;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>