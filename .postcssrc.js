module.exports = {
  plugins: {
    'postcss-pxtorem': {
      //设计稿1rem的大小
      //vant组件库是根据37.5
      //如果是vant组件 就返回37.5，如果不是返回75
      rootValue: (module) => (/vant/gi.test(module.file) ? 37.5 : 75),
      //适配的属性
      propList: ['*'],
      //配置不要转换的样式资源
      exclude: 'github-markdown'
    }
  }
}
// 移动端适配
// 1. rem动态
//   - amfe-flexible
//   - 不管处于什么分辨率, 1rem始终是 1/10视口大小

// 2. 将px --> rem
//  - postcss-pxtorem
//  - vant官网
//  - 版本是5.1.1
