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
          busLineName: x.busLineName,
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
          show: true, //默认值true，可选为：true（显示） | false（隐藏）
          zlevel: 1, //默认值1，一级层叠控制。每一个不同的zlevel将产生一个独立的canvas，相同zlevel的组件或图标将在同一个canvas上渲染。zlevel越高越靠顶层，canvas对象增多会消耗更多的内存和性能，并不建议设置过多的zlevel，大部分情况可以通过二级层叠控制z实现层叠控制。
          z: 8, //默认值8，二级层叠控制，同一个canvas（相同zlevel）上z越高约靠顶层。
          showContent: true, //默认值true，tooltip主体内容显示策略，只需tooltip触发事件或显示axisPointer而不需要显示内容时可配置该项为false，
          trigger: "item", //默认值'item'，触发类型，默认数据触发，见下图，可选为：'item' | 'axis'
          position: null, //默认值null，位置指定，传入{Array}，如[x, y]， 固定位置[x, y]；传入{Function}，如function([x, y]) {return [newX,newY]}，默认显示坐标为输入参数，用户指定的新坐标为输出返回。
          formatter: function (params) {
            console.log(params);
            const res = params.data;
            const mapData =
              (obj.find((x) => x.busLineName == res.busLineName) || {})
                .bugType || {};
            console.log(mapData);
            let backContent = `${res.busLineName}(${res.value})： `;
            Object.keys(mapData).forEach((e) => {
              backContent +=
                "<br/><span style='font-size:12px;line-height:15px'>" +
                e +
                "：" +
                mapData[e] +
                "</span>";
            });
            return backContent;
          },
          //"{a} < br/>{b} : {c}",默认值null，内容格式器
          //折线（区域）图、柱状（条形）图、K线图 : a（系列名称），b（类目值），c（数值）, d（无）
          //散点图（气泡）图 : a（系列名称），b（数据名称），c（数值数组）, d（无）
          //地图 : a（系列名称），b（区域名称），c（合并数值）, d（无）
          //饼图、雷达图、仪表盘、漏斗图: a（系列名称），b（数据项名称），c（数值）, d（饼图：百分比 | 雷达图：指标名称）
          islandFormatter: "{a} < br/>{b} : {c}", //默认值'{a} < br/>{b} : {c}'，拖拽重计算独有，数据孤岛内容格式器
          showDelay: 20, //默认值20，显示延迟，添加显示延迟可以避免频繁切换，特别是在详情内容需要异步获取的场景，单位ms
          hideDelay: 100, //默认值100，隐藏延迟，单位ms
          transitionDuration: 0.4, //默认值0.4，动画变换时长，单位s，如果你希望tooltip的跟随实时响应，showDelay设置为0是关键，同时transitionDuration设0也会有交互体验上的差别。
          enterable: false, //默认值false，鼠标是否可进入详情气泡中，默认为false，如需详情内交互，如添加链接，按钮，可设置为true。
          backgroundColor: "#ffffff", //默认值，提示背景颜色，默认为透明度为0.7的黑色
          borderColor: "#333", //默认值，提示边框颜色
          borderRadius: 4, //默认值，提示边框圆角，单位px，默认为4
          borderWidth: 0, //默认值，提示边框线宽，单位px，默认为0（无边框）
          padding: 10, //默认值，提示内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距，同css
        },
        label: {
          emphasis: {
            show: false,
          },
          //   position: "inside",
          //   formatter: [
          //     "{a|这段文本采用样式a}",
          //     "{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}",
          //   ].join("\n"),

          //   rich: {
          //     a: {
          //       color: "red",
          //       lineHeight: 10,
          //     },
          //     b: {
          //       backgroundColor: {
          //         image: "xxx/xxx.jpg",
          //       },
          //       height: 40,
          //     },
          //     x: {
          //       fontSize: 18,
          //       fontFamily: "Microsoft YaHei",
          //       borderColor: "#449933",
          //       borderRadius: 4,
          //     },
          //   },
        },
        blur: {
          show: true,
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
    pieTipformatter(a) {
      console.log("a=" + a);
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