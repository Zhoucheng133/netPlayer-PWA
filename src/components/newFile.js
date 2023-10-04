import axios from 'axios';
import { url, username, salt, token } from "./test.js";

export default (await import('vue')).defineComponent({
data() {
return {
nowPlay: {},
playList: [],

loaded: false,
};
},
components: {
Aplayer,
},
methods: {
play() {
// console.log('play')
},
pause() {
console.log('pause');
},
loginHandler() {
axios.get(url + "/rest/getRandomSongs?v=1.12.0&c=netPlayer&f=json&u=" + username + "&t=" + token + "&s=" + salt + "&size=500").then((response) => {
this.playList = response.data['subsonic-response'].randomSongs.song.map(function (item) {
return {
title: item.title,
artist: item.artist,
created: item.created,
src: url + "/rest/stream?v=1.12.0&c=netPlayer&f=json&u=" + username + "&t=" + token + "&s=" + salt + "&id=" + item.id,
pic: url + "/rest/getCoverArt?v=1.12.0&c=netPlayer&f=json&u=" + username + "&t=" + token + "&s=" + salt + "&id=" + item.id,
};
});

this.playList.sort(function (a, b) {
const timestampA = new Date(a.created).getTime();
const timestampB = new Date(b.created).getTime();

if (timestampA < timestampB) {
return 1; // 返回正数表示 a 在 b 之前
} else if (timestampA > timestampB) {
return -1; // 返回负数表示 a 在 b 之后
} else {
return 0; // 返回0表示相等
}
});
this.nowPlay = this.playList[0];
this.loaded = true;
});
}
},
created() {
this.loginHandler();
},
});
