<script setup>
import { computed } from "vue";
import { VPDocAsideSponsors } from "vitepress/theme";

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

const sponsors = computed(() => {
  return (
    data.map((sponsor) => {
      return {
        size: sponsor.size === "big" ? "mini" : "xmini",
        items: sponsor.items,
      };
    }) ?? []
  );
});
</script>

<template>
  <VPDocAsideSponsors v-if="data" :data="sponsors" />
</template>
