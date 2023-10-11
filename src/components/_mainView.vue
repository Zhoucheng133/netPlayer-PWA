<template>
  <div>
    <div :class="animationForw? 'mask' : 'maskNew'" v-if="showMask" @click="maskController"></div>
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
      :lovedSongs="lovedSongs" 
      @updateAllSongs="updateAllSongs" 
      @showSongOperation="showSongOperation"
      @playSong="playSong" />

    <lovedSongView 
    class="pageContent" 
    :playIndex="playIndex" 
    :playFrom="playFrom" 
    :lovedSongs="lovedSongs" 
    @showSongOperation="showSongOperation" 
    @playSong="playSong"
    v-show="pageNow=='我喜欢的'"/>

    <playListView 
    class="pageContent" 
    :url="url" 
    :username="username" 
    :salt="salt" 
    :token="token" 
    @listOpen="listOpen"
    v-show="pageNow=='我的歌单'"/>

    <searchView 
    class="pageContent" 
    v-show="pageNow=='搜索'"/>

    <aboutView class="pageContent" v-show="pageNow=='关于'"/>

    <listContentView 
    :style="{'transform': 'translate('+listContentX+', 0px)'}" 
    :selectedListID="selectedListID" 
    :url="url" 
    :username="username" 
    :salt="salt" 
    :token="token" 
    :lovedSongs="lovedSongs" 
    :playFrom="playFrom" 
    :playIndex="playIndex" 
    :playListId="playListId" 
    @playSong="playSong" 
    @backMain="backMain"
    class="listContent"/>

    <songOperation 
    :style="{'transform': 'translate(0px, '+dialogX+')'}" 
    :operationSongItem="operationSongItem"
    :url="url" 
    :username="username" 
    :salt="salt" 
    :token="token" 
    :songOperationFrom="songOperationFrom"
    :lovedSongs="lovedSongs" 
    @hideSongOperation="hideSongOperation"
    class="operationDialog"/>
  </div>
</template>

<script>

// 图层备注
// 主页面的appBar: 没有指定
// 主页面内容: 没有指定
// 底部NavigationBar: 95
// 播放列表内容: 90
// 播放条: 80
// 主页面的遮罩: 80
// 播放页: 100
// 操作Dialog: 200
const axios=require("axios");

import audioController from './audioController.vue';
import allSongView from './allSongView.vue';
import lovedSongView from './lovedSongView.vue';
import aboutView from './aboutView.vue';
import playListView from './playListView.vue';
import listContentView from './listContentView.vue';
import searchView from './searchView.vue';
import playingBar from './pageParts/playingBar.vue';
import playingView from './pageParts/playingView.vue';
import songOperation from './pageParts/songOperation.vue';
export default {
  components: {
    audioController,
    allSongView,
    aboutView,
    playingBar,
    playingView,
    lovedSongView,
    playListView,
    searchView,
    listContentView,
    songOperation
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

      lovedSongs: [],

      listContentX: '100vw',
      selectedListID: '',
      playListId: '',

      dialogX: '100%',
      operationSongItem: {},
      songOperationFrom: '',
    }
  },
  methods: {
    hideSongOperation(){
      this.animationForw=false;
      var that=this;
      setTimeout(() => {
        that.showMask=false;
        that.animationForw=true;
      }, 300);
      this.dialogX='100%';
    },
    maskController(){
      if(this.dialogX=='0px'){
        this.hideSongOperation();
      }
    },
    showSongOperation(item, listID){
      this.songOperationFrom=listID;
      this.operationSongItem=item;
      this.dialogX='0px';
      this.showMask=true;
    },
    backMain(){
      this.listContentX="100vw";
    },
    listOpen(id){
      this.selectedListID=id;
      this.listContentX="0px";
    },
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
    playSong(from ,list, index, playListId){
      this.playFrom=from;
      this.playIndex=index;
      this.playList=list;
      if(playListId!=undefined){
        this.playListId=playListId;
      }else{
        this.playListId="";
      }
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
    },
    getLovedSongs(){
      axios.get(this.url+'/rest/getStarred?v=1.12.0&c=netPlayer&f=json&u='+this.username+'&t='+this.token+'&s='+this.salt)
      .then((response)=>{
        this.lovedSongs=response.data['subsonic-response'].starred.song;
      })
      .catch(()=>{
        this.$message.error("服务器连接出错");
      })
    },
  },
  created() {
    this.getLovedSongs();
  },
  watch: {
    pageNow: function(newVal, oldVal){
      if(oldVal=='我的歌单' && newVal!='我的歌单'){
        this.listContentX='100vw';
      }
    }
  },
  mounted() {
  },
}
</script>

<style scoped>
.operationDialog{
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 200;
  transition: all ease-in-out .3s;
}
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
.listContent{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 90;
  width: 100%;
  height: calc(100vh - 164px);
  background-color: white;
  transition: all ease-in-out .3s;
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
  height: calc(100vh - 60px - 164px);
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
  grid-template-rows: 70px 70px 24px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 164px;
  z-index: 80;
  box-shadow: 0 0px 10px 1px rgba(97, 97, 97, 0.1);
  background-color: rgba(255, 255, 255, .8);
  backdrop-filter: blur(5px);
  z-index: 95;
}
.blank{
  height: 24px;
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