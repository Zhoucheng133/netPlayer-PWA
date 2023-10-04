<template>
  <div>
    (登录界面)

    <Aplayer
      v-if="loaded"
      @pause="pause"
      @play="play"
      autoplay
      repeat="repeat-all"
      :music="nowPlay"
      :list="playList"
    />
  </div>
</template>

<!-- 测试代码 -->
<script>
import Aplayer from 'vue-aplayer';


import axios from 'axios';
import {url, username, salt, token} from "./test.js";

export default {
  data() {
    return {
      nowPlay: {},
      playList: [],

      loaded: false,
    }
  },
  components: {
    Aplayer,
  },
  methods: {
    play() {
      console.log('play')
    },
    pause() {
      console.log('pause')
    },
    loginHandler(){
      axios.get(url+"/rest/getRandomSongs?v=1.12.0&c=netPlayer&f=json&u="+username+"&t="+token+"&s="+salt+"&size=500").then((response)=>{
        this.playList=response.data['subsonic-response'].randomSongs.song.map(function(item){
          return {
            title: item.title,
            artist: item.artist,
            src: url+"/rest/stream?v=1.12.0&c=netPlayer&f=json&u="+username+"&t="+token+"&s="+salt+"&id="+item.id,
            pic: url+"/rest/getCoverArt?v=1.12.0&c=netPlayer&f=json&u="+username+"&t="+token+"&s="+salt+"&id="+item.id,
          }
        });
        this.nowPlay=this.playList[0];
        this.loaded=true;
      })
    }
  },
  created() {
    this.loginHandler();
  },
}
</script>