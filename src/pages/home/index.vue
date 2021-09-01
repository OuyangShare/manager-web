<template>
  <div>
    <div>
      <el-upload
        class="upload-demo"
        :http-request="(evet) => getFile(evet)"
        :show-file-list="false"
        ref="upload"
        action="string"
      >
        <el-button slot="trigger" size="small" type="primary"
          >选取文件上传</el-button
        >
      </el-upload>
    </div>
    <el-divider></el-divider>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          v-for="item in tableKeys"
          :key="item"
          :prop="item"
          :label="item"
        >
        </el-table-column>
      </el-table>
      <el-button
        @click="reSearch"
        size="mini"
        type="primary"
        style="margin-top: 5px"
        >重新查询</el-button
      >
    </div>
    <el-divider></el-divider>
    <div>
      <el-form ref="form" size="mini" :model="form" label-width="60px">
        <el-form-item label="Pt" prop="Pt">
          <el-input v-model="form.Pt"></el-input>
        </el-form-item>
        <el-form-item label="Pr" prop="Pr">
          <el-input
            type="textarea"
            v-model="form.Pr"
            placeholder="请用换行隔开"
          ></el-input>
        </el-form-item>
        <el-form-item label="Pjthread" prop="Pjthread">
          <el-input v-model="form.Pjthread"></el-input>
        </el-form-item>
        <el-form-item label="Pdura" prop="Pdura">
          <el-input v-model="form.Pdura"></el-input>
        </el-form-item>
      </el-form>
      <el-button size="mini" @click="submit" type="primary">点击发送</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      tableData: [
        {
          iiie: 11,
        },
      ],
      text: 22222,
      form: { Pt: "str", Pr: "", Pjthread: "str", Pdura: "str" },
    };
  },
  computed: {
    tableKeys() {
      return Object.keys(this.tableData[0]);
    },
  },
  methods: {
    getFile(e) {
      const para = new FormData();
      para.append("file", e.file);
      console.log("1", 1);
      axios.post("/jmx/FileUpLoad", para).then((response) => {
        this.text = response.data;
        this.$message.info(response.data || response);
        console.log(response);
      });
    },
    reSearch() {
      axios.post("/jmx/jmxList").then((response) => {
        this.tableData = response.data;
        this.$message.info(response.data || response);
        console.log(response);
      });
    },
    submit() {
      let para = Object.assign({}, this.form);
      para.Pr = para.Pr.split(/\s+/);
      console.log("para", para);
      axios.post("/jmx/jmxList", para).then((response) => {
        this.text = response;
        this.$message.info(response.data || response);
        console.log(response);
      });
    },
  },
  mounted() {},
};
</script>

<style lang="sass" scoped>
</style>