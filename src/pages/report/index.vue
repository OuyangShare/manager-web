<template>
  <div class="page">
    <div style="margin-bottom: 15px">
      <el-button size="small" type="primary" @click="cogradient"
        >同步数据</el-button
      >
      <el-button size="small" type="success" @click="getCountDate"
        >生成统计数据</el-button
      >
    </div>
    <el-table
      size="small"
      max-height="550px"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column prop="id" label="id"> </el-table-column>
      <el-table-column prop="planid" label="planid"> </el-table-column>
      <el-table-column prop="name" label="name"> </el-table-column>
      <el-table-column prop="source" label="source"> </el-table-column>
      <el-table-column prop="description" label="description" min-width="100px">
      </el-table-column>
      <el-table-column prop="version" label="version"> </el-table-column>
      <el-table-column prop="owner" sortable label="owner" min-width="100px">
      </el-table-column>
      <el-table-column prop="status" sortable label="status" min-width="100px">
      </el-table-column>
      <el-table-column prop="type" label="type"> </el-table-column>
      <el-table-column prop="startDate" label="startDate">
        <template slot-scope="{ row }">
          {{ dayjs(row.startDate).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column prop="endDate" label="endDate">
        <template slot-scope="{ row }">
          {{ dayjs(row.endDate).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column prop="creator" label="creator"> </el-table-column>
      <el-table-column label="操作" width="120px" fixed="right">
        <template slot-scope="{ row }">
          <el-button
            size="small"
            type="text"
            @click="cogradientResult(row.planid)"
            >同步测试结果</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from "axios";
const dayjs = require("dayjs");

export default {
  components: {},
  data() {
    return {
      dayjs: dayjs,
      tableData: [],
    };
  },
  computed: {},
  methods: {
    cogradient() {
      axios.post("/plan/addPlan").then((response) => {
        console.log(response);
      });
    },
    getCountDate() {
      axios.post("/case/caseReport").then((response) => {
        console.log(response);
      });
    },
    cogradientResult(planid) {
      axios.post("/case/caseResult", { planid }).then((response) => {
        console.log(response);
      });
    },
    getPlanList() {
      this.tableData = [
        {
          id: 0,
          planid: "str",
          name: "str",
          source: "str",
          description: "str",
          version: "str",
          owner: "1",
          status: "str",
          type: "str",
          startDate: 1638344063309,
          endDate: 1638344063309,
          creator: "str",
        },
        {
          id: 0,
          planid: "str",
          name: "str",
          source: "str",
          description: "str",
          version: "str",
          owner: "2",
          status: "str",
          type: "str",
          startDate: 1638344063309,
          endDate: 1638344063309,
          creator: "str",
        },
        {
          id: 0,
          planid: "str",
          name: "str",
          source: "str",
          description: "str",
          version: "str",
          owner: "str",
          status: "str",
          type: "str",
          startDate: 1638344063309,
          endDate: 1638344063309,
          creator: "str",
        },
        {
          id: 0,
          planid: "str",
          name: "str",
          source: "str",
          description: "str",
          version: "str",
          owner: "str",
          status: "str",
          type: "str",
          startDate: 1638344063309,
          endDate: 1638344063309,
          creator: "str",
        },
        {
          id: 0,
          planid: "str",
          name: "str",
          source: "str",
          description: "str",
          version: "str",
          owner: "str",
          status: "str",
          type: "str",
          startDate: 1638344063309,
          endDate: 1638344063309,
          creator: "str",
        },
        {
          id: 0,
          planid: "str",
          name: "str",
          source: "str",
          description: "str",
          version: "str",
          owner: "str",
          status: "str",
          type: "str",
          startDate: 1638344063309,
          endDate: 1638344063309,
          creator: "str",
        },
      ];
      axios.post("/plan/ListPlan").then((response) => {
        console.log(response);
        this.tableData = response.data;
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
</style>