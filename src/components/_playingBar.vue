<template>
  <div class="main">
    <div class="cover">
      <img v-if="playList.length==0" src="@/assets/blank.jpg" alt="cover" width="50px" class="coverImg">
      <img v-else :src="getCoverLink()" alt="cover" width="50px" class="coverImg">
    </div>
    <div class="info">
      <!-- {{ playList[playIndex].title }} -->
      <div class="title">{{ getTitle() }}</div>
      <div class="artist">{{ getArtist() }}</div>
    </div>
    <div class="controller">
      <div class="ctrlIcon" @click="toggleSong">
        <i class="bi bi-play-fill" v-if="!isPlay"></i>
        <i class="bi bi-pause-fill" v-else></i>
      </div>
      <div class="ctrlIcon">
        <i class="bi bi-skip-end-fill"></i>
      </div>
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
  methods: {
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
    }
  },
  data() {
    return {
      
    }
  },
  mounted() {
  },
}
</script>

<style scoped>
.ctrlIcon{
  display: flex;
  justify-content: center;
  align-items: center;
}
.controller{
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 30px;
}
.artist{
  color: rgb(170, 170, 170);
  overflow: hidden;
	white-space:nowrap;
	text-overflow: ellipsis;
  width: 100%;
  text-align: left;
}
.title{
  text-align: left;
  font-weight: bold;
  font-size: 15px;
  overflow: hidden;
  width: 100%;
	white-space:nowrap;
	text-overflow: ellipsis;
}
.info{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
	white-space:nowrap;
	text-overflow: ellipsis;
}
.coverImg{
  border-radius: 10px;
}
.cover{
  /* background-color: red; */
  padding: 10px 10px 10px 10px;
  border-radius: 5px;
}
.main{
  /* background-color: lightblue; */
  /* display: flex; */
  display: grid;
  padding-right: 15px;
  grid-template-columns: 70px auto 90px;
}
</style>