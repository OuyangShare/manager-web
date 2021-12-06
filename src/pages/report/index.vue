<template>
  <div class="page">
    <el-form size="small" ref="form" :model="form" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="返款周期" prop="cycleDate">
            <el-date-picker
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
        <el-col :span="8">
          <el-form-item label="id" prop="id">
            <el-input v-model="form.id"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="planid" prop="planid">
            <el-input v-model="form.planid"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="name" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="source" prop="source">
            <el-input v-model="form.source"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="description" prop="description">
            <el-input v-model="form.description"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="version" prop="version">
            <el-input v-model="form.version"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="owner" prop="owner">
            <el-input v-model="form.owner"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="status" prop="status">
            <el-input v-model="form.status"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="type" prop="type">
            <el-input v-model="form.type"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="creator" prop="creator">
            <el-input v-model="form.creator"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
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
      <el-button size="small" type="success" @click="getCountDate"
        >生成统计数据</el-button
      >
      <el-button
        size="small"
        type="danger"
        :disabled="!this.multipleSelection.length"
        @click="cogradientResult"
        >同步测试结果</el-button
      >
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
      multipleSelection: [],
      tableData: [],
      form: {
        id: "",
        planid: "",
        name: "",
        source: "",
        description: "",
        version: "",
        owner: "",
        status: "",
        type: "",
        startDate: "",
        endDate: "",
        creator: "",
      },
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
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
    cogradientResult() {
      axios
        .post("/case/caseResult", {
          planids: Array.from(this.multipleSelection, (x) => x.planid),
        })
        .then((response) => {
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
      axios.post("/plan/ListPlan", this.form).then((response) => {
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