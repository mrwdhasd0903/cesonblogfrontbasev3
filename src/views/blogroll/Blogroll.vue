<template>
  <div class="m-container-small">
    <div class="ui container">
      <!-- header-->
      <div class="ui top attached padded segment">
        <div class="ui middle aligned two column grid">
          <div class="column">
            <h3 class="ui teal header">友情链接</h3>
          </div>
          <div class="right aligned column">
            共
            <h2 class="ui orange header m-inline-block m-text-thin">{{links.data.length}}</h2>条
          </div>
        </div>
      </div>

      <div class="blogroll-content ui cards">
        <div class="card" v-for="(item,index) in links.data">
          <div class="content">
            <div class="header">{{item.name}}</div>
            <div class="description">{{item.link}}</div>
          </div>
          <a :href="item.link" target="_blank" class="basic teal ui bottom attached button">
            <i class="share icon"></i>前往
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get_links } from "/src/ajax/api.js";
import { reactive } from "vue";
export default {
  name: "Blogroll",
  setup() {
    let links = reactive({ data: [] });
    get_links().then(res => {
      links.data = res;
      console.log(res);
    });
    return {
      links
    };
  }
};
</script>

<style scoped>
.blogroll-content{
  margin-top: 20px;
}
.ui.card,
.ui.cards > .card {
  width: 270px;
}
.ui.cards {
  justify-content: center;
}
</style>