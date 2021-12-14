<template>
  <div class="page">
    <div v-show="showCharts" class="charts"></div>
    <div v-show="showCharts" class="charts"></div>
    <div v-show="showCharts" class="charts"></div>
  </div>
</template>

<script>
import axios from "axios";
import * as echarts from "echarts";
// const dayjs = require("dayjs");
export default {
  data() {
    return {
      showCharts: true,
    };
  },
  components: {},
  methods: {
    pieBuild() {
      const myChart = echarts.init(
        document.getElementsByClassName("charts")[1]
      );
      myChart.setOption({
        title: {
          text: "测试报告",
        },
        legend: {
          data: ["直接访问", "联盟广告", "搜索引擎"],
        },
        tooltip: {
          // show:true,
          // trigger: "axis",
        },
        series: [
          {
            type: "pie",
            data: [
              {
                value: 335,
                name: "直接访问",
              },
              {
                value: 234,
                name: "联盟广告",
              },
              {
                value: 1548,
                name: "搜索引擎",
              },
            ],
          },
        ],
      });
    },
    barBuild() {
      const myChart = echarts.init(
        document.getElementsByClassName("charts")[0]
      );
      myChart.setOption({
        title: {
          text: "测试报告",
        },
        legend: {
          data: ["冒烟测试通过率", "第一轮测试通过率", "第二轮测试通过率"],
        },
        tooltip: {
          // show:true,
          // trigger: "axis",
        },
        xAxis: {
          data: ["s", "e", "e"],
        },
        yAxis: {
          type: "value",
          name: "通过率",
          min: 0,
          max: 10,
          position: "left",
          axisLabel: {
            formatter: "{value}",
          },
        },
        series: [
          {
            name: "冒烟测试通过率",
            color: "red",
            type: "bar",
            data: [1, 2, 4],
            stack: "x",
            label: {
              show: true,
              position: "top",
              valueAnimation: true,
            },
          },
          {
            name: "第一轮测试通过率",
            color: "yellow",
            type: "bar",
            data: [1, 2, 4],
            stack: "x",
            label: {
              show: true,
              position: "top",
              valueAnimation: true,
            },
          },
          {
            name: "第二轮测试通过率",
            color: "green",
            type: "bar",
            data: [1, 2, 4],
            stack: "x",
            label: {
              show: true,
              position: "top",
              valueAnimation: true,
            },
          },
        ],
      });
    },
  },
  mounted() {
    axios
      .post("/api/bugs/bugsRort", {
        startTime: "2021-12-01 00:00:00",
        endTime: "2021-12-31 00:00:00",
      })
      .then((res) => {
        console.log(res);
        this.pieBuild(res.data);
        this.barBuild(res.data);
      });
  },
};
</script>

<style lang="sass" scoped>
// p:nth-child(2)
//     background: #eeeeee
.charts
    width: 90vw
    height: 300px
</style>