<template>
	<div id="scrollbox"  @scroll="onScroll">

		<div v-for="(item,index) in allprojects" :id="item.id"  @mouseenter="refresh(item.id)">
			<el-card>
				<div slot="header">
					<span>{{item.title}}</span>
					<el-button style="float: right;" type="success">操作按钮</el-button>
				</div>
				<div v-for="o in 4" :key="o">
					{{'列表内容 ' + o }}
				</div>
			</el-card>
			<br />
			<br />

		</div>

		<div id="anchorsfrom">
			<anchors :anchornum='allprojects' @scrollpag="scrollpag" ref='anchor'></anchors>
		</div>

	</div>
</template>

<script>
	import anchors from '../../Components/AnchorFrame/anchorframe.vue'
	export default {
		components: {
			anchors: anchors,
		},

		data() {
			return {
				allprojects: [{
						title: "第一组",
						id: '1'
					},
					{
						title: "第二组",
						id: '2'
					},
					{
						title: "第三组",
						id: '3'
					},
					{
						title: "第四组",
						id: '4'
					},
					{
						title: "第五组",
						id: '5'
					},
					{
						title: "第六组",
						id: '6'
					},
					{
						title: "第七组",
						id: '7'
					},
					{
						title: "第八组",
						id: '8'
					},
					{
						title: "第九组",
						id: '9'
					},
				]

			}
		},

		activated() {

		},

		methods: {
			onScroll(e) {  //滚动建通刷新组件位置
			},
			
			refresh(id){
				this.$refs.anchor.refreshlocation(id);
			},

			scrollpag(id) { //跳转页面
				let jump = document.getElementById(id);
				//true 顶部结合 false 底部结合 
				jump.scrollIntoView({
					behavior: "smooth", //定义滚动动画 默认 auto ,instant立即  smooth平滑滚动
					block: "center", //定义元素对齐的位置lock 可选"start", "center", "end", 或 "nearest"之一。默认为 "center"。
					inline: 'nearest', //"start", "center", "end", 或 "nearest"之一。默认为 "nearest"

				});

			}
		},
	
	}
</script>

<style>
	#scrollbox{
		height: 100%;
		overflow: auto;
	}
	
	
	#anchorsfrom {
		position: fixed;
		top: 200px;
		right: 200px;
	}


	     /*设置滚动条的默认样式*/
    #scrollbox::-webkit-scrollbar {
         /*滚动条整体样式*/
         width: 10px;
         /*高宽分别对应横竖滚动条的尺寸*/
         height: 10px;
         /*高宽分别对应横竖滚动条的尺寸*/
     }
     #scrollbox::-webkit-scrollbar-thumb {
         /*滚动条里面小方块*/
         border-radius: 5px;
         background:rgba(187, 187, 187, 0.8);
     }
     #scrollbox::-webkit-scrollbar-thumb:hover {
         background: rgba(187, 187, 187,1);
     }
     #scrollbox::-webkit-scrollbar-thumb:active {
         background: #AAAAAA;
     }
     #scrollbox::-webkit-scrollbar-track {
         /*滚动条里面轨道*/
         -webkit-box-shadow: inset 0 0 5px rgba(240, 248, 255, 0.2);
         border-radius: 15px;
         background: rgba(176, 196, 222, 0.7);
     }
</style>