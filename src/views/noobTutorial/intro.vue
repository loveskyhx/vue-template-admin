<template>
	<div>
		<h1 style="text-align: center;">教程用例</h1>
		<!--v-intro指令 描述步骤内容    v-intro-step设置当前是第几部-->
		<el-form ref="form" :model="form" label-width="80px" style='width: 600px;margin: 0 auto;' >
			<el-form-item label="活动名称" v-intro="'请填写活动名称 我是第一步'" v-intro-step="1">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="活动区域" v-intro="'请填写活动区域 我是第二步'" v-intro-step="2">
				<el-input v-model="input" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="活动时间" v-intro="'请填写活动时间 我是第三步'" v-intro-step="3">
				<el-col :span="11">
					<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
				</el-col>
				<el-col class="line" :span="2">-</el-col>
				<el-col :span="11">
					<el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
				</el-col>
			</el-form-item>
			<el-form-item label="即时配送">
				<el-switch v-model="form.delivery"></el-switch>
			</el-form-item>
			<el-form-item label="活动性质" v-intro="'请选择性质时间 我是第四步'" v-intro-step="4">
				<el-checkbox-group v-model="form.type">
					<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
					<el-checkbox label="地推活动" name="type"></el-checkbox>
					<el-checkbox label="线下主题活动" name="type"></el-checkbox>
					<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="特殊资源" v-intro="'请选择特殊资源 我是第五步 </br> 教程结束了感谢您的使用😀 </br>希望我们下次还能再见面'" v-intro-step="5">
				<el-radio-group v-model="form.resource">
					<el-radio label="线上品牌商赞助"></el-radio>
					<el-radio label="线下场地免费"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="活动形式">
				<el-input type="textarea" v-model="form.desc"></el-input>
			</el-form-item>
			<el-form-item >
				<el-button type="primary" @click="openintro">开启教材</el-button>
				<el-button type="primary" @click='jumpintro'>直接跳转到第三步</el-button>
			</el-form-item>
		</el-form>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				input:'',
				form: {
					//用于控制是否 点击内容外退出遮罩
					maskflag: false,
					//<--表单内容-->
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
					//<--表单内容-->
				}
			}
		},
		methods: {
			openintro() {
				//setopction  intro进行配置 下列是常用的配置
				this.$intro().setOptions({
					//配置上一步按钮
					'prevLabel': '<i class="el-icon-caret-left"></i>上一步',
					//是否在在第一步中隐藏上一个按钮否则,默认是false
					'hidePrev':false,
					//配置下一步按钮
					'nextLabel': '下一步 <i class="el-icon-caret-right"></i>',
					//是否在在第最后一步中隐藏下一个按钮,默认是false
					'hideNext':false,	
					//配置跳过按钮
					'skipLabel': '退出教程',
					//配置全部步骤完成后的按钮
					'doneLabel': '完成教程',
					//Esc键是否可以退出验证
					'exitOnEsc': true,
					//是否开启键盘导航 使用左右方向键能控制步骤的增减
					'keyboardNavigation': true,
					//是否显示进度条
					'showProgress': true,
					//如果它位于视口之外，则自动滚动到突出显示的元素
					'scrollToElement': true,
					
				//下面是常用事件的回调方法	
				})
				//事件结束退出遮罩
				.oncomplete(function(){
					this.maskflag = true;
				})
				//esc键触发事件
				.onexit(function(targetElement){
					this.maskflag = true;			
				})
				//该方法返回true则同意遮罩退出false阻止遮罩退出
				.onbeforeexit(function() {
					if(this.maskflag == true) {
						return true;
					} else {
						return false;
					}
				})
				//页面发生变化时触发该事件 回调函数接收新步骤的元素作为参数
				.onchange(function(targetElement) {
				})
				//start()开启当前遮罩
				.start();
			},

			jumpintro() {
				//条转到第几步 参数就是步骤
				this.$intro().goToStepNumber(3).start();
			}
		}
	}
</script>

<style>

</style>