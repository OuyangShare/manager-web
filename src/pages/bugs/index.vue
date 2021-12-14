<template>
  <div class="page">
    <el-date-picker
      style="position: absolute; left: 15px; top: 15px"
      size="small"
      v-model="monthDate"
      :clearable="false"
      format="yyyy 年 MM 月"
      type="month"
      @change="monthChange"
      placeholder="选择月"
    >
    </el-date-picker>
    <div v-show="showCharts" class="charts mid"></div>
    <div v-show="showCharts" class="charts mid"></div>
    <div v-show="showCharts" class="charts"></div>
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
      monthDate: new Date(),
      showCharts: true,
    };
  },
  components: {},
  computed: {},
  methods: {
    monthChange() {
      this.queryDate();
    },
    queryDate() {
      axios
        .post("/api/bugs/bugsRort", {
          startTime: this.dayjs(
            new Date(this.monthDate.setMonth(this.monthDate.getMonth(), 1))
          ).format("YYYY-MM-DD 00:00:00"),
          endTime: this.dayjs(
            new Date(this.monthDate.setMonth(this.monthDate.getMonth() + 1, 0))
          ).format("YYYY-MM-DD 23:59:59"),
        })
        .then((res) => {
          this.showCharts = true;
          console.log(res);
          this.pieBuild(res.data.data);
          this.barBuild(res.data.data);
          this.singleBuild(res.data.data);
        })
        .catch((err) => {
          console.log(err);
          this.showCharts = false;
          this.$message.error("数据请求失败！");
        });
    },
    pieBuild(obj = []) {
      const nameArr = Array.from(obj, (x) => x.busLineName);
      const seriesArr = obj.map((x) => {
        return {
          value: x.bugCount,
          name: x.busLineName + " " + (x.bugRate * 100).toFixed(2) + "%",
        };
      });
      console.log(seriesArr);
      const myChart = echarts.init(
        document.getElementsByClassName("charts")[1]
      );
      myChart.setOption({
        title: {
          text: "bug数量统计",
        },
        legend: {
          data: nameArr,
        },
        tooltip: {
          // show:true,
          // trigger: "axis",
        },
        series: [
          {
            type: "pie",
            data: seriesArr,
            radius: "50%",
          },
        ],
      });
    },
    barBuild(obj) {
      const nameArr = Array.from(obj, (x) => x.busLineName);
      const seriesArr = [
        {
          name: "bug数",
          color: "blue",
          type: "bar",
          data: Array.from(obj, (e) => e.bugCount),
          stack: "x",
          label: {
            show: true,
            position: "top",
            valueAnimation: true,
          },
        },
      ];
      const myChart = echarts.init(
        document.getElementsByClassName("charts")[0]
      );
      myChart.setOption({
        title: {
          text: "bug数量统计",
        },
        legend: {
          data: ["bug数"],
        },
        tooltip: {
          // show:true,
          // trigger: "axis",
        },
        xAxis: {
          data: nameArr,
        },
        yAxis: {
          type: "value",
          name: "通过率",
          min: 0,
          position: "left",
          axisLabel: {
            formatter: "{value}",
          },
        },
        series: seriesArr,
      });
    },
    singleBuild(obj) {
      const allMap = Array.from(obj, (x) => x.map);
      console.log(allMap);
      let namesArr = [];
      let valueArr = [];
      allMap.forEach((e) => {
        namesArr = [].concat(Object.keys(e), namesArr).map((x) => {
          if (x == "") {
            return "空";
          } else {
            return x;
          }
        });
        valueArr = [].concat(Object.values(e), valueArr);
      });
      const seriesArr = [
        {
          name: "bug数",
          color: "red",
          type: "bar",
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
        document.getElementsByClassName("charts")[2]
      );
      myChart.setOption({
        title: {
          text: "缺陷处理人/状态分布图",
        },
        legend: {
          data: ["bug数"],
        },
        tooltip: {
          // show:true,
          // trigger: "axis",
        },
        xAxis: {
          data: namesArr,
          axisLabel: {
            interval: 0,
            rotate: 70,
          },
        },
        yAxis: {
          type: "value",
          name: "bug数量",
          min: 0,
          position: "left",
          axisLabel: {
            formatter: "{value}",
          },
        },
        series: seriesArr,
      });
    },
  },
  mounted() {
    this.queryDate();
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
.mid
  display: inline-block
  width: 45vw
  height: 300px
</style>