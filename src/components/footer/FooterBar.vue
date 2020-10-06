<template>
  <footer class="ui inverted vertical segment m-padded-tb-massive">
    <div class="ui center aligned container">
      <div class="ui inverted divided stackable grid">
        <div class="four wide column">
          <div class="ui inverted link list">
            <div class="item">
              <img
                :src="listContact.data.wechatCode"
                class="ui rounded image"
                alt
                style="width: 110px"
              />
            </div>
          </div>
        </div>
        <div class="four wide column">
          <h4 class="ui inverted header m-text-thin m-text-spaced">友情链接</h4>
          <div class="ui inverted link list">
            <a
              v-for="(item,index) in listLink.data"
              :key="'listLink'+index"
              :href="item.link"
              class="item m-text-thin"
              target="_blank"
            >{{item.name}}</a>
            <router-link class="item m-text-thin" to="/blogroll">查看更多&申请 >></router-link>
          </div>
        </div>
        <div class="four wide column">
          <h4 class="ui inverted header m-text-thin m-text-spaced">联系小王</h4>
          <div class="ui inverted link list">
            <a class="item m-text-thin">
              <i class="qq icon" />
              {{listContact.data.qq}}
            </a>
            <a class="item m-text-thin">
              <i class="wechat icon" />
              {{listContact.data.wechat}}
            </a>
            <a href="https://github.com/mrwdhasd0903" target="_blank" class="item github-ico">
              <i class="github icon" />
            </a>
          </div>
        </div>
        <div class="four wide column">
          <br />
          <br />
          <p class="m-text-thin m-text-spaced m-opacity-mini">唯有时间对我们一视同仁</p>
        </div>
      </div>
      <div class="ui inverted section divider"></div>
      <p class="m-text-thin m-text-spaced m-opacity-tiny">
        <a
          style="color:rgba(255,255,255,.9)"
          href="http://www.beian.gov.cn/"
          target="_blank"
        >粤ICP备20003149号</a> | Copyright © 2019 - 2022 - www.wdhhh.cn | By 小王的程序人生
      </p>
    </div>
  </footer>
</template>

<script>
//api
import { get_contacts, get_links } from "/src/ajax/api.js";
//compositionAPI
import { onMounted, reactive } from "vue";
//utils
import randomArray from "/src/utils/randomArray.js";
export default {
  name: "Footer",
  setup() {
    let listContact = reactive({ data: [] });
    let listLink = reactive({ data: [] });
    onMounted(() => {
      get_contacts().then(res => {
        listContact.data = res[0];
      });
      get_links().then(res => {
        listLink.data = randomArray(3, res);
      });
    });

    return {
      listContact,
      listLink
    };
  }
};
</script>

<style scoped>
.github-ico {
  font-size: 2.3em;
}
.github-ico i:hover {
  color: #e1e1e1 !important;
}
</style>