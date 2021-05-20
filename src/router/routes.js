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
  // {
  //   path: "/2021-05-07",
  //   name: "wuwuw",
  //   meta: {
  //     date: "2021-05-07",
  //     desc: "",
  //   },
  //   component: () => import("@/pages/2021/2021-05-07.vue"),
  // },
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
