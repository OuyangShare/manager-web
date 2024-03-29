const routesArr = [
  {
    path: "/2021-05-12",
    name: "wuwuw",
    meta: {
      date: "2021-05-12",
      desc: "CSS3 :nth-child() 选择器",
    },
    component: () => import("@/pages/2021/2021-05-12.vue"),
  },
  {
    path: "/2021-06-25",
    name: "wuwuw",
    meta: {
      date: "2021-06-25",
      desc: "Number计算问题",
    },
    component: () => import("@/pages/2021/2021-06-25.vue"),
  },
  {
    path: "/2021-06-26",
    name: "wuwuw",
    meta: {
      date: "2021-06-26",
      desc: "Number计算问题解决方案",
    },
    component: () => import("@/pages/2021/2021-06-26.vue"),
  },
  {
    path: "/fupan",
    name: "wuwuw",
    meta: {
      date: "2021-10-29-0",
      desc: "午间复盘",
    },
    component: () => import("@/pages/2021/fupan.vue"),
  },
  {
    path: "/zijin",
    name: "wuwuw",
    meta: {
      date: "2021-10-29-1",
      desc: "资金流向",
    },
    component: () => import("@/pages/2021/zijin.vue"),
  },
];

const routes = [
  {
    path: "",
    component: () => import("@/components/layout.vue"),
    children: routesArr.concat({
      path: "*",
      meta: {
        desc: "home page",
      },
      component: () => import("@/pages/home/index.vue"),
    }),
  },
];

export default routes;
