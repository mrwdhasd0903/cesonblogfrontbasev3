<template>
  <div :class="isNight?'night':'day'">
    <nav-bar></nav-bar>
    <router-view class="info main m-padded-tb-big animated fadeIn" v-slot="{Component}">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <music-player />
    <footer-bar></footer-bar>
    <div class="moon" v-if="isNight"></div>
  </div>
</template>

<script>
//ajax
import "/src/ajax/config.js";
import { trafficUp } from "/src/ajax/api.js";

//components
import NavBar from "/src/components/navBar/NavBar.vue";
import FooterBar from "/src/components/footer/FooterBar.vue";
import MusicPlayer from "/src/components/musicPlayer/MusicPlayer.vue";

//compositionAPI
import { onMounted, ref, provide } from "vue";
export default {
  name: "App",
  components: {
    NavBar,
    FooterBar,
    MusicPlayer
  },
  setup() {
    // trafficUp
    trafficUp().then();

    // baidustatistical module
    let baidustatistical = () => {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?2bfc05a1c19c23b09afa56201053d18e";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    };
    // baidustatistical();

    // night module
    let isNight = ref(false);
    let setNight = () => {
      isNight.value = !isNight.value;
    };
    provide("setNight", setNight);
    return { isNight };
  }
};
</script>
