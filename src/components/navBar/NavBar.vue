<template>
  <nav
    :class="toggleClass?'nav':'nav-dowm'"
    class="ui info inverted attached segment m-padded-tb-mini m-shadow-small"
  >
    <div class="ui container">
      <div class="ui inverted secondary stackable menu">
        <h2 class="ui teal header item">
          <img src="/src/assets/img/logo.png" />
        </h2>

        <a
          v-for="(item,index) in routerMessage"
          class="item"
          :class="{'active':route.path.indexOf(item.jumpPath)!=-1,'m-mobile-hide':toggleClass}"
          @click="navJump(item.jumpPath)"
        >
          <i class="mini icon" :class="item.iconClass"></i>
          {{item.showText}}
        </a>

        <div class="right item" :class="{'m-mobile-hide':toggleClass}">
          <div class="ui icon inverted transparent input m-margin-tb-tiny">
            <input type="text" v-model="searchKey" placeholder="Search...." />
            <i @click="search" class="search link icon"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="lamp-switch" @click="setNight"></div>
    <a @click="menuToggle" class="ui menu toggle black icon button m-right-top m-mobile-show">
      <i class="sidebar icon"></i>
    </a>
  </nav>
</template>

<script>
import onKeyDown from "/src/utils/onKeyDown.js";
import { onMounted, ref, inject, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  name: "NavBar",

  setup() {
    // router data
    const router = useRouter();
    const route = useRoute();
    const routerMessage = [
      { showText: "首页", jumpPath: "/cesonblog", iconClass: "home" },
      { showText: "分类", jumpPath: "/blogbytype", iconClass: "puzzle piece" },
      { showText: "标签", jumpPath: "/blogbytag", iconClass: "tags" },
      { showText: "归档", jumpPath: "/archives", iconClass: "clone" },
      { showText: "关于小王", jumpPath: "/about", iconClass: "info" },
      { showText: "流量统计", jumpPath: "/traffic", iconClass: "chart pie" },
      { showText: "友情链接", jumpPath: "/blogroll", iconClass: "linkify" }
    ];

    // search module
    let searchKey = ref("");
    let search = () => {
      if (searchKey.value) {
        router.push({
          path: "/search",
          query: {
            key: searchKey.value
          }
        });
        searchKey.value = "";
      }
    };
    onMounted(() => {
      onKeyDown(13, () => {
        search();
      });
    });

    // night module
    let setNight = inject("setNight", "setNight");

    // routerjump&show module
    let toggleClass = ref(true);
    let menuToggle = () => {
      toggleClass.value = !toggleClass.value;
    };
    let navJump = link => {
      if (route.path.indexOf(link)) {
        menuToggle();
        router.push(link);
      }
    };

    // return
    return {
      toggleClass,
      setNight,
      menuToggle,
      searchKey,
      search,
      navJump,
      routerMessage,
      route
    };
  }
};
</script>

<style scoped>
i {
  transform: translateY(-3px);
  margin-right: 1em !important;
}
@media screen and (max-width: 767px) {
  .nav {
    height: 59.56px;
    transition: all 0.2s ease;
  }
  .nav-down {
    transition: all 0.2s ease;
    height: 321.94px;
  }
}
</style>