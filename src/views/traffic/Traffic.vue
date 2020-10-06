<template>
  <div class="Traffic m-container-small">
    <div class="ui container">
      <!--header-->
      <div class="ui top attached padded segment">
        <div class="ui middle aligned two column grid">
          <div class="column">
            <h3 class="ui teal header">流量统计</h3>
          </div>
          <div class="right aligned column">
            统计时间从
            <h2 class="ui orange header m-inline-block m-text-thin">2020/4/17</h2>开始
          </div>
        </div>
      </div>
      <div>
        <div class="ui fluid vertical menu m-padded">
          昨日Vp
          <h2 class="ui orange header m-inline-block m-text-thin" v-text="yesterdayVp"></h2>比前日
          <h2 class="ui orange header m-inline-block m-text-thin">{{beforeGrowth}}</h2>
        </div>
      </div>
      <div>
        <div class="ui fluid vertical menu m-padded">
          今日Vp
          <h2 class="ui orange header m-inline-block m-text-thin" v-text="todayVp"></h2>比昨日
          <h2 class="ui orange header m-inline-block m-text-thin">{{ growth }}</h2>
        </div>
      </div>
      <div>
        <div class="ui fluid vertical menu m-padded">
          历史Vp
          <h2 class="ui orange header m-inline-block m-text-thin" v-text="allVp"></h2>日均
          <h2 class="ui orange header m-inline-block m-text-thin" v-text="averageDaily"></h2>
        </div>
      </div>
      <div>
        <div class="ui fluid vertical menu m-padded">
          历史
          <h2 class="ui orange header m-inline-block m-text-thin">24小时</h2>
          <span class="m-text-min">(按住Shift 滚动)</span>
          <div style="overflow: auto;">
            <canvas id="cv">你的设备不支持图表数据显示</canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//api
import {
  get_trafficList24hours,
  get_trafficByCreateTime,
  get_trafficTotal
} from "/src/ajax/api.js";
//utils
import { brokenLine } from "/src/utils/brokenLine.js";
import { getDate, getDaysBetween } from "/src/utils/changeDateFormat.js";
//compositionAPI
import { ref, onActivated, computed } from "vue";
export default {
  name: "Traffic",
  setup() {
    let beforedayVp = ref("加载中");
    let todayVp = ref("加载中");
    let allVp = ref("加载中");
    let yesterdayVp = ref("加载中");
    onActivated(() => {
      get_trafficList24hours().then(res => {
        brokenLine(res, document.getElementById("cv"));
      });
      get_trafficByCreateTime({
        query: getDate(0),
        size: 1000,
        page: 1000
      }).then(res => {
        todayVp.value = res.totalElements;
      });

      get_trafficByCreateTime({
        query: getDate(2),
        size: 1000,
        page: 1000
      }).then(res => {
        beforedayVp.value = res.totalElements;
      });

      get_trafficByCreateTime({
        query: getDate(1),
        size: 1000,
        page: 1000
      }).then(res => {
        yesterdayVp.value = res.totalElements;
      });

      get_trafficTotal().then(res => {
        allVp.value = res;
      });
    });

    let growth = computed(() => {
      let g = (
        ((todayVp.value - yesterdayVp.value) / yesterdayVp.value) *
        100
      ).toFixed(2);
      return (g < 0 ? "↓" + -g : "↑" + g) + "%";
    });

    let beforeGrowth = computed(() => {
      let g = (
        ((yesterdayVp.value - beforedayVp.value) / beforedayVp.value) *
        100
      ).toFixed(2);
      return (g < 0 ? "↓" + -g : "↑" + g) + "%";
    });

    let averageDaily = computed(() => {
      return (allVp.value / getDaysBetween("2020-04-17", new Date())).toFixed(
        2
      );
    });

    return {
      yesterdayVp,
      beforedayVp,
      growth,
      todayVp,
      beforeGrowth,
      averageDaily,
      allVp
    };
  }
};
</script>

<style scoped>
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 2px;
  height: 4px;
  background-color: rgb(255, 255, 255);
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background: #00b5ad;
}
</style>