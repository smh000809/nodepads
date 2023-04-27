import DefaultTheme from "vitepress/theme";
import "./assets/style.min.css";

export default {
  ...DefaultTheme,
  // 注册全局组件
  enhanceApp({app}) {
    // app.component('VueClickAwayExample', VueClickAwayExample)
  },
};
