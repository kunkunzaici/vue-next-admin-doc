# 布局配置

::: tip 布局不生效
清空浏览器永久缓存或者点击 `布局配置 -> 一键恢复默认`，前提是修改了 [/src/stores/themeConfig.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/stores/themeConfig.ts) 配置文件内容。添加或者修改功能，请前往 [/@/layout/navBars/breadcrumb/setings.vue](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/layout/navBars/breadcrumb/setings.vue) 组件位置修改
:::

## 布局说明

::: danger 操作方式

可视化操作：左上角 `icon` 图标点击打开布局配置，所有配置功能都在这个里面

代码操作：[/src/stores/themeConfig.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/stores/themeConfig.ts)
:::

包含：`菜单栏`、`顶栏`、`tagsView 标签页`、`主内容区`。

大图查看，鼠标右键：`在新标签页中打开图片`。

<div class="img-style-100">

![https://i.hd-r.cn/7334cd9793eb82b58b916232989b361d.png](https://i.hd-r.cn/7334cd9793eb82b58b916232989b361d.png)

</div>

## 全局主题

### 1. 目录结构

::: tip vue-prev-admin
[vue-prev-admin](https://gitee.com/lyt-top/vue-next-admin/tree/vue-prev-admin/) vue2.x 的目录结构也会基于该结构进行修改
:::

[/src/theme](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/theme) 下，后期继续补充，样式都会写在这个文件夹下：

```ts
├── theme (页面样式)
	├── common (基础样式)
	│	├── transition.scss (页面过渡动画)
	│	└── var.scss (全局主题样式，用于全局改变样式)
	│
	├── media (媒体查询)
	│	├── chart.scss (大数据图表)
	│	├── cityLinkage.scss (Cascader 级联选择器城市选择)
	│	├── dialog.scss (弹窗)
	│	├── error.scss (404、401界面)
	│	├── form.scss (表单)
	│	├── home.scss (首页)
	│	├── index.scss (媒体查询定义主样式)
	│	├── layout.scss (框架布局)
	│	├── login.scss (登录界面)
	│	├── media.scss (媒体查询主出口)
	│	├── pagination.scss (分页)
	│	├── personal.scss (个人中心)
	│	├── scrollbar.scss (页面滚动条)
	│	└── tagsView.scss (tagsView 标签页)
	│
	├── mixins (scss混入)
	│	├── element-mixins.scss (定义重置的element plus混入复用样式)
	│	├── function.scs (全局主题颜色调用混入函数)
	│	└── mixins.scss (定义一些常用的全局混入样式)
	│
	├── app.scss (页面主样式，用于重置浏览器默认样式)
	├── base.scss (基础样式、过渡动画引入等)
	├── dark.scss (深色主题)
	├── element.scss (重置的element plus样式，用于改变主题)
	├── iconSelector.scss (图标选择器)
	├── index.scss (页面样式主出口)
	├── loading.scss (loading样式)
	├── other.scss (其它样式)
	└── waves.scss (按钮波浪样式)
```

### 2. scss 部分函数说明

<p style="font-weight: bold;">一、scss @mixin</p>

- 定义：[scss 官方中文文档](https://www.sass.hk/docs/)，具体请查阅官方文档。使用方法：

```scss
/* Button 按钮
------------------------------- */
@mixin Button($main, $c1, $c2) {
  color: set-color($main);
  background: set-color($c1);
  border-color: set-color($c2);
}
```

- 页面中使用，先引入，然后在 `css` 类中通过 `@include` 使用

```scss
@import "mixins/element-mixins.scss";

// default
.el-button--default:hover,
.el-button--default:focus {
  @include Button(primary, primary-light-8, primary-light-6);
}
```

<p style="font-weight: bold;">二、scss @function</p>

- 定义函数

```scss
/* 颜色调用函数
------------------------------- */
@function set-color($key) {
  @return var(--color-#{$key});
}
```

- 不理解？请看这个 `css3 :root` [CSS var() 函数](https://www.runoob.com/cssref/func-var.html)

```scss
/* 定义一个名为 "--main-bg-color" 的属性，然后使用 var() 函数调用该属性： */
:root {
  --main-bg-color: red;
}

#div1 {
  background-color: var(--main-bg-color);
}

#div2 {
  background-color: var(--main-bg-color);
}
```

<p style="font-weight: bold;">三、为什么不使用这种写法放进 :root 中？</p>

::: tip 原因
因为 scss 不支持这种嵌套 `mix(var(--color-primary), var(--color-success), 10%)`，lighten / darken / saturate / desaturate 等，从而无法用 `document.documentElement.style.setProperty('--color-primary', 'blue');` 改变样式
:::

```scss
$colors: (
	primary: #409eff,
	success: #67c23a,
	info: #909399,
	warning: #e6a23c,
	danger: #f56c6c
)

:root {
	@each $key, $value in $colors {
		--color-#{$key}: #{$value};
	}
}
```

### 3. 自定义全局主题

<p style="font-weight: bold;">一、实现方法，以下方法不晓得会不会影响页面渲染性能：</p>

- 1、定义全局 :root 初始变量，路径：`src/theme/common/var.scss`
- 2、编写覆盖 element plus 的样式：路径：`src/theme/element.scss`
- 3、页面通过 `document.documentElement.style.setProperty` 方法改变 `:root` 中的值

<p style="font-weight: bold;">二、具体实现</p>

::: tip 提示
第 1 第 2 步就不介绍了，直接去路径去看就懂了。接下来我们讲讲第 3 步：
:::

- 通过 `document.documentElement.style.setProperty` 改变颜色值 [setProperty 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleDeclaration/setProperty)

```html
<script setup>
  import { reactive } from "vue";

  // 定义变量内容
  const state = reactive({
    color: "",
  });

  // 改变主题颜色
  const onColorChange = () => {
    // 设置颜色
    document.documentElement.style.setProperty("--color-primary", state.color);
    // 设置颜色变浅
    document.documentElement.style.setProperty(
      "--color-primary-light-1",
      getLightColor(state.color1, 0.1)
    );
  };
</script>
```

- getLightColor 颜色变浅方法，路径在：[src/utils/theme.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/utils/theme.ts)

```ts
// 变浅颜色值，level为加深的程度，限0-1之间
export function getLightColor(color: any, level: number) {
  let reg = /^\#?[0-9A-Fa-f]{6}$/;
  if (!reg.test(color)) return ElMessage.warning("输入错误的hex颜色值");
  let rgb = hexToRgb(color);
  for (let i = 0; i < 3; i++)
    rgb[i] = Math.floor((255 - rgb[i]) * level + rgb[i]);
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
}
```

- 到此就完成了主题的全局变色了

tip 还有疑问？总的来说，就是通过重新定义 `css` 样式，用来覆盖 [element-plus](https://element-plus.gitee.io/#/zh-CN/component/changelog) 默认的样式，从而实现全局主题变色。其它方法实现全局主题，请自行 [百度一下：https://www.baidu.com/](https://www.baidu.com/)

### 4. 框架中实现例子

<p style="font-weight: bold;">一、全局主题改变时</p>

- 主题改变时，会调用 `onColorPickerChange` 方法进行重新的覆盖 css `:root` 定义的变量的值

```ts
const onColorPickerChange = (color: string) => {
  document.documentElement.style.setProperty(
    color,
    getThemeConfig.value[color]
  );
};
```

- 拿到的值会赋值给根节点上 `html`，`document.documentElement.style`。刷新的时再设置 `document.documentElement.style.cssText = Local.get('themeConfigStyle');`，防止数据丢失

<div class="img-style-100">

![https://i.hd-r.cn/a3a3534aebcd493686f71631332493c5.png](https://i.hd-r.cn/a3a3534aebcd493686f71631332493c5.png)

</div>

<p style="font-weight: bold;">二、更改主题配置文件路径</p>

修改后不生效，请注意看下列文件顶部文字注释。

[vue3.x：/src/stores/themeConfig.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/stores/themeConfig.ts)，

[vue2.x：/src/store/modules/themeConfig.js](https://gitee.com/lyt-top/vue-next-admin/blob/vue-prev-admin/src/store/modules/themeConfig.js)

::: tip 修改配置时：
1、需要每次都清理 `window.localStorage` 浏览器永久缓存

2、或者点击布局配置最底部 `一键恢复默认` 按钮即可看到效果
:::

## 菜单 / 顶栏

### 1. 顶栏

文件路径：[/@/layout/navBars/breadcrumb](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/layout/navBars/breadcrumb)

<p style="font-weight: bold;">一、顶栏背景、顶栏默认字体颜色、顶栏背景渐变</p>

功能说明：`设置顶栏的背景颜色、字体颜色、背景渐变`

<p style="font-weight: bold;">二、效果图</p>

<a href="https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/6efa9498cddb49738ea9d59114185e10.gif" target="_black">

<div class="img-style-100">

![https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/6efa9498cddb49738ea9d59114185e10.gif](https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/6efa9498cddb49738ea9d59114185e10.gif)

</div>

</a>

### 2. 菜单

文件路径：[/@/layout/navMenu](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/layout/navMenu)

<p style="font-weight: bold;">一、菜单背景、菜单默认字体颜色、菜单背景渐变、菜单字体背景高亮</p>

功能说明：`设置菜单的背景颜色、字体颜色、背景渐变、字体高亮背景色（颜色跟随全局主题(primary)）`

<p style="font-weight: bold;">二、效果图</p>

<a href="https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/8df792f8a8004a6d804f5d49775e21bb.gif" target="_black">

<div class="img-style-100">

![https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/8df792f8a8004a6d804f5d49775e21bb.gif](https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/8df792f8a8004a6d804f5d49775e21bb.gif)

</div>

</a>

### 3. 分栏

文件路径：[/@/layout/component/columnsAside.vue](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/layout/component/columnsAside.vue)

<p style="font-weight: bold;">一、分栏菜单背景、分栏菜单默认字体颜色、分栏菜单背景渐变</p>

功能说明：`设置分栏菜单的背景颜色、字体颜色、背景渐变`

<p style="font-weight: bold;">二、效果图</p>

<a href="https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/9dc53c3088164e5d9760eb0b08b38524.gif" target="_black">

<div class="img-style-100">

![https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/9dc53c3088164e5d9760eb0b08b38524.gif](https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/9dc53c3088164e5d9760eb0b08b38524.gif)

</div>

</a>

## 界面设置

### 1. 菜单设置

文件路径：[/@/layout/navMenu](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/layout/navMenu)

<p style="font-weight: bold;">一、菜单水平折叠、菜单手风琴、经典布局分割菜单</p>

功能说明：`菜单水平折叠、手风琴（开启一个展开）、经典布局分割菜单（顶级在顶栏处，子级在菜单栏）`

<p style="font-weight: bold;">二、效果图</p>

<a href="https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/a186682d39a54748b1efa4660a821d2d.gif" target="_black">

<div class="img-style-100">

![https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/a186682d39a54748b1efa4660a821d2d.gif](https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/a186682d39a54748b1efa4660a821d2d.gif)

</div>

</a>

### 2. 固定 Header

文件路径：[/@/layout/main](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/layout/main)

<p style="font-weight: bold;">一、固定 Header</p>

功能说明：`固定 Header（主内容区滚动，顶栏不跟随滚动）`

<p style="font-weight: bold;">二、效果图</p>

<a href="https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/ff1c08f33cea4a4897e1fd702de7f549.gif" target="_black">

<div class="img-style-100">

![https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/ff1c08f33cea4a4897e1fd702de7f549.gif](https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/ff1c08f33cea4a4897e1fd702de7f549.gif)

</div>

</a>

### 3. 锁屏

文件路径：[/@/layout/lockScreen](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/layout/lockScreen)

<p style="font-weight: bold;">一、开启锁屏、自动锁屏(s/秒)</p>

功能说明：`开启锁屏（类似于电脑屏保）、自动锁屏(s/秒)`

<p style="font-weight: bold;">二、效果图</p>

<a href="https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/4e1a05bffcd44ac6b5bd71272f39fe04.gif" target="_black">

<div class="img-style-100">

![https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/4e1a05bffcd44ac6b5bd71272f39fe04.gif](https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/4e1a05bffcd44ac6b5bd71272f39fe04.gif)

</div>

</a>

## 界面显示

### 1. 侧边栏 Logo

文件路径：[/@/layout/logo](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/layout/logo)

<p style="font-weight: bold;">一、侧边栏 Logo</p>

功能说明：`显示/隐藏侧边栏 Logo`

<p style="font-weight: bold;">二、效果图</p>

<a href="https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/33ea0e305dcc4f228a47f4bc6c39ad80.gif" target="_black">

<div class="img-style-100">

![https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/33ea0e305dcc4f228a47f4bc6c39ad80.gif](https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/33ea0e305dcc4f228a47f4bc6c39ad80.gif)

</div>

</a>

### 2. Breadcrumb 面包屑

文件路径：[/@/layout/navBars/Breadcrumb/breadcrumb.vue](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/layout/navBars/breadcrumb/breadcrumb.vue)

<p style="font-weight: bold;">一、开启 Breadcrumb、开启 Breadcrumb 图标</p>

功能说明：`开启 Breadcrumb、Breadcrumb 图标`

<p style="font-weight: bold;">二、效果图</p>

<a href="https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/67df8ad8c6e641de94545aad586add9c.gif" target="_black">

<div class="img-style-100">

![https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/67df8ad8c6e641de94545aad586add9c.gif](https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/67df8ad8c6e641de94545aad586add9c.gif)

</div>

</a>

### 3. Tagsview 标签页

文件路径：[/@/layout/navBars/tagsView](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/layout/navBars/tagsView)

<p style="font-weight: bold;">一、开启 Tagsview、开启 Tagsview 图标、开启 TagsView 缓存、开启 TagsView 拖拽、开启 TagsView 共用</p>

功能说明：`开启 Tagsview、Tagsview 图标、TagsView 缓存、TagsView 拖拽、TagsView 共用（共用详情界面：tagsView只会出现一个；非共用详情界面：tagsView会出现多个）`

<p style="font-weight: bold;">二、效果图</p>

<a href="https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/d760ab8798ac428593760226e870879f.gif" target="_black">

<div class="img-style-100">

![https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/d760ab8798ac428593760226e870879f.gif](https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/d760ab8798ac428593760226e870879f.gif)

</div>

</a>

### 4. Footer 版权

文件路径：[/@/layout/footer](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/layout/footer)

<p style="font-weight: bold;">一、开启 Footer 版权</p>

功能说明：`显示/隐藏底部版权`

<p style="font-weight: bold;">二、效果图</p>

<a href="https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/c1ca33ebf6e64ad3baba268235f348f3.gif" target="_black">

<div class="img-style-100">

![https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/c1ca33ebf6e64ad3baba268235f348f3.gif](https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/c1ca33ebf6e64ad3baba268235f348f3.gif)

</div>

</a>

### 5. 颜色模式

文件路径：[/@/layout/navBars/breadcrumb/setings.vue](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/layout/navBars/breadcrumb/setings.vue)

<p style="font-weight: bold;">一、灰色模式、色弱模式、深色模式</p>

功能说明：`开启灰色模式、色弱模式、深色模式`

<p style="font-weight: bold;">二、效果图</p>

<a href="https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/856f60ae98074f4e8c57c3fad16a8d94.gif" target="_black">

<div class="img-style-100">

![https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/856f60ae98074f4e8c57c3fad16a8d94.gif](https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/856f60ae98074f4e8c57c3fad16a8d94.gif)

</div>

</a>

### 6. 水印

文件路径：[/@/utils/wartermark.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/utils/watermark.ts)

<p style="font-weight: bold;">一、开启水印、水印文案</p>

功能说明：`开启开启水印、设置水印文案`

<p style="font-weight: bold;">二、效果图</p>

<a href="https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/19e0ced20c2d495599b69f09227f690b.gif" target="_black">

<div class="img-style-100">

![https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/19e0ced20c2d495599b69f09227f690b.gif](https://gitee.com/lyt-top/vue-next-admin-images/raw/master/docs/layout/19e0ced20c2d495599b69f09227f690b.gif)

</div>

</a>

## 其它设置

::: tip 定位查看 css 样式
可使用 el-option 的 `value` 值去对应的 `文件路径` 里搜索查看
:::

### 1. Tagsview 风格

文件路径：[/@/layout/navBars/tagsView](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/layout/navBars/tagsView)

需注意 `value` 值需与定义的 `css 类名` 一致

```html
<el-select v-model="getThemeConfig.tagsStyle">
  <el-option label="风格1" value="tags-style-one"></el-option>
  <el-option label="风格2" value="tags-style-two"></el-option>
  <el-option label="风格3" value="tags-style-three"></el-option>
  <el-option label="风格4" value="tags-style-four"></el-option>
  <!-- 新增的风格 -->
  <el-option label="风格xx" value="tags-style-xxx"></el-option>
  <!-- 继续添加 -->
  ...
</el-select>
```

### 2. 主页面切换动画

文件路径：[/@/theme/common/transition.scss](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/theme/common/transition.scss)，内置 `slide-right`、`slide-left`、`opacitys` 切换风格。

你可能需要了解 [进入过渡 & 离开过渡](https://v3.cn.vuejs.org/guide/transitions-enterleave.html)。新增动画时，需要在 [/@/layout/navBars/breadcrumb/setings.vue](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/layout/navBars/breadcrumb/setings.vue) 其它设置中添加如下：

```html
<el-select v-model="getThemeConfig.animation">
  <el-option label="slide-right" value="slide-right"></el-option>
  <el-option label="slide-left" value="slide-left"></el-option>
  <el-option label="opacitys" value="opacitys"></el-option>
  <!-- 新增的动画名 -->
  <el-option label="xxx" value="xxx"></el-option>
  <!-- 继续添加 -->
  ...
</el-select>
```

### 3. 分栏高亮风格

文件路径：[/@/layout/component/columnsAside.vue](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/layout/component/columnsAside.vue)。

需注意 `value` 值需与定义的 `css 类名` 一致

```html
<el-select v-model="getThemeConfig.columnsAsideStyle">
  <el-option label="圆角" value="columns-round"></el-option>
  <el-option label="卡片" value="columns-card"></el-option>
  <!-- 新增的高亮风格 -->
  <el-option label="xxx" value="xxx"></el-option>
  <!-- 继续添加 -->
  ...
</el-select>
```

### 4. 分栏布局风格

文件路径：[/@/layout/component/columnsAside.vue](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/layout/component/columnsAside.vue)。

需注意 `value` 值需与定义的 `css 类名` 一致

```html
<el-select v-model="getThemeConfig.columnsAsideLayout">
  <el-option label="水平" value="columns-horizontal"></el-option>
  <el-option label="垂直" value="columns-vertical"></el-option>
  <!-- 新增的分栏布局风格 -->
  <el-option label="xxx" value="xxx"></el-option>
  <!-- 继续添加 -->
  ...
</el-select>
```

## 布局切换

此项目包含四个布局：默认、经典、横向、分栏。

查看大图，鼠标右键：`在新标签页中打开图片`

<div class="img-style">

![https://i.hd-r.cn/f6c87ee0b5ad2567a7166762efa61633.png](https://i.hd-r.cn/f6c87ee0b5ad2567a7166762efa61633.png)

</div>

<div class="img-style">

![https://i.hd-r.cn/10763d37a5ef087cdd62122c7ec4b622.png](https://i.hd-r.cn/10763d37a5ef087cdd62122c7ec4b622.png)

</div>

<div class="img-style">

![https://i.hd-r.cn/be587be203e9fdb06dc1208f20268d9f.png](https://i.hd-r.cn/be587be203e9fdb06dc1208f20268d9f.png)

</div>

<div class="img-style">

![https://i.hd-r.cn/47b00d7daec564ee34ef3032519492b2.png](https://i.hd-r.cn/47b00d7daec564ee34ef3032519492b2.png)

</div>
