<template>
  <div class="m-container-small">
    <div class="ui container">
      <!--header-->
      <div class="ui top attached segment">
        <div class="ui middle aligned two column grid">
          <div class="column">
            <h3 class="ui teal header">标签</h3>
          </div>
          <div class="right aligned column">
            共
            <h2 class="ui orange header m-inline-block m-text-thin">{{tagList.data.length}}</h2>个
          </div>
        </div>
      </div>

      <div class="ui attached segment m-padded-tb-large" v-if="tagList">
        <div
          @click="[getPageBlog(item.id),tagJump(item.id)]"
          class="ui basic left pointing large label m-margin-tb-tiny m-pointer"
          v-for="(item,index) in tagList.data"
          :key="'tagList'+index"
          :class="{teal:$route.params.gid==item.id}"
        >
          <span>{{item.name}}</span>
          <div class="detail">{{item.blogssize}}</div>
        </div>
      </div>
      <blog-list :pageJump="pageJump" :pageData="pageData" :pageBlog="pageBlog.data"></blog-list>
    </div>
  </div>
</template>

<script>
//api
import { get_listTag, get_pageBlogByTag } from "/src/ajax/api.js";
//compositionAPI
import { reactive, toRaw, onActivated } from "vue";
//router
import { useRoute, useRouter } from "vue-router";
//component
import BlogList from "/src/components/blogList/BlogList.vue";
export default {
  name: "BlogByTag",
  components: { BlogList },
  setup() {
    //router jump module
    let route = useRoute();
    let router = useRouter();
    let tagJump = link => {
      router.push("/blogbytag/" + link);
    };
    //page message
    let pageData = reactive({
      size: 5,
      page: 0,
      id: ""
    });
    let tagList = reactive({ data: [] });
    let pageBlog = reactive({ data: {} });

    //page jump& show
    let getPageBlog = id => {
      if (id != -1) {
        pageData.id = id;
      }
      get_pageBlogByTag(toRaw(pageData)).then(res => {
        pageBlog.data = res;
        if (pageData.page > res.totalPages - 1) {
          pageData.page = 0;
          get_pageBlogByTag(toRaw(pageData)).then(res => {
            pageBlog.data = res;
          });
        }
      });
    };
    let pageJump = a => {
      pageData.page += a;
      getPageBlog(-1);
    };

    //activated
    onActivated(() => {
      get_listTag({ size: 1000 }).then(res => {
        tagList.data = res;
        if (!route.params.gid) {
          router.push("/blogbytag/" + res[0].id);
          getPageBlog(res[0].id);
        } else {
          getPageBlog(route.params.gid);
        }
      });
    });
    // return
    return {
      pageData,
      tagList,
      pageBlog,
      pageJump,
      getPageBlog,
      route,
      tagJump
    };
  }
};
</script>

<style scoped>
</style>