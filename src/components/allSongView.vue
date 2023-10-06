<template>
  <div class="main">
    <div class="content" v-for="(item, index) in list" :key="index">{{ item.title }}</div>
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
.main{
  padding-bottom: 80px;
}
</style>