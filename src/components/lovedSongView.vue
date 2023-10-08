<template>
  <div class="main">
    <div class="content" v-for="(item, index) in lovedSongs" :key="index" @click="play(index)">
      <div class="playingSign" v-if="playing(index)"><i class="bi bi-play-fill"></i></div>
      <div class="index" v-else>{{ index+1 }}</div>
      <div class="info">
        <div :class="playing(index)==true ? 'title_playing' : 'title'">{{ item.title }}</div>
        <div :class="playing(index)==true ? 'artist_playing' : 'artist'">
          <i class="bi bi-heart-fill lovedIcon"></i>
          <div class="artistText">{{ item.artist }}</div>
        </div>
      </div>
      <div :class="playing(index)==true ? 'operation_playing' : 'operation'"><i class="bi bi-three-dots-vertical"></i></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lovedSongs: Array,
    playIndex: Number,
    playFrom: String,
  },
  methods: {
    playing(index){
      if(this.playFrom=='lovedSongs' && index==this.playIndex){
        return true;
      }
      return false;
    },
    play(index){
      this.$emit("playSong","lovedSongs", this.lovedSongs, index);
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
.content{
  display: grid;
  grid-template-columns: 50px auto 50px;
  height: 50px;
  padding-left: 10px;
  padding-right: 10px;
}
.index{
  color: rgb(170, 170, 170);
  /* background-color: lightgoldenrodyellow; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.playingSign{
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(24, 144, 255);
  font-size: 18px;
}
.main{
  width: 100%;
  height: 100%;
  background-color: white;
}
</style>