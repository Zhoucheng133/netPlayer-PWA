<template>
  <div>
    <audio :src="nowplayURL" ref="player" controls @ended="nextSong"></audio><br/>
    <!-- <a-button @click="toggleSong">暂停/播放</a-button>
    <a-button @click="nextSong">下一首</a-button>
    <a-button @click="preSong">上一首</a-button>
    <a-button @click="changeMode('random')">随机播放</a-button>
    <a-button @click="changeMode('list')">顺序播放</a-button>
    播放: {{ isPlay }} -->
  </div>
</template>

<script>

// test!
// import axios from 'axios';
// import {url, username, salt, token} from "./test.js";
// test end

export default {
  props: {
    username: String,
    token: String,
    salt: String,
    url: String,
    playMode: String,
  },
  data() {
    return {
      ap: undefined,

      playList: [],
      playIndex: 0,

      nowplayURL: '',

      isPlay: false,
    }
  },
  methods: {
    // 播放制定歌曲
    play(songList, playIndex){
      var that=this;
      this.playList=songList.map(function(item){
        return {
          id: item.id,
          name: item.title,
          artist: item.artist,
          url: that.url+"/rest/stream?v=1.12.0&c=netPlayer&f=json&u="+that.username+"&t="+that.token+"&s="+that.salt+"&id="+item.id,
          cover: that.url+"/rest/getCoverArt?v=1.12.0&c=netPlayer&f=json&u="+that.username+"&t="+that.token+"&s="+that.salt+"&id="+item.id,
        }
      });
      this.playIndex=playIndex;
      this.nowplayURL=this.playList[this.playIndex].url;
      this.$nextTick(()=>{
        that.$refs.player.play();
        that.isPlay=true;
        that.$emit("isPlay", this.isPlay);
        that.setMedia();
      })
    },
    // 切换暂停/播放
    toggleSong(){
      if(this.isPlay){
        this.$refs.player.pause();
        this.isPlay=false;
      }else{
        this.$refs.player.play();
        this.isPlay=true;
      }
      this.$emit("isPlay", this.isPlay);
    },
    // 下一首
    nextSong(){
      var that=this;
      if(this.playMode=='list'){
        this.$refs.player.pause();
        this.isPlay=false;
        this.playIndex=(this.playIndex+1+this.playList.length)%this.playList.length;
        this.$refs.player.src=this.playList[this.playIndex].url;
        this.$nextTick(()=>{
          that.$refs.player.play();
          that.isPlay=true;
          that.$emit("updatePlayIndex", that.playIndex);
        })
      }else{
        this.$refs.player.pause();
        this.isPlay=false;
        var tmp=Math.floor((Math.random()*this.playList.length));
        this.playIndex=tmp;
        this.$refs.player.src=this.playList[this.playIndex].url;
        this.$nextTick(()=>{
          that.$refs.player.play();
          that.isPlay=true;
          that.$emit("updatePlayIndex", that.playIndex);
        })
      }
    },
    // 上一首
    preSong(){
      var that=this;
      this.playIndex=(this.playIndex-1+this.playList.length)%this.playList.length;
      this.$refs.player.src=this.playList[this.playIndex].url;
      this.$nextTick(()=>{
        that.$refs.player.play();
        that.isPlay=true;
        that.$emit("updatePlayIndex", that.playIndex);
      })
    },
    // 模式: list, random
    // changeMode(mode){
    //   this.playMode=mode;
    // },
    setMedia(){
      // console.log("hello?");
      var that=this;
      navigator.mediaSession.metadata = new MediaMetadata({
        title: this.playList[this.playIndex].name,
        artist: this.playList[this.playIndex].artist,
        album: '',
        artwork: [
            {
              src: this.url+"/rest/getCoverArt?v=1.12.0&c=netPlayer&f=json&u="+this.username+"&t="+this.token+"&s="+this.salt+"&id="+this.playList[this.playIndex].id+"&size="+512,
              sizes: "512x512",
              type: "image/png",
            },
          ],
      });
    
      navigator.mediaSession.setActionHandler('play', function() {
        that.toggleSong();
      });

      navigator.mediaSession.setActionHandler('pause', function() {
        that.toggleSong();
      });

      navigator.mediaSession.setActionHandler('previoustrack', function() {
        that.preSong();
      });

      navigator.mediaSession.setActionHandler('nexttrack', function() {
        that.nextSong();
      });
    }
  },
  watch: {
    playList: function(){
      // console.log("update_list");
      this.setMedia();
    },
    playIndex: function(){
      // console.log("update_index");
      this.setMedia();
    }
  },
}
</script>