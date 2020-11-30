import Main from './views/Main.vue';
import homepage from './views/homepage/homepage.vue';
import intro from './views/noobTutorial/intro.vue';
import table from './views/table/tabledrag.vue';
import tableExport from './views/table/tableExport.vue';
import vchar from './views/v-char/v-char.vue';
import VueQuillEditor from './views/richText/Vue-Quill-Editor.vue';
import menu from './views/MultilevelMenu/menu.vue';
import printPreview from './views/PagePrint/printPreview.vue';
import spellsearch from './views/spellsearch/spellsearch.vue';
import anchor from './views/DynamicAnchor/anchor.vue';
import contextmenu from './views/rightClickMenu/v-contextmenu.vue';

import csstext from './views/Css-vue/css-text.vue';
const routeConfig = [{
		path: '/',
		component: Main,
		redirect: '',
		name: '主题页面',
		children: [{
			path: '/homepage',
			component: homepage,
			redirect: '',
			name: '首页',

		}]
	},


     {
		path: '/',
		component: Main,
		redirect: '',
		name: '基础功能块',
		 children: [{
			path: '/spellsearch',
			component: spellsearch,
			redirect:'',
			name:'拼音简码搜索',
			},
			{
				path: '/anchor',
				component: anchor,
				redirect:'',
				name:'动态锚点',
			}		 
		 ]
	
	
	},


	{
		path: '/',
		component: Main,
		redirect: '',
		name: '表格功能',
		children: [{
			path: '/table',
			component: table,
			redirect: '',
			name: '表格拖拽',
		   },
		
		  {
			path: '/tableExport',
			component: tableExport,
			redirect: '',
			name: '表格导出',
		   },
		
		]
	},

	{
		path: '/',
		component: Main,
		redirect: '',
		name: 'Vue图表',
		children: [{
			path: '/vchar',
			component: vchar,
			redirect: '',
			name: 'vchar',
		}]
	},

	{
		path: '/',
		component: Main,
		redirect: '',
		name: '新手教程',
		children: [{
			path: '/intro',
			component: intro,
			redirect: '',
			name: 'intro',
		}]
	},

	{
		path: '/',
		component: Main,
		redirect: '',
		name: '富文本编辑器',
		children: [{
			path: '/VueQuillEditor',
			component: VueQuillEditor,
			redirect: '',
			name: 'Vue-Quill-Editor',
		}]
	},

	{
		path: '/',
		component: Main,
		redirect: '',
		name: '多级菜单',
		iconCls: "",
		children: [{
			path: '/menu',
			component: menu,
			redirect: '',
			name: '一级菜单',

			children: [{
				path: '/menu',
				component: menu,
				redirect: '',
				name: '二级菜单',
				children: [{
					path: '/menu',
					component: menu,
					redirect: '',
					name: '三级菜单',

				}]

			}]
		}]
	},

	{
		path: '/',
		component: Main,
		redirect: '',
		name: '页面打印',
		iconCls: "",
		children: [{
			path: '/printPreview',
			component: printPreview,
			redirect: '',
			name: '打印预览',
		}]
	},
	
	
		{
		path: '/',
		component: Main,
		redirect:'',
		name: '右键菜单',
		iconCls: "",
		children: [{
			path: '/contextmenu',
			component: contextmenu,
			redirect:'',
			name:'v-contextmenu',
		}]
	},
	{
		path: '/',
		component: Main,
		redirect:'',
		name: 'CSS练习',
		iconCls: "",
		children: [{
			path: '/csstext',
			component: csstext,
			redirect:'',
			name:'CSS',
		}]
	},
	

];
export default routeConfig;