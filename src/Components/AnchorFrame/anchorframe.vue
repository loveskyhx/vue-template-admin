<template>
	<div>
		<transition name="el-zoom-in-center">
          <div id='anchor_catalogcontent' @mouseover="showtabs" v-show="catalog_flag">
          	<div id='anchor_catalog'>目录</div>
          </div>
		</transition>

		<transition name="el-zoom-in-center">
			<div  v-dialogDrag  id="anchor_style" v-show="anchor_flag">
				<div id='anchor_title' class=".drag__header"  >
					<span>功能模块</span>
					<el-button id='anchor_close' icon="el-icon-close" type="text" @click='closetabs'></el-button>
				</div>

				<el-tabs v-model="activeid" :tab-position="tabPosition" id='anchor_pane' @tab-click="handleClick">
					<el-tab-pane  v-for="(item,index) in anchornum" :id='item.id' :name='item.id'  :key='index'  :label="item.title"></el-tab-pane>
				</el-tabs>
			</div>
		</transition>


	</div>
	

	
	
</template>
<script>
	export default {
	 props: {
        anchornum: {
         
        },
      
    },
		data() {
			return {
				activeid:'1',  //默认第一个
				tabPosition: 'right',
				anchor_flag: false, //功能块
				catalog_flag:true, //目录
			};
		},
		
		activated(){
		},
		
		methods: {
			//点击条件跳转到对应位置
			handleClick(tab, event) {
			    	this.$emit('scrollpag',tab.$attrs.id);
		      },
		      
		    refreshlocation(id){
		    	this.activeid=id;
		    },
			
			
			closetabs() {
				this.catalog_flag=true; //显示目录
				this.anchor_flag = false;   //隐藏功能模块
			
			},
			showtabs(){
				
				this.catalog_flag=false; //隐藏目录
				this.anchor_flag = true; //显示功能模块
			},
			
			closetabs_out(){
				this.catalog_flag=true; //显示目录
				this.anchor_flag = false;   //隐藏功能模块
			},
			
		}
	};
</script>
<style>
	#anchor_catalogcontent{
		position: fixed;
	    top: 310px;
	    right: 0;
	    cursor: pointer;
		
		background: rgba(255,255,255,0.8);
		width: 40px;
		border: 1px #DCDFE6 solid;
		border-top-left-radius: 5px;
	    border-bottom-left-radius: 5px;
	}
	#anchor_catalog{
		padding: 9px;
		font-size: 17px;
		font-weight: 600;
		line-height: 1.5;
		color: #657180;
		margin: 0 auto;
		width: 15px;
		
	}
	
	#anchor_style {
		position: fixed;
	    top: 200px;
	    right: 15px;
		box-sizing: content-box;
		box-shadow: 0 1px 10px 0 rgba(0, 0, 0, .1);
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		background-color: rgba(255, 255, 255, 0.9);
	}
	
	#anchor_title {
		padding: 3px;
		border-left: 1px solid #DCDFE6;
		border-top: 1px solid #DCDFE6;
		border-right: 1px solid #DCDFE6;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		padding-left: 5px;
		font-size: 13px;
		color: #606266;
		font-weight: 600;
	}
	
	#anchor_close {
		margin-top: 2px;
		
		padding: 0px;
	float: right;
	}
	
	#anchor_pane {
		margin: 0px;
		box-sizing:border-box;	
		border-top: 1.5px #DCDFE6 solid;
		border-right: 1px #DCDFE6 solid;
		border-bottom: 1px #DCDFE6 solid;
	}
	.el-tabs--right .el-tabs__header.is-right{
		margin-left:1px;
	}
</style>