# 打包预览

::: tip 开始之前
框架中使用基于原生 ES-Module 的前端构建工具 Vite，您可能需要了解 [Vite 配置](https://vitejs.cn/config/)
:::

## 打包

### 1. .env 文件

根目录 `.env` 文件，去了解 [.env-文件](/config/server/#env-文件)。`/vue-next-admin-preview/` 为预览仓库 [vue-next-admin-preview](https://gitee.com/lyt-top/vue-next-admin-preview) 的仓库名，打包时得根据具体情况进行修改打包路径。

```bash
# public path 配置线上环境路径（打包）、本地通过 http-server 访问时，请置空即可
VITE_PUBLIC_PATH = /vue-next-admin-preview/
```

### 2. 打包后链接效果

注意看下图 `圈起来` 红色部分路径。

<div class="img-style-100">

![https://i.hd-r.cn/ff42695acf83450f937a214234ae81d3.png](https://i.hd-r.cn/ff42695acf83450f937a214234ae81d3.png)

</div>

### 3. 打包命令

```bash
# 项目根目录运行
cnpm run build

# 或者，package.json 中，鼠标放入 build 上点击 `运行脚本`
"scripts": {
  "build": "vite build",
},
```

## 预览

### 1. 本地预览

- 本地预览必须把：根目录 `.env` 文件中的 `VITE_PUBLIC_PATH` 置空

```bash
VITE_PUBLIC_PATH = ''

# 或者
VITE_PUBLIC_PATH =

# 或者
VITE_PUBLIC_PATH = /
```

- 安装 `http-server` 插件，或者拖到 `HBuilderX` 中去

```bash
# 安装
cnpm install -g http-server

# 运行，打包后的 dist 文件夹里打开 cmd
http-server
```

- 或者在 `package.json` 中添加脚本

```json {5}
"scripts": {
  "dev": "vite --force",
  "build": "vite build",
  "lint-fix": "eslint --fix --ext .js --ext .jsx --ext .vue src/",
  "serve": "http-server ./dist"
},

// 项目根目录运行
cnpm run serve
```

- 成功代码

```bash
λ cnpm run serve

> vue-next-admin@1.2.0 serve C:\Users\Desktop\vue-next-admin
> http-server ./dist

Starting up http-server, serving ./dist

http-server settings:
CORS: disabled
Cache: 3600 seconds
Connection Timeout: 120 seconds
Directory Listings: visible
AutoIndex: visible
Serve GZIP Files: false
Serve Brotli Files: false
Default File Extension: none

Available on:
  http://10.111.171.255:8080
  http://127.0.0.1:8080
Hit CTRL-C to stop the server
```

### 2. 线上预览

部署到服务器，方法 [自行前往学习](https://www.baidu.com/)。

## 其它

### 1. 分包（manualChunks）

[vite.config.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/vite.config.ts) 中，注意：`npm` 安装依赖 与 `cnpm` 安装依赖时，`build.rollupOptions.output.manualChunks` 分包效果会不一致，下图的为 `npm` 安装依赖时的打包效果。

- 代码

```ts {5-7}
build: {
  rollupOptions: {
    output: {
      manualChunks(id) {
        if (id.includes('node_modules')) {
          return id.toString().split('node_modules/')[1].split('/')[0].toString();
        }
      },
    },
  },
}
```

- 打包效果（`npm` 安装依赖时的打包效果）

<div class="img-style-100">

![https://i.hd-r.cn/ce0ebf9f1adc927ec44c91cb52d1ae8a.png](https://i.hd-r.cn/ce0ebf9f1adc927ec44c91cb52d1ae8a.png)

</div>

### 2. gzip 压缩

使用 `vite-plugin-compression` 插件

- 安装

```bash
npm install vite-plugin-compression --save-dev
```

- 使用

[vite.config.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/vite.config.ts) 查看具体配置

```ts
import viteCompression from "vite-plugin-compression";

plugins: [viteCompression()];
```

### 3. cdn 加速

网络卡，打包后第一次进入还是慢，这里只做部分参考，需要的可自行添加配置。

详细配置文章链接 [vue3 + vite 打包 gzip 压缩、cdn 加速](https://blog.csdn.net/qq_34450741/article/details/129766676)

- .env 文件，默认为关闭 `cdn` 加速

```bash
# 打包是否开启 cdn（源文件 utils/build.ts），可自行修改
VITE_OPEN_CDN = false
```

- 配置 cdn 加速链接

[完整列表配置查看/src/utils/build.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/utils/build.ts)

注意 `prodUrl`：使用的是 [jsdelivr](https://www.jsdelivr.com/) 还是 [unpkg](https://unpkg.com/)。它们的 `path` 可能不一致，所以下面的 `path` 你得对应的进行修改

比如：

> prodUrl: 为 `https://unpkg.com/{name}@{version}/{path}` 时，path 为 `dist/vue.global.js`

`path`：通过网站 [https://unpkg.com/](https://unpkg.com/) 进行查询，方法为地址栏输入 `https://unpkg.com/${包名}` 回车。如：[https://unpkg.com/vue](https://unpkg.com/vue)

```ts {5}
modules: [
  {
    name: "vue",
    var: "Vue",
    path: "dist/vue.global.js",
  },
];
```

> prodUrl: 为 `https://cdn.jsdelivr.net/npm/{name}@{version}/{path}` 时，path 为 `dist/vue.global.min.js`

`path`：通过网站 [https://www.jsdelivr.com/](https://www.jsdelivr.com/) 进行查询

```ts {5}
modules: [
  {
    name: "vue",
    var: "Vue",
    path: "dist/vue.global.min.js",
  },
];
```

- 打包效果（npm 安装依赖时的打包效果），[.env](https://gitee.com/lyt-top/vue-next-admin/blob/master/.env) `VITE_OPEN_CDN` 设置为 true

```bash
VITE_OPEN_CDN = true
```

<div class="img-style-100">

![https://i.hd-r.cn/ce0ebf9f1adc927ec44c91cb52d1ae8a.png](https://i.hd-r.cn/ce0ebf9f1adc927ec44c91cb52d1ae8a.png)

</div>
