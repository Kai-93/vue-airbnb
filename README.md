# vue-airbnb

> A vue.js project with airbnb

## 脚本说明

``` bash
# 安装依赖
npm install 

# mock环境
## mock环境下的本地服务
npm run local-mock

## 启动 mock server
npm run mock-server

# 本地开发环境
npm start or npm run local

# 开发环境编译代码
npm run build_dev

# 生产环境编译代码
npm run build_prod

```

## 项目结构说明

```
|--- build # webpack配置文件
  |--- build.js 
  |--- webpack.base.conf.js
  |--- webpack.build.conf.js
  |--- webpack.local.conf.js

|--- config # 全局环境变量设置
  |--- index.js
  |--- local.dev.js
  |--- development.env.js
  |--- production.env.js

|--- dist # 编译输出文件
  |--- static # 静态资源
  |--- index.html # 入口html

|--- mock # mock server
  |--- module # 接口数据定义，按模块划分
    |--- module_name.js # 每个模块定义接口的文件
  |--- data.js # 整合接口
  |--- router.js # 组合路由
  |--- server.js # mock server
  
|--- node_modules # 第三方依赖
  |--- ...

|--- src # 业务代码
  |--- api
    |--- module_name # api按模块划分
      |--- ...
    |--- api_module.js # 模块与url映射关系管理
    |--- request.js # 网络请求的底层封装

  |--- assets # 静态资源目录
    |--- ...
  |--- components # 组件
    |--- common # 公共组件
      |--- ...
    |--- module_name # 各模块的业务组件
      |--- ...
  |---  pages # 页面
    |--- module_name # 以模块为单位
      |--- pageName.vue # 页面名字
  |--- router # 路由管理
    |--- index.js # 路由整合并实例化
    |--- module_name.js # 按模块对路由进行划分
  |--- store # 应用状态管理
    |--- store_name # 按状态类型进行管理
      |--- name_action # action定义
      |--- name_getter # getter定义
      |--- name_module # module定义
      |--- name_mutation # mutation定义
      |--- name_state # state定义
    |--- ui_store # ui类管理
    |--- index.js # store整合及注册
  |--- utils # 工具集
    |--- name.js # 具体工具
  |--- filter # 过滤器
    |--- name.js # 具体过滤器
  |--- App.vue # 入口vue文件
  |--- main.js # 入口js文件
  |--- index.html # 入口html

|--- .babelrc # babel 配置
|--- .eslintignore # eslint忽略的文件，及不审查代码的文件
|--- .eslintrc.js # eslint 配置
|--- .gitignore # git忽略的文件
|--- .postcssrc.js # postcss 配置
|--- package-lock.json # 项目依赖版本锁定管理，保证依赖的一致性
|--- package.json # 项目依赖管理
|--- README.md # 本文件，项目说明
|--- tsconfig.json # typescript的配置

```
