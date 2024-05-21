# 其它问题集合

## 更新(升级) vite 2.0 后遇到的问题

### 1. vite 1.x

```ts
import type { UserConfig } from "vite";
import { resolve } from "path";
import { loadEnv } from "./build/utils";

const pathResolve = (dir: string): any => {
  return resolve(__dirname, ".", dir);
};

const alias: Record<string, string> = {
  "/@/": pathResolve("src"),
};

const { VITE_PORT, VITE_PUBLIC_PATH, VITE_OPEN } = loadEnv();

const root: string = process.cwd();

const viteConfig: UserConfig = {
  root,
  alias,
  outDir: "dist",
  minify: "esbuild",
  port: VITE_PORT,
  open: VITE_OPEN,
  base: process.env.NODE_ENV === "production" ? "./" : VITE_PUBLIC_PATH,
  optimizeDeps: {
    include: ["element-plus/lib/locale/lang/zh-cn"],
  },
};

export default viteConfig;
```

### 2. vite 2.x

alias、server、build

:::tip 提示
需要安装 @vitejs/plugin-vue，否则 `.vue` 文件报错。安装命令：`cnpm install @vitejs/plugin-vue --save-dev`
:::

```ts
import vue from "@vitejs/plugin-vue";
import type { UserConfig } from "vite";
import { loadEnv } from "./build/utils";

const { VITE_PORT, VITE_PUBLIC_PATH, VITE_OPEN } = loadEnv();

const viteConfig: UserConfig = {
  plugins: [vue()],
  root: process.cwd(),
  alias: [
    {
      find: /^\/@\//,
      replacement: "/src/",
    },
  ],
  base: process.env.NODE_ENV === "production" ? VITE_PUBLIC_PATH : "./",
  optimizeDeps: {
    include: ["element-plus/lib/locale/lang/zh-cn"],
  },
  server: {
    port: VITE_PORT,
    open: VITE_OPEN,
  },
  build: {
    outDir: "dist",
    minify: "esbuild",
    sourcemap: false,
  },
};

export default viteConfig;
```

## 页面打开时空白问题

### 1. 检查浏览器、node 版本：`升级浏览器、node 版本` 或 `重新安装依赖`

### 2. 升级浏览器、node 版本

谷歌浏览器版本 `版本 72.0.3626.121` 或者 `版本 < 72.x`，页面将出现报错 `Uncaught SyntaxError: Unexpected token.` ，这是因为老版本浏览器不支持最新语法 `xx?.xx?.xx`。

