<template>
  <div class="page">
    <div v-show="showCharts" class="charts"></div>
    <el-form size="small" ref="form" :model="form" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="时间" prop="cycleDate">
            <el-date-picker
              clearable
              v-model="cycleDate"
              type="daterange"
              style="width: 100%"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="id" prop="id">
            <el-input clearable v-model="form.id"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="planid" prop="planid">
            <el-input clearable v-model="form.planid"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="name" prop="name">
            <el-input clearable v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="source" prop="source">
            <el-input clearable v-model="form.source"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6">
          <el-form-item label="description" prop="description">
            <el-input clearable v-model="form.description"></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="6">
          <el-form-item label="version" prop="version">
            <el-input clearable v-model="form.version"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="owner" prop="owner">
            <el-input clearable v-model="form.owner"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="status" prop="status">
            <el-input clearable v-model="form.status"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="type" prop="type">
            <el-input clearable v-model="form.type"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="creator" prop="creator">
            <el-input clearable v-model="form.creator"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="0">
            <el-button size="small" type="primary" @click="getPlanList"
              >点击查询</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="margin-bottom: 15px">
      <el-button size="small" type="primary" @click="cogradient"
        >同步数据</el-button
      >
      <el-button
        size="small"
        :disabled="!this.multipleSelection.length"
        type="success"
        @click="getCountDate"
        >生成统计数据</el-button
      >
      <!-- <el-button
        size="small"
        type="danger"
        :disabled="!this.multipleSelection.length"
        @click="cogradientResult"
        >同步测试结果</el-button
      > -->
    </div>
    <el-table
      size="small"
      max-height="550px"
      :data="tableData"
      @selection-change="handleSelectionChange"
      border
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="id"> </el-table-column>
      <el-table-column prop="planid" label="planid"> </el-table-column>
      <el-table-column prop="name" label="name"> </el-table-column>
      <el-table-column prop="source" label="source"> </el-table-column>
      <!-- <el-table-column prop="description" label="description" min-width="200px">
      </el-table-column> -->
      <el-table-column prop="version" label="version"> </el-table-column>
      <el-table-column prop="owner" sortable label="owner" min-width="100px">
      </el-table-column>
      <el-table-column prop="status" sortable label="status" min-width="100px">
      </el-table-column>
      <el-table-column prop="type" label="type"> </el-table-column>
      <el-table-column prop="startDate" label="startDate">
        <!-- <template slot-scope="{ row }">
          {{ dayjs(row.startDate).format("YYYY-MM-DD HH:mm:ss") }}
        </template> -->
      </el-table-column>
      <el-table-column prop="endDate" label="endDate">
        <!-- <template slot-scope="{ row }">
          {{ dayjs(row.endDate).format("YYYY-MM-DD HH:mm:ss") }}
        </template> -->
      </el-table-column>
      <el-table-column prop="creator" label="creator"> </el-table-column>
      <el-table-column
        prop=""
        v-if="$route.params.id"
        fixed="right"
        label="操作"
        width="120"
      >
        <template slot-scope="{ row }">
          <el-button type="danger" size="mini" @click="cogradientResult(row)"
            >同步测试结果</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: right; margin: 20px 0"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[5, 10, 20, 30, 50]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="initTableData.length"
    >
    </el-pagination>
  </div>
</template>
<script>
import axios from "axios";
import * as echarts from "echarts";
const dayjs = require("dayjs");

export default {
  components: {},
  data() {
    return {
      dayjs: dayjs,
      multipleSelection: [],
      tableData: [],
      initTableData: [],
      page: 1,
      limit: 5,
      form: {
        id: "",
        planid: "",
        name: "",
        source: "",
        // description: "",
        version: "",
        owner: "",
        status: "",
        type: "",
        startDate: "",
        endDate: "",
        creator: "",
      },
      showCharts: false,
    };
  },
  computed: {
    cycleDate: {
      get: function () {
        return [this.form.startDate, this.form.endDate];
      },
      set: function (val) {
        if (val) {
          this.form.startDate = this.dayjs(val[0]).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          this.form.endDate = this.dayjs(val[1]).format("YYYY-MM-DD HH:mm:ss");
        } else {
          this.form.startDate = "";
          this.form.endDate = "";
        }
      },
    },
  },
  methods: {
    handleSizeChange(val) {
      this.page = 1;
      this.limit = val;
      this.checkTableData();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.checkTableData();
    },
    checkTableData() {
      this.tableData = this.initTableData.slice(
        (this.page - 1) * this.limit,
        (this.page - 1) * this.limit + this.limit
      );
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    cogradient() {
      axios.post("/api/plan/addPlan").then((response) => {
        console.log(response);
      });
    },
    getCountDate() {
      axios
        .post("/api/case/caseReport", {
          planads: Array.from(this.multipleSelection, (x) => x.planid),
        })
        .then((response) => {
          console.log(response);
          const initArr = response.data.data;
          const type0YArr = [];
          const type1YArr = [];
          const type2YArr = [];
          initArr.forEach((x, idx) => {
            type0YArr[idx] = (
              (x.ratemode.find((e) => e.type === 0) || {}).passRate * 100
            ).toFixed(2);
            type1YArr[idx] = (
              (x.ratemode.find((e) => e.type === 1) || {}).passRate * 100
            ).toFixed(2);
            type2YArr[idx] = (
              (x.ratemode.find((e) => e.type === 2) || {}).passRate * 100
            ).toFixed(2);
          });
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
              data: Array.from(initArr, (x) => x.versionName),
            },
            yAxis: {
              type: "value",
              name: "通过率",
              min: 0,
              max: 100,
              position: "left",
              axisLabel: {
                formatter: "{value} %",
              },
            },
            series: [
              {
                name: "冒烟测试通过率",
                color: "red",
                type: "bar",
                data: type0YArr,
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
                data: type1YArr,
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
                data: type2YArr,
                label: {
                  show: true,
                  position: "top",
                  valueAnimation: true,
                },
              },
            ],
          });
          this.showCharts = true;
        });
    },
    cogradientResult(row) {
      axios
        .post("/api/case/caseResult", {
          id: row.planid,
        })
        .then((response) => {
          this.$message.success("操作成功");
          this.getPlanList();
          console.log(response);
        });
    },
    getPlanList() {
      axios.post("/api/plan/ListPlan", this.form).then((response) => {
        console.log(response);
        this.initTableData = response.data.data;
        this.page = 1;
        this.checkTableData();
      });
    },
  },
  mounted() {
    this.getPlanList();
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