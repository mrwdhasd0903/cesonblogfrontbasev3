<template>
  <div class="music-player" :class="{'music-player_closed':isClose}">
    <div class="player-bar">
      <span @click="reset(1);">
        <i class="undo icon"></i>重置歌单
      </span>
      <span>
        <input
          class="inputPlayerlist"
          v-model="inputPlayerlist"
          placeholder="输入你的歌单id或链接..."
          type="text"
        />
      </span>
      <span class="player-help_popup">
        <i class="question circle outline icon"></i>
        <div class="player-help_text ui flowing popup transition hidden">
          <span>
            指定歌单步骤:
            <br />
          </span>
          <span>
            ①打开<a href="https://music.163.com/" target="_blank">网易云</a>歌单页面
            <br />
          </span>
          <span>
            ②复制链接并粘贴
            <br />
          </span>
          <span>
            ③点击"重置歌单"
            <br />
          </span>
        </div>
      </span>
    </div>
    <div class="player-popup" @click="close">
      <i class="caret icon" :class="isClose?'right':'left'"></i>
    </div>
    <iframe
      frameborder="no"
      border="0"
      marginwidth="0"
      marginheight="0"
      width="330"
      height="110"
      :src="'//music.163.com/outchain/player?type=0&id='+playList+'&auto='+auto+'&height=90'"
    />
  </div>
</template>

<script>
import randomArray from "/src/utils/randomArray.js";
import { onMounted, ref } from "vue";
export default {
  name: "MusicPlayer",
  setup() {
    let playLists = [
      "5249709484",
      "4940112311",
      "4933470237",
      "4924723995",
      "5163436388",
      "2326861783",
      "5099205909",
      "494528651"
    ];
    let inputPlayerlist = ref("");
    let isClose = ref(0);
    let auto = ref(0);
    let playList = ref(0);
    let reset = a => {
      auto.value = a;

      if (inputPlayerlist.value != "") {
        if (inputPlayerlist.value.indexOf("id") != -1) {
          playList.value = parseInt(inputPlayerlist.value.split("id=")[1]);
        } else {
          playList.value = inputPlayerlist.value;
        }
        inputPlayerlist.value = "";
      } else {
        playList.value = randomArray(1, playLists)[0];
      }
    };
    let close = () => {
      isClose.value = !isClose.value;
    };
    reset(0);
    onMounted(() => {
      $(".player-help_popup").popup({
        popup: $(".player-help_text"),
        position: "bottom right"
      });
    });
    return { playList, reset, auto, isClose, close, inputPlayerlist };
  }
};
</script>

<style scoped>
.music-player {
  position: fixed;
  bottom: 10px;
  font-family: Arial, Helvetica, sans-serif;
  width: 335px;
  overflow: hidden;
  transition: width 0.2s ease;
  z-index: 199;
}
.music-player_closed {
  width: 15px;
}
.inputPlayerlist {
  border: none;
  outline: none;
}
.music-player .player-bar {
  position: absolute;
  left: 10px;
  width: 310px;
  height: 25px;
  background-color: #fff;
}
.player-bar > span {
  cursor: pointer;
  height: 25px;
  display: inline-block;
  line-height: 25px;
  font-size: 13px;
  padding: 0 4px;
  transition: box-shadow 0.1s ease;
}
.player-bar > span:hover {
  box-shadow: rgb(161, 161, 161) -8px 0px 12px -9px inset,
    rgb(161, 161, 161) 8px 0px 12px -9px inset;
}
.player-popup {
  position: absolute;
  cursor: pointer;
  right: 0;
  width: 15px;
  height: 100px;
  background-color: #fff;
  font-size: 25px;
  border-left: 1px solid #e4e4e4;
  transition: box-shadow 0.2s ease;
}
.player-popup:hover {
  box-shadow: rgb(218, 218, 218) -10px 0px 12px -9px inset,
    rgb(201, 201, 201) 10px 0px 12px -9px inset;
}
.player-popup > i {
  position: absolute;
  top: 39px;
  left: -9px;
}
.player-help_text {
  font-size: 12px;
}
</style>