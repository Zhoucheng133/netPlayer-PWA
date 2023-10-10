<template>
  <div class="main">
    <div class="content" v-for="(item, index) in list" :key="index" @click="openList(item.id)">
      <div class="index">{{ index+1 }}</div>
      <div class="info">
        {{ item.name }}
      </div>
      <div class="operation"><i class="bi bi-three-dots-vertical"></i></div>
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
  },
  data() {
    return {
      list: [],
    }
  },
  methods: {
    openList(id){
      this.$emit("listOpen", id);
    },
    getList(){
      axios.get(this.url+'/rest/getPlaylists?v=1.12.0&c=netPlayer&f=json&u='+this.username+'&t='+this.token+'&s='+this.salt)
      .then((response)=>{
        this.list=response.data['subsonic-response'].playlists.playlist;
      })
      .catch(()=>{
        this.$message.error("服务器连接出错");
      })
    }
  },
  created() {
    this.getList();
  },
}
</script>

<style scoped>
.info{
  display: flex;
  align-items: center;
  font-weight: bold;
  text-align: left;
  overflow: hidden;
	white-space:nowrap;
	text-overflow: ellipsis;
  font-size: 15px;
}
.operation{
  display: flex;
  justify-content: center;
  align-items: center;
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
  width: 100%;
  height: 100%;
  background-color: white;
}
</style>