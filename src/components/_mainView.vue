<template>
  <div>
    <audioController ref="audio" style="display: none;"/>

    <div class="appBar">{{ pageNow }}</div>
    <div class="navgBar">
      <div :class="pageNow=='所有音乐'?'navgItem_selected':'navgItem'">
        <i class="bi bi-music-note navgIcon"></i>
      </div>
      <div :class="pageNow=='我喜欢的'?'navgItem_selected':'navgItem'">
        <i class="bi bi-heart-fill navgIcon"></i>
      </div>
      <div :class="pageNow=='我的歌单'?'navgItem_selected':'navgItem'">
        <i class="bi bi-music-note-list navgIcon"></i>
      </div>
      <div :class="pageNow=='搜索'?'navgItem_selected':'navgItem'">
        <i class="bi bi-search navgIcon"></i>
      </div>
      <div :class="pageNow=='关于'?'navgItem_selected':'navgItem'">
        <i class="bi bi-info-circle-fill navgIcon"></i>
      </div>
    </div>
  </div>
</template>

<script>
import audioController from './audioController.vue';
export default {
  components: {
    audioController,
  },
  data() {
    return {
      pageNow: '所有音乐',
    }
  },
  methods: {
  },
}
</script>

<style scoped>
.navgItem_selected{
  color: rgb(24, 144, 255);
}
.navgIcon{
  font-size: 18px;
}
.navgItem{
  color: grey;
}
.navgItem, .navgItem_selected{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.navgBar{
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 80px;
  box-shadow: 0 0px 10px 1px rgba(97, 97, 97, 0.1)
}
.appBar{
  position: fixed;
  width: 100vw;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(24, 144, 255);
  font-size: 18px;
  border-bottom: 1px solid;
}
</style>