<template>
	<div>
				<el-table  :data="tabledataval" style="width:1000px"  @sort-change='sortChange' border row-key="id"  :row-class-name="tableRowClassName">
					<el-table-column v-for="(item, index) in tableHeadval"    v-if='item.show' :width="item.width" :align='item.align' :key="index" :prop="tableHeads[index].prop"  sortable='custom'>
					<template slot="header" slot-scope="slot">
						<!--	<div class='tile__title'  id="remove" > <i class="el-icon-rank"></i> </div>-->
						<span>{{item.label}}</span>
					
					</template>
					</el-table-column>
                
					<el-table-column width='200px'  fixed="right" label="操作" align='center' :disabled='true' id='abc'>				
				      	<template slot="header" slot-scope="slot">
							<el-button  slot="reference" icon="el-icon-setting" circle  @click="creatTable"></el-button>
						</template>
				      
						<template slot-scope="scope">	
								<el-button type="primary">查看</el-button>
								<el-button type="primary">删除</el-button>			
						</template>
					</el-table-column>
				</el-table>
	

   			<el-dialog v-dialogDrag  :visible.sync="visible" width="450px" center>
				<el-table ref="multipleTable"  show-overflow-tooltip  :max-height="350" border :data="TableColumns" @select='handleSelectionChange'  @select-all='handleSelectionChangeall'> 
					<el-table-column type="selection" align="center"> </el-table-column>
					<el-table-column label="是否展示" prop="colums" align="center"></el-table-column>
				</el-table>

				<span slot="footer">
			  	<el-button type="primary" @click="confirmShow">确 定</el-button>
			    <el-button @click="visible = false">取 消</el-button>
			 
			  </span>
			</el-dialog>    
			

		<el-button type="primary" @click='getdata'>主要按钮</el-button>
	</div>

</template>

<script>
	import Sortable from '../../../node_modules/sortablejs'
	
	export default {
		props: {
			tabledata: {
				type: Array,
			},
			tableHead:{
				type: Array,
			},
		},

		data() {
			return {
				//表头prop 值必须单独定义否则表格拖拽位置会错乱
				tableHeads: [],
				//创建表头和值用来接受计算属性方便修改
				tableHeadval:[],
				tabledataval:[],
				
				indexcolor:1,
				visible: false,
				//控制列的显示
				TableColumns: [],
				//控制是升序还是降序查询
				orderBy: '',
			}
		},
		mounted(){
			this.Getdialogval();
			//拖拽行
			this.rowDrop()
			this.columnDrop()
		},
		created(){
			this.ParsingHeader();
		},

		methods: {
			//解析出表头
			ParsingHeader(){
				//将prop 值单独分开避免拖拽错乱问题
				for(var a = 0; a < this.tableHead.length; a++){
					this.tableHeads.push(this.tableHead[a]);
					this.tableHeadval.push(this.tableHead[a]);
				}	
			},
			//获取对话框数据
			Getdialogval(){
				for(var a=0;a<this.tabledata.length;a++){
					this.tabledataval.push(this.tabledata[a]);
				}
				
				this.TableColumns = [];
						var id = 1;
						for(var a = 1; a < this.tableHead.length;a++) {

							if(this.tableHead[a].prop != id) {
								this.TableColumns.push({
									colums: this.tableHead[a].label,
									id: id,
									vif:true,
								})

							}

							id += 1;
						}
			},
			
			
			sortChange(column, prop, order) {
				var order = '';
				if(column.order == "descending") {
					order = column.order.substring(0, 4);
				} else if(column.order == "ascending") {
					order = column.order.substring(0, 3);
				} else {
					this.orderBy = '';
				}
				if(column.order != null) {
					this.orderBy = column.prop + ' ' + order;
				}	
			},
			
		//操作表格的勾选状态	
			handleSelectionChange(selection, row) {
			
			     if(selection.length!=0){
				for (var a=0;a<this.TableColumns.length;a++){
					for(var b=0;b<selection.length;b++){
						if(this.TableColumns[a].id==selection[b].id){
							this.TableColumns[a].vif=true;	
							break;
						}else{		
							this.TableColumns[a].vif=false;
						}
					}	
				}
				}else{
					for (var a=0;a<this.TableColumns.length;a++){
					this.TableColumns[a].vif=false;             
					}
				}
			},
		//操作表格的勾选状态	
			handleSelectionChangeall(selection){
				if(selection.length==0){					
					for (var a=0;a<this.TableColumns.length;a++){
					this.TableColumns[a].vif=false;             
					}
				}else{
					for (var a=0;a<this.TableColumns.length;a++){
					this.TableColumns[a].vif=true;             
					}
				}
				
				
				
			},	
		//保存勾选配置	
			confirmShow(){
				this.visible = false;
				for(var a = 0; a < this.TableColumns.length; a++) {
					 for(var b = 0; b < this.tableHead.length; b++){
					 	  if(this.TableColumns[a].colums==this.tableHead[b].label){
					 	  this.tableHead[b].show=this.TableColumns[a].vif;
					 	  }
					 	
					 	
					 }
					
					
				}
				
			},
			
			tableRowClassName({
				row,
				rowIndex
			}) {
				if(rowIndex === this.indexcolor) {
					return 'success-row';
				}
				return '';
			},
			
			

			getdata(){
				var add=[1,2,3];		
			},
					//拖拽行	
						    rowDrop(){
					      const tbody = document.querySelector('.el-table__body-wrapper tbody')
					      const _this = this
					      Sortable.create(tbody, {
					      	  animation: 150, 
					        onEnd({ newIndex, oldIndex }) {
					          const currRow = _this.tabledata.splice(oldIndex, 1)[0]
					          _this.tabledata.splice(newIndex, 0, currRow)
					        }
					      })
					    },
			//列拖拽
			columnDrop() {
				const wrapperTr = document.querySelectorAll('.el-table__header-wrapper tr')[0];
				this.sortable = Sortable.create(wrapperTr, {
					animation: 180,
					delay: 0,
//					handle: ".tile__title",
					onEnd: evt => {
						const oldItem = this.tableHeads[evt.oldIndex];
						if(evt.newIndex<this.tableHeads.length){
						this.tableHeads.splice(evt.oldIndex, 1);
						this.tableHeads.splice(evt.newIndex, 0, oldItem);
						}else{
							this.tableHeadval=[];
							this.tableHeads=[];
							var self=this;
							setTimeout(function(){
								 self.creates();		
							},1);
				   
						  
					
						}
						
						
					}
				})	
			},
			
			
			creates(){
				  this.$message.error('操作按钮不允许改变');
				 this.tableHeadval=this.tableHead;
				 this.tableHeads=this.tableHead;
			},
			
			
			
						creatTable(){
				this.visible = true;
				    this.$nextTick(()=>{
				    for (var a=0;a<this.TableColumns.length;a++){
				    	 if(this.TableColumns[a].vif==true){
				    	 	  this.$refs.multipleTable.toggleRowSelection(this.TableColumns[a],true);
				    	 }else{
				    	 	  this.$refs.multipleTable.toggleRowSelection(this.TableColumns[a],false);
				    	 }
				    	 
				    }	 	
				   
				    })
  	
			},
			
			
			

		},

	}
</script>

<style>
	#remove{
	display: inline;
	font-size: 15px; 
		
	}
	#remove:hover{
		cursor: move;
	}
	

</style>