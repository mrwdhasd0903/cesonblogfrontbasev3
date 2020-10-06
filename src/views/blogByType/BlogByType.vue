<template>
  <div class="m-container-small">
    <div class="ui container">
      <!--header-->
      <div class="ui top attached segment">
        <div class="ui middle aligned two column grid">
          <div class="column">
            <h3 class="ui teal header">分类</h3>
          </div>
          <div class="right aligned column">
            共
            <h2 class="ui orange header m-inline-block m-text-thin">{{typeList.data.length}}</h2>个
          </div>
        </div>
      </div>

      <div class="ui attached segment m-padded-tb-large">
        <div
          @click="[getPageBlog(item.id),typeJump(item.id)]"
          class="ui labeled button m-margin-tb-tiny"
          v-for="(item,index) in typeList.data"
          :key="'typeList'+index"
        >
          <span class="ui basic button" :class="{teal:route.params.tid==item.id}">{{item.name}}</span>
          <div
            class="ui basic left pointing label"
            :class="{teal:route.params.tid==item.id}"
          >{{item.blogssize}}</div>
        </div>
      </div>

      <blog-list :pageJump="pageJump" :pageData="pageData" :pageBlog="pageBlog.data"></blog-list>
    </div>
  </div>
</template>

<script>
//api
import { get_listType, get_pageBlogByType } from "/src/ajax/api.js";
//compositionAPI
import { toRaw, reactive, onActivated } from "vue";
//router
import { useRoute, useRouter } from "vue-router";
//component
import BlogList from "/src/components/blogList/BlogList.vue";
export default {
  name: "BlogByType",
  components: { BlogList },
  setup() {
    //router jump module
    let route = useRoute();
    let router = useRouter();
    let typeJump = link => {
      router.push("/blogbytype/" + link);
    };

    //page message
    let pageData = reactive({
      // sort: "",
      size: 5,
      page: 0,
      id: ""
    });
    let typeList = reactive({ data: [] });
    let pageBlog = reactive({ data: {} });

    //page jump&show
    let getPageBlog = id => {
      if (id != -1) {
        pageData.id = id;
      }
      get_pageBlogByType(toRaw(pageData)).then(res => {
        pageBlog.data = res;
        if (pageData.page > res.totalPages - 1) {
          pageData.page = 0;
          get_pageBlogByType(toRaw(pageData)).then(res => {
            pageBlog.data = res;
          });
        }
      });
    };
    let pageJump = a => {
      pageData.page += a;
      getPageBlog(-1);
    };

    // activated
    onActivated(() => {
      get_listType({ size: 1000 }).then(res => {
        typeList.data = res;
        if (!route.params.tid) {
          router.push("/blogbytype/" + res[0].id);
          getPageBlog(res[0].id);
        } else {
          getPageBlog(route.params.tid);
        }
      });
    });

    //return
    return {
      pageData,
      typeList,
      pageBlog,
      pageJump,
      getPageBlog,
      route,
      typeJump
    };
  }
};
</script>

<style scoped>
</style>