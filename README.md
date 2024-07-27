## 作者

Name: **刘宽 （Eric Liu）**  
Email: **kuan_liu@foxmail.com**

## 介绍

ELEGANT-ADMIN 是基于 Vue 3、TypeScript、Vite、Vue-Router、Pinia、Element Plus、SASS、UNOCSS 等前沿技术开发的后台管理系统模板

## 启动 / 打包

包管理器推荐使用 pnpm

```shell
# 添加依赖
pnpm i

# 开启本地调试服务器
pnpm run dev

# 打包 mode 为 .env 文件后缀，例如 `pnpm run build dev`
pnpm run build <mode>
```

## 账号密码：

可在登录页面控制台查看预览用登录账号密码

## 添加页面

1. 在 `src/views` 中添加页面

2. 在 `src/router/routes.ts` 中添加动态路由和静态路由

## 目录规范

```stylus
├── .vscode
│   └── recommended // 推荐的插件，在插件市场通过 @recommended 搜索
├── public
│   └── favicon.ico // tab 上的图标
├── src
│   ├── api // 业务网络请求
│   ├── assets // 静态资源
│   ├── components // 全局组件
│   ├── hooks // 全局 hook
│   ├── layout // 页面整体布局
│   ├── router // 路由配置
│   ├── store // pinia 状态管理
│   ├── styles // 样式文件
│   ├── types // 全局类型
│   ├── utils // 全局工具
│   ├── views // 页面（视图）组件
│   │   └── xxx // 页面 xxx
│   │       ├── components // 页面内使用的组件
│   │       ├── hooks // 页面内使用的 hook
│   │       ├── utils // 页面内使用的工具
│   │       ├── types // 页面内使用的类型
│   │       └── index.vue // 页面入口组件
│   ├── App.vue // 根组件
│   └── main.ts // 主文件
├── index.html // 入口文件
├── .env.dev // 开发环境下的环境变量
├── .env.release // 测试、生产环境下的环境变量
├── .eslintrc.cjs // eslint 配置
├── .prettierrc.json // prettier 配置
├── .gitignore // 指定哪些文件和目录不应该被 Git 跟踪和版本控制
├── auto-imports.d.ts // 自动导入声明文件
├── components.d.ts // 自动导入声明文件
├── directives.d.ts // 全局导入的指令的声明文件
├── package.json // 项目的配置文件
├── package-lock.json // npm 使用的，记录了当前项目依赖库的精确版本信息
├── pnpm-lock.yaml // pnpm 使用的，记录了当前项目依赖库的精确版本信息
├── tsconfig.app.json
├── tsconfig.json // TypeScript 编译配置文件
├── tsconfig.node.json
└── vite.config.ts // Vite 构建工具的配置
```

1. 通用的 **组件、hooks、工具** 分别放在 `src/components`、`src/hooks`、`src/utils` 目录下
2. 只有当前文件夹使用的 **组件、hooks、工具** 放在当前文件夹下的 `./components`、`./hooks`、`./utils` 文件夹中

### icons

为保证图标样式效果一致可遵循一下做法：

- 菜单栏图标使用 @element-plus/icons-vue 或 https://icones.js.org/collection/mdi
- 主界面图标推荐使用 @ant-design/icons-vue
