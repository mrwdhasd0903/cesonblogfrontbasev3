<template>
  <div class>
    <!-- loading -->
    <div class="loading" v-if="isLoading">
      <xhh-loading></xhh-loading>
    </div>
    <!--content-->
    <transition :name="fadeName">
      <div v-if="vShow" class="ui top attached teal segment">
        <div
          class="ui padded vertical segment m-padded-tb-large"
          v-for="(item,index) in pageBlog.content"
          :key="'content'+index"
        >
          <div class="ui middle aligned mobile reversed stackable grid">
            <div class="eleven wide column">
              <h3 class="ui header">
                <router-link :to="'/blog/'+item.id" tag="a" class="m-black">{{item.title}}</router-link>
                <a class="m-black"></a>
              </h3>
              <p class="m-text">{{item.description}}</p>
              <div class="ui grid">
                <div class="row">
                  <div class="six wide column">
                    <div class="ui mini horizontal link list">
                      <div class="item">
                        <img :src="item.user.avatar" class="ui avatar image" />
                        <div class="content">
                          <router-link to="/about" class="header">{{item.user.nickname}}</router-link>
                        </div>
                      </div>
                      <!--  -->
                    </div>
                  </div>
                  <div class="right aligned ten wide column">
                    <router-link
                      :to="'/blogbytype/'+item.type.id"
                      class="ui teal basic label m-padded-tiny m-text-thin"
                    >{{item.type.name}}</router-link>
                  </div>
                </div>
                <!--  -->
                <div class="row">
                  <div class="sixteen wide column m-black">
                    <span class="m-margin-lr-small">
                      <i class="calendar icon"></i>
                      <span>{{dateFormat(item.updateTime)}}</span>
                    </span>
                    <span class="m-margin-lr-small">
                      <i class="hand pointer icon"></i>
                      <span>{{item.views}}</span>
                    </span>
                    <span class="m-margin-lr-small">
                      <i class="comment alternate outline icon"></i>
                      <span>{{item.commentssize}}</span>
                    </span>
                  </div>
                </div>
                <div class="row">
                  <div class="column">
                    <router-link
                      v-for="(tagItem,index) in item.tags"
                      :key="'tagItem'+index"
                      :to="'/blogbytag/'+tagItem.id"
                      :style="{ 'color':tagItem.color+'!important','border-color':tagItem.color+'!important'}"
                      class="ui teal basic left pointing label m-padded-tiny m-margin-top-small"
                    >{{tagItem.name}}</router-link>
                  </div>
                </div>
              </div>
            </div>

            <div class="five wide column">
              <router-link :to="'/blog/'+item.id">
                <img :src="item.firstPicture" class="ui rounded image" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!--footer page-->
    <div class="ui bottom attached segment" v-if="pageBlog.totalPages>1">
      <div class="ui middle aligned two column grid">
        <div class="column">
          <a
            @click="[thisPageJump(-pageData.page),setFadeName('fadeLast')]"
            v-if="!pageBlog.first"
            class="ui mini teal basic button"
          >首页</a>
          <a
            @click="[thisPageJump(-1),setFadeName('fadeLast')]"
            v-if="!pageBlog.first"
            class="ui mini teal basic button"
          >上一页-{{pageData.page}}</a>
        </div>
        <div class="right aligned column">
          <a
            @click="[thisPageJump(+1),setFadeName('fadeNext')]"
            v-if="!pageBlog.last"
            class="ui mini teal basic button"
          >下一页-{{pageData.page+2}}</a>
          <a
            @click="[thisPageJump(+pageBlog.totalPages-1-pageData.page),setFadeName('fadeNext')]"
            v-if="!pageBlog.last"
            class="ui mini teal basic button"
          >末页-{{pageBlog.totalPages}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//utils
import {changeDateFormat} from "/src/utils/changeDateFormat.js";
//components
import XhhLoading from "/src/components/xhhLoading/XhhLoading.vue";
//compositionAPI
import { ref, toRefs, onUpdated } from "vue";
export default {
  name: "BlogList",
  components: { XhhLoading },
  setup(props) {
    //fade transition
    let type = {};
    let fadeName = ref("fadeNext");
    let setFadeName = name => {
      fadeName.value = name;
    };

    //load&show module
    let isLoading = ref(true);
    let vShow = ref(true);
    onUpdated(() => {
      isLoading.value = false;
      setTimeout(() => {
        vShow.value = true;
      }, 100);
    });

    //date format
    let dateFormat = date => changeDateFormat(date).substring(0, 10);

    //page module
    let thisPageJump = a => {
      vShow.value = false;
      props.pageJump(a);
    };
    //return
    return {
      isLoading,
      fadeName,
      setFadeName,
      vShow,
      dateFormat,
      thisPageJump
    };
  },
  props: {
    pageJump: {
      type: Function,
      default: null
    },
    pageData: {},
    pageBlog: {}
  }
};
</script>
<style scope>
.fadeLast-enter-active,
.fadeLast-leave-active {
  transition: all 0.3s ease-in-out;
  transform-origin: transform opacity;
}

.fadeLast-enter-from {
  transform: translateX(-100px);
  opacity: 0;
}
.fadeLast-leave-to {
  transform: translateX(100px);
  opacity: 0;
}

.fadeNext-enter-active,
.fadeNext-leave-active {
  transition: all 0.3s ease-in-out;
  transform-origin: transform opacity;
}

.fadeNext-enter-from {
  transform: translateX(100px);
  opacity: 0;
}
.fadeNext-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}
</style>
