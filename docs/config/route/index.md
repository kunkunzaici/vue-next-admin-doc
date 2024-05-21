# 路由参数

::: tip 开始之前
您可能需要了解 [Vue Router](https://next.router.vuejs.org/zh/guide/) 的动态路由匹配、路由的匹配语法。此演示界面关联 tagsView 标签页部分逻辑，代码位置：[/@/layout/navBars/tagsView/tagsView.vue](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/layout/navBars/tagsView/tagsView.vue)
:::

## 普通路由

演示地址：[路由参数-普通路由页面](https://lyt-top.gitee.io/vue-next-admin-preview/#/params/common)

代码位置：[/@/views/params/common](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/views/params)

### 1. 配置路由

```ts
{
  path: '/params',
  name: 'paramsIndex',
  component: () => import('/@/layout/routerView/parent.vue'),
  redirect: '/params/common',
  ...,
  children: [
    {
      path: '/params/common',
      name: 'paramsCommon',
      component: () => import('/@/views/params/common/index.vue'),
      ...,
    },
    {
      path: '/params/common/details',
      name: 'paramsCommonDetails',
      component: () => import('/@/views/params/common/details.vue'),
      ...,
    },
  ]
}
```

### 2. 页面跳转

`router.push`，传参使用 `query`

```ts
router.push({
  path: "/params/common/details",
  query: { id: Math.random(), name: "vue-next-admin" },
});
```

### 3. 参数获取

您可能需要了解 [动态路由匹配](https://next.router.vuejs.org/zh/guide/essentials/dynamic-matching.html)。`route.query`

```html {11}
<script setup lang="ts" name="paramsCommonDetails">
  import { onMounted } from "vue";
  import { useRoute } from "vue-router";

  // 定义变量内容
  const route = useRoute();

  // 页面加载时
  onMounted(() => {
    // 参数：query: { "id": "111", "name": "vue-next-admin" }
    console.log(route.query);
  });
</script>
```

## 动态路由

演示地址：[路由参数-动态路由页面](https://lyt-top.gitee.io/vue-next-admin-preview/#/params/dynamic)

代码位置：[/@/views/params/common](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/views/params)

### 1. 配置路由（动态）

注意 `/params/dynamic/details/:t/:id` 中的 `/:t/:id`，您可能需要了解 [路由的匹配语法](https://next.router.vuejs.org/zh/guide/essentials/route-matching-syntax.html)

```ts {16}
{
  path: '/params',
  name: 'paramsIndex',
  component: () => import('/@/layout/routerView/parent.vue'),
  redirect: '/params/dynamic',
  ...,
  children: [
    {
      path: '/params/dynamic',
      name: 'paramsDynamic',
      component: () => import('/@/views/params/dynamic/index.vue'),
      ...,
    },
    {
      path: '/params/dynamic/details/:t/:id',
      name: 'paramsDynamicDetails',
      component: () => import('/@/views/params/dynamic/details.vue'),
      ...,
    },
  ]
}
```

### 2. 页面跳转（动态）

注意这里用 `name` 跳转，参数用 `params`

```ts {3,4}
// name 值为路由中的 name
router.push({
  name: "paramsDynamicDetails",
  params: {
    t: "vue-next-admin",
    id: Math.random(),
  },
});
```

### 3. 参数获取（动态）

您可能需要了解 [动态路由匹配](https://next.router.vuejs.org/zh/guide/essentials/dynamic-matching.html)。`route.params`

```html {11}
<script setup lang="ts" name="paramsDynamicDetails">
  import { onMounted } from "vue";
  import { useRoute } from "vue-router";

  // 定义变量内容
  const route = useRoute();

  // 页面加载时
  onMounted(() => {
    // 参数：params: { "t": "vue-next-admin", "id": "111" }
    console.log(route.params);
  });
</script>
```
