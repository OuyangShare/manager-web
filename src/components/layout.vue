<template>
  <div>
    <el-container>
      <!-- <el-header></el-header> -->
      <el-container>
        <el-aside width="150px">
          <el-menu
            v-model="$route.path"
            @open="changeRoute"
            @close="changeRoute"
          >
            <el-menu-item
              v-for="item in routerDateArr"
              v-show="item.meta.date"
              :title="item.meta.date"
              :key="item.date"
              @click="changeRoute(item)"
              index="item.path"
            >
              <span slot="title"
                >{{ item.meta.date }} <i class="el-icon-arrow-right"></i>
              </span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routerDateArr: [],
    };
  },
  methods: {
    changeRoute({ path }) {
      console.log("object", 1)
      if (this.$route.path !== path)
        this.$router.push({
          path,
        });
    },
  },
  created() {
    this.routerDateArr = this.$router.options.routes[0].children;
  },
  mounted() {},
};
</script>

<style lang="sass"></style>
