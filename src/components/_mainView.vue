<template>
  <div>
    <div :class="animationForw? 'mask' : 'maskNew'" v-if="showMask"></div>
    <audioController 
      ref="audioPlayer" 
      style="display: none;" 
      :url="url" 
      :username="username" 
      :salt="salt" 
      :token="token" 
      :playMode="playMode" 
      @isPlay="isPlayChange" 
      @updatePlayIndex="updatePlayIndex"  />

    <div class="appBar">{{ pageNow }}</div>
    <div class="navgBar">
      <playingBar 
        :isPlay="isPlay" 
        :playList="playList" 
        :playIndex="playIndex" 
        :url="url" 
        :username="username" 
        :salt="salt" 
        :token="token" 
        @toggleSong="toggleSong" 
        @nextSong="nextSong" 
        @showPlayingView="showPlayingView"/>

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

    <playingView 
      class="playingView" 
      :style="{'transform': 'translate(0, '+playingViewTrans+')'}" 
      @hidePlayingView="hidePlayingView" 
      :playList="playList" 
      :isPlay="isPlay" 
      :playFrom="playFrom" 
      :playIndex="playIndex" 
      :url="url" :username="username" 
      :salt="salt" 
      :playMode="playMode" 
      :token="token" 
      @updateAllSongs="updateAllSongs" 
      @playSong="playSong"
      @toggleSong="toggleSong" 
      @changePlayMode="changePlayMode"
      @nextSong="nextSong"
      @preSong="preSong"/>

    <allSongView 
      class="pageContent" 
      v-show="pageNow=='所有音乐'" 
      :isPlay="isPlay" 
      :playFrom="playFrom" 
      :playIndex="playIndex" 
      :url="url" 
      :username="username" 
      :salt="salt" 
      :token="token" 
      @updateAllSongs="updateAllSongs" 
      @playSong="playSong" />

    <aboutView class="pageContent" v-show="pageNow=='关于'"/>
  </div>
</template>

<script>
import audioController from './audioController.vue';
import allSongView from './allSongView.vue';
import aboutView from './aboutView.vue';
import playingBar from './_playingBar.vue';
import playingView from './_playingView.vue';
export default {
  components: {
    audioController,
    allSongView,
    aboutView,
    playingBar,
    playingView
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

      playingViewTrans: '100vh',
      showMask: false,
      animationForw: true,

      playMode: 'list',
    }
  },
  methods: {
    changePlayMode(){
      if(this.playMode=='list'){
        this.playMode='random';
      }else{
        this.playMode='list';
      }
    },
    hidePlayingView(){
      this.playingViewTrans="100vh";
      this.animationForw=false;
      var that=this;
      setTimeout(() => {
        that.showMask=false;
        that.animationForw=true;
      }, 300);
    },
    nextSong(){
      if(this.playList.length!=0){
        this.$refs.audioPlayer.nextSong();
        this.isPlay=true;
      }
    },
    preSong(){
      if(this.playList.length!=0){
        this.$refs.audioPlayer.preSong();
      }
    },
    toggleSong(){
      if(this.playList.length!=0){
        this.$refs.audioPlayer.toggleSong();
      }
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
    },
    showPlayingView(){
      this.showMask=true;
      this.playingViewTrans='0';
    }
  },
  mounted() {
  },
}
</script>

<style scoped>
@keyframes opacityAnimation {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
@keyframes opacityBackAnimation {
  0%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
}
.mask, .maskNew{
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 80;
  background-color: rgba(0, 0, 0, .3);
}
.maskNew{
  animation: opacityBackAnimation linear forwards .3s;
}
.mask{
  animation: opacityAnimation linear forwards .3s;
}
.playingView{
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  transition: all ease-in-out .3s;
}
.pageContent{
  width: 100vw;
  height: calc(100vh - 150px);
  overflow-y: scroll;
  position: fixed;
  margin-top: 60px;
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
  z-index: 80;
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
  /* background-color: white; */
}
</style>