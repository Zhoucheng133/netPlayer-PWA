<template>
  <div>
    <div class="backArrow" @click="backMain"><i class="bi bi-arrow-left-short backIcon"></i></div>
    <div class="appBar">
      <div class="name">{{ title }}</div>
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
  },
  methods: {
    backMain(){
      console.log("??");
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