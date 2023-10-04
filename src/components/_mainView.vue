<template>
  <div>
    <div id="player"></div>
    <a-button @click="go">开始</a-button>
    <a-button @click="toggleSong">暂停/播放</a-button>
    <a-button @click="nextSong">下一首</a-button>
    <a-button @click="preSong">上一首</a-button>
    <a-button @click="changeMode('random')">随机播放</a-button>
    <a-button @click="changeMode('list')">顺序播放</a-button>
  </div>
</template>

<script>

import 'aplayer/dist/APlayer.min.css';
import APlayer from 'aplayer';

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
    }
  },
  methods: {
    go(){
      axios.get(url+"/rest/getRandomSongs?v=1.12.0&c=netPlayer&f=json&u="+username+"&t="+token+"&s="+salt+"&size=500").then((response)=>{
        this.play(response.data['subsonic-response'].randomSongs.song,0);
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
      this.ap = new APlayer({
        container: document.getElementById('player'),
        autoplay: false,
        loop: 'none',
        preload: 'auto',
        volume: 0.7,
        mutex: true,
        listFolded: false,
        audio: this.playList,
      });
      this.ap.list.switch(this.playIndex);
      this.ap.play();
      var that=this;
      this.ap.on('ended', function () {
        that.nextSong();
      })
    },
    // 切换暂停/播放
    toggleSong(){
      this.ap.toggle();
    },
    // 下一首
    nextSong(){
      if(this.playMode=='list'){
        this.ap.skipForward();
        this.playIndex=(this.playIndex+1+this.playList.length)%this.playList.length;
      }else{
        var tmp=Math.floor((Math.random()*this.playList.length));
        this.playIndex=tmp;
        this.ap.list.switch(tmp);
      }
    },
    // 上一首
    preSong(){
      this.ap.skipBack();
      this.playIndex=(this.playIndex-1+this.playList.length)%this.playList.length;
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
              src: url+"/rest/getCoverArt?v=1.12.0&c=netPlayer&f=json&u="+username+"&t="+token+"&s="+salt+"&id="+this.playList[this.playIndex].id+"&size="+96,
              sizes: "96x96",
              type: "image/png",
            },
            {
              src: url+"/rest/getCoverArt?v=1.12.0&c=netPlayer&f=json&u="+username+"&t="+token+"&s="+salt+"&id="+this.playList[this.playIndex].id+"&size="+128,
              sizes: "128x128",
              type: "image/png",
            },
            {
              src: url+"/rest/getCoverArt?v=1.12.0&c=netPlayer&f=json&u="+username+"&t="+token+"&s="+salt+"&id="+this.playList[this.playIndex].id+"&size="+192,
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: url+"/rest/getCoverArt?v=1.12.0&c=netPlayer&f=json&u="+username+"&t="+token+"&s="+salt+"&id="+this.playList[this.playIndex].id+"&size="+256,
              sizes: "256x256",
              type: "image/png",
            },
            {
              src: url+"/rest/getCoverArt?v=1.12.0&c=netPlayer&f=json&u="+username+"&t="+token+"&s="+salt+"&id="+this.playList[this.playIndex].id+"&size="+384,
              sizes: "384x384",
              type: "image/png",
            },
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