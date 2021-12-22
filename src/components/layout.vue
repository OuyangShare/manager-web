<template>
  <div>
    <!-- <draggable v-model="tags" :move="getdata" @update="datadragEnd">
    </draggable> -->
    <!-- <draggable
      v-model="myArray"
      group="people"
      @start="drag = true"
      @end="drag = false"
    >
      <div v-for="element in myArray" :key="element.id">
        <el-button type="danger" @click="drawer = true">菜单列表</el-button>
      </div>
    </draggable> -->
    <div class="top">
      <el-button type="danger" @click="drawer = true">菜单列表</el-button>
    </div>
    <el-drawer
      size="25%"
      title="选择菜单"
      :visible.sync="drawer"
      direction="rtl"
    >
      <div
        v-for="item in routerDateArr"
        :key="item.date"
        v-show="!item.meta.ignore"
        @click="changeRoute(item)"
      >
        <el-button type="text">
          <span v-if="$route.path == item.path">{{
            item.meta.desc || item.meta.date
          }}</span>
          <span style="color: #e5e5e5" v-else>{{
            item.meta.desc || item.meta.date
          }}</span>
        </el-button>
      </div>
    </el-drawer>
    <router-view style="margin-top: 40px"></router-view>
  </div>
</template>

<script>
// import draggable from "vuedraggable";
export default {
  components: {
    // draggable,
  },
  data() {
    return {
      myArray: [{ id: 1 }],
      tags: null,
      drawer: false,
      routerDateArr: [],
    };
  },
  methods: {
    getdata(evt) {
      console.log(evt.draggedContext.element.id);
    },
    datadragEnd(evt) {
      console.log("拖动前的索引 :" + evt.oldIndex);
      console.log("拖动后的索引 :" + evt.newIndex);
      console.log(this.tags);
    },
    changeRoute({ path }) {
      console.log("object", this.$route.path);
      console.log("object", path);
      if (this.$route.path !== path) console.log("object", path);
      this.$router.push({
        path,
      });
    },
  },
  created() {
    this.routerDateArr = this.$router.options.routes[0].children.filter(
      (x) => !x.ignore
    );
  },
  mounted() {},
};
</script>

<style lang="sass" scoped>
.aside-desc
  text-overflow: ellipsis
  overflow: hidden
.top
  position: absolute
  top: 15px
  right: 15px
</style>
