<template>
  <div class="m-container-small">
    <div class="ui container">
      <!--header-->
      <div class="ui top attached segment">
        <div class="ui middle aligned two column grid">
          <div class="column">
            <h3 class="ui teal header">搜索 {{route.query.key}} 的结果</h3>
          </div>
          <div class="right aligned column">
            共
            <h2 class="ui orange header m-inline-block m-text-thin">{{pageBlog.data.totalElements}}</h2>条
          </div>
        </div>
      </div>

      <blog-list :pageJump="pageJump" :pageData="pageData" :pageBlog="pageBlog.data"></blog-list>
    </div>
  </div>
</template>

<script>
//component
import BlogList from "/src/components/blogList/BlogList.vue";
//compositionAPI
import { reactive, onActivated, toRaw, watch, onDeactivated } from "vue";
//api
import { get_pageBlogBySearch } from "/src/ajax/api.js";
//router
import { useRoute, useRouter } from "vue-router";
export default {
  name: "Search",
  components: { BlogList },
  setup() {
    //router
    let route = useRoute();
    let router = useRouter();

    // page message
    let pageData = reactive({
      size: 5,
      page: 0,
      query: ""
    });
    let pageBlog = reactive({ data: {} });

    //get
    let getPagaBlog = () => {
      pageData.query = route.query.key;
      get_pageBlogBySearch(toRaw(pageData)).then(res => {
        pageBlog.data = res;
      });
    };

    //page jump
    let pageJump = a => {
      pageData.page += a;
      getPagaBlog();
    };

    //activated & stop
    let stop;
    onActivated(() => {
      if (route.query.key == null || route.query.key == "") {
        router.push("/");
      } else {
        stop = watch(
          () => route.query,
          (query, prevquery) => {
            if (query.key) {
              getPagaBlog();
            }
          }
        );
        getPagaBlog();
      }
    });
    onDeactivated(() => {
      stop();
    });

    return {
      pageData,
      route,
      pageBlog,
      pageJump
    };
  }
};
</script>
