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
import axios from "axios";
import * as echarts from "echarts";
const dayjs = require("dayjs");
export default {
  data() {
    return {
      dayjs: dayjs,
      showCharts: true,
      settleStartDate: dayjs(
        new Date().setHours(23, 59, 59) - 3600 * 1000 * 24 * 7
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
      axios
        .get(
          `/api/taexe/caseExeRep?startAt=${this.settleStartDate}&endAt=${this.settleEndDate}`
        )
        .then((res) => {
          this.showCharts = true;
          console.log(res);
          this.increaseBuild(res.data.data);
        })
        .catch((err) => {
          console.log(err);
          this.showCharts = false;
          this.$message.error("数据请求失败！");
        });
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
.mid
    display: inline-block
    width: 45vw
    height: 300px
</style>