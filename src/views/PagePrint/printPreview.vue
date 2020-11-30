<template>
	<div >
		<!--需要打印的位置-->
		<div id="printJSform" >	
			<el-col :span='24'>
		<ve-radar :data="chartData"></ve-radar>
	      </el-col>
			<table cellspacing="0" style="width: 100%;height:auto;text-align: center;border-left: #DCDEE2 1px solid;border-top: #DCDEE2 1px solid;">
				<thead>
					<tr>
						<th v-for="val in columnList" style="border-bottom: 1px #DCDEE2 solid; height: 40px;border-right: solid 1px #DCDEE2;">{{val}}</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="val in tableData2" style="height: 50px;">
						<td style="border-bottom: solid 1px #DCDEE2;border-right: solid 1px #DCDEE2">{{val.date}}</td>
						<td style="border-bottom: solid 1px #DCDEE2;border-right: solid 1px #DCDEE2">{{val.name}}</td>
						<td style="border-bottom: solid 1px #DCDEE2;border-right: solid 1px #DCDEE2">{{val.address}}</td>
						<td style="border-bottom: solid 1px #DCDEE2;border-right: solid 1px #DCDEE2">{{val.userEmail}}</td>
					</tr>
				</tbody>
			</table>
			<br />
			</div>
			
			<el-button type="primary" @click='openprint'>打印预览</el-button>
	</div>
</template>

<style>
	.el-table .warning-row {
		background: oldlace;
	}
	
	.el-table .success-row {
		background: #f0f9eb;
	}
</style>

<script>
	import Html2canvas from '../../utils/html2canvas';
	export default {
		methods: {
			tableRowClassName({
				row,
				rowIndex
			}) {
				if(rowIndex === 1) {
					return 'warning-row';
				} else if(rowIndex === 3) {
					return 'success-row';
				}
				return '';
			},
			openprint(){
			var copyDom = document.querySelector("#printJSform");
		    var width = copyDom.offsetWidth;//dom宽
		    var height = copyDom.offsetHeight;//dom高		    
		    var scale = 2;//放大倍数调整页面的清晰度
		    var canvas = document.createElement('canvas');
		    canvas.width = width*scale;//canvas宽度
		    canvas.height = height*scale;//canvas高度
		    var content = canvas.getContext("2d");
		    content.scale(scale,scale);
		    var rect = copyDom.getBoundingClientRect();//获取元素相对于视察的偏移量
		    content.translate(-rect.left,-rect.top);//设置context位置，值为相对于视窗的偏移量负值，让图片复位
		
			//先通过HTML2canvas转化为图片在通过printJS打印出来	
				html2canvas(document.querySelector("#printJSform"),{
		        dpi: window.devicePixelRatio*2,
		        scale:scale,
		        canvas:canvas,
		        width:width,
		        heigth:height,
		    }).then(function(canvas){
						var context = canvas.getContext('2d');	
		                   var img = canvas.toDataURL();                 
		                	printJS({
							//设置选中的ID
							printable: img,
							//处理类型  
							type: 'image',
							//是否处理默认样式  
		//					scanStyles: false,
							//头部标题
		//					header: 'PrintJS - 可以通过ID来选择对应打印的页面 但是只能设置行内样式',	
							targetStyle:['*'],
						})   
		});
							
//				    	//原生的方法存在返回页面的问题
//				    	let subOutputRankPrint = document.getElementById('printJSform');
//				              let newContent =subOutputRankPrint.innerHTML;
//				              let oldContent = document.body.innerHTML;
//				              document.body.innerHTML = newContent;
//				              window.print();
//				              window.location.reload();
//				              document.body.innerHTML = oldContent;
//                              return false;
				//目前 无法应用到外部样式 必须自己定义元素的样式才能正常打印
			},
		},
		data() {
			return {
				chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
       },

				columnList: ['日期', '姓名', '地址', 'userEmail'],
				tableData2: [{
						date: '2016-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						userEmail: '941290982@qq.com',
					}, {
						date: '2016-05-04',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						userEmail: '941290982@qq.com',
					}, {
						date: '2016-05-01',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						userEmail: '941290982@qq.com',
					}, {
						date: '2016-05-03',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						userEmail: '941290982@qq.com',
					},
					{
						date: '2016-05-03',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						userEmail: '941290982@qq.com',
					},
					{
						date: '2016-05-03',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						userEmail: '941290982@qq.com',
					},
					{
						date: '2016-05-03',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						userEmail: '941290982@qq.com',
					},


				]
			}
		}
	}
</script>