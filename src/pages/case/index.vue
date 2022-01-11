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
    <div v-show="showCharts" class="charts"></div>
  </div>
</template>

<script>
// import axios from "axios";
import * as echarts from "echarts";
const dayjs = require("dayjs");
export default {
  data() {
    return {
      dayjs: dayjs,
      monthDate: new Date(),
      showCharts: true,
      settleStartDate: "",
      settleEndDate: "",
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
            "YYYY-MM-DD HH:mm:ss"
          );
          this.settleEndDate = this.dayjs(val[1]).format("YYYY-MM-DD HH:mm:ss");
        } else {
          this.settleStartDate = "";
          this.settleEndDate = "";
        }
      },
    },
  },
  methods: {
    dateChange() {
      this.queryIncreaseData();
    },
    queryIncreaseData() {
      const obj = {
        state: 1,
        data: [
          {
            id: 47,
            type: 1,
            count: 52,
            exeat: "2022-01-04 00:00:00",
            createat: "2022-01-05 10:12:26",
            updateat: null,
            exeitems: [
              {
                id: 64,
                exeId: 47,
                source: "质检中心",
                version: "质检中心V1.2.0",
                countcase: 19,
                type: 1,
                executedat: "2022-01-04 00:00:00",
                createat: "2022-01-05 10:14:18",
                updateat: null,
              },
              {
                id: 65,
                exeId: 47,
                source: "云埔",
                version: "锅圈云铺V3.1.2",
                countcase: 33,
                type: 1,
                executedat: "2022-01-04 00:00:00",
                createat: "2022-01-05 10:14:40",
                updateat: null,
              },
            ],
          },
          {
            id: 45,
            type: 1,
            count: 72,
            exeat: "2021-12-31 00:00:00",
            createat: "2022-01-05 10:05:25",
            updateat: null,
            exeitems: [
              {
                id: 60,
                exeId: 45,
                source: "质检中心",
                version: "质检中心V1.2.0",
                countcase: 10,
                type: 1,
                executedat: "2021-12-31 00:00:00",
                createat: "2022-01-05 10:05:25",
                updateat: null,
              },
              {
                id: 61,
                exeId: 45,
                source: "云埔",
                version: "锅圈云铺V3.1.2",
                countcase: 62,
                type: 1,
                executedat: "2021-12-31 00:00:00",
                createat: "2022-01-05 10:05:25",
                updateat: null,
              },
            ],
          },
          {
            id: 44,
            type: 1,
            count: 80,
            exeat: "2021-12-30 00:00:00",
            createat: "2022-01-05 10:05:00",
            updateat: null,
            exeitems: [
              {
                id: 59,
                exeId: 44,
                source: "云埔",
                version: "锅圈云铺V3.1.2",
                countcase: 80,
                type: 1,
                executedat: "2021-12-30 00:00:00",
                createat: "2022-01-05 10:05:00",
                updateat: null,
              },
            ],
          },
          {
            id: 43,
            type: 1,
            count: 27,
            exeat: "2021-12-29 00:00:00",
            createat: "2022-01-05 10:04:28",
            updateat: null,
            exeitems: [
              {
                id: 56,
                exeId: 43,
                source: "质检中心",
                version: "质检中心V1.1.1",
                countcase: 2,
                type: 1,
                executedat: "2021-12-29 00:00:00",
                createat: "2022-01-05 10:04:28",
                updateat: null,
              },
              {
                id: 57,
                exeId: 43,
                source: "金蝶",
                version: "金蝶云星空7.6",
                countcase: 22,
                type: 1,
                executedat: "2021-12-29 00:00:00",
                createat: "2022-01-05 10:04:28",
                updateat: null,
              },
              {
                id: 58,
                exeId: 43,
                source: "云埔",
                version: "锅圈云铺V3.1.2",
                countcase: 3,
                type: 1,
                executedat: "2021-12-29 00:00:00",
                createat: "2022-01-05 10:04:28",
                updateat: null,
              },
            ],
          },
          {
            id: 42,
            type: 1,
            count: 71,
            exeat: "2021-12-28 00:00:00",
            createat: "2022-01-05 10:03:47",
            updateat: null,
            exeitems: [
              {
                id: 53,
                exeId: 42,
                source: "质检中心",
                version: "质检中心V1.1.1",
                countcase: 59,
                type: 1,
                executedat: "2021-12-28 00:00:00",
                createat: "2022-01-05 10:03:47",
                updateat: null,
              },
              {
                id: 54,
                exeId: 42,
                source: "金蝶",
                version: "金蝶云星空7.6",
                countcase: 10,
                type: 1,
                executedat: "2021-12-28 00:00:00",
                createat: "2022-01-05 10:03:47",
                updateat: null,
              },
              {
                id: 55,
                exeId: 42,
                source: "商品中心",
                version: "商品中心V2.6.0",
                countcase: 2,
                type: 1,
                executedat: "2021-12-28 00:00:00",
                createat: "2022-01-05 10:03:47",
                updateat: null,
              },
            ],
          },
          {
            id: 41,
            type: 1,
            count: 96,
            exeat: "2021-12-27 00:00:00",
            createat: "2021-12-28 09:28:24",
            updateat: null,
            exeitems: [
              {
                id: 51,
                exeId: 41,
                source: "质检中心",
                version: "质检中心V1.1.1",
                countcase: 84,
                type: 1,
                executedat: "2021-12-27 00:00:00",
                createat: "2021-12-28 09:28:24",
                updateat: null,
              },
              {
                id: 52,
                exeId: 41,
                source: "OMS-B",
                version: "订单中心V1.7.0",
                countcase: 12,
                type: 1,
                executedat: "2021-12-27 00:00:00",
                createat: "2021-12-28 09:28:24",
                updateat: null,
              },
            ],
          },
          {
            id: 39,
            type: 1,
            count: 0,
            exeat: "2021-12-26 00:00:00",
            createat: "2021-12-28 09:27:30",
            updateat: null,
            exeitems: [],
          },
          {
            id: 38,
            type: 1,
            count: 0,
            exeat: "2021-12-25 00:00:00",
            createat: "2021-12-28 09:27:10",
            updateat: null,
            exeitems: [],
          },
          {
            id: 37,
            type: 1,
            count: 109,
            exeat: "2021-12-24 00:00:00",
            createat: "2021-12-28 09:25:46",
            updateat: null,
            exeitems: [
              {
                id: 48,
                exeId: 37,
                source: "质检中心",
                version: "质检中心V1.1.1",
                countcase: 63,
                type: 1,
                executedat: "2021-12-24 00:00:00",
                createat: "2021-12-28 09:25:46",
                updateat: null,
              },
              {
                id: 49,
                exeId: 37,
                source: "金蝶",
                version: "金蝶云星空7.6",
                countcase: 12,
                type: 1,
                executedat: "2021-12-24 00:00:00",
                createat: "2021-12-28 09:25:46",
                updateat: null,
              },
              {
                id: 50,
                exeId: 37,
                source: "云埔",
                version: "锅圈云铺V3.1.1.1",
                countcase: 34,
                type: 1,
                executedat: "2021-12-24 00:00:00",
                createat: "2021-12-28 09:25:46",
                updateat: null,
              },
            ],
          },
          {
            id: 36,
            type: 1,
            count: 172,
            exeat: "2021-12-23 00:00:00",
            createat: "2021-12-28 09:25:09",
            updateat: null,
            exeitems: [
              {
                id: 45,
                exeId: 36,
                source: "质检中心",
                version: "质检中心V1.1.1",
                countcase: 100,
                type: 1,
                executedat: "2021-12-23 00:00:00",
                createat: "2021-12-28 09:25:09",
                updateat: null,
              },
              {
                id: 46,
                exeId: 36,
                source: "商品中心",
                version: "商品中心V2.6.0",
                countcase: 7,
                type: 1,
                executedat: "2021-12-23 00:00:00",
                createat: "2021-12-28 09:25:09",
                updateat: null,
              },
              {
                id: 47,
                exeId: 36,
                source: "云埔",
                version: "锅圈云铺V3.1.1",
                countcase: 65,
                type: 1,
                executedat: "2021-12-23 00:00:00",
                createat: "2021-12-28 09:25:09",
                updateat: null,
              },
            ],
          },
          {
            id: 35,
            type: 1,
            count: 377,
            exeat: "2021-12-22 00:00:00",
            createat: "2021-12-28 09:24:35",
            updateat: null,
            exeitems: [
              {
                id: 28,
                exeId: 35,
                source: "店铺中心",
                version: "店铺中心V1.9.4",
                countcase: 30,
                type: 1,
                executedat: "2021-12-22 00:00:00",
                createat: "2021-12-28 09:24:35",
                updateat: null,
              },
              {
                id: 29,
                exeId: 35,
                source: "店铺中心",
                version: "店铺中心V2.2.0",
                countcase: 29,
                type: 1,
                executedat: "2021-12-22 00:00:00",
                createat: "2021-12-28 09:24:35",
                updateat: null,
              },
              {
                id: 30,
                exeId: 35,
                source: "店铺中心",
                version: "店铺中心-V1.9.4.1",
                countcase: 30,
                type: 1,
                executedat: "2021-12-22 00:00:00",
                createat: "2021-12-28 09:24:35",
                updateat: null,
              },
              {
                id: 31,
                exeId: 35,
                source: "金蝶",
                version: "金蝶云星空7.6",
                countcase: 6,
                type: 1,
                executedat: "2021-12-22 00:00:00",
                createat: "2021-12-28 09:24:35",
                updateat: null,
              },
              {
                id: 32,
                exeId: 35,
                source: "OMS-B",
                version: "订单中心V1.5.0",
                countcase: 1,
                type: 1,
                executedat: "2021-12-22 00:00:00",
                createat: "2021-12-28 09:24:35",
                updateat: null,
              },
              {
                id: 33,
                exeId: 35,
                source: "OMS-B",
                version: "订单中心V1.4.0",
                countcase: 3,
                type: 1,
                executedat: "2021-12-22 00:00:00",
                createat: "2021-12-28 09:24:35",
                updateat: null,
              },
              {
                id: 34,
                exeId: 35,
                source: "OMS-B",
                version: "订单中心V1.6.0",
                countcase: 4,
                type: 1,
                executedat: "2021-12-22 00:00:00",
                createat: "2021-12-28 09:24:35",
                updateat: null,
              },
              {
                id: 35,
                exeId: 35,
                source: "商品中心",
                version: "商品中心V2.4.0",
                countcase: 9,
                type: 1,
                executedat: "2021-12-22 00:00:00",
                createat: "2021-12-28 09:24:35",
                updateat: null,
              },
              {
                id: 36,
                exeId: 35,
                source: "商品中心",
                version: "商品中心V2.5.0",
                countcase: 15,
                type: 1,
                executedat: "2021-12-22 00:00:00",
                createat: "2021-12-28 09:24:35",
                updateat: null,
              },
              {
                id: 37,
                exeId: 35,
                source: "商品中心",
                version: "商品中心V2.6.0",
                countcase: 26,
                type: 1,
                executedat: "2021-12-22 00:00:00",
                createat: "2021-12-28 09:24:35",
                updateat: null,
              },
              {
                id: 38,
                exeId: 35,
                source: "商品中心",
                version: "商品中心V2.1.0",
                countcase: 30,
                type: 1,
                executedat: "2021-12-22 00:00:00",
                createat: "2021-12-28 09:24:35",
                updateat: null,
              },
              {
                id: 39,
                exeId: 35,
                source: "商品中心",
                version: "商品中心V2.2.0",
                countcase: 30,
                type: 1,
                executedat: "2021-12-22 00:00:00",
                createat: "2021-12-28 09:24:35",
                updateat: null,
              },
              {
                id: 40,
                exeId: 35,
                source: "云埔",
                version: "锅圈云铺V2.2.1",
                countcase: 38,
                type: 1,
                executedat: "2021-12-22 00:00:00",
                createat: "2021-12-28 09:24:35",
                updateat: null,
              },
              {
                id: 41,
                exeId: 35,
                source: "云埔",
                version: "锅圈云铺V3.1.1",
                countcase: 46,
                type: 1,
                executedat: "2021-12-22 00:00:00",
                createat: "2021-12-28 09:24:35",
                updateat: null,
              },
              {
                id: 42,
                exeId: 35,
                source: "云埔",
                version: "锅圈云铺V3.1.1.1",
                countcase: 16,
                type: 1,
                executedat: "2021-12-22 00:00:00",
                createat: "2021-12-28 09:24:35",
                updateat: null,
              },
              {
                id: 43,
                exeId: 35,
                source: "协同平台",
                version: "供应商协同V2.2.0",
                countcase: 18,
                type: 1,
                executedat: "2021-12-22 00:00:00",
                createat: "2021-12-28 09:24:35",
                updateat: null,
              },
              {
                id: 44,
                exeId: 35,
                source: "协同平台",
                version: "供应商协同V2.1.0",
                countcase: 46,
                type: 1,
                executedat: "2021-12-22 00:00:00",
                createat: "2021-12-28 09:24:35",
                updateat: null,
              },
            ],
          },
          {
            id: 29,
            type: 1,
            count: 136,
            exeat: "2021-12-21 00:00:00",
            createat: "2021-12-27 13:27:18",
            updateat: null,
            exeitems: [
              {
                id: 14,
                exeId: 29,
                source: "店铺中心",
                version: "店铺中心V2.2.0",
                countcase: 17,
                type: 1,
                executedat: "2021-12-21 00:00:00",
                createat: "2021-12-27 13:27:18",
                updateat: null,
              },
              {
                id: 15,
                exeId: 29,
                source: "质检中心",
                version: "质检中心V1.0.0",
                countcase: 23,
                type: 1,
                executedat: "2021-12-21 00:00:00",
                createat: "2021-12-27 13:27:18",
                updateat: null,
              },
              {
                id: 16,
                exeId: 29,
                source: "OMS-B",
                version: "订单中心V1.7.0",
                countcase: 25,
                type: 1,
                executedat: "2021-12-21 00:00:00",
                createat: "2021-12-27 13:27:18",
                updateat: null,
              },
              {
                id: 17,
                exeId: 29,
                source: "云埔",
                version: "锅圈云铺V3.1.1.1",
                countcase: 12,
                type: 1,
                executedat: "2021-12-21 00:00:00",
                createat: "2021-12-27 13:27:18",
                updateat: null,
              },
              {
                id: 18,
                exeId: 29,
                source: "商品中心",
                version: "商品中心V2.6.0",
                countcase: 6,
                type: 1,
                executedat: "2021-12-21 00:00:00",
                createat: "2021-12-27 13:27:18",
                updateat: null,
              },
              {
                id: 19,
                exeId: 29,
                source: "协同平台",
                version: "供应商协同V2.3.0",
                countcase: 53,
                type: 1,
                executedat: "2021-12-21 00:00:00",
                createat: "2021-12-27 13:27:18",
                updateat: null,
              },
            ],
          },
        ],
        errmsg: null,
        errcode: 0,
      };
      this.increaseBuild(obj.data);
    },
    increaseBuild(obj) {
      console.log(obj);
      const namesArr = Array.from(obj, (x) =>
        this.dayjs(x.exeat).format("YYYY.MM.DD")
      );
      console.log(namesArr);

      const valueArr = obj.map((x) => {
        return {
          value: x.count,
          id: x.id,
        };
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
        document.getElementsByClassName("charts")[0]
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
          formatter: function (params) {
            const res = params.data;
            const item = obj.find((x) => x.id == res.id) || {};
            console.log(item);
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
.mid
    display: inline-block
    width: 45vw
    height: 300px
</style>