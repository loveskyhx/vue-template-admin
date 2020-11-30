<template>
	<!--@dblclick='dbapply'-->
	<div>
		<div v-if="Object.keys(this.val).length!=0 " @click='contents' class="copystyle">
			<div :class="{ copybox:copystate}">
				<div :class="{ copyborder:copystate  }" style="margin: 1px;">
					<el-badge is-dot style='width: 100%;' :hidden='val.applyclass==1&&forbiddialogs==false?false:true'>
						<el-collapse-transition>
							<el-card class="box-card" shadow="hover" :body-style="{ padding: '1px' }" v-if='closeval' style='border:none;height: 40px;width: 100%;'>
								<!-- <button @click="valmethods"></button>-->

								<span class="vacationstyle" v-if='!showVacation'> {{val.repair}} {{val.owe}}</span>
								<div v-for="item in val.classmessage" v-if='showVacation'>
									<el-row type="flex" justify="center" style="font-size: 14px;font-weight: 600;">
										<el-col :span='24'><span :style="{color:item.color}" style="float: left;margin-left: 5px;">{{item.classcontname}}</span>
											{{item.classcontent}}
										</el-col>
									</el-row>
								</div>


								<div style="width: 22px;height:21px;position: absolute;right: -7px;bottom:-12px;">
									<el-button type="text" style='position: absolute;left:8px;z-index: 99;' @click='close(val)'> <i class="el-icon-close"
										 style="font-size: 14px;font-weight: 600;"></i> </el-button>
									<svg style="opacity: 0.3;width: 60px;height: 20px;">
										<polygon class="svgstyle" fill="#87CEFA" stroke-width="1" points="0,21 21,0, 21,21 ">
										</polygon>
									</svg>
								</div>

							</el-card>
						</el-collapse-transition>
					</el-badge>


				</div>
			</div>

		</div>


		<el-dialog @close='closedialog' :modal='false' v-dialogDrag center :show-close='false' :visible.sync="dialogVisible"
		 width="350px">
			<div slot="title" style="background: #1abc9c;margin: -20px;"> <span style="color:white;font-size:18px;font-weight:600;">调班申请</span>
				<el-button type="text" icon="el-icon-close" circle style='color:white;font-size: 12px;position: absolute;right: 0px;'
				 @click="dialogVisible = false">
				 </el-button>
			</div>
			<div style="text-align: center;">
				<span style="font-size: 16px;">
					申请人：狗蛋子 V02568<br />
					调换班次：09-06 P 1-8<br />
					<br />
					被调人：李铁根 V09521<br />
					申请班次：09-01 A 1-8<br />
				</span>
			</div>
			<span slot="footer">
				<el-button type="primary" @click="dialogVisible = false" id='consentbut'>批准</el-button>
				<el-button @click="dialogVisible = false">驳回</el-button>
			</span>
		</el-dialog>

		<el-dialog v-dialogDrag title="排班管理" center :visible.sync="dialogVisiblepb" width="800px">
			<el-table :data="WorkforceManagement" style="width: 100%">
				<el-table-column prop="information" align='center' label="班次信息" width="180">
				</el-table-column>
				<el-table-column prop="Bed" label="分管床位" align='center'>
					<template slot-scope="scope">
						<el-input v-model="scope.row.Bed"></el-input>
					</template>

				</el-table-column>
				<el-table-column prop="practicalBed" align='center' label="实际管床">
					<template slot-scope="scope">
						<el-input v-model="scope.row.practicalBed"></el-input>
					</template>

				</el-table-column>
				<el-table-column prop="Shiftnote" align='center' label="班次备注">

					<template slot-scope="scope">
						<el-input type="textarea" autosize placeholder="请输入内容" v-model="scope.row.Shiftnote">
						</el-input>
					</template>

				</el-table-column>
				<el-table-column align='center' label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="danger">删除</el-button>
					</template>
				</el-table-column>
			</el-table>




			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogVisiblepb = false" id='consentbut'>保存</el-button>
				<el-button @click="dialogVisiblepb = false">取 消</el-button>

			</span>
		</el-dialog>

	</div>
