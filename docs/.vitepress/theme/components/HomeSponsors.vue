<script setup>
// https://github.com/vitejs/vite/tree/main/docs
import { VPHomeSponsors } from "vitepress/theme";
const data = [
  {
    tier: "长期赞助商",
    size: "big",
    items: [
      {
        name: "驰骋流程+表单+低代码",
        url: "http://www.ccflow.org/",
        img: "/vue-next-admin-doc-preview/images/ccflowRightNextAdmin.png",
      },
    ],
  },
];
</script>

<template>
  <VPHomeSponsors
    v-if="data"
    message="vueNextAdmin 是免费和开源的，由优秀的赞助商提供支持。"
    action-text="查看更多"
    action-link="/support/"
    :data="data"
  />
</template>
