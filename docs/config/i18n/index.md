# 国际化

::: tip 开始之前
不需要国际化，可以选择 [vue-next-admin-template](https://gitee.com/lyt-top/vue-next-admin/tree/vue-next-admin-template/) 分支基础版，不带国际化，同步 [master](https://gitee.com/lyt-top/vue-next-admin/tree/master) 分支更新。您可能需要了解 [vue-i18n](https://kazupon.github.io/vue-i18n/zh/)、[element-plus Config Provider 全局配置](https://element-plus.gitee.io/zh-CN/component/config-provider.html)、[element-plus 国际化](https://doc-archive.element-plus.org/#/zh-CN/component/i18n)
:::

## 国际化配置

框架内置 `中文简体`、`英文`、`中文繁体`

### 1. ConfigProvider 配置

ConfigProvider：[/@/App.vue](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/App.vue) 中，使用 `el-config-provider` 包裹路由视图主出口。ElementPlus 还提供了一个 Vue 组件 [ConfigProvider](https://element-plus.gitee.io/zh-CN/guide/i18n.html#configprovider) 用于全局配置国际化的设置。

```html
<!-- i18nLocale 为字符串：zh-cn 简体中文，en English，zh-tw 繁體中文
前提是在 main.ts 中引入了 app.use(i18n) -->
<el-config-provider :locale="i18nLocale">
  <router-view />
</el-config-provider>
```

### 2. 全局配置

ElementPlus 提供了全局配置国际化的设置。

`默认中文`：可参考 [vue-next-admin-template 基础版 ts（不带国际化）](https://gitee.com/lyt-top/vue-next-admin/tree/vue-next-admin-template/) `main.ts` 配置。

```ts
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";

app.use(ElementPlus, {
  locale: zhCn,
});
```

### 3. 多国语言配置

- 目录结构说明，[/@/i18n](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/i18n)。

注意：页面国际化数据最好放 `pages` 里。`lang` 为框架内置，为了更好的升级，最好别添加到里面

```ts
├── src/i18n
    ├── lang (框架内置国际化)
    │   ├── en.ts (英文)
    │   ├── zh-cn.ts (中文简体)
    │   └── zh-tw.ts (中文繁体)
    │
    ├── pages (页面国际化模拟数据)
    │
    └── index.ts (国际化出口)
```

- [/@/i18n/index.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/i18n/index.ts) 配置多国语言，支持自动引入。

直接复制 `pages` 目录下的其中一个文件夹，然后改名，里面的变量字段不要重名，否则后自动引入的将覆盖前面相同的变量名

```ts
// 对自动引入的 modules 进行分类 en、zh-cn、zh-tw
// https://vitejs.cn/vite3-cn/guide/features.html#glob-import
for (const path in modules) {
  const key = path.match(/(\S+)\/(\S+).ts/);
  if (itemize[key![2]]) itemize[key![2]].push(modules[path].default);
  else itemize[key![2]] = modules[path];
}
```

- 多国语言初始化，注意 element plus 字段语言不要放入到 `message` 字段里。`message` 字段为自定义多国语言。

```ts
// 处理最终格式
for (const key in itemize) {
  messages[key] = {
    name: key,
    el: element[key].el,
    message: mergeArrObj(itemize, key),
  };
}
```

- `main.ts` 中引用

```ts
import { i18n } from "/@/i18n/index";

app.use(i18n);
```

### 4. 国际化使用

<p></p>

#### 页面上使用 `.vue`，`$t('message.xxx.xxx')`

```html
<el-button>
  <span>{{ $t('message.account.accountBtnText') }}</span>
</el-button>

<el-divider content-position="left">
  {{ $t('message.layout.oneTitle') }}
</el-divider>
```

#### ts 上使用 `.ts`，`i18n.global.t(xxx)`

```ts
import { i18n } from "/@/i18n/index";

const webTitle = i18n.global.t(router.currentRoute.value.meta.title as any);
```

#### setup 里使用 ，`t(xxx)`

```ts
<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'xxx',
  setup() {
    const { t } = useI18n();

    // 使用，xxx 为变量
    t(xxx)
  }
})
</script>
```

### 5. 国际化切换

代码位置：[/@/layout/navBars/breadcrumb/user.vue](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/layout/navBars/breadcrumb/user.vue#L191)

```ts
// 语言切换
const onLanguageChange = (lang: string) => {
  locale.value = lang;
};
```

## 框架其它国际化

使用方法参考：[国际化-国际化使用](/config/i18n/#_4-国际化使用)。需提前定义多国语言数据 `message.xxx.xxx`

### 1. 菜单

[/@/layout/navMenu](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/layout/navMenu)，取 [/@/router/route.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/router/route.ts) 中的 `meta.title` 字段（`message.router.xxx` 需提前在 [/@/i18n/lang](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/i18n/lang)）中定义

```html
<span>{{ $t(val.meta.title) }}</span>
```

### 2. 浏览器标题

> [/@/utils/other.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/utils/other.ts#L28) useTitle 方法，使用时：`other.useTitle()`

```ts
/**
 * 设置浏览器标题国际化
 * @method const title = useTitle(); ==> title()
 */
export function useTitle() {
  const stores = useThemeConfig(pinia);
  const { themeConfig } = storeToRefs(stores);
  nextTick(() => {
    let webTitle = "";
    let globalTitle: string = themeConfig.value.globalTitle;
    const { path, meta } = router.currentRoute.value;
    if (path === "/login") {
      webTitle = <string>meta.title;
    } else {
      webTitle = setTagsViewNameI18n(router.currentRoute.value);
    }
    document.title = `${webTitle} - ${globalTitle}` || globalTitle;
  });
}
```

### 3. 顶栏

[/@/layout/navBars/breadcrumb](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/layout/navBars/breadcrumb)，面包屑、组件大小、语言切换、菜单搜索、布局配置、消息、开/关全屏、用户下拉菜单（鼠标放入 `icon 图标` 上会显示图标说明）。

基本都使用 `$t(xxx.xxx.xxx)` 语法。

```html
<div>{{ $t(v.meta.title) }}</div>
```

### 4. tagsView 标签页

::: tip 国际化
国际化请查看专题：[tagsView 国际化](/config/tagsView/#国际化)
:::

- [/@/layout/navBars/tagsView](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/layout/navBars/tagsView)，基本都使用 `$t(xxx.xxx.xxx)` 语法

```html
<span>{{ $t(v.meta.title) }}</span>
```

- 右键菜单国际化定义， 需提前在 [/@/i18n/lang](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/i18n/lang) 目录下中定义多国语言数据。[tagsView 右键菜单组件](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/layout/navBars/tagsView/contextmenu.vue)

```ts
dropdownList: [
  {
    contextMenuClickId: 0,
    txt: "message.tagsView.refresh",
    affix: false,
    icon: "ele-RefreshRight",
  },
  {
    contextMenuClickId: 1,
    txt: "message.tagsView.close",
    affix: false,
    icon: "ele-Close",
  },
  {
    contextMenuClickId: 2,
    txt: "message.tagsView.closeOther",
    affix: false,
    icon: "ele-CircleClose",
  },
  {
    contextMenuClickId: 3,
    txt: "message.tagsView.closeAll",
    affix: false,
    icon: "ele-FolderDelete",
  },
  {
    contextMenuClickId: 4,
    txt: "message.tagsView.fullscreen",
    affix: false,
    icon: "iconfont icon-fullscreen",
  },
];
```

### 5. 布局配置

[/@/layout/navBars/breadcrumb/setings.vue](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/layout/navBars/breadcrumb/setings.vue)，国际化数据在 [/@/i18n/lang](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/i18n/lang) 中的 `layout` 对象。基本上使用 `$t('message.layout.xxx')` 语法

```html
<div class="layout-breadcrumb-seting-bar-flex-label">
  {{ $t('message.layout.twoMenuBar') }}
</div>
```

### 6. 页面

[/@/i18n/pages](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/i18n/pages)，包含 [表单国际化演示](https://lyt-top.gitee.io/vue-next-admin-preview/#/pages/formI18n)、[首页](https://lyt-top.gitee.io/vue-next-admin-preview/#/home)、[登录页](https://lyt-top.gitee.io/vue-next-admin-preview/#/login)。

基本上使用 `$t('message.xxx.xxx')` 语法
