const routesArr = [
  {
    path: "/uploadFile",
    name: "wuwuw1",
    meta: {
      date: "2021-05-12",
      desc: "文件上传",
    },
    component: () => import("@/pages/uploadFile/index.vue"),
  },
  {
    path: "/report",
    name: "wuwuw2",
    meta: {
      date: "2021-05-12",
      desc: "报告",
    },
    component: () => import("@/pages/report/index.vue"),
  },
  {
    path: "/report/:id",
    name: "wuwuw2",
    meta: {
      ignore: true,
      date: "2021-05-13",
      desc: "报告",
    },
    component: () => import("@/pages/report/index.vue"),
  },
  {
    path: "/bugs",
    name: "wuwuw3",
    meta: {
      date: "2021-12-14",
      desc: "缺陷统计",
    },
    component: () => import("@/pages/bugs/index.vue"),
  },
  {
    path: "/case",
    name: "wuwuw3",
    meta: {
      date: "2021-12-14",
      desc: "用例统计",
    },
    component: () => import("@/pages/case/index.vue"),
  },
];

const routes = [
  {
    path: "",
    component: () => import("@/components/layout.vue"),
    children: routesArr.concat({
      path: "*",
      meta: {
        ignore: true,
        desc: "home page",
      },
      component: () => import("@/components/clock.vue"),
    }),
  },
];
export default routes;
