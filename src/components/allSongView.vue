<template>
  <div class="main">
    <div class="content" v-for="(item, index) in list" :key="index" @click="play(index)">
      <div class="playingSign" v-if="playing(index)"><i class="bi bi-play-fill"></i></div>
      <div class="index" v-else>{{ index+1 }}</div>
      <div class="info">
        <div :class="playing(index)==true ? 'title_playing' : 'title'">{{ item.title }}</div>
        <div :class="playing(index)==true ? 'artist_playing' : 'artist'">{{ item.artist }}</div>
      </div>
      <div :class="playing(index)==true ? 'operation_playing' : 'operation'"><i class="bi bi-three-dots-vertical"></i></div>
    </div>
  </div>
</template>

<script>
const axios=require("axios");
export default {
  props: {
    url: String,
    username: String,
    token: String,
    salt: String,
    isPlay: Boolean,
    playFrom: String,
    playIndex: Number
  },
  data() {
    return {
      list: [],
    }
  },
  methods: {
    playing(index){
      if(this.playFrom=='allSongs' && index==this.playIndex){
        return true;
      }
      return false;
    },
    play(index){
      this.$emit("playSong","allSongs", this.list, index);
    },
    getList(){
      axios.get(this.url+'/rest/getRandomSongs?v=1.12.0&c=netPlayer&f=json&u='+this.username+'&t='+this.token+'&s='+this.salt+'&size=500')
      .then((response)=>{
        this.list=response.data['subsonic-response'].randomSongs.song;
        this.list.sort(function(a,b){
          const timestampA = a.created;
          const timestampB = b.created;

          if (timestampA < timestampB) {
            return 1; // 返回正数表示 a 在 b 之前
          } else if (timestampA > timestampB) {
            return -1; // 返回负数表示 a 在 b 之后
          } else {
            return 0; // 返回0表示相等
          }
        });
        this.$emit("updateAllSongs", this.list);
      })
      .catch(()=>{

      })
    }
  },
  created() {
    this.getList();
  },
}
</script>

<style scoped>
.playingSign{
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(24, 144, 255);
  font-size: 18px;
}
.operation_playing{
  color: rgb(24, 144, 255);
}
.operation, .operation_playing{
  display: flex;
  justify-content: center;
  align-items: center;
}
.artist_playing{
  color: rgb(24, 144, 255);
}
.artist{
  color: rgb(170, 170, 170);
}
.artist, .artist_playing{
  text-align: left;
  font-size: 13px;
  overflow: hidden;
	white-space:nowrap;
	text-overflow: ellipsis;
}
.title_playing{
  color: rgb(24, 144, 255);
}
.title, .title_playing{
  font-weight: bold;
  text-align: left;
  overflow: hidden;
	white-space:nowrap;
	text-overflow: ellipsis;
  font-size: 15px;
}
.info{
  /* background-color: lightpink; */
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.index{
  color: rgb(170, 170, 170);
  /* background-color: lightgoldenrodyellow; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.content{
  display: grid;
  grid-template-columns: 50px auto 50px;
  height: 50px;
  padding-left: 10px;
  padding-right: 10px;
}
</style>