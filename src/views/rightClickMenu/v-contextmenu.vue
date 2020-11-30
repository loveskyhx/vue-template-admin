<template>
	<div>
		<div v-contextmenu:contextmenu style="width:500px;height:500px; background:skyblue;" >
			右键点击此区域
		</div>
		<!-- 根组件   v-contextmenu-->
		
		
		<div >
		<v-contextmenu ref="contextmenu"   :disabled='pagedisable' >

			<!--单个菜单，只能在 VContextmenu, VContextmenuSubmenu 和 VContextmenuGroup 下使用-->
			<v-contextmenu-item  @click='clickEvent'  >
				<span>普通菜单</span>
			</v-contextmenu-item>

			<!-- 分割线，:divider='true' 简写divider-->
			<v-contextmenu-item :divider='true'></v-contextmenu-item>

			<!-- 子菜单，可嵌套使用-->
			<v-contextmenu-submenu title="子菜单">
				<v-contextmenu-item>单个菜单</v-contextmenu-item>
				<v-contextmenu-item divider></v-contextmenu-item>
				<v-contextmenu-submenu title="子菜单">
					<v-contextmenu-item>单个菜单</v-contextmenu-item>
				</v-contextmenu-submenu>
			</v-contextmenu-submenu>

			<!-- 分割线，:divider='true' 简写divider-->
			<v-contextmenu-item divider></v-contextmenu-item>

			<!-- 菜组单，嵌套 VContextmenuItem 使用-->
			<v-contextmenu-group :max-width="240">
				<v-contextmenu-item :auto-hide="false">菜单组</v-contextmenu-item>|
				<v-contextmenu-item>菜单组</v-contextmenu-item> |
				<v-contextmenu-item>菜单组</v-contextmenu-item>
			</v-contextmenu-group>
		</v-contextmenu>
		</div>
	</div>

	</div>

</template>
<script>
//右键菜单 npm i -S v-contextmenu
//main函数中导入插件
//import contentmenu from 'v-contextmenu'
//import 'v-contextmenu/dist/index.css'
//Vue.use(contentmenu)	
//v-contextmenu:ref 将对应的ref值绑定在contextmenu上
//this.$refs.contextmenu.方法;使用插件对应的方法
	export default {
		data(){
			return {
             pagedisable:false,
             isShow:false,
			}

		},
		
		//page销毁时触发
		destroyed(){
			  	this.$refs.contextmenu.hideAll();
		
		},
		

		//如果主题路由时动态组件<keep-alive></keep-alive> 调用离开时触发事件 
		 deactivated(){
		 
       		this.$refs.contextmenu.hideAll();

		 },
		
		
		methods: {
			
			
			clickEvent() {
			},
			
			

			
			

			


		}
	}
</script>
<style>
	/*全局修改右键菜单样式*/
	/*.v-contextmenu .v-contextmenu-item:hover {
		background: #f4f5f6;
		border-left: 3px solid #007FFF;
		color: #65778b;
		font-weight: 600;
	}*/
	

</style>