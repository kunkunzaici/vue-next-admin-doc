# 权限管理

## 目录结构

代码位置：[/src/router](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/router)

`后端控制` 与 `前端控制` 文件是相互独立的（互不影响），`后端控制` 不需要 `roles` 字段

```ts
├── router (存放路由信息)
	├── backEnd.ts (后端控制)
	├── frontEnd.ts (前端控制)
	├── index.ts (公用函数，路由拦截等)
	└── route.ts (路由菜单数据)
```

## 页面权限

### 1. 角色权限标识

- 用户信息中的 `roles` 角色权限标识，用于 `/@/router/route.ts` 中的 `meta.roles` 获取当前用户角色权限标识去比对路由表，设置递归过滤有权限的路由。图片中所示数据为 `/@/views/login/component/account.vue` 前端写死模拟数据，可在浏览器 `F12`：`Application/Storage/Session Storage` 中的 `userInfo` 字段中查看。

<div class="img-style-100">

![https://i.hd-r.cn/ab1c4eee148ccc41e0e43c2db5b8b95f.png](https://i.hd-r.cn/ab1c4eee148ccc41e0e43c2db5b8b95f.png)

</div>

- [/@/router/route.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/router/route.ts) 文件。[菜单配置-参数说明](/config/menu/#参数说明)

```ts
{
  ...
  meta: {
    ...
    // 当前路由权限标识，取角色管理。控制路由显示、隐藏。超级管理员：admin 普通角色：common
    roles: ['admin', 'common'],
    ...
  },
}
```

### 2. 过滤有权限路由

- 递归过滤有权限的路由，代码位置：[/@/router/index.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/router/index.ts)

```ts
/**
 * 判断路由 `meta.roles` 中是否包含当前登录用户权限字段
 * @param roles 用户权限标识，在 userInfos(用户信息)的 roles(登录页登录时缓存到浏览器)数组
 * @param route 当前循环时的路由项
 * @returns 返回对比后有权限的路由项
 */
export function hasRoles(roles: any, route: any) {
  if (route.meta && route.meta.roles)
    return roles.some((role: any) => route.meta.roles.includes(role));
  else return true;
}

/**
 * 获取当前用户权限标识去比对路由表，设置递归过滤有权限的路由
 * @param routes 当前路由 children
 * @param roles 用户权限标识，在 userInfos(用户信息)的 roles(登录页登录时缓存到浏览器)数组
 * @returns 返回有权限的路由数组 `meta.roles` 中控制
 */
export function setFilterHasRolesMenu(routes: any, roles: any) {
  const menu: any = [];
  routes.forEach((route: any) => {
    const item = { ...route };
    if (hasRoles(roles, item)) {
      if (item.children)
        item.children = setFilterHasRolesMenu(item.children, roles);
      menu.push(item);
    }
  });
  return menu;
}
```

- 方法调用，`rolesRoutes` 为根据角色权限标识处理后，返回有权限的路由数组

```ts
import { dynamicRoutes } from "/@/router/route";

const rolesRoutes = setFilterHasRolesMenu(
  dynamicRoutes,
  store.state.userInfos.userInfos.roles
);
```

### 3. 权限路由执行顺序

- 先添加动态路由 `router.addRoute`。您可能需要了解 [router.addRoute](https://next.router.vuejs.org/zh/api/#addroute)

```ts
/**
 * 添加动态路由
 * @method router.addRoute
 * @description 此处循环为 dynamicRoutes（/@/router/route）第一个顶级 children
 * 的路由一维数组，非多级嵌套
 * @link 参考：https://next.router.vuejs.org/zh/api/#addroute
 */
export function setAddRoute() {
  setFilterRouteEnd().forEach((route: RouteRecordRaw) => {
    const routeName: any = route.name;
    if (!router.hasRoute(routeName)) router.addRoute(route);
  });
}
```

- 后设置递归过滤有权限的路由到 vuex routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组。`setFilterHasRolesMenu` 为 [页面权限-过滤有权限路由](/config/power/#_2-过滤有权限路由) 方法

```ts
/**
 * 设置递归过滤有权限的路由到 vuex routesList 中（已处理成多级嵌套路由）
 * 及缓存多级嵌套数组处理后的一维数组
 * @description 用于左侧菜单、横向菜单的显示
 * @description 用于 tagsView、菜单搜索中：未过滤隐藏的(isHide)
 */
export function setFilterMenuAndCacheTagsViewRoutes() {
  // 设置递归过滤有权限的路由到 vuex routesList 中（已处理成多级嵌套路由）
  store.dispatch(
    "routesList/setRoutesList",
    setFilterHasRolesMenu(
      dynamicRoutes[0].children,
      store.state.userInfos.userInfos.roles
    )
  );
  // 及缓存多级嵌套数组处理后的一维数组
  setCacheTagsViewRoutes();
}
```

## 按钮权限

::: tip 数据获取

- 1、按钮权限可在用户进行登录时，请求接口就返回全部按钮权限。

- 2、或者取 [菜单管理（演示）](https://lyt-top.gitee.io/vue-next-admin-preview/#/system/menu) 中的按钮 `权限标识`。
  :::

### 1. 组件方式

组件位置：[/@/components/auth](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/components/auth)，您可能需要了解 [插槽 slot](https://v3.cn.vuejs.org/guide/component-slots.html)

#### 单个权限验证（:value="xxx"）

- 组件代码，注意看 `some` 高亮处判断，根据需求适当时候需要自行修改

```html {23-25}
<template>
  <slot v-if="getUserAuthBtnList" />
</template>

<script setup lang="ts" name="auth">
  import { computed } from "vue";
  import { storeToRefs } from "pinia";
  import { useUserInfo } from "/@/stores/userInfo";

  // 定义父组件传过来的值
  const props = defineProps({
    value: {
      type: String,
      default: () => "",
    },
  });

  // 定义变量内容
  const stores = useUserInfo();
  const { userInfos } = storeToRefs(stores);

  // 获取 pinia 中的用户权限
  const getUserAuthBtnList = computed(() => {
    return userInfos.value.authBtnList.some((v: string) => v === props.value);
  });
</script>
```

- 页面中使用

```html {3,8}
<template>
  <!-- 使用 -->
  <Auth :value="'btn.add'" />
</template>

<script setup lang="ts" name="xxx">
  // 局部引入
  import Auth from "/@/components/auth/auth.vue";
</script>
```

#### 多个权限验证，满足一个则显示（:value="[xxx,xxx]"）

```html {3,9,14}
<template>
  <!-- 使用 -->
  <Auths :value="['btn.addsss', 'btn.edit', 'btn.delsss', 'btn.linksss']" />
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  // 局部引入
  import Auths from "/@/components/auth/auths.vue";

  export default defineComponent({
    name: "xxxx",
    // 局部注册
    components: { Auths },
  });
</script>
```

#### 多个权限验证，全部满足则显示（:value="[xxx,xxx]"）

```html {3,9,14}
<template>
  <!-- 使用 -->
  <AuthAll :value="['btn.add', 'btn.edit', 'btn.del', 'btn.link']" />
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  // 局部引入
  import AuthAll from "/@/components/auth/authAll.vue";

  export default defineComponent({
    name: "xxxx",
    // 局部注册
    components: { AuthAll },
  });
</script>
```

### 2. 指令方式

指令位置：[/@/directive/authDirective.ts](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/directive)，您可能需要了解 [自定义指令 directive](https://v3.cn.vuejs.org/guide/custom-directive.html)

#### 单个权限验证（v-auth="xxx"）

```html
<div v-auth="'btn.add'">
  <el-button>新增</el-button>
</div>

<div v-auth="'btn.edit'">
  <el-button>编辑</el-button>
</div>

<div v-auth="'btn.del'">
  <el-button>删除</el-button>
</div>

<div v-auth="'btn.link'">
  <el-button>跳转</el-button>
</div>
```

#### 多个权限验证，满足一个则显示（v-auths="[xxx,xxx]"）

```html
<div v-auths="['btn.addsss', 'btn.edit', 'btn.delsss', 'btn.linksss']">
  <el-button>新增</el-button>
</div>

<div v-auths="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
  <el-button>编辑</el-button>
</div>
```

#### 多个权限验证，全部满足则显示（v-auth-all="[xxx,xxx]"）

```html
<div v-auth-all="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
  <el-button>新增</el-button>
</div>

<div v-auth-all="['btn.add', 'btn.edit', 'btn.del', 'btn.link']">
  <el-button>编辑</el-button>
</div>
```

### 3. 函数方式

方法位置：[/@/utils/authFunction.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/utils/authFunction.ts)，用于方法中的判断，使用方法如下

```ts
<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { auth, auths, authAll } from '/@/utils/authFunction';

// 单个权限验证
const onAuthClick = () => {
  if (!auth('btn.add')) ElMessage.error('抱歉，您没有权限！');
  else ElMessage.success('恭喜，您有权限！');
};
// 多个权限验证，满足一个则为 true
const onAuthsClick = () => {
  if (!auths(['btn.add', 'btn.edit'])) ElMessage.error('抱歉，您没有权限！');
  else ElMessage.success('恭喜，您有权限！');
};
// 多个权限验证，全部满足则为 true
const onAuthAllClick = () => {
  if (!authAll(['btn.add', 'btn.edit')) ElMessage.error('抱歉，您没有权限！');
  else ElMessage.success('恭喜，您有权限！');
};
</script>
```
