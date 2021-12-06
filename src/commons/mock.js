const Mock = require("mockjs");

Mock.mock("/case/caseReport", {
  state: 1,
  data: [
    {
      versionName: "锅圈云铺V3.1.0",
      source: "云铺",
      ratemode: [
        {
          type: 0,
          planId: "1151072002001000054",
          planName: "云铺V3.1版本冒烟测试以及冒烟测试报告",
          source: "云铺",
          version: "锅圈云铺V3.1.0",
          passRate: 0.8857,
          failRate: 0.0286,
          nodoRate: 0.0857,
        },
      ],
    },
    {
      versionName: "订单中心V1.4.0",
      source: "OMS-B",
      ratemode: [
        {
          type: 0,
          planId: "1151072002001000062",
          planName: "OMSV1.4冒烟计划",
          source: "OMS-B",
          version: "订单中心V1.4.0",
          passRate: 0.9167,
          failRate: 0.0278,
          nodoRate: 0.0556,
        },
      ],
    },
  ],
  errmsg: null,
  errcode: 0,
});
