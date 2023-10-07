<template>
  <div>
    <audioController ref="audioPlayer" style="display: none;" :url="url" :username="username" :salt="salt" :token="token" @isPlay="isPlayChange" @updatePlayIndex="updatePlayIndex"  />

    <div class="appBar">{{ pageNow }}</div>
    <div class="navgBar">
      <playingBar :isPlay="isPlay" :playList="playList" :playIndex="playIndex" :url="url" :username="username" :salt="salt" :token="token" @toggleSong="toggleSong" />
      <div class="bottomButtons">
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
      <div class="blank"></div>
    </div>

    <div class="pageIndex">
      <allSongView class="pageContent" v-show="pageNow=='所有音乐'" :isPlay="isPlay" :playFrom="playFrom" :playIndex="playIndex" :url="url" :username="username" :salt="salt" :token="token" @updateAllSongs="updateAllSongs" @playSong="playSong" />
      <aboutView class="pageContent" v-show="pageNow=='关于'"/>
    </div>
  </div>
</template>

<script>
import audioController from './audioController.vue';
import allSongView from './allSongView.vue';
import aboutView from './aboutView.vue';
import playingBar from './_playingBar.vue';
export default {
  components: {
    audioController,
    allSongView,
    aboutView,
    playingBar
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

      isPlay: false,
      playFrom: '',
      playIndex: 0,
      playList: [],
    }
  },
  methods: {
    toggleSong(){
      this.$refs.audioPlayer.toggleSong();
    },
    updatePlayIndex(val){
      this.playIndex=val;
    },
    isPlayChange(val){
      this.isPlay=val;
    },
    playSong(from ,list, index){
      this.playFrom=from;
      this.playIndex=index;
      this.playList=list;
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
  height: calc(100vh - 150px);
  padding-top: 60px;
  position: fixed;
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
.bottomButtons{
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
}
.navgBar{
  display: grid;
  grid-template-rows: 70px 70px 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 150px;
  box-shadow: 0 0px 10px 1px rgba(97, 97, 97, 0.1);
  background-color: rgba(255, 255, 255, .8);
  backdrop-filter: blur(5px);
}
.blank{
  height: 10px;
  background-color: #fff;
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