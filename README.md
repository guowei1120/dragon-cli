# dragon-cli

#### 一、代码风格校验配置

- [x] editotconfig 配置
- [x] pretierrc 配置
- [x] eslint 配置
- [x] stylelint 配置
- [x] git 代码提交校验

#### 二、webpack 打包配置

- [x] 支持 postcss  实现 css 模块化、css 压缩、以及 css 前缀自动补全
- [x] 支持 less
- [x] 默认 CSS 样式去除
- [x] 支持 babel 代码转译
- [x] 开发环境 devServer 配置以及热模块替换
- [x] 支持图片、字体等资源文件的打包
- [x] 支持 typescript
- [x] 添加 devtool 工具

  - 开发环境:
    - eval 指向编译后的代码，不能正确的显示行数
    - eval-source-map 指向源代码,能够正确的指向到错误行（推荐开发环境使用）
    - eval-cheap-source-map 指向编译后的代码，能正确的显示行数
    - eval-cheap-module-source-map 指向源代码,不能正确指向错误行数
  - 生产环境：
    - 不启用 source-map

- [x] react HMR 局部刷新
- [x] 解析别名配置，方便资源的导入（@@）

- [x] typescript 类型检测
- [x] 代码 tree shaking
- [x] 添加环境变量支持，根据环境变量配置启用不同插件
- [x] 公共代码以及业务代码的拆分
- [x] 根据环境配置不同 sourcemap
- [x] 开发环境接口跨域处理
- [x] 生产环境代码压缩配置
- [x] 添加开发环境 debug 工具
- [x] 添加页面环境访问
- [x] 根据环境动态获取配置参数 
- [x] 支持 react 懒加载

#### 三、webpack 优化

- [x] 转译 js 时，配置 exclude 排除 node_modules 模块
- [x] babel-loader 转译代码时候，配置 cacheDirectory 进行缓存。（其他性能开销大的 loader 可以使用 cache-loader 进行缓存）
- [x] 使用 thread-loader 启动多进程的打包编辑，提高打包速度
- [x] 开启 JS 多进程压缩，Webpack 默认使用的是 TerserWebpackPlugin，默认就开启了多进程和缓存
- [x] 如果一些第三方模块没有 AMD/CommonJS 规范版本，可以使用 noParse 来标识这个模块，这样 Webpack 会引入这些模块，但是不进行转化和解析，从而提升 Webpack 的构建性能
- [x] 使用 externals 去除一些不经常变动的包的引用，如 react、react-dom 等，将这些资源使用 cdn 引入
- [x] 小图片转换成 base64 图片(这里配置的是 3kb 以下)
- [ ] 使用 DllPlugin 进行一些 bundles 拆分
- [x] 配置 optimization.splitChunks，抽离公共代码

#### 四、项目改造成脚手架

- [ ] 生成移动端项目目录
  - [ ] 自动引入 antd-mobile，并支持按需引入打包
