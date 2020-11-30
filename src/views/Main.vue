<template>
	<div class="box">
		<el-container>
			<!--头部-->
			<el-header class="header" height='51px'>
				<span class="font-span"><i class="fa fa-hospital-o" aria-hidden="true"></i></span>
				<transition name="fade" mode="out-in">
					<span v-show="!isCollapse" class="font-span"> 后台管理系统</span>
				</transition>

				<fullScreen class='device'></fullScreen>
				<ThemePicker class='deviceTwo'></ThemePicker>


				<el-dropdown trigger="hover" @command="handleCommand" placement="bottom" @visible-change='menustate' class='dropdown'>
					<p class="loginCont"><span style="font-weight: 600;">{{adminName}}</span>
						<span class="circle">
							<i class="el-icon-caret-top" ref='exiticon'></i>
						</span>
					</p>
					<el-dropdown-menu slot="dropdown" style='width: 120px;'>
						<el-dropdown-item command="2">
							<el-row type="flex" justify="center">
								<el-col :span='4'>
									<i class="fa fa-power-off" aria-hidden="true"></i>
								</el-col>
								<el-col :span='15'>
									退出系统
								</el-col>
							</el-row>
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>

			</el-header>

			<!--身体-->
			<el-container class='content'>
				<!--导航菜单-->
				<el-aside class='aside container' width='auto'>
					<div class='asidIconBac'>
						<i class="fa fa-outdent" aria-hidden="true" id='iconstyle' v-if="!isCollapse" @click="openaside"></i>
						<i class="fa fa-indent" aria-hidden="true" id='iconstyle' v-else @click="openaside"></i>
					</div>

					<el-menu class="el-menu-vertical-demo" :default-active="$route.path" background-color="#f8f9fb" :collapse="isCollapse"
					 active-text-color="#409EFF" router @select='handleSelect' unique-opened>
						<!--unique-opened 多级菜单切换或收起时有问题-->
						<template>
							<navMenu :list="menulist" ref='dom'></navMenu>
						</template>
					</el-menu>
				</el-aside>

				<!--主题内容区域-->
				<el-container class='maincontainer'>
					<!--多标签模式-->
					<el-header height='44px' class='mainheader'>
						<div>
							<el-tabs v-model="editableTabsValue" type="card" @tab-click='clickTab' @tab-remove="removeTab">
								<el-tab-pane name="1" :key="1">
									<span slot="label"><i class="fa fa-home" aria-hidden="true"></i> 首页</span>
								</el-tab-pane>
								<el-tab-pane closable v-for="(item, index) in editableTabs" :key="item.name" :label="item.title" :name="item.name">
								</el-tab-pane>
							</el-tabs>
						</div>

						<div class='mainheadertab'>
							<el-popover placement="top" width="150px" v-model="visible">
								<p style="text-align: center;">是否清空所有标签页？</p>
								<div>
									<el-button type="primary" size="mini" @click="cleartab">确定</el-button>
									<el-button size="mini" type="text" @click="visible = false">取消</el-button>
								</div>
								<el-button class='closetab' slot="reference">
									<i class="el-icon-circle-close-outline"></i>
								</el-button>
							</el-popover>
						</div>
					</el-header>
					<!--多标签模式-->
					<el-main class='container'>
						<transition name="fade" mode="out-in">
							<keep-alive>
								<router-view></router-view>
							</keep-alive>
						</transition>
					</el-main>
				</el-container>
				<!--主题内容区域-->
			</el-container>
			<!--尾部-->
			<el-footer class="footer" height='23px'>
				<a><i class="fa fa-github hubstyle" ></i></a>
			</el-footer>
		</el-container>


	</div>
