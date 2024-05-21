# vuex

::: tip 开始之前
框架中数据状态使用 vuex Module 模块化进行管理，您可能需要了解 [vuex 核心概念 Module](https://next.vuex.vuejs.org/zh/guide/modules.html)
:::

## pinia

[vue-next-admin](https://gitee.com/lyt-top/vue-next-admin) 从 [v2.1.0 版本](https://gitee.com/lyt-top/vue-next-admin/releases/tag/2.1.0) 开始 `vuex` 替换成 `pinia`。
[vue-prev-admin](https://gitee.com/lyt-top/vue-next-admin/tree/vue-prev-admin/) 还是使用 `vuex`

代码位置：[/src/stores](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/stores)

相关文档：[pinia 官网](https://pinia.vuejs.org/)

相关文档：[vuex 3.x 官网](https://v3.vuex.vuejs.org/zh/)

## 全局引入

页面模块已做全局自动引入，代码位置：`/@/store/index.ts`。[import.meta.globEager](https://vitejs.cn/guide/features.html#glob-import)

```ts
const modulesFiles = import.meta.globEager("./modules/*.ts");
const pathList: string[] = [];

for (const path in modulesFiles) {
  pathList.push(path);
}

const modules = pathList.reduce(
  (modules: { [x: string]: any }, modulePath: string) => {
    const moduleName = modulePath.replace(/^\.\/modules\/(.*)\.\w+$/, "$1");
    const value = modulesFiles[modulePath];
    modules[moduleName] = value.default;
    return modules;
  },
  {}
);
```

## 定义接口

### 1. interface 定义

`/@/store/interface/index.ts`，如：路由缓存列表 `KeepAliveNamesState`

```ts
// 路由缓存列表
export interface KeepAliveNamesState {
  keepAliveNames: Array<string>;
}
```

### 2. interface 使用

在 `/@/store/modules/` 新增 `keepAliveNames.ts`，界面写入如下代码：注意需要开启 `namespaced: true` 文件名称即模块名称。([vuex Module 命名空间](https://next.vuex.vuejs.org/zh/guide/modules.html#命名空间))

```ts {3,5}
import { Module } from "vuex";
// 此处加上 `.ts` 后缀报错，具体原因不详
import { KeepAliveNamesState, RootStateTypes } from "/@/store/interface/index";

const keepAliveNamesModule: Module<KeepAliveNamesState, RootStateTypes> = {
  namespaced: true,
  state: {
    keepAliveNames: [],
  },
  mutations: {
    // 设置路由缓存（name字段）
    getCacheKeepAlive(state: any, data: Array<string>) {
      state.keepAliveNames = data;
    },
  },
  actions: {
    // 设置路由缓存（name字段）
    async setCacheKeepAlive({ commit }, data: Array<string>) {
      commit("getCacheKeepAlive", data);
    },
  },
};

export default keepAliveNamesModule;
```

## 定义模块

如上所示，我们在 `/@/store/modules/` 下新增了 `keepAliveNames.ts` 文件，并定义了方法 `mutations`、`actions`

## 使用模块

### 1. 在 .ts 中使用

```ts
import { store } from "/@/store/index.ts";

// dispatch
store.dispatch("keepAliveNames/setCacheKeepAlive", cacheList);

// 或者 commit
// store.commit("keepAliveNames/getCacheKeepAlive", cacheList);
```

### 2. 在 .vue 中使用

```html {7,11,14}
<template>
  <div v-if="getThemeConfig.isLockScreen">在 .vue 中使用</div>
</template>

<script lang="ts">
  import { computed, defineComponent } from "vue";
  import { useStore } from "/@/store/index";
  export default defineComponent({
    name: "app",
    setup() {
      const store = useStore();
      // 获取布局配置信息
      const getThemeConfig = computed(() => {
        return store.state.themeConfig.themeConfig;
      });
    },
  });
</script>
```
