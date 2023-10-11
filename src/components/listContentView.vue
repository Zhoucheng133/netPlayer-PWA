<template>
  <div>
    <div class="backArrow" @click="backMain"><i class="bi bi-arrow-left-short backIcon"></i></div>
    <div class="appBar">
      <div class="name">{{ title }}</div>
    </div>

  <div class="main">
    <div class="content" v-for="(item, index) in list" :key="index" @click="play(index)">
      <div class="playingSign" v-if="playing(index)"><i class="bi bi-play-fill"></i></div>
      <div class="index" v-else>{{ index+1 }}</div>
      <div class="info">
        <div :class="playing(index)==true ? 'title_playing' : 'title'">{{ item.title }}</div>
        <div :class="playing(index)==true ? 'artist_playing' : 'artist'">
          <i class="bi bi-heart-fill lovedIcon" v-if="isLoved(index)"></i>
          <div class="artistText">{{ item.artist }}</div>
        </div>
      </div>
      <div :class="playing(index)==true ? 'operation_playing' : 'operation'" @click.stop="songOperation(item)"><i class="bi bi-three-dots-vertical"></i></div>
    </div>
  </div>
  </div>
</template>

<script>
const axios=require("axios");
export default {
  data() {
    return {
      title: '',
      list: [],
    }
  },
  props: {
    selectedListID: String,
    url: String,
    username: String,
    token: String,
    salt: String,
    lovedSongs: Array,
    playFrom: String,
    playIndex: Number,
    playListId: String
  },
  methods: {
    songOperation(item){
      this.$emit("showSongOperation", item, this.selectedListID);
    },
    isLoved(index){
      for(var i=0;i<this.lovedSongs.length;i++){
        if(this.list[index].id==this.lovedSongs[i].id){
          return true;
        }
      }
      return false;
    },
    play(index){
      this.$emit("playSong", "playList", this.list, index, this.selectedListID)
    },
    playing(index){
      if(this.playFrom=='playList' && index==this.playIndex && this.playListId==this.selectedListID){
        return true;
      }
      return false;
    },
    backMain(){
      this.$emit("backMain");
    },
    getList(){
      axios.get(this.url+'/rest/getPlaylist?v=1.12.0&c=netPlayer&f=json&u='+this.username+'&t='+this.token+'&s='+this.salt+'&id='+this.selectedListID)
      .then((response)=>{
        this.list=response.data['subsonic-response'].playlist.entry;
        this.title=response.data['subsonic-response'].playlist.name;
      })
      .catch(()=>{
        this.$message.error("服务器连接出错");
      })
    }
  },
  watch: {
    selectedListID: function(newVal){
      if(newVal==''){
        return;
      }else{
        this.getList();
      }
    }
  },
}
</script>

<style scoped>
.artistText{
  width: 100%;
  overflow: hidden;
	white-space:nowrap;
	text-overflow: ellipsis;
}
.lovedIcon{
  color: red;
  margin-right: 5px;
  font-size: 12px;
}
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
  display: flex;
  align-items: center;
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
.main{
  position: fixed;
  top: 60px;
  left: 0px;
  width: 100%;
  height: calc(100% - 60px);
  background-color: white;
}
.backIcont{
  transform: translate(0, -2px);
}
.backArrow{
  color: rgb(24, 144, 255);
  position: fixed;
  z-index: 10;
  height: 60px;
  display: flex;
  align-items: center;
  font-size: 32px;
  margin-left: 10px;
}
.appBar{
  position: fixed;
  width: 100vw;
  height: 60px;
  justify-content: center;
  display: flex;
  align-items: center;
  color: rgb(24, 144, 255);
  font-size: 18px;
}
</style>