</template>

<script>
	export default {
		props: ['val', 'local'],
		watch: {
			val(newval, oldval) {
				if (Object.keys(newval).length != 0) {
					this.closeval = true;
				}

				if (newval.copystates == true) {
					this.copystate = true;
				} else {
					this.copystate = false;
				}

				if (newval.repair == '休' || newval.owe == '欠休') {
					this.showVacation = false;
				} else {
					this.showVacation = true;
				}
			},
			'val.copystates': { //深度监听，可监听到对象、数组的变化
				handler(val, oldVal) {
					if (val == true) {
						this.copystate = true;
					} else {
						this.copystate = false;
					}
				},
				deep: true
			}
		},

		data() {
			return {
				//是否显示复制边框
				copystate: false,

				//关闭按钮时不触发弹出框
				forbiddialogs: false,

				buttonflag: false,
				dialogVisible: false,
				dialogVisiblepb: false,
				closeval: true,
				showVacation: true,
				VacationVal: '休',

				WorkforceManagement: [{
						information: '责任班',
						Bed: '+120-160',
						practicalBed: '9-15',
						Shiftnote: '此模板数据仅供参考！！',
					},
					{
						information: '午间(中)',
						Bed: '+4-10',
						practicalBed: '9-15',
						Shiftnote: '此模板数据仅供参考！！',
					},
					{
						information: '夜班(后)',
						Bed: '+12-25',
						practicalBed: '9-15',
						Shiftnote: '此模板数据仅供参考！！',
					},
					{
						information: '小夜班',
						Bed: '+10-10',
						practicalBed: '9-15',
						Shiftnote: '此模板数据仅供参考！！',
					},
				],
			}
		},

		mounted() {
			this.isVacation();
		},

		methods: {
			contents() {
				if (this.forbiddialogs == false) {
					var this_ = this;
					setTimeout(function() {
						if (this_.buttonflag == false) {
							this_.buttonflag = false;
							this_.dialogVisiblepb = true;
						}
					}, 300);
				}
			},


			dbapply() {
				if (this.forbiddialogs == false) {




					if (this.dialogVisiblepb != true) {
						this.buttonflag = true;
						this.dialogVisible = true;
					}

				}
			},
			//关闭时的回调
			closedialog() {

				this.buttonflag = false;
			},

			valmethods() {
				this.dialogVisible = true
			},



			isVacation() {
				//1是有补休或者欠休 0是没有


				if (this.val != undefined) {
					if (this.val.repair == '休' | this.val.owe == '欠休') {
						this.showVacation = false;
					}
				}



			},

			close(val) {
				this.forbiddialogs = true;
				this.$emit('FreeHeight', this.val, this.local);
				this.closeval = false;
			},
		}
	}
</script>

<style lang="less">
	.svgstyle:hover {
		background: red;
	}

	.copybox {
		background: repeating-linear-gradient(135deg, transparent, transparent 3px, #000 3px, #000 8px);
		animation: shine 1s infinite linear;
		overflow: hidden;
	}

	.copyborder {
		margin: 1px;


		background-color: #fff;
	}

	@keyframes shine {
		0% {
			background-position: -1px -1px;
		}

		100% {
			background-position: -12px -12px;
		}
	}



	#iconsize {
		position: relative;
		top: 3px;
		font-size: 14px;
	}

	.vacationstyle {
		font-size: 18px;
		font-weight: 600;
		color: #606266;
	}

	#consentbut {
		opacity: 0.9;
		background: #1abc9c;
		border: 1px #1abc9c;
	}

	#consentbut:hover {
		opacity: 0.8;
	}

	#consentbut:active {
		opacity: 1;
	}

	#remindicom {
		position: relative;
		top: 3px;
		font-size: 14px;
		color: #F56C6C;
	}

	#remindicom:hover {
		opacity: 0.7;
		cursor: Pointer;
	}

	#remindicom:active {
		opacity: 0.5;
	}
</style>
