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
        <el-table-column prop="url" label="url"> </el-table-column>
        <el-table-column prop="act" label="操作" min-width="100">
          <template slot-scope="{ row }">
            <el-button @click="showDialog(row)" type="text">发送</el-button>
          </template>
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

    <el-dialog title="发送地址" :visible.sync="dialogFormVisible">
      <div>
        <el-form ref="form" size="mini" :model="form" label-width="80px">
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
        <el-button size="mini" @click="submit" type="primary"
          >点击发送</el-button
        >
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      text: 22222,
      form: { Pt: "str", Pr: "", Pjthread: "str", Pdura: "str" },
    };
  },
  computed: {},
  methods: {
    getFile(e) {
      const para = new FormData();
      para.append("file", e.file);
      axios.post("/api/jmx/FileUpLoad", para).then((response) => {
        this.text = response.data;
        this.$message.info("操作成功");
        console.log(response);
      });
    },
    reSearch() {
      axios.post("/api/jmx/jmxList").then((response) => {
        this.tableData = response.data.data.map((x) => {
          return {
            url: x,
          };
        });
        this.$message.info("操作成功");
        console.log(response);
      });
    },
    showDialog(row) {
      // this.$refs.form.resetFields();
      this.dialogFormVisible = true;
      this.form = { Pt: row.url, Pr: "", Pjthread: "str", Pdura: "str" };
    },
    submit() {
      let para = Object.assign({}, this.form);
      para.Pr = para.Pr.split(/\s+/);
      axios.post("/api/jmx/runPerformance", para).then((response) => {
        this.tableData = response.data;
        this.$message.info("操作成功");
        this.dialogFormVisible = false;
        console.log(response);
      });
    },
  },
  mounted() {
    this.reSearch();
  },
};
</script>

<style lang="sass" scoped>
</style>