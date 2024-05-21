# 安装

::: danger Git 命令
在安装使用本模板之前，您可能需要了解 git 的基本操作、使用，对 git 命令有一个总体的认识。认真看完，面试时也可以吹牛。可直接 [gitee](https://gitee.com/) 上创建仓库进行上手实践。git 命令参考文档：https://gitee.com/all-about-git
:::

## 安装 cnpm、yarn，win + R，复制以下代码

::: tip 建议 优先使用 cnpm
使用 cnpm，因为 npm 有时候安装会报错（网络卡）
:::

`win + R` cmd 中粘贴下列命令：

### 1. cnpm

```sh
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

### 2. yarn

```sh
npm install -g yarn
```

### 3. pnpm

参考文档：[https://pnpm.io/zh/installation](https://pnpm.io/zh/installation)

仓库地址：[https://github.com/pnpm/pnpm](https://github.com/pnpm/pnpm)

## vue3.x：master 分支

仓库地址：https://gitee.com/lyt-top/vue-next-admin/tree/master/

桌面 `win + R`，输入 `cmd`，按步骤复制下列命令

```bash
# 克隆项目
git clone https://gitee.com/lyt-top/vue-next-admin.git

# 进入项目
cd vue-next-admin

# 安装依赖
cnpm install

# 运行项目
cnpm run dev

# 打包发布
cnpm run build
```

## vue2.x：vue-prev-admin 分支

仓库地址：https://gitee.com/lyt-top/vue-next-admin/tree/vue-prev-admin/

::: danger 切换分支前
记得先删除 `node_modules`，因为各分支的依赖可能不同，防止出错。
:::

```bash
# 克隆项目
git clone https://gitee.com/lyt-top/vue-next-admin.git

# 进入项目
cd vue-next-admin

# 切换分支
git checkout vue-prev-admin

# 安装依赖
cnpm install

# 运行项目
cnpm run dev

# 打包发布
cnpm run build

```

## 仓库代码各分支说明（后续将添加更多分支）

::: tip git 命令参考
文档：https://gitee.com/all-about-git
:::

项目切换分支后，README.md 文件内容都会不一样，请注意看 README.md 文件中的第一项 介绍 内容，会大概介绍当前分支是干啥的。`基础版同步 master 分支主版本`

```ts
├── vueNextAdmin
	├── master (基于 vue3.x、vite、ts、Element plus等，主项目模板)
	├── vue-prev-admin (基于 vue2.x、vue-cli、element ui 项目模板)
	├── vue-next-admin-template (vue-next-admin 基础版 ts，不带国际化)
	├── vue-next-admin-template-js (基于 vue-next-admin-template 修改 js 版，不带国际化)
	├── vue-next-admin-mould (基于 vue3.x、vite、ts 配置了 eslint、prettier 通用项目模板)
	├── electron (跨平台的桌面应用程序)
	└── personal ( personal-个人项目)
```
