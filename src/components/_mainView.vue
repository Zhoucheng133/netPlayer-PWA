<template>
  <div>
    <audioController ref="audioPlayer" style="display: none;" :url="url" :username="username" :salt="salt" :token="token" @isPlay="isPlayChange" @updatePlayIndex="updatePlayIndex"  />

    <div class="appBar">{{ pageNow }}</div>
    <div class="navgBar">
      <div :class="pageNow=='所有音乐'?'navgItem_selected':'navgItem'" @click="pageChang('所有音乐')">
        <i class="bi bi-music-note navgIcon"></i>
      </div>
      <div :class="pageNow=='我喜欢的'?'navgItem_selected':'navgItem'" @click="pageChang('我喜欢的')">
        <i class="bi bi-heart-fill navgIcon"></i>
      </div>
      <div :class="pageNow=='我的歌单'?'navgItem_selected':'navgItem'" @click="pageChang('我的歌单')">
        <i class="bi bi-music-note-list navgIcon"></i>
      </div>
      <div :class="pageNow=='搜索'?'navgItem_selected':'navgItem'" @click="pageChang('搜索')">
        <i class="bi bi-search navgIcon"></i>
      </div>
      <div :class="pageNow=='关于'?'navgItem_selected':'navgItem'" @click="pageChang('关于')">
        <i class="bi bi-info-circle-fill navgIcon"></i>
      </div>
    </div>

    <div class="pageIndex">
      <allSongView class="pageContent" v-show="pageNow=='所有音乐'" :isPlay="isPlay" :playFrom="playFrom" :playIndex="playIndex" :url="url" :username="username" :salt="salt" :token="token" :allSongs="allSongs" @updateAllSongs="updateAllSongs" @playSong="playSong" />
    </div>
  </div>
</template>

<script>
import audioController from './audioController.vue';
import allSongView from './allSongView.vue';
export default {
  components: {
    audioController,
    allSongView
  },
  props: {
    url: String,
    username: String,
    token: String,
    salt: String,
  },
  data() {
    return {
      pageNow: '所有音乐',

      allSongs: [],

      isPlay: false,
      playFrom: '',
      playIndex: 0,
    }
  },
  methods: {
    updatePlayIndex(val){
      this.playIndex=val;
    },
    isPlayChange(val){
      this.isPlay=val;
    },
    playSong(from ,list, index){
      this.playFrom=from;
      this.playIndex=index;
      this.$refs.audioPlayer.play(list, index);
    },
    updateAllSongs(val){
      this.allSongs=val;
    },
    pageChang(pageName){
      if(pageName==this.pageNow){
        return;
      }
      this.pageNow=pageName;
    }
  },
}
</script>

<style scoped>
.pageContent{
  height: 100%;
  width: 100%;
  overflow-y: scroll;
}
.pageIndex{
  width: 100vw;
  height: calc(100vh - 80px);
  padding-top: 60px;
  /* background-color: lightskyblue; */
}
.navgItem_selected{
  color: rgb(24, 144, 255);
}
.navgIcon{
  font-size: 18px;
}
.navgItem{
  color: grey;
}
.navgItem, .navgItem_selected{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.navgBar{
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 80px;
  box-shadow: 0 0px 10px 1px rgba(97, 97, 97, 0.1);
  background-color: rgba(255, 255, 255, .8);
  backdrop-filter: blur(5px);
}
.appBar{
  position: fixed;
  width: 100vw;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(24, 144, 255);
  font-size: 18px;
  /* border-bottom: 1px solid; */
  background-color: white;
}
</style>