# 标签页（tagsView）

代码路径：[/@/layout/navBars/tagsView](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/layout/navBars/tagsView)

## 中键点击

`中键鼠标` 按下时，判断是鼠标中键就 `关闭当前 tasgview`

```ts
const onMousedownMenu = (v: RouteItem, e: MouseEvent) => {
  if (!v.meta?.isAffix && e.button === 1) {
    const item = Object.assign({}, { contextMenuClickId: 1, ...v });
    onCurrentContextmenuClick(item);
  }
};
```

## 右键菜单

代码路径：[/@/layout/navBars/tagsView/contextmenu.vue](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/layout/navBars/tagsView/contextmenu.vue)，右键菜单与 [当前页操作](/config/tagsView/#当前页操作) 一样，

::: tip onCurrentContextmenuClick 参数包含：

0 刷新当前

1 关闭当前

2 关闭其它

3 关闭全部

4 当前页全屏
:::

具体可查看代码 [/@/layout/navBars/tagsView/tagsView.vue](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/layout/navBars/tagsView/tagsView.vue) 中的 [onCurrentContextmenuClick](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/layout/navBars/tagsView/tagsView.vue#L335) 方法

```ts
// 当前项右键菜单点击
const onCurrentContextmenuClick = async (item: RouteItem) => {
  item.commonUrl = transUrlParams(item);
  if (!getCurrentRouteItem(item))
    return ElMessage({
      type: "warning",
      message: "请正确输入路径及完整参数（query、params）",
    });
  const { path, name, params, query, meta, url } = getCurrentRouteItem(item);
  switch (item.contextMenuClickId) {
    case 0:
      // 刷新当前
      if (meta.isDynamic) await router.push({ name, params });
      else await router.push({ path, query });
      refreshCurrentTagsView(route.fullPath);
      break;
    case 1:
      // 关闭当前
      closeCurrentTagsView(getThemeConfig.value.isShareTagsView ? path : url);
      break;
    case 2:
      // 关闭其它
      if (meta.isDynamic) await router.push({ name, params });
      else await router.push({ path, query });
      closeOtherTagsView(path);
      break;
    case 3:
      // 关闭全部
      closeAllTagsView();
      break;
    case 4:
      // 开启当前页面全屏
      openCurrenFullscreen(getThemeConfig.value.isShareTagsView ? path : url);
      break;
  }
};
```

## 当前页操作

参数说明：0 刷新当前，1 关闭当前，2 关闭其它，3 关闭全部 4 当前页全屏。tagsView 只支持对当前页进行操作。

方法说明：`onCurrentContextmenuClick` 和参数字段名 `contextMenuClickId` 为固定，只需要传参数 `0 - 4`

演示地址：[/fun/tagsView 操作](https://lyt-top.gitee.io/vue-next-admin-preview/#/fun/tagsView)，只支持 `操作当前页`，非当前页不可操作。

代码地址：[/@/views/fun/tagsView](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/views/fun/tagsView/index.vue)

### 1. 刷新（参数 `0`）

```html{12,12}
<script setup lang="ts">
  import { useRoute } from "vue-router";
  import mittBus from "/@/utils/mitt";

  // 定义变量内容
  const route = useRoute();

  // 0、刷新当前 tagsView
  const refreshCurrentTagsView = () => {
    mittBus.emit(
      "onCurrentContextmenuClick",
      Object.assign({}, { contextMenuClickId: 0, ...route })
    );
  };
</script>
```

### 2. 关闭（参数 `1`）

```html{12,12}
<script setup lang="ts">
  import { useRoute } from "vue-router";
  import mittBus from "/@/utils/mitt";

  // 定义变量内容
  const route = useRoute();

  // 1、关闭当前 tagsView
  const refreshCurrentTagsView = () => {
    mittBus.emit(
      "onCurrentContextmenuClick",
      Object.assign({}, { contextMenuClickId: 1, ...route })
    );
  };
</script>
```

### 3. 关闭其它（参数 `2`）

```html{12,12}
<script setup lang="ts">
  import { useRoute } from "vue-router";
  import mittBus from "/@/utils/mitt";

  // 定义变量内容
  const route = useRoute();

  // 2、关闭其它 tagsView
  const refreshCurrentTagsView = () => {
    mittBus.emit(
      "onCurrentContextmenuClick",
      Object.assign({}, { contextMenuClickId: 2, ...route })
    );
  };
</script>
```

### 4. 全部关闭（参数 `3`）

```html{12,12}
<script setup lang="ts">
  import { useRoute } from "vue-router";
  import mittBus from "/@/utils/mitt";

  // 定义变量内容
  const route = useRoute();

// 3、关闭全部 tagsView
  const refreshCurrentTagsView = () => {
    mittBus.emit(
      "onCurrentContextmenuClick",
      Object.assign({}, { contextMenuClickId: 3, ...route })
    );
  };
</script>
```

### 5. 当前页全屏（参数 `4`）

```html{12,12}
<script setup lang="ts">
  import { useRoute } from "vue-router";
  import mittBus from "/@/utils/mitt";

  // 定义变量内容
  const route = useRoute();

// 4、开启当前页面全屏
  const refreshCurrentTagsView = () => {
    mittBus.emit(
      "onCurrentContextmenuClick",
      Object.assign({}, { contextMenuClickId: 4, ...route })
    );
  };
</script>
```

## 滚动方式

内容溢出时，鼠标滚轮 + 鼠标左键

### 1. 移入到 tagsView 标签页中，可通过鼠标滚轮（中键）进行查看

### 2. 移入到 tagsView 标签页中，拖动滚动条进行滚动

### 3. 移动端：常规操作即可

## 风格

移步 [布局配置 -> Tagsview 风格](/config/layoutConfig/#_1-tagsview-风格) 查看自定义添加更多风格

## 缓存

右上角点击 `icon` 布局配置图标，`界面显示` -> `开启 TagsView 缓存`

### 1. 缓存 tagsView 列表

`isCacheTagsView` 为 `true` 时，`F5` 刷新后，tagsView 数据直接从浏览器 `Session Storage` 中取

```ts
if (Session.get("tagsViewList") && getThemeConfig.value.isCacheTagsView) {
  state.tagsViewList = await Session.get("tagsViewList");
}
```

### 2. 缓存菜单路由

- [/parent.vue](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/layout/routerView/parent.vue) 文件，主要是把路由中的 `name` 值存入到 `keep-alive` 的 `include` 中

```ts
<keep-alive :include="getKeepAliveNames">
```

- `F5` 刷新时， [/src/layout/routerView/parent.vue](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/layout/routerView/parent.vue#L78) `onMounted` 中重新取 `name` 值放入 `cachedViews` 数组

```ts
// 页面加载时
onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      if (themeConfig.value.isCacheTagsView) {
        let tagsViewArr: RouteItem[] = Session.get("tagsViewList") || [];
        cachedViews.value = tagsViewArr
          .filter((item) => item.meta?.isKeepAlive)
          .map((item) => item.name as string);
      }
    }, 0);
  });
});
```

- [/src/stores/keepAliveNames.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/stores/keepAliveNames.ts) 文件中

#### 关闭 `tagsView` 时，当前的路由将清空缓存

```ts
// 删除要缓存的路由 names（关闭 Tagsview）
async delCachedView(view: any) {
  const index = this.cachedViews.indexOf(view.name);
  index > -1 && this.cachedViews.splice(index, 1);
}
```

#### 再打开 `tagsView` 时，当前的路由将重新缓存

```ts
// 添加要缓存的路由 names（关闭 Tagsview）
async addCachedView(view: any) {
  if (view.meta.isKeepAlive) this.cachedViews?.push(view.name);
}
```

## 拖拽

右上角点击 `icon` 布局配置图标，`界面显示` -> `开启 TagsView 拖拽`

### 1. 设置 tagsView 可以进行拖拽

使用 [SortableJS](https://www.itxst.com/sortablejs/neuinffi.html) 插件

```ts
const initSortable = async () => {
  const el = <HTMLElement>document.querySelector(".layout-navbars-tagsview-ul");
  if (!el) return false;
  state.sortable.el && state.sortable.destroy();
  state.sortable = Sortable.create(el, {
    animation: 300,
    dataIdAttr: "data-url",
    disabled: getThemeConfig.value.isSortableTagsView ? false : true,
    onEnd: () => {
      const sortEndList: RouteItem[] = [];
      state.sortable.toArray().map((val: string) => {
        state.tagsViewList.map((v: RouteItem) => {
          if (v.url === val) sortEndList.push({ ...v });
        });
      });
      addBrowserSetSession(sortEndList);
    },
  });
};
```

### 2. 移动端时，不可拖拽

```ts
const onSortableResize = async () => {
  await initSortable();
  if (other.isMobile()) state.sortable.el && state.sortable.destroy();
};
```

## 共用

右上角点击 `icon` 布局配置图标，`界面显示` -> `开启 TagsView 共用`

代码配置路径：[/src/stores/themeConfig.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/stores/themeConfig.ts#L96)

### 1. TagsView 共用

`isShareTagsView` 为 `true` 时：

- 相同路由不同参数 / 相同路由相同参数时，打开的 `tagsView` 只有一个
- 不同路由不同参数时，打开的 `tagsView` 有多个

### 2. TagsView 不共用

`isShareTagsView` 为 `false` 时：

- 相同路由相同参数时，打开的 `tagsView` 只有一个
- 相同路由不同参数 / 不同路由不同参数时，打开的 `tagsView` 有多个

演示地址：[普通路由参数](https://lyt-top.gitee.io/vue-next-admin-preview/#/params/common)、[动态路由参数](https://lyt-top.gitee.io/vue-next-admin-preview/#/params/dynamic)

## 国际化

演示地址：[普通路由参数](https://lyt-top.gitee.io/vue-next-admin-preview/#/params/common)、[动态路由参数](https://lyt-top.gitee.io/vue-next-admin-preview/#/params/dynamic)

### 1. 方法（tagsView.vue）

代码位置：[/src/layout/navBars/tagsView/tagsView.vue](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/layout/navBars/tagsView/tagsView.vue#L98)

```ts
// 设置 自定义 tagsView 名称、 自定义 tagsView 名称国际化
const setTagsViewNameI18n = computed(() => {
  return (v: RouteItem) => {
    return other.setTagsViewNameI18n(v);
  };
});
```

### 2. 方法（other.setTagsViewNameI18n）

代码位置：[/src/utils/other.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/utils/other.ts#L50)

```ts
/**
 * 设置 自定义 tagsView 名称、 自定义 tagsView 名称国际化
 * @param params 路由 query、params 中的 tagsViewName
 * @returns 返回当前 tagsViewName 名称
 */
export function setTagsViewNameI18n(item: any) {
  let tagsViewName: string = "";
  const { query, params, meta } = item;
  // 修复tagsViewName匹配到其他含下列单词的路由
  // https://gitee.com/lyt-top/vue-next-admin/pulls/44/files
  const pattern = /^\{("(zh-cn|en|zh-tw)":"[^,]+",?){1,3}}$/;
  if (query?.tagsViewName || params?.tagsViewName) {
    if (
      pattern.test(query?.tagsViewName) ||
      pattern.test(params?.tagsViewName)
    ) {
      // 国际化
      const urlTagsParams =
        (query?.tagsViewName && JSON.parse(query?.tagsViewName)) ||
        (params?.tagsViewName && JSON.parse(params?.tagsViewName));
      tagsViewName = urlTagsParams[i18n.global.locale.value];
    } else {
      // 非国际化
      tagsViewName = query?.tagsViewName || params?.tagsViewName;
    }
  } else {
    // 非自定义 tagsView 名称
    tagsViewName = i18n.global.t(meta.title);
  }
  return tagsViewName;
}
```

### 3. 设置 tagsView 非国际化

路由跳转 `router.push` 时，参数必须要加 `tagsViewName` 字段

演示代码位置：[/src/views/params/common/index.vue](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/views/params/common/index.vue)，可参考里面的写法

::: danger 注意格式

格式：tagsViewName=xxx
:::

```html{6}
<script setup lang="ts" name="xxx">
  const onGoDetailsClick = () => {
    router.push({
      path: "/params/common/details",
      query: {
        tagsViewName: "我是普通路由测试tagsViewName(非国际化)",
        // 其它参数
        ...
      },
    });
  };
</script>
```

### 4. 设置 tagsView 国际化

路由跳转 `router.push` 时，参数必须要加 `tagsViewName` 字段

演示代码位置：[/src/views/params/common/index.vue](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/views/params/common/index.vue)，可参考里面的写法

::: danger 注意格式

`zh-cn`、`en`、`zh-tw` 为必填，还需转成字符串 `JSON.stringify`

格式：`tagsViewName=JSON.stringify({"zh-cn":"测试用","en":"test+page","zh-tw":"測試用"})`
:::

```ts{12}
<script setup lang="ts" name="xxx">
  const tagsViewName = JSON.stringify({
    "zh-cn": "测试用",
    "en": "test page",
    "zh-tw": "測試用",
  });

  const onGoDetailsClick = () => {
    router.push({
      path: "/params/common/details",
      query: {
        tagsViewName,
        // 其它参数
        ...
      },
    });
  };
</script>
```

### 5. 效果查看

设置 `tagsView` 国际化后，去顶栏切换语言查看演示效果。