</template>
<script>
	import {
		mapActions
	} from 'vuex';
	import navMenu from "../Components/navMenu/navMenu.vue";
	import fullScreen from "../Components/fullScreen/fullScreen.vue";
	import menuTempJson from "../Components/navMenu/menuTemp.json";
	import ThemePicker from "../Components/ColorPicker/ThemePicker.vue";
	export default {
		components: {
			navMenu,
			fullScreen,
			ThemePicker
		},
		data() {
			return {
				//配置菜单数据
				menulist: [],
				//全部关闭按钮的弹出框
				visible: false,
				editableTabsValue: '1',
				editableTabs: [],
				tabIndex: 1,
				//全部路由的地址和名字
				routerarray: [],
				//贮存对应的路由值
				routerdata: [],
				//管理员名字
				adminName: '华兴',
				//控制默认时展开还是收缩true收缩false展开
				isCollapse: false,
				//控制侧边栏右箭头的显示和隐藏
				menuTempflag: false,

			};
		},
		//监听
		watch: {},
		//钩子函数
		mounted() {
			//导入自定义的菜单Json数据  正常情况时从后台接口获取 这里我们模拟了后台的数据 
			//除了tree的顶部和尾部不加此对象其他位置都要加 iconright用于控制收起的右箭头
			this.menulist = menuTempJson;
			this.routerarray = this.$router.options.routes;
			this.parsetree(this.routerarray);
			this.$router.push({
				path: '/homepage',
			})

			window.L2Dwidget.init()
		},
		//挂载到全局 刷新就触发
		methods: {
			...mapActions([
				'getDictionary', // 将 `this.getDictionary()` 映射为 `this.$store.dispatch('getDictionary')`
			]),
			//控制侧边栏收缩
			openaside() {
				if (this.isCollapse == true) {
					//true显示  false隐藏
					this.menuTempflag = false;
					this.menuTempParsetree(this.menulist);
					for (var val of this.menulist) {
						val.level = null;
					}
				} else {
					this.menuTempflag = true;
					this.menuTempParsetree(this.menulist, true);

					for (var val of this.menulist) {
						val.level = 1;
					}
				}



				this.isCollapse == true ? this.isCollapse = false : this.isCollapse = true;
			},


			//设置图标的动画效果
			menustate(flag) {
				if (flag == true) {
					this.$refs.exiticon.style.transition = 'transform .5s';
					this.$refs.exiticon.style.transform = 'rotate(180deg)';
				} else {
					this.$refs.exiticon.style.transition = 'transform .5s';
					this.$refs.exiticon.style.transform = 'rotate(0deg)';
				}
			},


			handleCommand(command) {

			},

			handleSelect(key, keyPath) {
				this.$nextTick(() => {
					this.addTab(this.$route.name);
				})

			},

			addTab(targetName) {
				//如果点击首页的话 就不创建新的标签页了
				if (targetName == '首页') {
					this.editableTabsValue = '1';
				} else {
					var flag = true;
					for (var a = 0; a < this.editableTabs.length; a++) {
						if (targetName == this.editableTabs[a].title) {
							this.editableTabsValue = targetName;
							flag = false;
							break;
						}
					}

					if (flag == true) {
						this.editableTabs.push({
							title: targetName,
							name: targetName,
						});
						this.editableTabsValue = targetName;
					}
				}
			},
			removeTab(targetName) {
				let tabs = this.editableTabs;
				let activeName = this.editableTabsValue;
				if (activeName === targetName) {
					tabs.forEach((tab, index) => {
						if (tab.name === targetName) {
							let nextTab = tabs[index + 1] || tabs[index - 1];
							if (nextTab) {
								activeName = nextTab.name;
								for (var a = 0; a < this.routerdata.length; a++) {
									if (activeName == this.routerdata[a].name) {
										this.$router.push({
											path: this.routerdata[a].path,
										})
									}
								}
							}
						}
					});
				}

				this.editableTabsValue = activeName;
				this.editableTabs = tabs.filter(tab => tab.name !== targetName);
				if (this.editableTabs.length == 0) {
					this.editableTabsValue = '1';
					this.$router.push({
						path: '/homepage',
					})
				}

			},

			clickTab(tab) {
				for (var a = 0; a < this.routerdata.length; a++) {
					if (tab.label == this.routerdata[a].name) {
						this.$router.push({
							path: this.routerdata[a].path,
						})
					} else if (tab.label == undefined) {
						this.$router.push({
							path: '/homepage',
						})

					}
				}

			},

			//递归解析树
			parsetree(data) {
				for (var a = 0; a < data.length; a++) {
					if (data[a].children != undefined && data[a].children.length > 0) {
						this.parsetree(data[a].children);
					}
					this.routerdata.push({
						name: data[a].name,
						path: data[a].path,
					})
				}

			},

			//递归menuTemp生成右侧菜单
			menuTempParsetree(data) {
				for (var a = 0; a < data.length; a++) {
					if (data[a].children != undefined && data[a].children.length > 0) {
						this.menuTempParsetree(data[a].children);
					}
					if (data[a].iconright != undefined) {
						if (this.menuTempflag == true) {
							//定义右侧菜单的样式
							data[a].iconright = 'el-icon-caret-right';
						} else {
							//将有右侧菜单置为空
							data[a].iconright = '';
						}
					}


				}

			},



			//清空标签页
			cleartab() {
				this.visible = false;
				this.editableTabs = [];
				this.editableTabsValue = '1';
				this.$router.push({
					path: '/homepage',
				})
			},

		},

	}
</script>
<style lang="less">
	@import "../less/main.less";

	body {
		margin: 0px;
		padding: 0px;
	}

	.font-span {
		font-size: 23px;
		position: relative;
		top: 5px;
		left: 4.5px;
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;

		i {
			font-size: 18px;
			text-align: center;
			width: 24px;
			color: #606266;
		}
	}

	.el-submenu__title i {
		font-size: 18px;
		text-align: center;
		width: 24px;
	}

	#iconstyle:hover {
		opacity: 0.5;
		cursor: pointer;
	}

	.device {
		position: absolute;
		top: 10px;
		right: 200px;
	}
	.deviceTwo {
		position: absolute;
		top: 12px;
		right: 150px;
	}
	.hubstyle{
		font-size: 22px;
		vertical-align: middle;
	}
</style>
