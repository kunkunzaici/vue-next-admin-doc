# 服务端交互

## .env 文件

::: tip 开始之前
框架中使用 [Axios](https://www.kancloud.cn/yunye/axios/234845) HTTP 库，您可能需要了解 [vite 环境变量和模式章节](https://vitejs.cn/guide/env-and-mode.html)
:::

### 1. 配置文件有（框架中的根目录）

```bash
.env              # 全局默认配置文件，不论什么环境都会加载合并
.env.development  # 开发环境下的配置文件
.env.production   # 生产环境下的配置文件
```

### 2. 命名规则

为了防止意外地将一些环境变量泄漏到客户端，只有以 `VITE_` 为前缀的变量才会暴露给经过 vite 处理的代码。例如下面这个文件中：

```bash
DB_PASSWORD = foobar
VITE_SOME_KEY = 123
```

只有 `VITE_SOME_KEY` 会被暴露为 `import.meta.env.VITE_SOME_KEY` 提供给客户端，而 `DB_PASSWORD` 则不会。

## axios 封装

### 1. 框架中创建 axios

文件路径：[/@/utils/request.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/utils/request.ts)

- 配置新建一个 axios 实例，对 `import.meta.env.VITE_API_URL` 不了解？请移步 [env-文件](/config/server/#env-文件)

```ts
const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL as any,
  timeout: 50000,
  headers: { "Content-Type": "application/json" },
});
```

### 2. 添加请求拦截器

::: danger 注意 axios 版本

v1.x.x 之后是没有 `common` 字段了，注意去 [package.json](https://gitee.com/lyt-top/vue-next-admin/blob/master/package.json) 中查看 `axios` 版本
:::

```ts{6}
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么 token
    if (Session.get("token")) {
      // config.headers!['Authorization'] = `${Session.get('token')}`;
      config.headers.common["Authorization"] = `${Session.get("token")}`;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
```

### 3. 添加响应拦截器

注意`高亮处`的判断，根据 `后端接口返回的参数` 做具体判断，否则可能 `拿不到接口返回的数据`。此处根据需求自行修改，非固定。

```ts {5,7}
service.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const res = response.data;
    if (res.code && res.code !== 0) {
      // `token` 过期或者账号已在别处登录
      if (res.code === 401 || res.code === 4001) {
        Session.clear(); // 清除浏览器全部临时缓存
        window.location.href = "/"; // 去登录页
        ElMessageBox.alert("你已被登出，请重新登录", "提示", {})
          .then(() => {})
          .catch(() => {});
      }
      return Promise.reject(service.interceptors.response);
    } else {
      return res;
    }
  },
  (error) => {
    // 对响应错误做点什么
    if (error.message.indexOf("timeout") != -1) {
      ElMessage.error("网络超时");
    } else if (error.message == "Network Error") {
      ElMessage.error("网络连接错误");
    } else {
      if (error.response.data) ElMessage.error(error.response.statusText);
      else ElMessage.error("接口路径找不到");
    }
    return Promise.reject(error);
  }
);
```

## 使用说明

### 1. 统一 api 文件夹

`/src` 下新建 [/src/api 文件夹](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/api)。建议每一个模块，都新建一个文件夹（文件夹名称与模块名称相同，方便维护）。

如：`login 模块`，api 文件夹下新建 `/@/api/login` 文件夹

<div class="img-style-100">

![https://i.hd-r.cn/2160ff7fa879b5efe3c5b6a5355ba365.png](https://i.hd-r.cn/2160ff7fa879b5efe3c5b6a5355ba365.png)

</div>

### 2. 统一 api 管理

- 前端定义接口函数，格式看自己喜欢咋用就咋用，不一定非要使用以下写法格式。框架内目前写法 [/src/api/login/index.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/src/api/login/index.ts)

如：`/@/api/login/index.ts` 目录下，选择方法定义：

`方法一`

```ts
// 先引入经过自定义全局封装的 axios
import request from "/@/utils/request";

/**
 * 用户登录
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function signIn(params: object) {
  return request({
    url: "/user/signIn",
    method: "post",
    data: params,
  });
}
```

`方法二`

```ts
// 先引入经过自定义全局封装的 axios
import request from "/@/utils/request";

export default function () {
  /**
   * 用户登录
   * @param params 要传的参数值
   * @returns 返回接口数据
   */
  const signIn = (params: object) => {
    return request({
      url: "/user/signIn",
      method: "post",
      data: params,
    });
  };
  // 这里继续添加
  ...
  return {
    signIn,
    // 这里继续添加
    ...
  };
}
```

`方法三`

```ts
// 先引入经过自定义全局封装的 axios
import request from "/@/utils/request";

/**
 * 用户登录
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function signIn(params: object) {
  return request({
    url: "/user/signIn",
    method: "post",
    data: params,
  });
}

/**
 * 统一批量导出
 * @method signIn 用户登录接口
 */
const apiLogin = {
  signIn: (params: object) => {
    signIn(params);
  },
  // 这里继续添加
  ...
};

// 统一批量导出
export default apiLogin;
```

- 前端界面使用接口函数（方法与 `1.1、前端定义接口函数` 相对应）

`方法一`

```ts {3,8}
<script lang="ts">
import { onMounted } from 'vue';
import { signIn } from '/@/api/login';
export default {
  name: 'xxxx',
  setup() {
    onMounted(() => {
      signIn({xxx:xxx参数}).then(res => {}).catch(err => {}).finally(() => {})
    });
    // 或者
    // onMounted(async () => {
    //  const res = await signIn({xxx:xxx参数})
    // });
  },
};
</script>
```

`方法二`

```ts {3,8}
<script lang="ts">
import { onMounted } from 'vue';
import apiLogin from '/@/api/login';
export default {
  name: 'xxxx',
  setup() {
    onMounted(() => {
      apiLogin().signIn({xxx:xxx参数}).then(res => {}).catch(err => {})
    });
    // 或者
    // const { signIn } = apiLogin();
    // onMounted(() => {
    //   signIn({xxx:xxx参数}).then(res => {}).catch(err => {})
    // });
  },
};
</script>
```

`方法三`

```ts {3,8}
<script lang="ts">
import { onMounted } from 'vue';
import apiLogin from '/@/api/login';
export default {
  name: 'xxxx',
  setup() {
    onMounted(() => {
      apiLogin.signIn({xxx:xxx参数}).then(res => {}).catch(err => {})
    });
    // 或者
    // onMounted(async () => {
    //  const res = await apiLogin.signIn({xxx:xxx参数})
    // });
  },
};
</script>
```

## 跨域处理

出于浏览器的一种安全机制同源策略影响，来限制不同源的网站不能通信。同源就是域名、协议、端口一致。

### 1. 最常见跨域代码

Access to XMLHttpRequest at `'xxx/lyt-top/vue-next-admin-images/raw/master/menu/adminMenu.json'` from origin `'http://localhost:8888'` has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No `'Access-Control-Allow-Origin'` header is present on the requested resource.

### 2. 跨域处理

- 线上：nginx 配置反向代理

- 本地

::: tip 自定义代理
[server.proxy](https://cn.vitejs.dev/config/server-options.html#server-proxy)，为开发服务器配置自定义代理规则。
:::

解决：查看文章：[vue cli 4.0+ 解决前端跨域问题](https://blog.csdn.net/qq_34450741/article/details/107444815)

源跨域 `api` 代码：

```ts {1}
const url = "https://gitee.com";
/**
 * 获取后端动态路由菜单(admin)
 * @link 参考：https://gitee.com/lyt-top/vue-next-admin-images/tree/master/menu
 * @param params 要传的参数值，非必传
 * @returns 返回接口数据
 */
export function getMenuAdmin(params?: object) {
  return request({
    url: `${url}/lyt-top/vue-next-admin-images/raw/master/menu/adminMenu.json`,
    method: "get",
    params,
  });
}
```

处理跨域后代码：（根目录 [vite.config.ts](https://gitee.com/lyt-top/vue-next-admin/blob/master/vite.config.ts) [server.proxy](https://cn.vitejs.dev/config/server-options.html#server-proxy)，为开发服务器配置自定义代理规则）

```ts {4,18}
// 根目录 vite.config.ts
server: {
  proxy: {
    '/随便定义': {
      target: '填写跨域的目标域名',
      ws: true,
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/随便定义/, ''),
    },
  },
},

// /@/api/menu/index.ts
// 使用 `/随便定义/` 代替 `填写跨域的目标域名`
export function getMenuAdmin(params?: object) {
	return request({
		url: '/随便定义/lyt-top/vue-next-admin-images/raw/master/menu/adminMenu.json',
		method: 'get',
		params,
	});
}
```

## 其它请求示例

### 1. 下载文件

```ts {6}
import request from "/@/utils/request";

// 下载文件
export function downloadFile(params) {
  return request({
    responseType: "blob",
    url: "xxxx",
    method: "get",
    params,
  });
}
```

### 2. 清除请求头 token

```ts
import request from "/@/utils/request";

// 清除请求头 token
export function deleteToken(params) {
  return request({
    transformRequest: [
      (data, headers) => {
        delete headers.Authorization;
        return data;
      },
    ],
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    url: `xxxx/${params.id}`,
    method: "get",
  });
}
```
