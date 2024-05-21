import{_ as s}from"./chunks/ccflowRightNextAdmin.31daa2db.js";import{_ as n,c as a,o as l,N as p}from"./chunks/framework.64a771f2.js";const d=JSON.parse('{"title":"简介","description":"","frontmatter":{},"headers":[],"relativePath":"config/index.md","lastUpdated":1677256498000}'),o={name:"config/index.md"},t=p('<h1 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-label="Permalink to &quot;简介&quot;">​</a></h1><div class="tip custom-block"><p class="custom-block-title">项目整体目录结构图介绍：</p><p><a href="https://gitee.com/lyt-top/vue-next-admin/tree/vue-prev-admin/" target="_blank" rel="noreferrer">vue-prev-admin</a> vue2.x 的目录结构也会基于该结构进行修改</p></div><h2 id="长期赞助商" tabindex="-1">长期赞助商 <a class="header-anchor" href="#长期赞助商" aria-label="Permalink to &quot;长期赞助商&quot;">​</a></h2><p>vueNextAdmin 是免费和开源的，由优秀的赞助商提供支持 ❤️。</p><a href="http://www.ccflow.org/" target="_black" class="next-sponsors-item"><img src="'+s+`" alt="驰骋流程+表单+低代码" title="驰骋流程+表单+低代码"></a><h2 id="目录结构图" tabindex="-1">目录结构图 <a class="header-anchor" href="#目录结构图" aria-label="Permalink to &quot;目录结构图&quot;">​</a></h2><p>目录结构将 <code>定期更新</code>。树结构生成 cmd 输入 <code>tree</code> 或 <code>tree /f</code></p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">├── vueNextAdmin</span></span>
<span class="line"><span style="color:#A6ACCD;">	├── </span><span style="color:#82AAFF;">public</span><span style="color:#A6ACCD;"> (存放浏览器标题favicon</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">ico、静态json数据)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│</span></span>
<span class="line"><span style="color:#A6ACCD;">	├── </span><span style="color:#82AAFF;">src</span><span style="color:#A6ACCD;"> (存放视图、工具类、image)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	├── </span><span style="color:#82AAFF;">api</span><span style="color:#A6ACCD;"> (与服务端对接的接口函数定义。建议视图文件夹与api文件夹相同，如login文件夹)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   ├── </span><span style="color:#82AAFF;">login</span><span style="color:#A6ACCD;"> (登录接口函数)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   └── </span><span style="color:#82AAFF;">menu</span><span style="color:#A6ACCD;"> (菜单接口函数)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	├── </span><span style="color:#82AAFF;">assets</span><span style="color:#A6ACCD;"> (本地静态资源：图片、svg等)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	├── </span><span style="color:#82AAFF;">components</span><span style="color:#A6ACCD;"> (存放公用全局组件)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   ├── </span><span style="color:#82AAFF;">auth</span><span style="color:#A6ACCD;"> (鉴权)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   ├── </span><span style="color:#82AAFF;">cropper</span><span style="color:#A6ACCD;"> (裁剪图片)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   ├── </span><span style="color:#82AAFF;">editor</span><span style="color:#A6ACCD;"> (富文本编辑器)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   ├── </span><span style="color:#82AAFF;">iconSelector</span><span style="color:#A6ACCD;"> (图标选择器)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   ├── </span><span style="color:#82AAFF;">noticeBar</span><span style="color:#A6ACCD;"> (滚动通知)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   ├── </span><span style="color:#82AAFF;">svgIcon</span><span style="color:#A6ACCD;"> (自定义封装 svg 图标)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   └── </span><span style="color:#82AAFF;">table</span><span style="color:#A6ACCD;"> (自定义封装 table)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	├── </span><span style="color:#82AAFF;">directive</span><span style="color:#A6ACCD;"> (自定义指令内容)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	├── </span><span style="color:#82AAFF;">i18n</span><span style="color:#A6ACCD;"> (存放框架国际化内容)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   ├── </span><span style="color:#82AAFF;">lang</span><span style="color:#A6ACCD;"> (框架内置国际化)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   └── </span><span style="color:#82AAFF;">pages</span><span style="color:#A6ACCD;"> (自定义国际化)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│       ├── </span><span style="color:#82AAFF;">formI18n</span><span style="color:#A6ACCD;"> (表单)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│       ├── </span><span style="color:#82AAFF;">home</span><span style="color:#A6ACCD;"> (首页)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│       └── </span><span style="color:#82AAFF;">login</span><span style="color:#A6ACCD;"> (登录页)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	├── </span><span style="color:#82AAFF;">layout</span><span style="color:#A6ACCD;"> (存放框架布局视图)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   ├── </span><span style="color:#82AAFF;">component</span><span style="color:#A6ACCD;"> (布局公用组件)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   ├── </span><span style="color:#82AAFF;">footer</span><span style="color:#A6ACCD;"> (页脚)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   ├── </span><span style="color:#82AAFF;">lockScreen</span><span style="color:#A6ACCD;"> (锁屏)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   ├── </span><span style="color:#82AAFF;">logo</span><span style="color:#A6ACCD;"> (logo)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   ├── </span><span style="color:#82AAFF;">main</span><span style="color:#A6ACCD;"> (主布局)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   ├── </span><span style="color:#82AAFF;">navBars</span><span style="color:#A6ACCD;"> (顶栏信息)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   │   ├── </span><span style="color:#82AAFF;">topBar</span><span style="color:#A6ACCD;"> (面包屑、关闭全屏、菜单搜索、布局配置、用户信息、消息通知)，（v2</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">4</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">33版本改）</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   │   └── </span><span style="color:#82AAFF;">tagsView</span><span style="color:#A6ACCD;"> (标签页)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   ├── </span><span style="color:#82AAFF;">navMenu</span><span style="color:#A6ACCD;"> (导航菜单)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   ├── </span><span style="color:#82AAFF;">routerView</span><span style="color:#A6ACCD;"> (路由视图出口、外链、iframe内嵌)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   ├── </span><span style="color:#82AAFF;">upgrade</span><span style="color:#A6ACCD;"> (版本升级提示组件)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   └── </span><span style="color:#82AAFF;">sponsors</span><span style="color:#A6ACCD;"> (赞助商组件)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	├── </span><span style="color:#82AAFF;">mock</span><span style="color:#A6ACCD;"> (存放模拟数据，非mock</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">js。用于城市多级联动)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	├── </span><span style="color:#82AAFF;">router</span><span style="color:#A6ACCD;"> (存放路由信息)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	├── </span><span style="color:#82AAFF;">stores</span><span style="color:#A6ACCD;"> (存放组件的状态 pinia)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	├── </span><span style="color:#82AAFF;">theme</span><span style="color:#A6ACCD;"> (存放框架样式)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   ├── </span><span style="color:#82AAFF;">common</span><span style="color:#A6ACCD;"> (基础样式)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   ├── </span><span style="color:#82AAFF;">media</span><span style="color:#A6ACCD;"> (媒体查询)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   └── </span><span style="color:#82AAFF;">mixins</span><span style="color:#A6ACCD;"> (scss混入)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	├── </span><span style="color:#82AAFF;">types</span><span style="color:#A6ACCD;"> (ts 类型定义文件)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   ├── axios</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">d</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">ts</span><span style="color:#A6ACCD;"> (扩展 axios 数据返回类型，可自行扩展)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   ├── global</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">d</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">ts</span><span style="color:#A6ACCD;"> (全局 ts 类型定义申明)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   ├── layout</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">d</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">ts</span><span style="color:#A6ACCD;"> (layout 布局 ts 类型定义申明)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   ├── mitt</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">d</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">ts</span><span style="color:#A6ACCD;"> (mitt 事件总线 ts 类型定义申明)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   ├── pinia</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">d</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">ts</span><span style="color:#A6ACCD;"> (pinia ts 类型定义申明)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│   └── views</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">d</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">ts</span><span style="color:#A6ACCD;"> (views 视图各界面 ts 类型定义申明)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	├── </span><span style="color:#82AAFF;">utils</span><span style="color:#A6ACCD;"> (存放工具类函数)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	│</span></span>
<span class="line"><span style="color:#A6ACCD;">	│	└── </span><span style="color:#82AAFF;">views</span><span style="color:#A6ACCD;"> (存放页面视图)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			├── </span><span style="color:#82AAFF;">chart</span><span style="color:#A6ACCD;"> (大数据图表演示)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			├── </span><span style="color:#82AAFF;">error</span><span style="color:#A6ACCD;"> (</span><span style="color:#F78C6C;">404</span><span style="color:#A6ACCD;">、</span><span style="color:#F78C6C;">401</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			├── </span><span style="color:#82AAFF;">fun</span><span style="color:#A6ACCD;"> (功能演示)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">clipboard</span><span style="color:#A6ACCD;"> (复制剪切)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">countup</span><span style="color:#A6ACCD;"> (countup 数字滚动)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">cropper</span><span style="color:#A6ACCD;"> (cropper 图片裁剪)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">echartsMap</span><span style="color:#A6ACCD;"> (地理坐标</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">地图)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">gridLayout</span><span style="color:#A6ACCD;"> (拖拽布局)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">printJs</span><span style="color:#A6ACCD;"> (页面打印)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">qrcode</span><span style="color:#A6ACCD;"> (qrcode 二维码生成)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">splitpanes</span><span style="color:#A6ACCD;"> (窗格拆分器)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">tagsView</span><span style="color:#A6ACCD;"> (tagsView 操作)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   └── </span><span style="color:#82AAFF;">wangEditor</span><span style="color:#A6ACCD;"> (wangEditor 编辑器)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			├── </span><span style="color:#82AAFF;">home</span><span style="color:#A6ACCD;"> (首页)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			├── </span><span style="color:#82AAFF;">limits</span><span style="color:#A6ACCD;"> (权限管理演示)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">backEnd</span><span style="color:#A6ACCD;"> (后端控制)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   │   └── </span><span style="color:#82AAFF;">page</span><span style="color:#A6ACCD;"> (页面权限)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   └── </span><span style="color:#82AAFF;">frontEnd</span><span style="color:#A6ACCD;"> (前端控制)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│       ├── </span><span style="color:#82AAFF;">btn</span><span style="color:#A6ACCD;"> (按钮权限)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│       └── </span><span style="color:#82AAFF;">page</span><span style="color:#A6ACCD;"> (页面权限)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			├── </span><span style="color:#82AAFF;">login</span><span style="color:#A6ACCD;"> (登录界面)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   └── </span><span style="color:#82AAFF;">component</span><span style="color:#A6ACCD;"> (登录界面组件)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			├── </span><span style="color:#82AAFF;">menu</span><span style="color:#A6ACCD;"> (菜单嵌套演示)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│  ├── </span><span style="color:#82AAFF;">menu1</span><span style="color:#A6ACCD;"> (menu1)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│  │  ├── </span><span style="color:#82AAFF;">menu11</span><span style="color:#A6ACCD;"> (menu11)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│  │  ├── </span><span style="color:#82AAFF;">menu12</span><span style="color:#A6ACCD;"> (menu12)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│  │  │   ├── </span><span style="color:#82AAFF;">menu121</span><span style="color:#A6ACCD;"> (menu121)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│  │  │   └── </span><span style="color:#82AAFF;">menu122</span><span style="color:#A6ACCD;"> (menu122)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│  │  └── </span><span style="color:#82AAFF;">menu13</span><span style="color:#A6ACCD;"> (menu13)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│  └──  </span><span style="color:#82AAFF;">menu2</span><span style="color:#A6ACCD;"> (menu2)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			├── </span><span style="color:#82AAFF;">pages</span><span style="color:#A6ACCD;"> (页面演示)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">awesome</span><span style="color:#A6ACCD;"> (awesome 字体图标)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">drag</span><span style="color:#A6ACCD;"> (拖动指令)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">dynamicForm</span><span style="color:#A6ACCD;"> (动态复杂表单)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">element</span><span style="color:#A6ACCD;"> (element 字体图标)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">filtering</span><span style="color:#A6ACCD;"> (过滤筛选组件)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">formAdapt</span><span style="color:#A6ACCD;"> (表单自适应)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">formI18n</span><span style="color:#A6ACCD;"> (表单国际化)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">formRules</span><span style="color:#A6ACCD;"> (多表单验证)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   │   └── </span><span style="color:#82AAFF;">component</span><span style="color:#A6ACCD;"> (多表单验证各组件)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">iocnfont</span><span style="color:#A6ACCD;"> (iconfont 字体图标)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">lazyImg</span><span style="color:#A6ACCD;"> (图片懒加载)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">listAdapt</span><span style="color:#A6ACCD;"> (列表自适应)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">preview</span><span style="color:#A6ACCD;"> (大图预览)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">steps</span><span style="color:#A6ACCD;"> (步骤条)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">tableRules</span><span style="color:#A6ACCD;"> (表单表格验证)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">tree</span><span style="color:#A6ACCD;"> (树形改表格)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">waterfall</span><span style="color:#A6ACCD;"> (瀑布屏)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   └── </span><span style="color:#82AAFF;">workflow</span><span style="color:#A6ACCD;"> (工作流)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│       └── </span><span style="color:#82AAFF;">component</span><span style="color:#A6ACCD;"> (工作流组件)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│           ├── </span><span style="color:#82AAFF;">contextmenu</span><span style="color:#A6ACCD;"> (工作流右键菜单)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│           └── </span><span style="color:#82AAFF;">drawer</span><span style="color:#A6ACCD;"> (工作流拖拽组件)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			├── </span><span style="color:#82AAFF;">make</span><span style="color:#A6ACCD;"> (组件封装)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">selector</span><span style="color:#A6ACCD;"> (图标选择器)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">noticeBar</span><span style="color:#A6ACCD;"> (滚动通知栏)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">svgDemo</span><span style="color:#A6ACCD;"> (svg 演示)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   └── </span><span style="color:#82AAFF;">tableDemo</span><span style="color:#A6ACCD;"> (自定义封装 table)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			├── </span><span style="color:#82AAFF;">params</span><span style="color:#A6ACCD;"> (路由参数演示)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">common</span><span style="color:#A6ACCD;"> (普通路由)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   └── </span><span style="color:#82AAFF;">dynamic</span><span style="color:#A6ACCD;"> (动态路由)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			├── </span><span style="color:#82AAFF;">personal</span><span style="color:#A6ACCD;"> (个人中心)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			├── </span><span style="color:#82AAFF;">system</span><span style="color:#A6ACCD;"> (系统设置)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   ├── </span><span style="color:#82AAFF;">menu</span><span style="color:#A6ACCD;"> (菜单管理)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   │   └── </span><span style="color:#82AAFF;">component</span><span style="color:#A6ACCD;"> (菜单管理组件)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			│   └── </span><span style="color:#82AAFF;">user</span><span style="color:#A6ACCD;"> (用户管理)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			├── </span><span style="color:#82AAFF;">tools</span><span style="color:#A6ACCD;"> (工具类集合)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│			└── </span><span style="color:#82AAFF;">visualizing</span><span style="color:#A6ACCD;"> (数据可视化)</span></span>
<span class="line"><span style="color:#A6ACCD;">	│</span></span>
<span class="line"><span style="color:#A6ACCD;">	├── </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">env</span><span style="color:#A6ACCD;"> (全局默认配置文件，无论什么环境都会加载合并)</span></span>
<span class="line"><span style="color:#A6ACCD;">	├── </span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">env</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">development</span><span style="color:#A6ACCD;"> (开发环境的配置文件)</span></span>
<span class="line"><span style="color:#A6ACCD;">	├── </span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">env</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">production</span><span style="color:#A6ACCD;"> (生产环境的配置文件)</span></span>
<span class="line"><span style="color:#A6ACCD;">	├── </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">eslintignore</span><span style="color:#A6ACCD;"> (eslint忽略配置)</span></span>
<span class="line"><span style="color:#A6ACCD;">	├── </span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">eslintrc</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">js</span><span style="color:#A6ACCD;"> (eslint配置)</span></span>
<span class="line"><span style="color:#A6ACCD;">	├── </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">gitignore</span><span style="color:#A6ACCD;"> (git提交忽略配置)</span></span>
<span class="line"><span style="color:#A6ACCD;">	├── </span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prettierrc</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">js</span><span style="color:#A6ACCD;"> (prettier代码格式化配置)</span></span>
<span class="line"><span style="color:#A6ACCD;">	├── CHANGELOG</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">md</span><span style="color:#A6ACCD;"> (框架更新日志)</span></span>
<span class="line"><span style="color:#A6ACCD;">	├── index</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">html</span><span style="color:#A6ACCD;"> (用户页面访问入口)</span></span>
<span class="line"><span style="color:#A6ACCD;">	├── </span><span style="color:#82AAFF;">LICENSE</span><span style="color:#A6ACCD;"> (开源许可证)</span></span>
<span class="line"><span style="color:#A6ACCD;">	├── </span><span style="color:#89DDFF;font-style:italic;">package</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">lock</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">json</span><span style="color:#A6ACCD;"> (npm锁定安装时的包的版本号)</span></span>
<span class="line"><span style="color:#A6ACCD;">	├── package</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">json</span><span style="color:#A6ACCD;"> (包的依赖管理配置文件)</span></span>
<span class="line"><span style="color:#A6ACCD;">	├── README</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">md</span><span style="color:#A6ACCD;"> (框架介绍文件)</span></span>
<span class="line"><span style="color:#A6ACCD;">	├── tsconfig</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">json</span><span style="color:#A6ACCD;"> (ts配置文件)</span></span>
<span class="line"><span style="color:#A6ACCD;">	└── vite</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">config</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">ts</span><span style="color:#A6ACCD;"> (vite配置文件)</span></span>
<span class="line"></span></code></pre></div><h2 id="仓库代码各分支说明-后续将添加更多分支" tabindex="-1">仓库代码各分支说明（后续将添加更多分支） <a class="header-anchor" href="#仓库代码各分支说明-后续将添加更多分支" aria-label="Permalink to &quot;仓库代码各分支说明（后续将添加更多分支）&quot;">​</a></h2><p>项目切换分支后，README.md 文件内容都会不一样，请注意看 README.md 文件中的第一项 介绍 内容，会大概介绍当前分支是干啥的。<code>基础版同步 master 分支主版本</code></p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">├── vueNextAdmin</span></span>
<span class="line"><span style="color:#A6ACCD;">	├── </span><span style="color:#82AAFF;">master</span><span style="color:#A6ACCD;"> (基于 vue3</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">x、vite、ts、Element plus等，主项目模板)</span></span>
<span class="line"><span style="color:#A6ACCD;">	├── </span><span style="color:#82AAFF;">develop</span><span style="color:#A6ACCD;"> (开发分支，开发完将删除)</span></span>
<span class="line"><span style="color:#A6ACCD;">	├── vue</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">prev</span><span style="color:#89DDFF;">-</span><span style="color:#82AAFF;">admin</span><span style="color:#A6ACCD;"> (基于 vue2</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">x、vue</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">cli、element ui 项目模板)</span></span>
<span class="line"><span style="color:#A6ACCD;">	├── vue</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">next</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">admin</span><span style="color:#89DDFF;">-</span><span style="color:#82AAFF;">template</span><span style="color:#A6ACCD;"> (vue</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">next</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">admin 基础版 ts，不带国际化)</span></span>
<span class="line"><span style="color:#A6ACCD;">	├── vue</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">next</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">admin</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">template</span><span style="color:#89DDFF;">-</span><span style="color:#82AAFF;">js</span><span style="color:#A6ACCD;"> (基于 vue</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">next</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">admin</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">template 修改 js 版，不带国际化)</span></span>
<span class="line"><span style="color:#A6ACCD;">	├── vue</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">next</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">admin</span><span style="color:#89DDFF;">-</span><span style="color:#82AAFF;">nest</span><span style="color:#A6ACCD;"> (基于 nestjs</span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;">vue</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">next</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">admin 开发的权限控制系统（带后台@甜蜜蜜）)</span></span>
<span class="line"><span style="color:#A6ACCD;">	├── vue</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">next</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">admin</span><span style="color:#89DDFF;">-</span><span style="color:#82AAFF;">mould</span><span style="color:#A6ACCD;"> (基于 vue3</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">x、vite、ts 配置了 eslint、prettier 通用项目模板)</span></span>
<span class="line"><span style="color:#A6ACCD;">	├── </span><span style="color:#82AAFF;">electron</span><span style="color:#A6ACCD;"> (跨平台的桌面应用程序)</span></span>
<span class="line"><span style="color:#A6ACCD;">	└── </span><span style="color:#82AAFF;">personal</span><span style="color:#A6ACCD;"> ( personal</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">个人项目)</span></span>
<span class="line"></span></code></pre></div>`,11),e=[t];function A(c,C,r,y,D,F){return l(),a("div",null,e)}const u=n(o,[["render",A]]);export{d as __pageData,u as default};
