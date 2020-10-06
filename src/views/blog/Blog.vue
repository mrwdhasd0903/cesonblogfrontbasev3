<template>
  <div class="m-container-small">
    <no-find v-if="!route.params.bid"></no-find>
    <div v-if="blog.data">
      <div class="ui container">
        <div class="ui top attached segment">
          <div class="ui horizontal link list">
            <div class="item">
              <img :src="blog.data.user.avatar" alt class="ui avatar image" />
              <div class="content">
                <a class="header">{{blog.data.user.nickname}}</a>
              </div>
            </div>
            <div class="item">
              <i class="calendar icon"></i>
              <span>{{changeDateFormat(blog.data.updateTime)}}</span>
            </div>
            <div class="item">
              <i class="hand pointer icon"></i>
              <span>{{blog.data.views}}</span>
            </div>
            <div class="item">
              <i class="comment alternate outline icon"></i>
              <span>{{blog.data.commentssize}}</span>
            </div>
          </div>
        </div>
        <div class="ui attached segment">
          <!--图片区域-->
          <img :src="blog.data.firstPicture" class="ui fluid rounded image" />
        </div>
        <div class="ui attached padded segment">
          <!--内容-->
          <div class="ui right aligned basic segment">
            <div class="ui orange basic label">{{blog.data.flag}}</div>
          </div>

          <h2 class="ui center aligned header">{{blog.data.title}}</h2>
          <br />
          <!--中间主要内容部分-->
          <div
            id="content"
            v-highlight
            class="js-toc-content typo typo-selection m-padded-lr-responsive m-padded-tb-large"
            v-html="blog.data.content"
          ></div>
          <!--标签-->
          <div class="m-padded-lr-responsive">
            <router-link
              tag="a"
              class="ui basic teal left pointing label"
              v-for="(tagItem,index) in blog.data.tags"
              :to="'/blogbytag/'+tagItem.id"
              :style="{'color':tagItem.color+'!important','border-color':tagItem.color+'!important' }"
              :key="'tagItem'+index"
            >{{tagItem.name}}</router-link>
          </div>

          <!--赞赏-->
          <appreciation v-if="blog.data.appreciation" :payCode="contacts.data"></appreciation>
        </div>
        <!--博客版权信息-->
        <share-statement
          v-if="blog.data.shareStatement"
          :nickname="blog.data.user.nickname"
          :updateTime="changeDateFormat(blog.data.createTime)"
        ></share-statement>
        <!-- ----留言板块 -->
        <comment-bar v-if="blog.data.commentabled" :userAvatar="blog.data.user.avatar"></comment-bar>
      </div>
    </div>

    <div id="toolbar" class="m-padded m-fixed m-right-bottom">
      <div class="ui vertical icon buttons">
        <button type="button" @click="router.back(-1)" class="ui teal button">返回</button>
        <button type="button" id="directory" class="ui toc teal button">目录</button>
        <button type="button" id="leave-button" class="ui teal button">留言</button>
        <button class="ui wechat icon button">
          <i class="weixin icon"></i>
        </button>
        <button @click="setNight" class="ui icon button">
          <i class="lightbulb outline icon"></i>
        </button>
        <div id="toTop-button" class="ui icon button">
          <i class="chevron up icon"></i>
        </div>
      </div>
    </div>

    <div class="ui toc-container flowing popup transition hidden" style="width: 250px!important;">
      <ol class="js-toc"></ol>
    </div>

    <div
      id="qrcode1"
      class="ui wechat-qr flowing popup transition hidden"
      style="width: 130px !important;"
    >
      <div style="text-align:center;font-size:12px">
        <span>扫一扫</span>
        <p>使用手机阅读</p>
      </div>
    </div>
  </div>
</template>

<script>
//css
import "/src/assets/css/tocbot.css";
import "/src/assets/css/typo.css";
//utils
import { changeDateFormat } from "/src/utils/changeDateFormat.js";
import imgAmp from "/src/utils/imgAmp.js";
import qrcode from "/src/utils/qrcode.js";
//component
import Appreciation from "/src/components/appreciation/Appreciation.vue";
import ShareStatement from "/src/components/shareStatement/ShareStatement.vue";
import CommentBar from "/src/components/commentBar/CommentBar.vue";
import NoFind from "/src/components/err/NoFind.vue";
//compositionAPI
import { reactive, onDeactivated, onActivated, inject } from "vue";
//router
import { useRoute, useRouter } from "vue-router";
//api
import { get_blog, get_contacts } from "/src/ajax/api.js";
export default {
  name: "Blog",
  components: { NoFind, Appreciation, ShareStatement, CommentBar },
  setup() {
    //router
    let route = useRoute();
    let router = useRouter();
    //blog data
    let blog = reactive({ data: null });
    let contacts = reactive({ data: {} });

    // night module
    let setNight = inject("setNight", "setNight");

    //activated function
    let getWindowHref = () => window.location.href;

    let listenAll = () => {
      imgAmp("js-toc-content");
      $("#payButton").popup({
        popup: $(".payQR.popup"),
        on: "click",
        position: "bottom center"
      });
      $("#toTop-button").click(() => {
        $(window).scrollTo(0, 500);
      });
      $("#leave-button").click(() => {
        $(window).scrollTo("#comment-container", 500);
      });
      $(".toc.button").popup({
        popup: $(".toc-container.popup"),
        on: "click",
        position: "left center"
      });
      $(".wechat").popup({
        popup: $(".wechat-qr"),
        position: "left center"
      });
    };

    let tocbotInit = () => {
      tocbot.init({
        // Where to render the table of contents.
        tocSelector: ".js-toc",
        // Where to grab the headings to build the table of contents.
        contentSelector: "#content",
        // Which headings to grab inside of the contentSelector element.
        headingSelector: "h1, h2, h3, h4"
      });
      $("#directory").click();
    };

    let setTO = () => {
      setTimeout(() => {
        listenAll();
        tocbotInit();
        qrcode(120, "qrcode1");
        let html = "<div style='width:100%;overflow:auto'></div>";
        $(".table").wrap(html);
      }, 200);
    };
    //activated
    onDeactivated(() => {
      blog.data = null;
    });
    onActivated(() => {
      if (route.params.bid) {
        get_blog({ id: route.params.bid }).then(
          res => {
            blog.data = res;
            $(window).scrollTo(0, 10);
            setTO();
          },
          err => {
            router.push("/blog");
          }
        );
        get_contacts().then(res => {
          contacts.data = res;
        });
      }
    });
    // return
    return {
      route,
      setNight,
      blog,
      router,
      getWindowHref,
      contacts,
      changeDateFormat
    };
  }
};
</script>