<template>
  <div class="main" @touchmove="touchMove">
    <div class="conetent">
      <div class="infoBar">
        <img :src="getCover()" alt="" width="100" style="border-radius: 20px;">
        <div class="info">
          <div class="title">{{ operationSongItem.title }}</div>
          <div class="artist">{{ operationSongItem.artist }}</div>
        </div>
      </div>

      <div class="menuItem" style="margin-top: 30px;" @click="play()">
        <i class="bi bi-play-fill menuIcon"></i>
        <div class="menuText">播放</div>
      </div>
      <div class="menuItem" v-if="!isLoved()">
        <i class="bi bi-heart-fill menuIcon" style="color: red;"></i>
        <div class="menuText">添加到我喜欢的</div>
      </div>
      <div class="menuItem" v-else>
        <i class="bi bi-heartbreak-fill menuIcon" style="color: grey;"></i>
        <div class="menuText">从我喜欢的音乐中删除</div>
      </div>
      <div class="menuItem">
        <i class="bi bi-music-note-list menuIcon"></i>
        <div class="menuText">加入到歌单...</div>
      </div>
      <div :class="songOperationListId=='' ? 'menuItem_disabled' : 'menuItem'">
        <i class="bi bi-file-x menuIcon"></i>
        <div class="menuText">从歌单中删除</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    operationSongItem: Object,
    url: String,
    username: String,
    token: String,
    salt: String,
    songOperationListId: String,
    songOperationFrom: String,
    lovedSongs: Array,
  },
  data() {
    return {
      touchY: 0,
    }
  },
  methods: {
    play(){
      this.$emit("playFromOperation", this.songOperationFrom);
      this.$emit("hideSongOperation");
    },
    isLoved(){
      for(var i=0;i<this.lovedSongs.length;i++){
        if(this.operationSongItem.id==this.lovedSongs[i].id){
          return true;
        }
      }
      return false;
    },
    getCover(){
      return this.url+'/rest/getCoverArt?v=1.12.0&c=netPlayer&f=json&u='+this.username+'&t='+this.token+'&s='+this.salt+'&id='+this.operationSongItem.id;
    },
    touchMove(e){
      if(this.touchY==0){
        this.touchY=e.changedTouches[0].pageY;
        return;
      }else{
        if(e.changedTouches[0].pageY-10>this.touchY){
          this.$emit("hideSongOperation");
          this.touchY=0;
          return;
        }else{
          this.touchY=0;
          return;
        }
      }
    }
  },
}
</script>

<style scoped>
.menuItem_disabled{
  color: rgb(170, 170, 170);
}
.menuIcon{
  font-size: 18px;
  margin-right: 15px;
}
.menuItem, .menuItem_disabled{
  margin-top: 15px;
  height: 40px;
  display: flex;
  /* background-color: grey; */
  align-items: center;
  font-size: 17px
}
.artist{
  color: rgb(170, 170, 170);
  margin-top: 3px;
  overflow: hidden;
  font-size: 16px;
	white-space:nowrap;
	text-overflow: ellipsis;
}
.title{
  font-size: 20px;
  width: 100%;
  font-weight: bold;
  text-align: left;
  overflow: hidden;
	white-space:nowrap;
	text-overflow: ellipsis;
}
.info{
  justify-content: center;
  align-items: flex-start;
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-left: 10px;
  overflow: hidden;
	white-space:nowrap;
	text-overflow: ellipsis;
}
.infoBar{
  display: flex;
}
.conetent{
  display: flex;
  flex-direction: column;
}
.main{
  padding: 20px 20px 20px 20px;
  height: 400px;
  width: 100%;
  background-color: white;
  box-shadow: 0 0px 10px 1px rgba(97, 97, 97, 0.1);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
</style>