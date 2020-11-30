import Vue from 'vue';
import VueRouter from 'vue-router';
import routeConfig from './router-config';
import Vuex from 'vuex';
import store from './vuex/store';
import ElementUI from 'element-ui';
import print from 'print-js';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
//导入vueintro 指令包vueintro的内容时对intro.js 进行封装形成的必须下载intro.js才能运行 npm i vue-introjs npm i intro.js
import VueIntro from 'vue-introjs';
//全局引入新手引导插件的样式表
import 'intro.js/introjs.css';
//导入主题
import '../theme/index.css'

//引入拖拽指令
import dialogDrag from './utils/dialogDrag.js';
//导入font-awesome 字体图标
import 'font-awesome/css/font-awesome.css';
//import jsSortable from 'sortablejs'
import Sortable from 'vue-sortable';
//v-charts图表

import VCharts from 'v-charts';

//部分引入对应要使用的图表
//import VeLine from 'v-charts/lib/line.common'
//引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor';

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'
Vue.use(contentmenu);
Vue.use(VueQuillEditor);
Vue.use(ElementUI,{ size: 'mini' });
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Sortable);
//全局使用指令包
Vue.use(VueIntro);
Vue.use(VCharts);

//定义路由
const router = new VueRouter({
    routes: routeConfig
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
