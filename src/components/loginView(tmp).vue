<template>
  <div>
    (登录界面)
    <div id="player"></div>
  </div>
</template>

<!-- 测试代码 -->
<script>

import axios from 'axios';
import {url, username, salt, token} from "./test.js";

import 'aplayer/dist/APlayer.min.css';
import APlayer from 'aplayer';


export default {
  data() {
    return {
      nowPlay: {},
      playList: [],

      loaded: false,

      ap: undefined,
    }
  },
  methods: {
    loginHandler(){
      axios.get(url+"/rest/getRandomSongs?v=1.12.0&c=netPlayer&f=json&u="+username+"&t="+token+"&s="+salt+"&size=500").then((response)=>{
        this.playList=response.data['subsonic-response'].randomSongs.song.map(function(item){
          return {
            name: item.title,
            artist: item.artist,
            created: item.created,
            url: url+"/rest/stream?v=1.12.0&c=netPlayer&f=json&u="+username+"&t="+token+"&s="+salt+"&id="+item.id,
            cover: url+"/rest/getCoverArt?v=1.12.0&c=netPlayer&f=json&u="+username+"&t="+token+"&s="+salt+"&id="+item.id,
          }
        });

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

        this.ap = new APlayer({
          container: document.getElementById('player'),
          autoplay: false,
          loop: 'all',
          order: 'list',
          preload: 'auto',
          volume: 0.7,
          mutex: true,
          listFolded: false,
          audio: this.playList,
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