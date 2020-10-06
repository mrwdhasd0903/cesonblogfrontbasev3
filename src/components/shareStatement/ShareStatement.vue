<template>
  <div class="ui attached positive message">
    <!--博客信息-->
    <div class="ui middle aligned grid">
      <div class="eleven wide column">
        <ul class="list">
          <li>
            作者：
            <span>{{nickname}}</span>
            <a href="#comment-container">（联系{{nickname}}）</a>
          </li>
          <li>
            最后更新于：
            <span>{{updateTime}}</span>
          </li>
          <li>
            版权声明：
            <a
              href="https://creativecommons.org/licenses/by/4.0/deed.zh"
              target="_blank"
            >创意共享4.0许可证</a>
          </li>
          <li>公众号转载：请在文末添加此域名链接或二维码</li>
        </ul>
      </div>
      <div class="five wide column">
        <div id="qrcode2" class="ui right floated rounded bordered image" />
      </div>
    </div>
  </div>
</template>

<script>
import qrcode from "/src/utils/qrcode.js";
import { onMounted } from "vue";
export default {
  name: "ShareStatement",
  setup() {
    onMounted(() => {
      qrcode(105, "qrcode2");
    });
  },
  props: {
    nickname: "",
    updateTime: ""
  }
};
</script>

<style scoped>
#qrcode2 {
  padding: 5px;
  background-color: #fff;
  box-shadow: rgb(0, 0, 0) 0px 0px 6px -1px;
}
</style>