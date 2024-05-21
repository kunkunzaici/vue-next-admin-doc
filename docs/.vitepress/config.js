import { defineConfig } from "vitepress";
import mdItCustomAttrs from "markdown-it-custom-attrs";

/**
 * 找不到配置字段，按住 Ctrl + 鼠标移动到对应字段上点击，
 * 去 xxx.d.ts 类型定义文件中找相对应字段
 */
export default defineConfig({
  head: [
    [
      "link",
      { rel: "icon", href: "/vue-next-admin-doc-preview/images/favicon.ico" },
    ],
    [
      "meta",
      {
        name: "keywords",
        content:
          "doc、vue-next-admin、vue-next-admin-doc、vue3、element-plus、vuejs/vue-next",
      },
    ],
    [
      "meta",
      {
        name: "description",
        content:
          "🎉🎉🔥基于vue3.x 、Typescript、vite、Element plus等，适配手机、平板、pc 的后台开源免费模板库（vue2.x请切换vue-prev-admin分支）开发文档",
      },
    ],
    [
      "script",
      {},
      `var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?dd9ada7b25f65a181a42780f04b764e6";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
      `,
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css",
      },
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js",
      },
    ],
  ],
  markdown: {
    config: (md) => {
      md.use(mdItCustomAttrs, "image", {
        "data-fancybox": "gallery",
      });
    },
  },
  title: "vue-next-admin",
  description:
    "🎉🎉🔥基于vue3.x 、Typescript、vite、Element plus等，适配手机、平板、pc 的后台开源免费模板库（vue2.x请切换vue-prev-admin分支）开发文档",
  lang: "zh-CN",
  base: "/vue-next-admin-doc-preview/",
  lastUpdated: true,
  themeConfig: {
    logo: "/images/logo-mini.svg",
    search: true,
    outlineTitle: "导航目录",
    outline: "deep",
    lastUpdatedText: "上次更新",
    editLink: {
      pattern:
        "https://gitee.com/lyt-top/vue-next-admin-doc/edit/master/docs/:path",
      text: "欢迎到 Gitee 上编辑此页",
    },
    author: "lyt_20201208",
    // algolia: {
    //   apiKey: "ef1d5913298c3b377842ab406af9cbf6",
    //   appId: "VZD7WV0OU8",
    //   indexName: "vue-next-admin-doc-preview",
    //   placeholder: "请输入内容...",
    // },
    footer: {
      message: "根据 MIT 许可证发布",
      copyright: "本文档内容版权为 vue-next-admin 作者所有，保留所有权利。",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    nav: [
      { text: "指南", link: "/home/", activeMatch: "/home/" },
      { text: "配置", link: "/config/", activeMatch: "/config/" },
      {
        text: "集成后端",
        items: [
          {
            text: "@zuohuaijun Admin.NET",
            link: "https://gitee.com/zuohuaijun/Admin.NET",
          },
          {
            text: "@熊猫 PandaGoAdmin",
            link: "https://github.com/PandaGoAdmin/PandaX",
          },
          {
            text: "@甜蜜蜜 GoPro平台",
            link: "https://toscode.gitee.com/GionConnection/gopro_free",
          },
          {
            text: "@甜蜜蜜 NiuPi 平台",
            link: "https://gitee.com/GionConnection/niupi-free",
          },
          {
            text: "@游子 GFast-V3",
            link: "https://gitee.com/tiger1103/gfast/tree/os-v3/",
          },
          {
            text: "@diygw.com gw-ui-php",
            link: "https://gitee.com/diygw/diygw-ui-php/",
          },
          {
            text: "@zsvg vboot-net",
            link: "https://gitee.com/zsvg/vboot-net",
          },
          {
            text: "@zsvg vboot-java",
            link: "https://gitee.com/zsvg/vboot-java",
          },
          {
            text: "@青红造了个白 buildadmin",
            link: "https://gitee.com/wonderful-code/buildadmin",
          },
          {
            text: "@Goodwell iotfast(一个开源的物联网平台)",
            link: "https://github.com/xiaodingding/iotfast",
          },
        ],
      },
      {
        text: "演示 & 仓库",
        items: [
          {
            text: "⛱️ 线上演示",
            items: [
              {
                text: "vue3.x 版本预览（vue-next-admin）",
                link: "https://lyt-top.gitee.io/vue-next-admin-preview/#/login",
              },
              {
                text: "vue2.x 版本预览（vue-prev-admin）",
                link: "https://lyt-top.gitee.io/vue-prev-admin-preview/#/login",
              },
              {
                text: "vue3 + uni-app 商城（vue-next-admin-shop）",
                link: "https://lyt-top.gitee.io/vue-next-admin-shop-preview",
              },
            ],
          },
          {
            text: "💒 代码仓库",
            items: [
              {
                text: "gitee（国内：实时更新）",
                link: "https://gitee.com/lyt-top/vue-next-admin",
              },
              {
                text: "github（国外：定期更新）",
                link: "https://github.com/lyt-Top/vue-next-admin",
              },
            ],
          },
        ],
      },
      {
        text: "日志 & 文档",
        items: [
          {
            text: "更新日志",
            link: "https://gitee.com/lyt-top/vue-next-admin/blob/master/CHANGELOG.md",
          },
          {
            text: "文档仓库",
            link: "https://gitee.com/lyt-top/vue-next-admin-doc",
          },
        ],
      },
      {
        text: "合作 & 赞助",
        link: "/support/",
        activeMatch: "/support/",
      },
      {
        text: "商城",
        link: "/shop/",
        activeMatch: "/shop/",
      },
    ],
    sidebar: {
      "/home/": [
        {
          text: "入门须知",
          collapsed: false,
          items: [
            { text: "许可", link: "/home/" },
            { text: "兼容性", link: "/home/compatible/" },
            { text: "适用人群", link: "/home/forPeople/" },
            { text: "学习文档", link: "/home/doc/" },
            { text: "特别鸣谢", link: "/home/thank/" },
          ],
        },
        {
          text: "开发指南",
          collapsed: false,
          items: [
            { text: "介绍", link: "/home/introduce/" },
            { text: "安装", link: "/home/install/" },
            { text: "其它", link: "/home/fast/" },
          ],
        },
        {
          text: "代码规范",
          collapsed: false,
          items: [
            { text: "eslint", link: "/home/eslint/" },
            { text: "prettier", link: "/home/prettier/" },
            { text: "vsCode 配置", link: "/home/vscode/" },
            { text: "git 提交规范", link: "/home/gitPush/" },
          ],
        },
      ],
      "/config/": [
        {
          text: "基础",
          collapsed: false,
          items: [
            { text: "简介", link: "/config/" },
            { text: "菜单配置", link: "/config/menu/" },
            { text: "布局配置", link: "/config/layoutConfig/" },
            { text: "字体图标", link: "/config/iconfont/" },
            { text: "服务端交互", link: "/config/server/" },
            { text: "vuex", link: "/config/vuex/" },
            { text: "打包预览", link: "/config/build/" },
          ],
        },
        {
          text: "高级",
          collapsed: false,
          items: [
            { text: "权限管理", link: "/config/power/" },
            { text: "路由参数", link: "/config/route/" },
            { text: "国际化", link: "/config/i18n/" },
            { text: "标签页", link: "/config/tagsView/" },
            { text: "内置指令", link: "/config/directive/" },
          ],
        },
        {
          text: "其它",
          collapsed: false,
          items: [
            { text: "数据可视化", link: "/config/charts/" },
            { text: "工具类集合", link: "/config/tool/" },
            { text: "第三方插件使用", link: "/config/partyPlug/" },
            { text: "内置插件的使用", link: "/config/builtPlug/" },
            { text: "其它问题", link: "/config/otherIssues/" },
          ],
        },
      ],
      "/shop/": [
        {
          text: "首页",
          collapsed: false,
        },
        {
          text: "分类",
          collapsed: false,
        },
        {
          text: "服务",
          collapsed: false,
        },
        {
          text: "购物车",
          collapsed: false,
        },
        {
          text: "我的",
          collapsed: false,
        },
      ],
    },
  },
});
