const routesArr = [
  {
    path: "/2021-05-06",
    name: "wuwuw",
    meta: {
      date: "2021-05-06",
      desc: "撒娇的骄傲看得见啦",
    },
    component: () => import("@/pages/2021/2021-05-06.vue"),
  },
  {
    path: "/2021-05-07",
    name: "wuwuw",
    meta: {
      date: "2021-05-07",
      desc: "撒娇的骄傲看得见啦",
    },
    component: () => import("@/pages/home/index.vue"),
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
