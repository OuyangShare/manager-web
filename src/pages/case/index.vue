<template>
  <div class="page">
    <el-date-picker
      v-model="settleDate"
      size="small"
      type="daterange"
      style="position: absolute; left: 15px; top: 15px"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      @change="dateChange"
      end-placeholder="结束日期"
      :picker-options="pickerOptionsDate"
    >
    </el-date-picker>
    <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
      <el-tab-pane label="汇总" name="taExes">
        <div v-show="showCharts" class="charts charts_taExes"></div>
      </el-tab-pane>
      <el-tab-pane label="产线" name="source">
        <div v-show="showChartsSource" class="charts charts_source"></div>
      </el-tab-pane>
      <el-tab-pane label="执行人" name="user">
        <div v-show="showChartsUser" class="charts charts_user"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from "axios";
import * as echarts from "echarts";
const dayjs = require("dayjs");
export default {
  data() {
    return {
      dayjs: dayjs,
      activeTab: "taExes",
      colorArr: [
        "blue",
        "red",
        "yellow",
        "green",
        "#33B5E5",
        "#0099CC",
        "#AA66CC",
        "#9933CC",
        "#99CC00",
        "#669900",
        "#FFBB33",
        "#FF8800",
        "#FF4444",
        "#CC0000",
      ],
      initData: {},
      showCharts: true,
      showChartsSource: false,
      showChartsUser: false,
      settleStartDate: dayjs(
        new Date().setHours(0, 0, 0) - 3600 * 1000 * 24 * 6
      ).format("YYYY-MM-DD HH:mm:ss"),
      settleEndDate: dayjs(new Date().setHours(23, 59, 59)).format(
        "YYYY-MM-DD HH:mm:ss"
      ),
      pickerOptionsDate: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
        disabledDate: (time) => {
          return new Date(time).getTime() > new Date().getTime();
        },
      },
    };
  },
  components: {},
  computed: {
    settleDate: {
      get: function () {
        return [this.settleStartDate, this.settleEndDate];
      },
      set: function (val) {
        if (val) {
          this.settleStartDate = this.dayjs(val[0]).format(
            "YYYY-MM-DD 00:00:00"
          );
          this.settleEndDate = this.dayjs(val[1]).format("YYYY-MM-DD HH:mm:ss");
        } else {
          this.settleStartDate = "";
          this.settleEndDate = "";
        }
      },
    },
    diffDate() {
      const diffTimeStamp =
        new Date(this.settleEndDate).getTime() -
        new Date(this.settleStartDate).getTime();
      return parseInt(diffTimeStamp / 86400000 || 7);
    },
  },
  methods: {
    dateChange() {
      this.queryIncreaseData();
    },
    queryIncreaseData() {
      axios
        .get(
          `/api/taexe/caseExeRep?startAt=${this.settleStartDate}&endAt=${this.settleEndDate}`
        )
        .then((res) => {
          this.initData = res.data.data;
          this.increaseTaexesBuild(this.initData.taExes);
          this.increaseSoureBuild(this.initData.source);
          this.increaseUserBuild(this.initData.user);
        })
        .catch((err) => {
          console.log(err);
          this.showCharts = false;
          this.showChartsSource = false;
          this.showChartsUser = false;
          this.$message.error("数据请求失败！");
        });
    },
    increaseTaexesBuild(obj) {
      const namesArr = [];
      const valueArr = [];
      for (let i = 0; i <= this.diffDate; i++) {
        namesArr.push(
          this.dayjs(
            new Date(this.settleStartDate).setHours(24 * i + 1)
          ).format("YYYY.MM.DD")
        );
      }
      namesArr.forEach((e) => {
        const valItem = obj.find((x) => {
          return (
            this.dayjs(e).format("YYYY.MM.DD") ===
            this.dayjs(x.exeat).format("YYYY.MM.DD")
          );
        });
        if (valItem) {
          valueArr.push({
            value: valItem.count,
            id: valItem.id,
            date: valItem.exeat,
          });
        } else {
          valueArr.push({
            value: 0,
            id: null,
            date: null,
          });
        }
      });
      const seriesArr = [
        {
          name: "执行用例数",
          color: "blue",
          type: "line",
          smooth: true,
          data: valueArr,
          stack: "x",
          label: {
            show: true,
            position: "top",
            valueAnimation: true,
          },
        },
      ];
      const myChart = echarts.init(
        document.getElementsByClassName("charts_taExes")[0]
      );
      myChart.setOption({
        title: {
          text: "各域执行分布图",
        },
        legend: {
          data: ["执行用例数"],
        },
        tooltip: {
          // show:true,
          // trigger: "axis",
          triggerOn: "click",
          enterable: true,
          appendToBody: true,
          formatter: function (params) {
            const res = params.data;
            const item = obj.find((x) => x.id == res.id) || {};
            let backContent = ``;
            item.exeitems.forEach((e, idx) => {
              backContent +=
                `${idx < 1 ? "" : "<br/>"}` +
                "<span style='font-size:12px;line-height:15px'>" +
                e.source +
                "(" +
                e.version +
                ")" +
                "：" +
                e.countcase +
                "</span>";
            });
            return backContent;
          },
        },
        xAxis: {
          data: namesArr,
          type: "category",
          axisLabel: {
            interval: 0,
            rotate: 70,
          },
        },
        yAxis: {
          type: "value",
          name: "数量",
          min: 0,
          position: "left",
          axisLabel: {
            formatter: "{value}",
          },
        },
        series: seriesArr,
      });
      this.showCharts = true;
    },
    increaseSoureBuild(obj) {
      const namesArr = [];
      for (let i = 0; i <= this.diffDate; i++) {
        namesArr.push(
          this.dayjs(
            new Date(this.settleStartDate).setHours(24 * i + 1)
          ).format("YYYY.MM.DD")
        );
      }
      const sourceArr = Object.keys(obj);
      const seriesArr = [];
      sourceArr.forEach((s, idx) => {
        let valueArr = [];
        namesArr.forEach((e) => {
          console.log(e);
          const valItem = obj[s].find((x) => {
            return (
              this.dayjs(e).format("YYYY.MM.DD") ===
              this.dayjs(x.executedAt).format("YYYY.MM.DD")
            );
          });
          console.log(valItem);
          if (valItem) {
            valueArr.push({
              value: valItem.total,
              id: valItem.id,
              date: valItem.executedAt,
            });
          } else {
            valueArr.push({
              value: 0,
              id: null,
              date: null,
            });
          }
        });
        seriesArr.push({
          name: s,
          color: this.colorArr[idx],
          type: "line",
          smooth: true,
          data: valueArr,
          stack: s,
          // areaStyle: {
          //   opacity: 0.8,
          //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //     {
          //       offset: 0,
          //       color: this.colorArr[idx],
          //     },
          //     {
          //       offset: 1,
          //       color: this.colorArr[idx],
          //     },
          //   ]),
          // },
          label: {
            show: true,
            position: "top",
            valueAnimation: true,
          },
        });
      });
      const myChart = echarts.init(
        document.getElementsByClassName("charts_source")[0]
      );
      myChart.setOption({
        title: {
          text: "执行分布图",
        },
        legend: {
          data: sourceArr,
        },
        tooltip: {
          // show:true,
          // trigger: "axis",
          enterable: true,
          appendToBody: true,
          // formatter: function (params) {},
        },
        xAxis: {
          data: namesArr,
          type: "category",
          axisLabel: {
            interval: 0,
            rotate: 70,
          },
        },
        yAxis: {
          type: "value",
          name: "数量",
          min: 0,
          position: "left",
          axisLabel: {
            formatter: "{value}",
          },
        },
        series: seriesArr,
      });
      this.showChartsSource = true;
    },
    increaseUserBuild(obj) {
      const namesArr = [];
      for (let i = 0; i <= this.diffDate; i++) {
        namesArr.push(
          this.dayjs(
            new Date(this.settleStartDate).setHours(24 * i + 1)
          ).format("YYYY.MM.DD")
        );
      }
      const userArr = Object.keys(obj);
      const seriesArr = [];
      userArr.forEach((s, idx) => {
        let valueArr = [];
        namesArr.forEach((e) => {
          const valItem = obj[s].find((x) => {
            return (
              this.dayjs(e).format("YYYY.MM.DD") ===
              this.dayjs(x.executedat).format("YYYY.MM.DD")
            );
          });
          if (valItem) {
            valueArr.push({
              value: valItem.countcase,
              id: valItem.id,
              date: valItem.executedat,
            });
          } else {
            valueArr.push({
              value: 0,
              id: null,
              date: null,
            });
          }
        });
        seriesArr.push({
          name: s,
          color: this.colorArr[idx],
          type: "line",
          smooth: true,
          data: valueArr,
          stack: s,
          label: {
            show: true,
            position: "top",
            valueAnimation: true,
          },
        });
      });
      const myChart = echarts.init(
        document.getElementsByClassName("charts_user")[0]
      );
      myChart.setOption({
        title: {
          text: "执行分布图",
        },
        legend: {
          data: userArr,
        },
        tooltip: {
          // show:true,
          // trigger: "axis",
          enterable: true,
          appendToBody: true,
          // formatter: function (params) {},
        },
        xAxis: {
          data: namesArr,
          type: "category",
          axisLabel: {
            interval: 0,
            rotate: 70,
          },
        },
        yAxis: {
          type: "value",
          name: "数量",
          min: 0,
          position: "left",
          axisLabel: {
            formatter: "{value}",
          },
        },
        series: seriesArr,
      });
      this.showChartsUser = true;
    },
    handleClick(val) {
      switch (val) {
        case "taExes":
          // this.showCharts = true;
          break;
        case "source":
          // this.increaseSoureBuild(this.initData.source);
          // this.showChartsSource = true;
          break;
        case "user":
          // this.increaseUserBuild(this.initData.user);
          // this.showChartsUser = true;
          break;
      }
    },
  },
  mounted() {
    this.queryIncreaseData();
  },
};
</script>

<style lang="sass" scoped>
// p:nth-child(2)
//     background: #eeeeee
.charts
  display: inline-block
  width: 90vw
  height: 300px
  margin-top: 30px
// .charts_source
  // display: inline-block
  // width: 45vw
  // height: 300px
  // margin-top: 30px
// .charts_user
  // display: inline-block
  // width: 45vw
  // height: 300px
  // margin-top: 30px
.mid
  display: inline-block
  width: 45vw
  height: 300px
</style>