node 版本需要 `大于 12xx.xx.x`，[node 官网](https://nodejs.org/zh-cn/)

```bash
# cmd 输入 node -v
node -v

# 得到 node 版本号
v14.16.0
```

### 3. 重新安装依赖

<p></p>

#### 先删除项目中的 node_modules

- 建议使用 cnpm，因为 yarn 有时会报错。[node 版本 > 12xx.xx.x](https://nodejs.org/zh-cn/)

#### 使用 cnpm 获取 yarn 代替 npm，（桌面 cmd 运行）

- 安装 cnpm：`npm install -g cnpm --registry=https://registry.npm.taobao.org`
- 安装 yarn：`npm install -g yarn`

#### vue-next-admin 项目根目录

```bash
# 使用 cnpm install 或 cnpm i 安装依赖
cnpm install

# 或者使用 yarn install 安装依赖
yarn install
```

## 本地调试接口跨域问题

No 'Access-Control-Allow-Origin' header is present on the requested resource.

&emsp;&emsp;Access to image at `'https://image.zhangxinxu:9000/#/study/image/blog/201310/2013-10-10203238.png'` from origin `'http://localhost:8888'` has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

&emsp;&emsp;"No `'Access-Control-Allow-Origin'` header is present on the requested resource. Origin `'http://localhost:8888'` is therefore not allowed access."，翻译下，因为被请求的资源没有设置 'Access-Control-Allow-Origin'，所以从 `'http://localhost:8888'` 发起的请求不被允许。

解决：

- 查看文章：[vue cli 4.0+ 解决前端跨域问题](https://blog.csdn.net/qq_34450741/article/details/107444815)
- 基础章节：[服务端交互](/config/server/#跨域处理)

## 安装的依赖与 package.json 中的不一致

### 1. 依赖说明

::: tip

- '~'（波浪符号）:他会更新到当前 minor version（也就是中间的那位数字）中最新的版本。放到我们的例子中就是："element-plus": "~1.2.0-beta.4"，这个库会去匹配更新到 1.2.x 的最新版本，如果出了一个新的版本为 1.3.0，则不会自动升级。波浪符号是曾经 npm 安装时候的默认符号，现在已经变为了插入符号。

- '^'（插入符号）: 这个符号就显得非常的灵活了，他将会把当前库的版本更新到当前 major version（也就是第一位数字）中最新的版本。放到我们的例子中就是："element-plus": "^1.2.0-beta.4", 这个库会去匹配 1.x.x 中最新的版本，但是他不会自动更新到 2.0.0。
  :::

### 2. 去掉 `^`，锁版本

打开根目录 `package.json`，去掉 `^`，如下：

```json
// 默认
"dependencies": {
  "element-plus": "^1.2.0-beta.4"
}

// 去掉后
"dependencies": {
  "element-plus": "1.2.0-beta.4"
}
```

## cnpm run dev 无法运行项目

### 1. 错误消息，以 vitepress 为例

此错误为 `node 版本过低`，因为使用的是 `v13.6.0` 的 node 版本

```bash
failed to start server. error:
 Error: Package exports for 'C:\Users\issuser\Desktop\vue-next-admin-doc\node_modules\_vitepress@0.20.2@vitepress\node_modules\vue' do not define a './dist/vue.runtime.esm-bundler.js' subpath
    at applyExports (internal/modules/cjs/loader.js:531:13)
    at resolveExports (internal/modules/cjs/loader.js:551:12)
    at Function.Module._findPath (internal/modules/cjs/loader.js:657:22)
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:960:27)
    at Function.resolve (internal/modules/cjs/helpers.js:78:19)
    at resolveAliases (C:\Users\issuser\Desktop\vue-next-admin-doc\node_modules\_vitepress@0.20.2@vitepress\dist\node\serve-c378302d.js:12331:28)
    at resolveConfig (C:\Users\issuser\Desktop\vue-next-admin-doc\node_modules\_vitepress@0.20.2@vitepress\dist\node\serve-c378302d.js:13372:12)
    at processTicksAndRejections (internal/process/task_queues.js:97:5)
    at async Object.createServer (C:\Users\issuser\Desktop\vue-next-admin-doc\node_modules\_vitepress@0.20.2@vitepress\dist\node\serve-c378302d.js:36631:18) {
  code: 'MODULE_NOT_FOUND'
}
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! vue-next-admin-doc@1.0.0 dev: `vitepress dev docs --port 9000`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the vue-next-admin-doc@1.0.0 dev script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\issuser\AppData\Roaming\npm-cache\_logs\2021-12-07T02_06_33_435Z-debug.log
```

### 2. 查看 node 版本，进行版本升级

node 各版本下载地址：[https://npmmirror.com/mirrors/node/](https://npmmirror.com/mirrors/node/)。`.msi` 后缀的为有安装界面应用。

```bash
# win + r，cmd 中输入
λ node -v
# 输出 v16.13.0
```

## 批量更新 package.json

当新建一个项目的时候，有时候会从其他项目的 `package.json` 里面 copy 一份 `dependencies` 过来，或者在 `github` 上下载项目作为改动时，但因为是新项目，我们想用各个依赖包的最新版本。如果手动去修改 `dependencies` 中各个包的版本号，那就太麻烦了，借助 `npm-check-updates` 工具可以很方便的将 `package.json` 中的依赖包版本号更新为最新版本。

### 1. npm-check-updates 安装

::: tip 提示
以下命令都是在 cmd 中执行：
:::

`ncu -u` 跟新失败，就使用 `npm-check-updates` 命令

```bash
# 1、安装
cnpm install -g npm-check-updates

# 2、检查 package.json 中是否有更新
ncu

# 3、更新依赖到最新版本 or 更新全部 ncu -a
ncu -u
```

### 2. 更新全部依赖

dependencies 到最新版本(包括当前指定版本范围满足最新版本号的,比如^4.2.0 -> ^4.3.0)

```bash
# 更新全部 dependencies 到最新版本
ncu -a
```

## dependencies 和 devDependencies

根目录 `package.json` 中：

### 1. npm 安装依赖 `dependencies` 和 `devDependencies` 的区别

- `dependencies`：是需要发布到生产环境的
- `devDependencies`：里面的插件只用于开发环境，不用于生产环境

### 2. npm 安装方式

- `dependencies`：npm install 依赖名称 --save
- `devDependencies`：npm install 依赖名称 --save-dev

### 3. 其它说明

- `dependencies`：插件不管你引不引入都会打包到文件中去
- `devDependencies`：若文件中 import 引入 devDependencies 中插件，依然会把当前引入的插件打包到文件中，不引入则不打包

## 项目编译慢

`cnpm run dev` 编译慢，根目录 `package.json`，尝试删除 `--force`

```json
"scripts": {
  "dev": "vite",
},
```

## 哪些文件可以删除

### 1. 百度统计

根目录 `index.html`

```html
<script type="text/javascript">
  var _hmt = _hmt || [];
  (function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?d9c8b87d10717013641458b300c552e4";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
</script>
```

### 2. 百度地图 key

根目录 `index.html`

```html
<script
  type="text/javascript"
  src="https://api.map.baidu.com/api?v=3.0&ak=wsijQt8sLXrCW71YesmispvYHitfG9gv&s=1"
></script>
```

### 3. 演示界面

[/@/views/fun](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/views/fun) 与 [/@/views/pages](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/views/pages)，需要删除对应的依赖

[/src/layout](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/layout)，结构说明请查看：[简介 -> 目录结构图](/config/)

### 4. 其它

根据具体情况进行对应的删除修改

## 如何跟随 master 升级项目

### 1. 发行版

[发行版](https://gitee.com/lyt-top/vue-next-admin/releases)，进行下载覆盖（前提是未修改布局等，否则自己修改的将被覆盖，谨慎操作）。

```ts
// 下载
vue-next-admin-v1.1.2.zip
下载 Source code (zip)
下载 Source code (tar.gz)
```

### 2. 提交日志

[提交日志](https://gitee.com/lyt-top/vue-next-admin/commits/master)，进行一个一个对比修改（貌似也没有其它好的办法）。

## illustrations svg 图标库

[https://undraw.co/illustrations](https://undraw.co/illustrations)，Browse to find the images that fit your needs and click to download. Use the on-the-fly color image generation to match your brand identity.

## 壁纸库

[https://wallhaven.cc/](https://wallhaven.cc/)，可下载 4k、8k 壁纸（是否侵权，自行辨别）

## 事件总线 mitt

相关文档地址：[mitt](https://github.com/developit/mitt)

代码地址：[/@/utils/mitt](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/utils/mitt.ts)

### 1. 发送（发布）

```html
<script setup lang="ts">
  import mittBus from "/@/utils/mitt";

  // 方法名 + 参数
  mittBus.emit("layoutMobileResize", {
    layout: "defaults",
    clientWidth,
  });
</script>
```

### 2. 监听（订阅）

```html
<script setup lang="ts">
  import mittBus from "/@/utils/mitt";

  // 回调参数
  mittBus.on("layoutMobileResize", (res: any) => {
    // 逻辑处理
  });
</script>
```

### 3. 销毁

```html
<script setup lang="ts">
  import { onUnmounted } from "vue";
  import mittBus from "/@/utils/mitt";

  // 页面销毁时
  onUnmounted(() => {
    mittBus.off("layoutMobileResize", () => {});
  });
</script>
```

### 4. 其它方式（依赖注入）

新版使用 `import mittBus from "/@/utils/mitt";` 替换 `getCurrentInstance`

相关文档：[依赖注入](https://cn.vuejs.org/guide/components/provide-inject.html)

```ts
const properties = {
  mittBus: mitt(),
};

for (const [key, value] of Object.entries(properties)) {
  app.provide(key, value);
}
```

使用方法

```js
// script setup
<script lang="ts" setup>
  import { inject } from "vue";

  const mittBus = inject("mittBus");

  mittBus.emit(xxx);
  mittBus.on(xxx);
  mittBus.off(xxx);
</script>

// script
<script lang="ts">
  import { inject } from "vue";

  setup() {
    const mittBus = inject("mittBus");

    {/* mittBus.emit(xxx);
    mittBus.on(xxx);
    mittBus.off(xxx); */}
  }
</script>
```

## 设置可视区高度 100%

注意：

- 是需要自适应的界面才加上面的类，不需要的别加。内容超出自适应高度，内容将被隐藏。
- 需设置内置类：`layout-padding`、`layout-padding-auto`、`layout-padding-view`。
- 样式在 [/src/theme/app.scss](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/theme/app.scss) 中。

### 1. 设置普通 div 高度自适应

```html
<template>
  <div class="layout-padding">
    <div class="layout-padding-auto layout-padding-view">
      <!-- 普通溢出内容隐藏 -->
      <div>xxx 内容区</div>
      <!-- 使用 `el-scrollbar` 进行美化滚动条。如：`el-scrollbar`
      <el-scrllbar> xxx 内容区 </el-scrllbar> -->
    </div>
  </div>
</template>
```

### 2. 设置表格高度自适应：主要使用 flex 布局，`el-table` 需设置 `flex: 1;`

```html
<template>
  <div class="system-role-container layout-padding">
    <div class="system-role-padding layout-padding-auto layout-padding-view">
      <div>搜索区</div>
      <el-table style="width: 100%">表格内容区</el-table>
      <el-pagination>分页区</el-pagination>
      <div>其它内容</div>
    </div>
  </div>
</template>

<!-- 设置样式（必须，可查看演示 系统设置 -> 角色管理） -->
<style scoped lang="scss">
  .system-role-container {
    .system-role-padding {
      padding: 15px;
      .el-table {
        flex: 1;
      }
    }
  }
</style>
```

## master 分支装依赖时会出现的问题

### 1. screenFul 要求的 node 版本大于 14.x.1

解决方法：[升级 node 版本](https://npmmirror.com/mirrors/node/)。`.msi` 后缀的为有安装界面应用。

### 2. 开发依赖的 types 库，已有自己的类型声明

解决方法：根目录 `package.json` 下："@types/axios": "^0.14.0"，" @types/clipboard": "^2.0.1", 去掉这两个依赖

### 3. 会报 error Unexpected end of JSON input while parsing near '...n4m5KyE3UEIxfv0HEAVbz' 这种类型的错误

解决方法：`cmd` 中执行以下命令

```bash
npm cache clean --force
```

## 本地开发，页面空白问题

解决方法：删除 [layout/routerView/parent.vue](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/layout/routerView/parent.vue) `keep-alive`。如下：

```html
<router-view v-slot="{ Component }">
  <transition :name="setTransitionName" mode="out-in">
    <keep-alive :include="getKeepAliveNames">
      <component :is="Component" :key="refreshRouterViewKey" class="w100" />
    </keep-alive>
  </transition>
</router-view>
```

改成（你将失去路由缓存功能，发布时再还原代码，未找到解决办法）

```html
<router-view v-slot="{ Component }">
  <transition :name="setTransitionName" mode="out-in">
    <component :is="Component" :key="refreshRouterViewKey" class="w100" />
  </transition>
</router-view>
```

## 打包之后缓存问题

根目录 `vite.config.ts` 中，设置 打包输出 `output` `new Date().getTime()`

```ts {4-6}
build: {
  rollupOptions: {
    output: {
      entryFileNames: `assets/[name].${new Date().getTime()}.js`,
      chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
      assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,
    },
  },
},
```

`"version": "2.3.0"` 版本已改回原来的。[build 时 不能用 ${new Date().getTime()} 设置输出文件名](https://gitee.com/lyt-top/vue-next-admin/issues/I5PATZ)

```ts {4-6}
build: {
  rollupOptions: {
    output: {
      entryFileNames: `assets/[name].[hash].js`,
      chunkFileNames: `assets/[name].[hash].js`,
      assetFileNames: `assets/[name].[hash].[ext]`,
    },
  },
},
```

## 地址栏带 `#号` 与不带 `#号`

地址栏带 `#号` 与不带 `#号` ，参考：[next.router history-mode.html](https://next.router.vuejs.org/guide/essentials/history-mode.html)

访问路由器和内部的当前路由 setup：[Vue 路由器和 Composition API](https://next.router.vuejs.org/guide/advanced/composition-api.html#accessing-the-router-and-current-route-inside-setup)
