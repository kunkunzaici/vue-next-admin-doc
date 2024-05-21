# 字体图标

## element plus svg 图标

::: danger Font Icon 向 SVG Icon 迁移
svg 文档地址：[element plus 官网 Icon 图标](https://element-plus.gitee.io/zh-CN/component/icon.html)。`"element-plus": "^1.2.0-beta.4"`。框架版本 [v1.2.0](https://gitee.com/lyt-top/vue-next-admin/releases) 开始迁移。
:::

### 1. 框架中全局注册 svg

[/@/utils/other.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/utils/other.ts)，mian.ts 中引入 `import other from '/@/utils/other';`。添加了 `ele` 前缀，防止图标冲突, `el` 前缀已被使用，可以使用 `el-xxx`。但是不建议已 `el` svg 前缀，因为会与 element plus 内置组件冲突

[查看演示图标](https://lyt-top.gitee.io/vue-next-admin-preview/#/pages/element)，注意看前缀为 `ele-`，使用为 `ele-xxx`。`xxx` 为 [element plus Icon 图标](https://element-plus.gitee.io/zh-CN/component/icon.html#%E5%9B%BE%E6%A0%87%E9%9B%86%E5%90%88) 图标名称。

```ts
import type { App } from "vue";
import * as svg from "@element-plus/icons";

// 引入组件
const SvgIcon = defineAsyncComponent(
  () => import("/@/components/svgIcon/index.vue")
);

/**
 * 导出全局注册 element plus svg 图标
 * @param app vue 实例
 * @description 使用：https://element-plus.gitee.io/zh-CN/component/icon.html
 */
export function elSvg(app: App) {
  const icons = svg as any;
  for (const i in icons) {
    app.component(`ele-${icons[i].name}`, icons[i]);
  }
  app.component("SvgIcon", SvgIcon);
}

// main.ts
import other from "/@/utils/other";
const app = createApp(App);
other.elSvg(app);
```

### 2. 页面中使用 svg

使用 element plus 的图标，可去 [https://lyt-top.gitee.io/vue-next-admin-preview/#/pages/element](https://lyt-top.gitee.io/vue-next-admin-preview/#/pages/element) 复制粘贴

::: tip svg 图标说明
如：ele-User，由两部分组成：

1、`ele`：`一、框架中全局注册 svg` 中添加的 svg 图标前缀。

2、`User`：为 svg 图标，请注意它的开头都是大写的，[element plus 官网 Icon 图标](https://element-plus.gitee.io/zh-CN/component/icon.html)。
:::

- 框架中： `ele-User` 为全局注册的 svg，注意这里添加了 `<el-icon></el-icon>` 包裹着。

框架中直接使用全局注册的 svg，会报：`Property "ele-User" was accessed during render but is not defined on instance.`

```html {7}
<el-input
  type="text"
  :placeholder="$t('message.account.accountPlaceholder1')"
  v-model="ruleForm.userName"
  clearable
  autocomplete="off"
  :prefix-icon="ele-User"
>
</el-input>
```

所以使用了 `<el-icon></el-icon>` 包裹着

```html {9}
<el-input
  type="text"
  :placeholder="$t('message.account.accountPlaceholder1')"
  v-model="ruleForm.userName"
  clearable
  autocomplete="off"
>
  <template #prefix>
    <el-icon class="el-input__icon"><ele-User /></el-icon>
  </template>
</el-input>
```

- [element plus 官网 Icon 图标](https://element-plus.gitee.io/zh-CN/component/icon.html)：`Calendar` 为 svg 图标

需要先引入

```ts
// 引入方法一
<script setup lang="ts">
  import { Calendar } from "@element-plus/icons";
</script>

// 引入方法二
<script lang="ts">
  import { Calendar } from "@element-plus/icons";
  return {
    Calendar
  }
</script>
```

然后页面中使用

```html
<el-input v-model="input1" placeholder="Pick a date" :suffix-icon="Calendar" />
```

### 3. 全局获取 svg

[内置图标选择器](/config/builtPlug/#图标选择器) 使用，[/@/utils/getStyleSheets.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/utils/getStyleSheets.ts)（原初始化获取 css 样式，获取 element plus 自带图标方法）在 [tag v1.1.2](https://gitee.com/lyt-top/vue-next-admin/releases) 中查看。

element plus svg 图标也可以在框架中的 [页面/element 字体图标](https://lyt-top.gitee.io/vue-next-admin-preview/#/pages/element) 演示中查看

```ts
import { nextTick } from "vue";
import * as svg from "@element-plus/icons";

// 初始化获取 css 样式，获取 element plus 自带 svg 图标，
// 增加了 ele- 前缀，使用时：ele-Aim
const getElementPlusIconfont = () => {
  return new Promise((resolve, reject) => {
    nextTick(() => {
      const icons = svg as any;
      const sheetsIconList = [];
      for (const i in icons) {
        sheetsIconList.push(`ele-${icons[i].name}`);
      }
      if (sheetsIconList.length > 0) resolve(sheetsIconList);
      else reject("未获取到值，请刷新重试");
    });
  });
};
```

## iconfont & font-awesome 图标

### 1. 设置在线链接

代码位置：[/@/utils/setIconfont.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/utils/setIconfont.ts)

此处为使用在线链接教程，使用本地请查看：[自定义引入本地图标](#自定义引入本地图标)

```ts
// `/@/utils/setIconfont.ts` cssCdnUrlList 方法中添加在线链接
// 字体图标 url
const cssCdnUrlList: Array<string> = [
  "//at.alicdn.com/t/font_2298093_y6u00apwst.css",
  "//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
];
```

### 2. App.vue 中引入

```ts
import setIntroduction from "/@/utils/setIconfont";

// 设置初始化，防止刷新时恢复默认
onBeforeMount(() => {
  // 设置批量第三方 icon 图标
  setIntroduction.cssCdn();
});
```

### 3. 界面中使用

::: danger 注意前缀

- iconfont：需要添加 `iconfont` 前缀，如：`iconfont xitongshezhi`

- font-awesome：需要添加 `fa` 前缀，如：`fa xitongshezhi`
  :::

```html
<!-- 项目使用 -->
<i class="iconfont xitongshezhi"></i>
<!-- <i class="fa xitongshezhi"></i> -->

<!-- 或者 -->
<SvgIcon name="iconfont xitongshezhi"></SvgIcon>
<!-- <SvgIcon name="fa xitongshezhi"></SvgIcon> -->
```

### 4. 全局获取 iconfont & font-awesome 图标

[/@/utils/getStyleSheets.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/utils/getStyleSheets.ts) 中的 `getAlicdnIconfont` 与 `getAwesomeIconfont` 方法。

对应的图标在线演示 [https://lyt-top.gitee.io/vue-next-admin-preview/#/pages/iocnfont](https://lyt-top.gitee.io/vue-next-admin-preview/#/pages/iocnfont)

```ts
// 获取阿里字体图标
const getAlicdnIconfont = () => {
  return new Promise((resolve, reject) => {
    nextTick(() => {
      const styles: any = document.styleSheets;
      let sheetsList = [];
      let sheetsIconList = [];
      for (let i = 0; i < styles.length; i++) {
        if (styles[i].href && styles[i].href.indexOf("at.alicdn.com") > -1) {
          sheetsList.push(styles[i]);
        }
      }
      for (let i = 0; i < sheetsList.length; i++) {
        for (let j = 0; j < sheetsList[i].cssRules.length; j++) {
          if (
            sheetsList[i].cssRules[j].selectorText &&
            sheetsList[i].cssRules[j].selectorText.indexOf(".icon-") > -1
          ) {
            sheetsIconList.push(
              `${sheetsList[i].cssRules[j].selectorText
                .substring(1, sheetsList[i].cssRules[j].selectorText.length)
                .replace(/\:\:before/gi, "")}`
            );
          }
        }
      }
      if (sheetsIconList.length > 0) resolve(sheetsIconList);
      else reject("未获取到值，请刷新重试");
    });
  });
};

// 初始化获取 css 样式，这里使用 fontawesome 的图标
const getAwesomeIconfont = () => {
  return new Promise((resolve, reject) => {
    nextTick(() => {
      const styles: any = document.styleSheets;
      let sheetsList = [];
      let sheetsIconList = [];
      for (let i = 0; i < styles.length; i++) {
        if (
          styles[i].href &&
          styles[i].href.indexOf("netdna.bootstrapcdn.com") > -1
        ) {
          sheetsList.push(styles[i]);
        }
      }
      for (let i = 0; i < sheetsList.length; i++) {
        for (let j = 0; j < sheetsList[i].cssRules.length; j++) {
          if (
            sheetsList[i].cssRules[j].selectorText &&
            sheetsList[i].cssRules[j].selectorText.indexOf(".fa-") === 0 &&
            sheetsList[i].cssRules[j].selectorText.indexOf(",") === -1
          ) {
            if (/::before/.test(sheetsList[i].cssRules[j].selectorText)) {
              sheetsIconList.push(
                `${sheetsList[i].cssRules[j].selectorText
                  .substring(1, sheetsList[i].cssRules[j].selectorText.length)
                  .replace(/\:\:before/gi, "")}`
              );
            }
          }
        }
      }
      if (sheetsIconList.length > 0) resolve(sheetsIconList.reverse());
      else reject("未获取到值，请刷新重试");
    });
  });
};
```

[/@/utils/getStyleSheets.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/utils/getStyleSheets.ts) 中导出使用

```ts
/**
 * 获取字体图标 `document.styleSheets`
 * @method ali 获取阿里字体图标 `<i class="iconfont 图标类名"></i>`
 * @method ele 获取 element plus 自带图标 `<i class="图标类名"></i>`
 * @method ali 获取 fontawesome 的图标 `<i class="fa 图标类名"></i>`
 */
const initIconfont = {
  // iconfont
  ali: () => {
    return getAlicdnIconfont();
  },
  // element plus
  ele: () => {
    return getElementPlusIconfont();
  },
  // fontawesome
  awe: () => {
    return getAwesomeIconfont();
  },
};

// 导出方法
export default initIconfont;
```

## 自定义封装 svg 图标

### 1. 封装 svg 组件

代码路径：[/@/components/svgIcon](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/components/svgIcon)

[结合 el-icon 使用](https://element-plus.gitee.io/zh-CN/component/icon.html)，`el-icon` 为 raw SVG 图标提供额外的属性, 提供的详细属性请继续阅读。

```html
<template>
  <i v-if="isShowIconSvg" class="el-icon" :style="setIconSvgStyle">
    <component :is="getIconName" />
  </i>
  <div v-else-if="isShowIconImg" :style="setIconImgOutStyle">
    <img :src="getIconName" :style="setIconSvgInsStyle" />
  </div>
  <i v-else :class="getIconName" :style="setIconSvgStyle" />
</template>

<script setup lang="ts" name="svgIcon">
  import { computed } from "vue";

  // 定义父组件传过来的值
  const props = defineProps({
    // svg 图标组件名字
    name: {
      type: String,
    },
    // svg 大小
    size: {
      type: Number,
      default: () => 14,
    },
    // svg 颜色
    color: {
      type: String,
    },
  });

  // 在线链接、本地引入地址前缀
  // https://gitee.com/lyt-top/vue-next-admin/issues/I62OVL
  const linesString = [
    "https",
    "http",
    "/src",
    "/assets",
    "data:image",
    import.meta.env.VITE_PUBLIC_PATH,
  ];

  // 获取 icon 图标名称
  const getIconName = computed(() => {
    return props?.name;
  });
  // 用于判断 element plus 自带 svg 图标的显示、隐藏
  const isShowIconSvg = computed(() => {
    return props?.name?.startsWith("ele-");
  });
  // 用于判断在线链接、本地引入等图标显示、隐藏
  const isShowIconImg = computed(() => {
    return linesString.find((str) => props.name?.startsWith(str));
  });
  // 设置图标样式
  const setIconSvgStyle = computed(() => {
    return `font-size: ${props.size}px;color: ${props.color};`;
  });
  // 设置图片样式
  const setIconImgOutStyle = computed(() => {
    return `width: ${props.size}px;height: ${props.size}px;display: inline-block;overflow: hidden;`;
  });
  // 设置图片样式
  // https://gitee.com/lyt-top/vue-next-admin/issues/I59ND0
  const setIconSvgInsStyle = computed(() => {
    const filterStyle: string[] = [];
    const compatibles: string[] = ["-webkit", "-ms", "-o", "-moz"];
    compatibles.forEach((j) =>
      filterStyle.push(`${j}-filter: drop-shadow(${props.color} 30px 0);`)
    );
    return `width: ${props.size}px;height: ${
      props.size
    }px;position: relative;left: -${props.size}px;${filterStyle.join("")}`;
  });
</script>
```

### 2. 局部注册 & 全局注册 svg 组件

- 局部注册

```html
<!-- 页面上使用 -->
<SvgIcon :name="item.meta.icon" />

<script setup lang="ts" name="xxx">
  import SvgIcon from "/@/components/svgIcon/index.vue";
</script>
```

- 全局注册（框架中使用全局注册）

[/@/utils/other.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/utils/other.ts) 中的 `elSvg` 方法

```ts
// 全局注册
import SvgIcon from '/@/components/svgIcon/index.vue';
app.component("SvgIcon", SvgIcon);

// 页面上使用
<SvgIcon :name="item.meta.icon" />

// 或者
<SvgIcon name="ele-Aim" :size="14" color="#333333"/>
```

## 自定义引入本地图标

### 1. 下载 iconfont 到本地

`/src/theme`： [查看 /src/theme 目录结构](/config/layoutConfig/#_1-目录结构)

建议 icon 或者 svg 图标放入到 [/src/theme](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/theme) 文件夹中，方便管理。[iconfont 下载](https://www.iconfont.cn/)，其它渠道类似操作

如果引入本地 iconfont，需要先删除 [/@/utils/setIconfont.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/utils/setIconfont.ts) `cssCdnUrlList` 方法中的在线链接，把刚下载的 `iconfont` 图标文件夹重新命名为 `iconfont` 粘贴到 [/src/theme](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/theme) 文件夹中

### 2. 引入 iconfont 本地图标

- 建议在 [/src/theme/index.scss](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/theme/index.scss) 中引入（不建议直接在 main.ts 中引入）

```scss
// 在 `/src/theme/index.scss`
@import "./iconfont/iconfont.css";
```

- 图标查看，直接进入 `/src/theme/iconfont/demo_index.html` 进行对应的图标查看，然后 cv 到自己项目中使用

```html
<!-- 项目使用 -->
<i class="iconfont xitongshezhi"></i>

<!-- 或者 -->
<SvgIcon name="iconfont xitongshezhi"></SvgIcon>
```

### 3. 群文件有 vue-next-admin、vue-prev-admin 离线字体图标

[去加群](/)，搜不到群，或者加了没同意，一般是群满了（一般秒过）。

- 1 群：<a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=RdUY97Vx0T0vZ_1OOu-X1yFNkWgDwbjC&jump_from=webapi">665452019</a>
- 2 群：<a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=zVfy3gNy7pNWVK3kMduDzwU369PZg2fw&jump_from=webapi">766356862</a>
- 3 群：<a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=02EWb5P2JkP-8iwzaDadgFdxA0HSHPpn&jump_from=webapi">795345435</a>
- 4 群：<a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=0gTFO04WwkeZZ6R4lju6gucbeXHK-wNd&jump_from=webapi">736626228</a>
- 5 群：<a>556254895</a>
