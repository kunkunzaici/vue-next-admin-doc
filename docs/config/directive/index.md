# 内置指令的使用

::: tip 开始之前
您可能需要了解 [vue 自定义指令](https://v3.cn.vuejs.org/guide/custom-directive.html)。[/src/directive.ts](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/directive) 目录下，各文件说明 [其它-工具类集合](/config/tool/)。
:::

## 按钮权限

参考 [高级-按钮权限](/config/power/#按钮权限) 章节

## 波浪

### 1. 代码路径

代码路径：[/src/directive/customDirective.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/directive/customDirective.ts) 中的 `wavesDirective` 方法，

可选参数：v-waves="< |light|red|orange|purple|green|teal>"，默认 `' '`

### 2. 使用方法

- 作用于 btn

```html
<el-button size="small" v-waves>
  <SvgIcon name="iconfont icon-bolangnengshiyanchang" />
  默认效果
</el-button>
```

- 作用于 div

```html
<div class="waterfall-first-item" v-for="v in 12" :key="v" v-waves>
  <div class="w100 h100 flex">
    <span class="flex-margin">{{ v }}</span>
  </div>
</div>
```

### 3. 演示地址

[波浪指令效果（v-waves）](https://lyt-top.gitee.io/vue-next-admin-preview/#/pages/waves)

## 弹窗拖动

### 1. 代码路径（弹窗）

代码路径：[/src/directive/customDirective.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/directive/customDirective.ts) 中的 `dragDirective` 方法

### 2. 使用方法（弹窗）

::: tip 参数说明

参数一：dragDom 要拖动的元素

参数二：dragHeader 要拖动的 Header 位置（鼠标放入会变成手指状）
:::

- 自定义 div。注意看 `.drag-container .drag-dom` 说明：选择作为类名 `.drag-container` 元素后代的所有类名 `.drag-dom` 元素（只要是防止页面上出现相同类名时，拿到的值不对的问题）。

您可能需要了解 [CSS 选择器](https://www.w3school.com.cn/css/css_selector_type.asp)

```html {7}
<div class="drag-container">
  <div class="drag-dom">
    <div class="drag-header">
      <el-button
        type="success"
        size="small"
        v-drag="['.drag-container .drag-dom', '.drag-container .drag-header']"
      >
        <el-icon>
          <elementPointer />
        </el-icon>
        按住进行拖动测试
      </el-button>
    </div>
  </div>
</div>
```

- 作用于 Dialog 对话框，不支持指令直接放 `el-dialog` 上，所以得自定义插槽 `<template #title>`

```html {14}
<!-- 按钮 -->
<el-button type="primary" @click="dialogVisible = true" size="small">
  <el-icon>
    <elementPointer />
  </el-icon>
  点击打开 Dialog
</el-button>

<!-- 弹窗 -->
<el-dialog v-model="dialogVisible" width="769px">
  <template #title>
    <div
      v-drag="['.drag-container .el-dialog', '.drag-container .el-dialog__header']"
    >
      拖动指令效果（v-drag）
    </div>
  </template>
  <p>鼠标放标题头进行 Dialog 对话框拖动</p>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false" size="small">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false" size="small"
        >确 定</el-button
      >
    </span>
  </template>
</el-dialog>
```

### 3. 演示地址（弹窗）

[拖动指令效果（v-drag）作用于 Dialog 对话框](https://lyt-top.gitee.io/vue-next-admin-preview/#/pages/drag)
