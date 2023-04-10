1.vue-cli脚手架初始化项目
node + wabpack + 淘宝镜像

node_modules文件夹:项目依赖文件夹

public文件夹：一般放置一些静态资源（图片）需要注意，放在public文件夹中的静态资源，webpack进行打包的时候，会原封不动的打包到dist文件夹中

src文件夹（程序员源代码文件夹）
    
    assets文件夹：一般也是放置静态资源（一般放置多个组件共用的静态资源），需要注意，放置在assets文件夹里面静态资源，在webpack打包的时候，webpack会把静态资源当做一个模块，打包js文件里面

    components文件夹：一般放置的是非路由组件（全局组件）

    App.vue：唯一的根组件，Vue当中的组件（.vue）

    main.js：程序入口文件，也是整个程序当中最先执行的文件
    babel.config.js:配置文件（babel相关）
    package.json文件：认为项目'身份证'，记录项目叫做什么，项目当中有哪些依赖、项目怎么运行

    package-lock.json:缓存性文件
    
    README.md:说明性文件

## 项目准备工作
    项目路由分析
        vue-router
        前端路由是以键值对存在的
        key:路由规则（路由的路径）
        value:路由的根组件    