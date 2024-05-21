# 菜单配置

::: tip 温馨提示
先不着急上手，首先得了解各参数字段是啥意思，菜单路径地址：[/@/router/route.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/router/route.ts)。也可看对应的 [next.router API 参考文档](https://next.router.vuejs.org/zh/api/#beforeenter) ❤️。

- 前端控制：[/@/router/route.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/router/route.ts) 修改菜单数据

- 后端控制：需先去 [/src/stores/themeConfig.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/stores/themeConfig.ts#L133) 下开启 `isRequestRoutes: true`，然后去 [/@/api/menu/index.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/api/menu/index.ts) 中修改接口拿菜单数据

:::

以下内容为国际化，想了解更多，请移步 [高级-国际化](/config/i18n/)

## 参数说明

代码位置：[/@/router/route.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/router/route.ts)

菜单路由中的字段说明

```ts
{
  // 菜单路径，用于跳转
  path: '/home',
  // 菜单 name，用于界面 keep-alive 路由缓存。
  // 此 name 需要与 component 组件中的 name 值相同（唯一）
  name: 'home',
  // 组件路径
  component: () => import('/@/views/home/index.vue'),
  // 附加自定义数据
  meta: {
    // 菜单标题（国际化写法）
    title: 'message.router.home',
    // 菜单外链链接
    // 开启外链条件，`1、isLink: true 2、链接地址不为空（meta.isLink） 3、isIframe: false`
    isLink: '',
    // 菜单是否隐藏（菜单不显示在界面，但可以进行跳转）
    isHide: false,
    // 菜单是否缓存
    isKeepAlive: true,
    // 菜单是否固定（固定在 tagsView 中，不可进行关闭），右键菜单无 `关闭` 项
    isAffix: true,
    // 是否内嵌
    // 开启条件，`1、isIframe: true 2、链接地址不为空（meta.isLink）`
    isIframe: false,
    // 当前路由权限标识，取角色管理。控制路由显示、隐藏。超级管理员：admin 普通角色：common
    // 之前 auth 取用户（角色下有多个用户）
    roles: ['admin', 'common'],
    // 菜单图标
    icon: 'iconfont icon-shouye',
    // 自行再添加
    ...
  },
}
```

## 菜单格式

在项目 [/@/router/route.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/router/route.ts) 文件中。这里需要注意，菜单数据内容必须嵌套进顶级节点（作为顶级路由出口）的 `children` 字段里

```ts
{
  // 顶级菜单路径
  path: '/',
  // 顶级菜单 name
  name: '/',
  // 顶级路由出口
  component: () => import('/@/layout/index.vue'),
  // 顶级菜单重定向路径
  redirect: '/home',
  // 顶级附加自定义数据
  meta: {
    // 顶级菜单是否缓存
    isKeepAlive: true,
  },
  // 顶级菜单的子级菜单数据
  children: [
    // 新增的菜单对象写在这里
    {
      ...
    }
  ]
}
```

## 路径格式

### 1. 面包屑多级显示

在项目 [/@/router/route.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/router/route.ts) 文件中，观察 `path` 字段，有 `children` 时，`path` 字段是基于上一级继续拼接（为什么这样？详看 [布局配置-breadcrumb-面包屑](/config/layoutConfig/#breadcrumb-面包屑)）。

如下所示：`/params/xxx`，这样做是为了 `breadcrumb-面包屑` 的显示问题。

```ts
{
  path: '/params',
  redirect: '/params/common',
  ...,
  children: [
    {
      // 面包屑：首页 / 路由参数 / 普通路由
      path: '/params/common',
      ...,
    },
    {
      // 面包屑：首页 / 路由参数 / 普通路由 / 普通路由详情
      path: '/params/common/details',
      ...
    },
  ]
}
```

### 2. 面包屑单级显示

`children` 里的 `path` 不基于上级 `path`，注意高亮部分代码的 `path`

```ts {18}
{
  path: '/params',
  redirect: '/params/common',
  ...,
  children: [
    {
      // 面包屑：首页 / 路由参数 / 普通路由
      path: '/params/common',
      ...,
    },
    {
      // 面包屑：首页 / 路由参数 / 普通路由详情
      path: '/params/details',
      ...
    },
    {
      // 面包屑：首页
      path: '/params1/common1/details',
      ...
    },
  ]
}
```

## 一级菜单

### 1. 新建文件夹

- 一般情况下，我们添加菜单时，代码都是在编译中（cnpm run dev）。所以我们先新增文件夹，后再添加代码到 [/@/router/route.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/router/route.ts) 文件中，防止需要重新再运行项目。`/@/views` 下新增 `personal` 文件夹

<div class="img-style-100">

![https://i.hd-r.cn/8e977eabef05c8b4b255799ac4957bd2.png](https://i.hd-r.cn/8e977eabef05c8b4b255799ac4957bd2.png)

</div>

- index.vue，注意 `name` 值需与 [/@/router/route.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/router/route.ts) 中的 `name` 值一致，否则实现不了路由的缓存（keep-alive）

```html
<template>
  <div class="personal">
    personal
    ...
  </div>
</template>

<script setup lang="ts" name="personal">
import { reactive, toRefs } from 'vue';

// 定义变量内容
const state = reactive({});

<style scoped lang="scss">
.personal {}
</style>
```

### 2. 新增路由代码

在项目 [/@/router/route.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/router/route.ts) 文件中，需写在 `children` 字段里，比如我们上面添加个人中心界面，新增如下代码：

```ts {11-25}
{
  path: '/',
  name: '/',
  component: () => import('/@/layout/index.vue'),
  redirect: '/home',
  meta: {
    isKeepAlive: true,
  },
  children: [
    // 新增的菜单对象写在这里
    {
      path: '/personal',
      name: 'personal',
      component: () => import('/@/views/personal/index.vue'),
      meta: {
        title: 'message.router.personal',
        isLink: '',
        isHide: false,
        isKeepAlive: true,
        isAffix: false,
        isIframe: false,
        roles: ['admin', 'common'],
        icon: 'iconfont icon-gerenzhongxin',
      },
    },
  ]
}
```

### 3. 界面显示效果

去 `http://localhost:8888/` 中查看显示效果，如下：

<div class="img-style-100">

![https://i.hd-r.cn/97c1313ce849a9a909561f37dfb94677.png](https://i.hd-r.cn/97c1313ce849a9a909561f37dfb94677.png)

</div>

## 二级菜单

::: tip 二级菜单与一级菜单的区别：（只要子级里有 `children`）

- 1、redirect：顶级设置重定向

- 2、component：顶级为 `component: () => import('/@/layout/routerView/parent.vue')` 写死路径。`component: () => import('/@/layout/routerView/parent.vue')` 为路由出口

:::

### 1. 新建文件夹（同一级菜单）

- 我们按照建 `一级菜单` 的步骤建 `二级菜单`。`/@/views` 下新增 `system` 文件夹。`system` 文件夹下新增 `menu、user` 等文件夹

<div class="img-style-100">

![https://i.hd-r.cn/fc319a4fef52d39938390f8151100704.png](https://i.hd-r.cn/fc319a4fef52d39938390f8151100704.png)

</div>

- 为了方便管理，我们在 `/@/views/system/menu` 或 `/@/views/system/user` 中都添加 `index.vue` 组件

```html
<template>
  <div class="system-menu-container">
    systemMenu
    ...
  </div>
</template>

<script setup lang="ts" name="systemMenu">
import { reactive } from 'vue';

// 定义变量内容
const state = reactive({});

<style scoped lang="scss">
.system-menu-container {}
</style>
```

### 2. 新增路由代码（同一级菜单）

在项目 [/@/router/route.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/router/route.ts) 文件中，比如我们上面添加系统设置界面，

新增如下代码：代码有点长，可复制粘贴代码到 [OSCHINA 在线代码格式化](https://tool.oschina.net/codeformat/json/) 中具体查看

```ts {15-18}
{
  path: '/',
  name: '/',
  component: () => import('/@/layout/index.vue'),
  redirect: '/home',
  meta: {
    isKeepAlive: true,
  },
  children: [
    // 新增的菜单对象写在这里
    {
      path: '/system',
      name: 'system',
      // 2、顶级为 `component: () => import('/@/layout/routerView/parent.vue')` 写死路径
      component: () => import('/@/layout/routerView/parent.vue'),
      // 1、redirect：重定向
      redirect: '/system/menu',
      meta: {
        title: 'message.router.system',
        isLink: '',
        isHide: false,
        isKeepAlive: true,
        isAffix: false,
        isIframe: false,
        roles: ['admin'],
        icon: 'iconfont icon-xitongshezhi',
      },
      children: [
        {
          path: '/system/menu',
          name: 'systemMenu',
          component: () => import('/@/views/system/menu/index.vue'),
          meta: {
            title: 'message.router.systemMenu',
            isLink: '',
            isHide: false,
            isKeepAlive: true,
            isAffix: false,
            isIframe: false,
            roles: ['admin'],
            icon: 'iconfont icon-caidan',
          },
        },
        {
          path: '/system/user',
          name: 'systemUser',
          component: () => import('/@/views/system/user/index.vue'),
          meta: {
            title: 'message.router.systemUser',
            isLink: '',
            isHide: false,
            isKeepAlive: true,
            isAffix: false,
            isIframe: false,
            roles: ['admin'],
            icon: 'iconfont icon-icon-',
          },
        },
      ]
    }
  ]
}
```

### 3. 界面显示效果（同一级菜单）

去 `http://localhost:8888/` 中查看显示效果，如下：

<div class="img-style-100">

![https://i.hd-r.cn/233b7cec76dac5610d35d451cb82688b.png](https://i.hd-r.cn/233b7cec76dac5610d35d451cb82688b.png)

</div>

## 多级嵌套菜单写法

::: tip 多级嵌套菜单与二级菜单的区别：（只要子级里有 `children`）

- 1、redirect：顶级设置重定向

- 2、component：只要当前级（我们称为顶级）下有子级（`children`），那么当前级为 `component: () => import('/@/layout/routerView/parent.vue')` 写死路径

:::

### 1. 新建文件夹（同二级菜单）

参考 [route.ts menu 的嵌套格式](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/router/route.ts#L80)

- 我们按照建 `二级菜单` 的步骤建 `多级嵌套菜单`。`/@/views` 下新增 `menu` 文件夹。`menu` 文件夹下新增 `menu1` 等文件夹，`menu1` 文件夹下新增 `menu12` 等。

<div class="img-style-100">

![https://i.hd-r.cn/871f2c6abd5398c4887060a8b3596ea6.png](https://i.hd-r.cn/871f2c6abd5398c4887060a8b3596ea6.png)

</div>

- 组件代码参考 [/config/menu/#二级菜单](/config/menu/#二级菜单)

### 2. 新增路由代码（同二级菜单）

在项目 [/@/router/route.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/router/route.ts) 文件中，比如我们上面添加系统设置界面，

新增如下代码：代码有点长，可复制粘贴代码到 [OSCHINA 在线代码格式化](https://tool.oschina.net/codeformat/json/) 中具体查看

```ts {4-5,21-22,37-39}
{
  path: '/menu',
  name: 'menu',
  component: () => import('/@/layout/routerView/parent.vue'),
  redirect: '/menu/menu1',
  meta: {
    title: 'message.router.menu',
    isLink: '',
    isHide: false,
    isKeepAlive: true,
    isAffix: false,
    isIframe: false,
    roles: ['admin', 'common'],
    icon: 'iconfont icon-caidan',
  },
  children: [
    {
      path: '/menu/menu1',
      name: 'menu1',
      component: () => import('/@/layout/routerView/parent.vue'),
      redirect: '/menu/menu1/menu11',
      meta: {
        title: 'message.router.menu1',
        isLink: '',
        isHide: false,
        isKeepAlive: true,
        isAffix: false,
        isIframe: false,
        roles: ['admin', 'common'],
        icon: 'iconfont icon-caidan',
      },
      children: [
        {
          path: '/menu/menu1/menu12',
          name: 'menu12',
          component: () => import('/@/layout/routerView/parent.vue'),
          redirect: '/menu/menu1/menu12/menu121',
          meta: {
            title: 'message.router.menu12',
            isLink: '',
            isHide: false,
            isKeepAlive: true,
            isAffix: false,
            isIframe: false,
            roles: ['admin', 'common'],
            icon: 'iconfont icon-caidan',
          },
          children: [
            {
              path: '/menu/menu1/menu12/menu121',
              name: 'menu121',
              component: () => import('/@/views/menu/menu1/menu12/menu121/index.vue'),
              meta: {
                title: 'message.router.menu121',
                isLink: '',
                isHide: false,
                isKeepAlive: true,
                isAffix: false,
                isIframe: false,
                roles: ['admin', 'common'],
                icon: 'iconfont icon-caidan',
              },
            },
          ],
        },
      ]
    }
  ]
}
```

### 3. 界面显示效果（同二级菜单）

去 `http://localhost:8888/` 中查看显示效果，如下：

<div class="img-style-100">

![https://i.hd-r.cn/1c5b991ed37874664b77184bf26e03ea.png](https://i.hd-r.cn/1c5b991ed37874664b77184bf26e03ea.png)

</div>

## 后端接口菜单

### 1. 菜单格式

::: tip 参考 gitee 模拟数据
[菜单数据格式：https://gitee.com/lyt-top/vue-next-admin-images/blob/master/menu/adminMenu.json](https://gitee.com/lyt-top/vue-next-admin-images/blob/master/menu/adminMenu.json)
:::

- 前面我们已经说了，[菜单格式](/config/menu/#菜单格式)，菜单数据内容必须嵌套进顶级节点的 `children` 字段里，所以我们后端返回的菜单格式，只需要返回顶级节点 `children` 数组即可。

```json {8,9}
{
  "code": 0,
  "type": "adminMenu",
  "data": [
    {
      "path": "/home",
      "name": "home",
      "component": "home/index",
      "meta": {
        "title": "message.router.home",
        "isLink": "",
        "isHide": false,
        "isKeepAlive": true,
        "isAffix": true,
        "isIframe": false,
        "roles": ["admin", "common"],
        "icon": "iconfont icon-shouye"
      }
    },
    {
      // 其它菜单数据
      ...
    }
  ]
}
```

- 需要注意 `component` 字段为字符串而非函数，上面高亮位置处。这里为什么不写成 `"component": "/home/index.vue"`，请继续往下看 `二、逻辑处理`

```json
"component": "home/index",
```

- `component` 例子演示，如嵌套菜单（文档已简写，真实请补满其它参数）：

::: tip 对比发现

- 1、layout：以 `layout` 开头的话，去掉了 `/@/` 及 `.vue` 后缀

- 2、views：以 `views` 开头的话，去掉了 `/@/views/` 及 `.vue` 后缀

:::

```ts {4,9,15,26,31,36}
// 默认菜单格式
{
  path: '/menu',
  component: () => import('/@/layout/routerView/parent.vue'),
  redirect: '/menu/menu1',
  children: [
    {
      path: '/menu/menu1',
      component: () => import('/@/layout/routerView/parent.vue'),
      redirect: '/menu/menu1/menu11',
      children: [
        {
          path: '/menu/menu1/menu11',
          name: 'menu11',
          component: () => import('/@/views/menu/menu1/menu11/index.vue'),
        },
      ]
    }
  ]
}

// 后端返回菜单格式
{
  path: '/menu',
  component: 'layout/routerView/parent',
  redirect: '/menu/menu1',
  children: [
    {
      path: '/menu/menu1',
      component: 'layout/routerView/parent',
      redirect: '/menu/menu1/menu11',
      children: [
        {
          path: '/menu/menu1/menu11',
          name: 'menu11',
          component: 'menu/menu1/menu11/index',
        },
      ]
    }
  ]
}
```

### 2. 逻辑处理

后端控制逻辑代码 [/@/router/backEnd.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/router/backEnd.ts)

- Glob 导入，Vite 支持使用特殊的 import.meta.glob 函数从文件系统导入多个模块。具体查看 [vite Glob 导入文档](https://vitejs.cn/guide/features.html#glob-import)。

```ts
const layouModules: any = import.meta.glob("../layout/routerView/*.{vue,tsx}");
const viewsModules: any = import.meta.glob("../views/**/*.{vue,tsx}");
```

- 把 component 中的路径字符串转成实际组件地址，通过以下方法进行转换

```ts
/**
 * 后端路由 component 转换
 * @param routes 后端返回的路由表数组
 * @returns 返回处理成函数后的 component
 */
export function backEndComponent(routes: any) {
  if (!routes) return;
  return routes.map((item: any) => {
    if (item.component)
      item.component = dynamicImport(
        dynamicViewsModules,
        item.component as string
      );
    item.children && backEndComponent(item.children);
    return item;
  });
}

/**
 * 后端路由 component 转换函数
 * @param dynamicViewsModules 获取目录下的 .vue、.tsx 全部文件
 * @param component 当前要处理项 component
 * @returns 返回处理成函数后的 component
 */
export function dynamicImport(
  dynamicViewsModules: Record<string, Function>,
  component: string
) {
  const keys = Object.keys(dynamicViewsModules);
  const matchKeys = keys.filter((key) => {
    const k = key.replace(/..\/views|../, "");
    return k.startsWith(`${component}`) || k.startsWith(`/${component}`);
  });
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return dynamicViewsModules[matchKey];
  }
  if (matchKeys?.length > 1) {
    return false;
  }
}
```

- 转换完成再重新赋值给 [菜单格式](/config/menu/#菜单格式)，`children` 字段里

```ts
// res.data 为链接
// https://gitee.com/lyt-top/vue-next-admin/blob/master/src/router/backEnd.ts
// 的菜单模拟数据
const dynamicRoutes = await backEndComponent(res.data);
```

## 路由缓存

路由菜单中的 `name` 需与组件的 `name` 相同且 `唯一`，还有 `meta.isKeepAlive` 设为 `true`

### 1. 路由菜单设置 `name` 值

```ts{3}
{
  path: '/home',
  name: 'home',
}
```

### 2. 组件中设置 `name` 值

```html{1}
<script setup lang="ts" name="home">
  // 这里写点内容，防止空内容报错
</script>
```

### 3. `meta.isKeepAlive`

代码路径：[/@/router/route.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/router/route.ts)

```ts{2}
 meta: {
    isKeepAlive: true,
  },
```
