<template>
  <div>
    <audio :src="nowplayURL" ref="player" controls @ended="nextSong"></audio><br/>
    <a-button @click="go">开始</a-button>
    <a-button @click="toggleSong">暂停/播放</a-button>
    <a-button @click="nextSong">下一首</a-button>
    <a-button @click="preSong">上一首</a-button>
    <a-button @click="changeMode('random')">随机播放</a-button>
    <a-button @click="changeMode('list')">顺序播放</a-button>
    播放: {{ isPlay }}
  </div>
</template>

<script>

// test!
import axios from 'axios';
import {url, username, salt, token} from "./test.js";
// test end

export default {
  data() {
    return {
      ap: undefined,

      // 注意从localstorage获取到用户信息
      username: "",
      token: "",
      salt: "",
      url: "",

      playList: [],
      playIndex: 0,
      playMode: 'list',

      nowplayURL: '',

      isPlay: false,
    }
  },
  methods: {
    go(){
      axios.get(url+"/rest/getRandomSongs?v=1.12.0&c=netPlayer&f=json&u="+username+"&t="+token+"&s="+salt+"&size=500").then((response)=>{
        this.play(response.data['subsonic-response'].randomSongs.song, 0);
      })
    },
    // 播放制定歌曲
    play(songList, playIndex){
      this.playIndex=playIndex;
      this.playList=songList.map(function(item){
        return {
          id: item.id,
          name: item.title,
          artist: item.artist,
          created: item.created,
          url: url+"/rest/stream?v=1.12.0&c=netPlayer&f=json&u="+username+"&t="+token+"&s="+salt+"&id="+item.id,
          cover: url+"/rest/getCoverArt?v=1.12.0&c=netPlayer&f=json&u="+username+"&t="+token+"&s="+salt+"&id="+item.id,
        }
      });

      this.playIndex=Math.floor((Math.random()*this.playList.length));

      // 注意，⬇临时内容，注意修改

      this.playList.sort(function(a,b){
        const timestampA = a.created;
        const timestampB = b.created;

        if (timestampA < timestampB) {
          return 1; // 返回正数表示 a 在 b 之前
        } else if (timestampA > timestampB) {
          return -1; // 返回负数表示 a 在 b 之后
        } else {
          return 0; // 返回0表示相等
        }
      })

      // 注意，⬆临时内容，注意修改

      this.nowplayURL=this.playList[this.playIndex].url;
      var that=this;
      this.$nextTick(()=>{
        that.$refs.player.play();
        that.isPlay=true;
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
      })
    },
    // 模式: list, random
    changeMode(mode){
      this.playMode=mode;
    },
    setMedia(){
      // console.log("hello?");
      var that=this;
      navigator.mediaSession.metadata = new MediaMetadata({
        title: this.playList[this.playIndex].name,
        artist: this.playList[this.playIndex].artist,
        album: '',
        artwork: [
            {
              src: url+"/rest/getCoverArt?v=1.12.0&c=netPlayer&f=json&u="+username+"&t="+token+"&s="+salt+"&id="+this.playList[this.playIndex].id+"&size="+512,
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