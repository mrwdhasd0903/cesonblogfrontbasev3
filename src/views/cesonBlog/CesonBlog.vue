<template>
  <div class="m-container">
    <div class="ui container">
      <div class="ui stackable grid">
        <!-- 左边博客列表 -->
        <div class="eleven wide column">
          <!-- 列表头部 -->
          <div class="ui top attached segment">
            <div class="ui middle aligned two column grid">
              <div class="column">
                <h3 class="ui teal header">文章</h3>
              </div>
              <div class="right aligned column">
                共
                <h2
                  class="ui orange header m-inline-block m-text-thin"
                >{{pageBlog.data.totalElements}}</h2>篇
              </div>
            </div>
          </div>
          <blog-list :pageJump="pageJump" :pageData="pageData" :pageBlog="pageBlog.data" />
        </div>

        <!--右边的top-->
        <div class="five wide column">
          <!--分类-->
          <div class="ui segments">
            <div class="ui secondary segment">
              <div class="ui two column grid">
                <div class="column">
                  <i class="idea icon"></i>分类
                </div>
                <div class="right aligned column">
                  <router-link to="/blogbytype/">
                    more
                    <i class="angle double right icon"></i>
                  </router-link>
                </div>
              </div>
            </div>
            <div class="ui teal segment">
              <div class="ui fluid vertical menu">
                <router-link
                  :to="'/blogbytype/' + item.id"
                  class="item"
                  v-for="(item,index) in listType.data"
                  :key="'getListType'+index"
                >
                  <span>{{item.name}}</span>
                  <div class="ui teal basic left pointing label">{{item.blogssize}}</div>
                </router-link>
              </div>
            </div>
          </div>

          <!--标签-->
          <div class="ui segments m-margin-top-large">
            <div class="ui secondary segment">
              <div class="ui two column grid">
                <div class="column">
                  <i class="tags icon"></i>标签
                </div>
                <div class="right aligned column">
                  <router-link to="/blogbytag/">
                    more
                    <i class="angle double right icon"></i>
                  </router-link>
                </div>
              </div>
            </div>
            <div class="ui teal segment">
              <router-link
                :to="'/blogbytag/' + item.id"
                :style="{
                            'color':item.color+'!important',
                            'border-color':item.color+'!important'
                          }"
                class="ui teal basic left pointing label m-margin-tb-tiny"
                v-for="(item,index) in listTag.data"
                :key="'listTag'+index"
              >
                <span>{{item.name}}</span>
                <div class="detail">{{item.blogssize}}</div>
              </router-link>
            </div>
          </div>

          <!--最新推荐-->
          <div class="ui segments m-margin-top-large">
            <div class="ui secondary segment">
              <i class="bookmark icon"></i>最新推荐
            </div>
            <div
              class="ui segment"
              v-for="(item,index) in listRecommend.data"
              :key="'listRecommend'+index"
            >
              <router-link tag="a" :to="'/blog/'+item.id" class="m-black m-text-thin">{{item.title}}</router-link>
            </div>
          </div>

          <!--广告-->
          <advertising />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//api
import {
  get_pageBlog,
  get_listType,
  get_listTag,
  get_listRecommend
} from "/src/ajax/api.js";
//compositionAPI
import { reactive, onMounted, toRaw } from "vue";
//component
import Advertising from "/src/components/advertising/Advertising.vue";
import BlogList from "/src/components/blogList/BlogList.vue";

export default {
  name: "CesonBlog",
  components: { BlogList, Advertising },
  setup() {
    //page message module
    let pageData = reactive({
      size: 5,
      page: 0
    });
    let pageBlog = reactive({ data: {} });
    let listType = reactive({ data: [] });
    let listTag = reactive({ data: [] });
    let listRecommend = reactive({ data: [] });
    //ajax request module
    let _get_pageBlog = () => {
      get_pageBlog(toRaw(pageData)).then(res => {
        pageBlog.data = res;
      });
    };
    onMounted(() => {
      _get_pageBlog();
      get_listType({ size: 6 }).then(res => {
        listType.data = res;
      });
      get_listTag({ size: 10 }).then(res => {
        listTag.data = res;
      });
      get_listRecommend({ size: 8 }).then(res => {
        listRecommend.data = res;
      });
    });

    let pageJump = a => {
      pageData.page += a;
      _get_pageBlog();
    };
    //return
    return {
      pageData,
      pageBlog,
      listType,
      listTag,
      listRecommend,
      pageJump
    };
  }
};
</script>

<style scoped>
</style>