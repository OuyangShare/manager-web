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
