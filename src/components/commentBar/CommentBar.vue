<template>
  <div class="ui bottom attached segment">
    <!--留言区域列表-->
    <div id="comment-container" class="ui teal segment">
      <div>
        <div class="ui threaded comments" style="max-width: 100%;">
          <h3 class="ui dividing header">评论</h3>
          <div class="comment" v-for="(item,index) in commentList.data" :key="'commentList'+index">
            <a class="avatar">
              <img :src="item.adminComment?userAvatar:item.avatar" />
            </a>
            <div class="content">
              <a class="author">
                <span v-text="item.nickname"></span>
                <div
                  class="ui mini basic teal left pointing label m-padded-mini"
                  v-if="item.adminComment"
                >博主</div>
              </a>
              <div class="metadata">
                <span class="date" v-text="changeDateFormat(item.createTime)"></span>
              </div>
              <div class="text" v-text="item.content"></div>
              <div class="actions">
                <a
                  class="reply"
                  :data-commentid="item.id"
                  :data-commentnickname="item.nickname"
                  @click="reply(item.id,item.nickname)"
                >回复</a>
              </div>
            </div>
            <div class="comments" v-if="item.replyComments.length>0">
              <div
                class="comment"
                v-for="(replyItem,index) in  uniqueArray(item.replyComments,'id')"
                :key="'replyComments'+index"
              >
                <a class="avatar">
                  <img :src="replyItem.adminComment?userAvatar:replyItem.avatar" />
                </a>
                <div class="content">
                  <a class="author">
                    <span v-text="replyItem.nickname"></span>
                    <div
                      class="ui mini basic teal left pointing label m-padded-mini"
                      v-if="replyItem.adminComment"
                    >博主</div>&nbsp;
                    <span v-text="'@'+ replyItem.parentComment.nickname" class="m-teal"></span>
                  </a>
                  <div class="metadata">
                    <span class="date" v-text="changeDateFormat(replyItem.createTime)"></span>
                  </div>
                  <div class="text" v-text="replyItem.content"></div>
                  <div class="actions">
                    <a
                      class="reply"
                      :data-commentid="replyItem.id"
                      :data-commentnickname="replyItem.nickname"
                      @click="reply(replyItem.id,replyItem.nickname)"
                    >回复</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="comment-form" class="ui form">
      <div class="field">
        <textarea name="content" v-model="contactData.content" placeholder="请输入评论信息..."></textarea>
      </div>
      <div class="fields">
        <div class="popup-err-intput field m-mobile-wide m-margin-bottom-small">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input
              type="text"
              name="nickname"
              :disabled="isDisabled"
              placeholder="起个响亮的昵称吧"
              v-model="contactData.nickname"
            />
          </div>
        </div>
        <div class="field m-mobile-wide m-margin-bottom-small">
          <div class="ui left icon input">
            <i class="mail icon"></i>
            <input type="text" name="email" placeholder="邮箱不会作为展示" v-model="contactData.email" />
          </div>
        </div>
        <div class="field m-margin-bottom-small m-mobile-wide">
          <button @click="delInput" class="ui teal basic button m-mobile-wide">
            <i class="eraser icon"></i>清空
          </button>
          <button @click="commentPost" type="button" class="ui teal button m-mobile-wide">
            <i class="edit icon"></i>发布
          </button>

          <button class="errmsg-button" style="display:none"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//utils
import { changeDateFormat } from "/src/utils/changeDateFormat.js";
import { uniqueArray } from "/src/utils/uniqueArray.js";
import { getCookie, setCookie } from "/src/utils/cookie.js";
//compositionAPI
import { ref, reactive, onMounted } from "vue";
//router
import { useRoute, useRouter } from "vue-router";
//api
import { get_commentList, post_comment } from "/src/ajax/api.js";
export default {
  name: "CommentBar",
  setup() {
    //router
    let route = useRoute();
    let router = useRouter();
    // data
    let popupOPtion = {
      position: "top center",
      target: ".popup-err-intput",
      title: "提示",
      on: "click",
      content: "稍等一会再留言吧"
    };
    let isDisabled = ref(false);
    let commentList = reactive({ data: [] });
    let contactData = reactive({
      "parentComment.id": -1,
      "blog.id": 0,
      nickname: "",
      email: "",
      content: "",
      avatar: "/upload/io/img/2020/4/6/1586149620923.png"
    });
    //onMounted
    onMounted(() => {
      //button popup
      $(".errmsg-button").popup(popupOPtion);

      //get message from cookie
      contactData.email = getCookie("email");
      contactData.nickname = getCookie("nickname");
      if (contactData.nickname) {
        isDisabled.value = true;
      }
      if (route.params.bid) {
        let bid = route.params.bid;
        contactData["blog.id"] = bid;
        get_commentList({ id: bid }).then(res => {
          commentList.data = res;
        });
      }
      //form check
      $(".ui.form").form({
        fields: {
          title: {
            identifier: "content",
            rules: [
              {
                type: "empty",
                prompt: "请输入评论内容"
              }
            ]
          },
          content: {
            identifier: "nickname",
            rules: [
              {
                type: "empty",
                prompt: "请输入你的大名"
              }
            ]
          },
          type: {
            identifier: "email",
            rules: [
              {
                type: "email",
                prompt: "请填写正确的邮箱地址"
              }
            ]
          }
        }
      });
    });
    //button function
    let delInput = () => {
      $("[name='content']")
        .attr("placeholder", "请输入评论信息...")
        .focus();
      contactData["parentComment.id"] = -1;
      contactData.content = "";
    };

    let reply = (id, nickname) => {
      $("[name='content']")
        .attr("placeholder", "@" + nickname)
        .focus();
      contactData["parentComment.id"] = id;
      $(window).scrollTo($("#comment-form"), 500);
    };
    // comment post
    let commentPost = () => {
      let boo = $(".ui.form").form("validate form");
      setCookie("nickname", contactData.nickname, 30);
      setCookie("email", contactData.email, 30);
      if (boo) {
        post_comment(contactData).then(res => {
          if (res === 0) {
            get_commentList({ id: route.params.bid }).then(res => {
              commentList.data = res;
              $(window).scrollTo("#comment-container", 400);
              delInput();
            });
          } else {
            $(".errmsg-button").click();
          }
          isDisabled.value = true;
        });
      } else {
        console.log("校验失败");
      }
    };
    //return
    return {
      commentList,
      changeDateFormat,
      isDisabled,
      contactData,
      delInput,
      commentPost,
      uniqueArray,
      reply
    };
  },
  props: {
    userAvatar: ""
  }
};
</script>