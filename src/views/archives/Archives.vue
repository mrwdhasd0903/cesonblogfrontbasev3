<template>
  <div class="m-container-small">
    <div class="ui container">
      <!--header-->
      <div class="ui top attached padded segment">
        <div class="ui middle aligned two column grid">
          <div class="column">
            <h3 class="ui teal header">归档</h3>
          </div>
          <div class="right aligned column">
            共
            <h2 class="ui orange header m-inline-block m-text-thin">{{blogcount}}</h2>篇文章
          </div>
        </div>
      </div>

      <div class="year-item" v-for="(item,index) in mapArchives.data" :key="'mapArchives'+index">
        <h3 class="ui center aligned header">{{index}}</h3>
        <div class="ui fluid vertical menu">
          <router-link
            class="item"
            v-for="(blogItem,blogIndex) in item"
            :key="'blogItem'+blogIndex"
            :to="'/blog/'+blogItem.id"
          >
            <span>
              <i class="mini teal circle icon"></i>
              <span>{{blogItem.title}}</span>
              <div
                class="ui teal basic left pointing label m-padded-mini"
              >{{changeDateFormatMMDD(blogItem.createTime)}}</div>
            </span>
            <div
              :class="colorMap[blogItem.flag]"
              class="ui basic left pointing label m-padded-mini"
            >{{blogItem.flag}}</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//api
import { get_archivemap, get_blogcount } from "/src/ajax/api.js";
//compositionAPI
import { reactive, ref, onMounted } from "vue";
//utils
import { changeDateFormatMMDD } from "/src/utils/changeDateFormat.js";
export default {
  name: "Archives",
  setup() {
    let blogcount = ref(0);
    let mapArchives = reactive({ data: {} });
    onMounted(() => {
      get_archivemap().then(res => {
        mapArchives.data = res;
      });
      get_blogcount().then(res => {
        blogcount.value = res;
      });
    });

    //color map
    let colorMap = {
      原创: "orange",
      转载: "red",
      翻译: "yellow"
    };

    //return
    return {
      changeDateFormatMMDD,
      colorMap,
      blogcount,
      mapArchives
    };
  }
};
</script>

<style scoped>
.year-item {
  margin-top: 20px;
}
</style>