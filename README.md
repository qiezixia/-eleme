# my-project

> vue2 + VUE-路由器2 + ES6 + axios的WebPack高仿饿了h5,采用网易的做法适应不同屏幕，使用sass实现样式，对axios的get和post请求进行了封装，包含了http请求的拦截和路由拦截内容

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

#目录结构
├── build              // 构建服务和webpack配置
├── config             // 项目不同环境的配置
├── dist               // 项目build目录
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── src                // 生产目录
│   ├── assets         // 图片资源
│   ├── axios          // 封装get、post和api接口
│   ├── common         // 公共的css js资源
│   ├── components     // 各种组件
│   ├── router         // 路由
│   ├── App.vue        // 主页面 
│   └── main.js        // Webpack 预编译入口

#实现的功能
1、商品滚动 ，商品滚轮滚动
2、商品联动
3、加入购物车，移除购物车
4、显示评论 评论筛选
5、图片左右滑动
6、日期过滤器
7、路由拦截和htt拦截
商品详情 父子组件的通信
等等


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
