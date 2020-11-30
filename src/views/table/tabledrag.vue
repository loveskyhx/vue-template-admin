<template>
	<div >
		<!--			
			<publicTable :tablesdata='tablesdata' :tablesHead='tablesHead'></publicTable>-->

<!--		<el-button type="primary" @click='domdata'>取数据</el-button>-->

		<table style="width:1600px;text-align: center;margin: 0 auto;" class="tables tables-bordered " ref='tablesdom' >
			<thead v-show="true">
				<tr>
					<th scope="col" colspan="2">
						<!-- <el-button  type="primary" style='margin-bottom: 10px;' @click='relationship'>保存带学配置关系</el-button>	-->	
					<el-tooltip :content="value3" placement="top">
					  <el-switch
					    v-model="value3"
					    active-color="#13ce66"
					    inactive-color="#ff4949"
					    active-value="跟随"
					    inactive-value="不跟随">
					  </el-switch>
					</el-tooltip>
					</th>
						

					<th scope="col" v-for="(item,index) in yhpbweek"  :class="[item==6||item==7?Holidays:'']" >{{item}}</th>

					<th scope="col"  :colspan="2">
						
						 <el-date-picker
						 	style='width: 145px;'
					      v-model="valueweek"
					      type="week"
					      format="yyyy 第 WW 周"
					      placeholder="选择周">
					    </el-date-picker>
						
						<el-button-group>
							<el-tooltip class="item" effect="dark" content="上一周" :open-delay='1000'>
								<el-button ><i class="fa fa-chevron-left" aria-hidden="true"></i></el-button>
							</el-tooltip>

							<el-tooltip class="item" effect="dark" content="下一周" :open-delay='1000'>
								<el-button ><i class="fa fa-chevron-right" aria-hidden="true"></i></el-button>
							</el-tooltip>

						</el-button-group>
					</th>
				
				</tr>

              


				<tr>
					<th scope="col" style="width: 200px;" >
						人员
					</th>
					
					<th scope="col" style="width: 40px;">层级</th>
					<th scope="col" class="trthstyle">星期一</th>
					<th scope="col" class="trthstyle">星期二</th>
					<th scope="col" class="trthstyle">星期三</th>
					<th scope="col" class="trthstyle">星期四</th>
					<th scope="col" class="trthstyle">星期五</th>
					<th scope="col" class="Holidays">星期六</th>
					<th scope="col" class="Holidays">星期日</th>
					<th scope="col" >
						合计	
					</th>
					<th scope="col">欠休+补休</th>
				</tr>


            <!--     <tr style="background:#FFFAFA; "><th style="padding: 5px;"  colspan="10">护理排班第一组</th></tr>-->

			</thead>
			
			
			
			<tbody ref='tablesdomtr' >				
				       <tr style="background:#FFFAFA; "><th style="padding: 5px;"  colspan="10">护理排班第一组</th></tr>	
				<tr>
					<th :rowspan="yhpb.length+1" style="padding: 0px; border: none;">
						<ul id="text" class="list-group" >
							<li @mouseleave="mouseOut" @mouseenter='mouenter(index,item)'   v-contextmenu:contextmenu  @click.right="rightevent(item,index)"   class="list-group-item" v-if="item instanceof Array" :key="item[0].id" v-for="(item,index) in yhpbtz" style="padding: 0px;">
								<!--多条分组数据-->
								<div style="text-align: left;" :style="{ height: v.height + 'px','line-height':v.height + 'px', background:v.background }" class="listItem" v-for="(v,i) in item" :key="v.id">
									<el-checkbox v-model="v.checked" style='margin-left: 10px;'></el-checkbox>  
									<i class="fa fa-exchange" :style="{color:item.fontcolor}" id="changeplaceicon" @click="turnaround(index)"></i>
									{{v.name}} 
									<i class="fa fa-user-md" style="color: #409EFF;" v-if="v.Position"></i>
									
									<span class="sign">{{v.relation}}</span>
									<span class="topBorder" v-if="i===0"></span>
									<span class="botBorder" v-else-if="i===item.length-1"></span>
									<span class="centBorder" v-else></span>
								</div>	
							</li>
							<!--单条数据-->
							<li @mouseleave="closerightevent(item)" @mouseenter='mouenter(index,item)' v-contextmenu:contextmenu @click.right='rightClick(item,index)'  class="list-group-item" v-else :style="{ height: item.height + 'px' ,'line-height':item.height + 'px'}" :key="item.id" style="padding: 0px;">
								<div style="text-align: left;">
									<el-checkbox @change='changerelation(item)' v-model="item.checked" style='margin-left: 10px;'></el-checkbox>
									<i class="fa fa-exchange" :style="{color:item.fontcolor}" id="changeplaceicon" @click="turnaround(index)"></i>
									<span :style="{color:item.fontcolor}">{{item.name}} </span>
									<i class="fa fa-user-md" style="color: #409EFF;" v-if="item.Position"></i>
									<span class="sign">{{item.relation}}</span>
								</div>
							</li>
						</ul>
					</th>
	                  
	                 <td  >
							N0				
					</td> 
	                  
	                  
					<td class="tbodytdstyle"  v-contextmenu:contextmenucontent   id='Schedulingtd'   @click.ctrl="ctrlClick(0,1,false,$event)"  @click.stop="popovershow($event,yhpbtzval.week1,1)"        @click.right="copyval(yhpbtzval.week1,0,1,false)" >
							<publicCard  :val='yhpbtzval.week1' :local='[0,1]'  @FreeHeight='domdatas' >
								
							</publicCard>	
					
					</td>
					<td  v-contextmenu:contextmenucontent id='Schedulingtd' @click.ctrl="ctrlClick(0,2,false,$event)" @dblclick='dbapply'    @click="popovershow($event,yhpbtzval.week2,2)"    @click.right="copyval(yhpbtzval.week2,0,2,false)" >	
						
						<!--	<Popver :data='false'></Popver>-->
						<publicCard  :val='yhpbtzval.week2' :local='[0,2]'   @FreeHeight='domdatas'></publicCard>
					</td>

					<td  v-contextmenu:contextmenucontent id='Schedulingtd' @click.ctrl="ctrlClick(0,3,false,$event)" @click="popovershow($event,yhpbtzval.week3,3)" @click.right="copyval(yhpbtzval.week3,0,3,false)"     >
						<!--	<Popver :data='true'></Popver>-->
						<publicCard :val='yhpbtzval.week3' :local='[0,3]' @FreeHeight='domdatas'></publicCard>
					</td>

					<td   v-contextmenu:contextmenucontent id='Schedulingtd' @click.ctrl="ctrlClick(0,4,false,$event)"  @dblclick='dbapply'  @click="popovershow($event,yhpbtzval.week4,4)"  @click.right="copyval(yhpbtzval.week4,0,4,false)">
							<!--<Popver :data='true'></Popver>-->
						<publicCard :val='yhpbtzval.week4' :local='[0,4]' @FreeHeight='domdatas'></publicCard>
					</td>

					<td  v-contextmenu:contextmenucontent id='Schedulingtd' @click.ctrl="ctrlClick(0,5,false,$event)" @click="popovershow($event,yhpbtzval.week5,5)"  @click.right="copyval(yhpbtzval.week5,0,5,false)" >
						<publicCard :val='yhpbtzval.week5' :local='[0,5]' @FreeHeight='domdatas'></publicCard>
					</td>

					<td  v-contextmenu:contextmenucontent id='Schedulingtd' @click.ctrl="ctrlClick(0,6,false,$event)" @click="popovershow($event,yhpbtzval.week6,6)"   @click.right="copyval(yhpbtzval.week6,0,6,false)">
						<publicCard :val='yhpbtzval.week6' :local='[0,6]' @FreeHeight='domdatas'></publicCard>
					</td>
					<td  v-contextmenu:contextmenucontent id='Schedulingtd' @click.ctrl="ctrlClick(0,7,false,$event)" @click="popovershow($event,yhpbtzval.week7,7)"   @click.right="copyval(yhpbtzval.week7,0,7,false)">
						<publicCard :val='yhpbtzval.week7' :local='[0,7]' @FreeHeight='domdatas'></publicCard>
					</td>
					<td  id='Schedulingtd'>{{yhpbtzval.sum}}</td>
					<td style="padding: 0px;">
						<el-row style="padding: 0px;">
							<el-col :span='11'>
								<el-input v-model="yhpbtzval.bxqx.bx" style='width: 50px;'></el-input>  <span style="font-size: 14px;">h</span>  </el-col>
							<el-col :span='2'>+</el-col>
							<el-col :span='11'>
								<el-input v-model="yhpbtzval.bxqx.qx" style='width: 50px;'></el-input> <span style="font-size: 14px;">h</span></el-col>
						</el-row>
					</td>
				</tr>

				<tr v-for="(item,index) in yhpb" >
					 <td class="yhpbstyle" >
							N1				
					</td> 
					
					<td  class="tbodytdstyle" v-contextmenu:contextmenucontent id='Schedulingtd' @click.ctrl="ctrlClick(index,0,true,$event)" @click.right="copyval(yhpb[index].week1,index,0,true)" @click="popovershow($event,yhpb[index].week1,8)"><publicCard  :local='[index,0]'  :val='yhpb[index].week1' @FreeHeight='domdatas'></publicCard></td>
					<td v-contextmenu:contextmenucontent id='Schedulingtd'  @click.ctrl="ctrlClick(index,1,true,$event)" @click.right="copyval(yhpb[index].week2,index,1,true)" @click="popovershow($event,yhpb[index].week2,9)"><publicCard  :local='[index,1]' :val='yhpb[index].week2' @FreeHeight='domdatas'></publicCard></td>
					<td v-contextmenu:contextmenucontent id='Schedulingtd'  @click.ctrl="ctrlClick(index,2,true,$event)" @click.right="copyval(yhpb[index].week3,index,2,true)" @click="popovershow($event,yhpb[index].week3,10)"><publicCard :local='[index,2]' :val='yhpb[index].week3' @FreeHeight='domdatas'></publicCard></td>
					<td v-contextmenu:contextmenucontent id='Schedulingtd'  @click.ctrl="ctrlClick(index,3,true,$event)" @click.right="copyval(yhpb[index].week4,index,3,true)" @click="popovershow($event,yhpb[index].week4,11)"><publicCard :local='[index,3]' :val='yhpb[index].week4' @FreeHeight='domdatas'></publicCard></td>
					<td v-contextmenu:contextmenucontent id='Schedulingtd'  @click.ctrl="ctrlClick(index,4,true,$event)" @click.right="copyval(yhpb[index].week5,index,4,true)" @click="popovershow($event,yhpb[index].week5,12)"><publicCard :local='[index,4]' :val='yhpb[index].week5' @FreeHeight='domdatas'></publicCard></td>
					<td v-contextmenu:contextmenucontent id='Schedulingtd'  @click.ctrl="ctrlClick(index,5,true,$event)" @click.right="copyval(yhpb[index].week6,index,5,true)" @click="popovershow($event,yhpb[index].week6,13)"  ><publicCard :local='[index,5]' :val='yhpb[index].week6' @FreeHeight='domdatas'></publicCard></td>
					<td v-contextmenu:contextmenucontent id='Schedulingtd'  @click.ctrl="ctrlClick(index,6,true,$event)" @click.right="copyval(yhpb[index].week7,index,6,true)" @click="popovershow($event,yhpb[index].week7,14)" ><publicCard :local='[index,6]' :val='yhpb[index].week7' @FreeHeight='domdatas'></publicCard></td>
					<td id='Schedulingtd'>{{item.sum}}</td>
					<td style="padding: 0px;">
						<el-row style="padding: 0px;">
							<el-col :span='11'>
								<el-input v-model="item.bxqx.bx" style='width: 50px;'></el-input> <span style="font-size: 14px;">h</span> </el-col>
							<el-col :span='2'>+</el-col>
							<el-col :span='11'>
								<el-input v-model="item.bxqx.qx" style='width: 50px;'></el-input> <span style="font-size: 14px;">h</span></el-col>
						</el-row>
					</td>
				</tr>
			</tbody>
		</table>
		  
		  
		<br />
		
		<div style="width: 100%;text-align: center;">
				<span  style="font-weight: 600;font-size: 18px;margin:0 auto;">今日在班护士：15人；A班：8人；P班：3人；N班：7人</span> 
		</div>
			<div >	
		
       <br />
		<quill-editor style='height: 150px;width:1600px;margin: 0 auto;' v-model="content" ref="myQuillEditor" :options="editorOption">
		</quill-editor>
	      </div>
	      
	      <!--放置注册好的popver-->
	      <div v-popover:popover></div>
	      
      <div style="height: 60px; width: 100%;">
      		<v-contextmenu   @hide='hideright' @show='showright'  ref="contextmenu" class="menuList"  :disabled='popdisable'>
					<v-contextmenu-item  :class="isGroup?'disItem':''"  @click='relationship(isGroup)' @mouseenter='menuShow' @mouseleave='menuLeave'>
						<span><i class="fa fa-floppy-o" aria-hidden="true"></i> 新增教学关系</span>
					</v-contextmenu-item>	
					<v-contextmenu-item  :class="menudisable||!isGroup?'disItem':''"  @click='clickEventsave(menudisable)' @mouseenter='menuShow' @mouseleave='menuLeave'>
						<span><i class="fa fa-floppy-o" aria-hidden="true"></i> 保存当前配置</span>
					</v-contextmenu-item>
						<v-contextmenu-item  @click='clickEventrelieve(menudisablerelieve)' @mouseenter='menuShow' @mouseleave='menuLeave'  :class="menudisablerelieve||!isGroup?'disItem':''">
							<span><i class="fa fa-users" aria-hidden="true"></i> 解除带学关系</span>
					</v-contextmenu-item>
						<v-contextmenu-item  @click='Eventrelieveconfiguration' @mouseenter='menuShow' @mouseleave='menuLeave' :class="!isGroup?'disItem':''">
							<span><i class="fa fa-trash-o" aria-hidden="true"></i> 解散当前组别</span>
					</v-contextmenu-item>
		</v-contextmenu>
      </div>
      
      
       <div style="height: 60px; width: 100%;">
      		<v-contextmenu   ref="contextmenucontent" class="menuList"  >
				  			<v-contextmenu-item :disabled='copydisable' @click='Copydata(copytemp)'>
								<span><i class="fa fa-files-o" aria-hidden="true"></i> 复制</span>
							</v-contextmenu-item>
							
							<v-contextmenu-item :disabled='copydisable'>
								<span><i class="fa fa-clone" aria-hidden="true"></i> 复制整周班次</span>
							</v-contextmenu-item>
							
							<v-contextmenu-item :disabled='pastedisable' @click='Pastedata()' >
								<span><i class="fa fa-clipboard" aria-hidden="true"></i>粘贴</span>
					       </v-contextmenu-item>
					       
					       <v-contextmenu-item  @click='clearcopy' >
								<span><i class="fa fa-eraser" aria-hidden="true"></i></i>清空复制项</span>
					       </v-contextmenu-item>
							
							<v-contextmenu-item   @click='clearcopyweek(copytemp)'>
								<span><i class="fa fa-trash-o" aria-hidden="true"></i> 删除整周班次</span>
					       </v-contextmenu-item>	 
				</v-contextmenu>
      </div>
       
           <el-popover id="custom" transition='el-zoom-in-top' popper-class="sss" v-model="visibles" ref="popover"  placement="bottom"  title="标题" width="200" trigger="click">
					    
					<ul class="list-group">
						<li  class="list-group-item">我是排班组</li>
						<li  class="list-group-item">我是排班组</li>
						<li  class="list-group-item">我是排班组</li>
						<li  class="list-group-item">我是排班组</li>
						<li  class="list-group-item">我是排班组</li>
						<li  class="list-group-item">我是排班组</li>
					</ul>
   				 </el-popover>
       
      	 		
	</div>

</template>

<script>
//	import Vue from 'vue';
	//	import $ from 'jquery';
	//	import 'bootstrap/dist/css/bootstrap.min.css';
	//  import 'bootstrap/dist/js/bootstrap.min.js';
//	import { SlickList, SlickItem } from 'vue-slicksort';
//	import draggable from 'vuedraggable'
	import Sortable from '../../../node_modules/sortablejs'
	import publicTable from '../../Components/PublicTable/publicTable.vue';
	import publicCard from '../../Components/PublicCard/publicCard.vue';
	import Popver from '../../Components/PublicPopver/Popver.vue';
    import  "./tabledragval.json";
	export default {
		components: {
			publicTable,
			publicCard,
			Popver,
		},

		mounted(){
			
//			window.addEventListener('scroll', this.handleScroll,true);
			//处理数据
			//this.processdata();
			this.rowDrop();
			this.domdata();
		},

		data() {
			return {
				
				//点击删除时不允许pop框出现
				delflag:true,
				
				ctrlTime:null,
				ctrlFlag:false,
				ctrlArr:[],
				Xindex:null,
				Yindex:null,
				copyType:true,
				
				
				copydisable:false,
				pastedisable:true,
				
				copydata:'',
				copytemp:'',
				
				popdisable:false,
				isGroup:false,
				checked:false,
				presentval:'',
				visibles:false,
				refsname:"popover",
				ismou:false,
				menudisable:false,
				menudisablerelieve:false,
			    pagedisable:false,
				checkeds:false,
				//右键菜单数据
				rightval:[],
				rightindex:null,
				
				content: null,
				 editorOption:{
                    modules:{
                    	//关于配置的问题
//                  	1.只需要填写功能名的
//							加粗 - bold；
//							斜体 - italic
//							下划线 - underline
//							删除线 - strike
//							引用- blockquote
//							代码块 - code-block
//							公式 - formula
//							图片 - image
//							视频 - video
//							清除字体样式- clean
//                        2.需要有默认值的
//							标题 - header  
//							[{ 'header': 1 }, { 'header': 2 }] 值字体大小
//							列表 - list 
//							[{ 'list': 'ordered'}, { 'list': 'bullet' }], 值ordered，bullet
//							上标/下标 - script 
//							 [{ 'script': 'sub'}, { 'script': 'super' }],  值sub，super
//							缩进 - indent
//							[{ 'indent': '-1'}, { 'indent': '+1' }], 值-1，+1等					
//							文本方向 - direction
//							[{ 'direction': 'rtl' }],    值rtl
//							
//						  3.有多个值 以下拉列表形式显示
//							大小 - size
//							 [{ 'size': ['small', false, 'large', 'huge'] }],  	
//							标题 - header
//							[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//                  	
//                  	  4.有系统默认值的功能只需填写一个空数组 就会有出现默认的选项
//							颜色 - color
//							背景颜色 - background
//							字体 - font
//							文本对齐 - align
//							他们的格式都是
//							[{ 'color': [] }, { 'background': [] }],  填写对应的#444693出现对应的颜色无法识别的则为黑色
//							[{ 'font': [] }],
//							[{ 'align': [] }]                   	                  	
                        toolbar:[
                          ['bold', 'italic', 'underline', 'strike'], 
                         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                         [{ 'size': ['small', false, 'large'] }],
                         [{ 'color': ['red','yellow','#FFC125','255,182,193','grb(255,182,193)'] }],
                         	[{ 'align': [] }]    , 
                        ],
                    },
                    //占位符的值
                     placeholder: '请输入医护排班备注内容....',
                },
				
				
				tr: [],
				Holidays:'Holidays',
				
				
				input: '11',
				yhpbweek: [1, 2, 3, 4, 5, 6, 7],

				yhpbtz: [{
						name: '狗蛋子',
						id: '1',
						height: 50,
						relation:'',
						Position:true,
						fontcolor:'',
						background:'',
						checked:false,
					},
					
					{
						name: '猫哆哩-二狗',
						id: '2',
						height: 50,
						relation:'',
						fontcolor:'',
						background:'',
						checked:false,
					},
					
					{
						name: '李铁根',
						id: '3',
						height: 50,
                        relation:'',
                        fontcolor:'',
                        background:'',
                        checked:false,
					},
					{
						name: '尼古拉斯-赵四',
						id: '4',
						height: 50,
                        relation:'',
                        fontcolor:'',
                        background:'',
                        checked:false,
					},
					{
						name: '古拉加斯-王五',
						id: '5',
						height: 50,
						relation:'',
						Position:true,
						fontcolor:'',
						background:'',
						checked:false,
					},
					
					{
						name: '猫屎儿',
						id: '6',
						height: 50,
                        relation:'',
                        fontcolor:'',
                        background:'',
                        checked:false,
					},
				],

				//			yhpbtz:['狗蛋子','李铁根','尼古拉斯-赵四','古拉加斯-王五','猫哆哩-二狗'],			
				yhpbtzval: {
					week1: {
						copystates:false,
						//数据类型
						valtype:false,
						birthday:'',
						applyclass:'1',
						classmessage:[{
								classcontname: '责任班',
								classcontent: '9-15',
								color: 'red',
						},	
							{
								classcontname: '行政班',
								classcontent: '+120-160',
								color: 'blue',
							},
						],
					
					},
					week2: {
						copystates:false,
						valtype:false,
						repair: '休',
						owe: '',
						birthday:'',
						applyclass:'',
					
					},
					week3: {
						copystates:false,
						valtype:false,
						birthday:'1',
						applyclass:'1',
						classmessage:[{
							classcontname: '责任班',
							classcontent: '9-15',
							color: 'red',
							
						},
						{
							classcontname: '辅助班',
							classcontent: '4-7',
							color: 'green',
						},
						
					],
						
					},
					
					
					week4:{
	
					  
					},

						week5: {
						copystates:false,	
						valtype:false,	
						birthday:'',
						applyclass:'1',
						classmessage:[{
							classcontname: '护理研究组',
							classcontent: '21-35',
							color: '#409EFF',
						},
						{
							classcontname: '口腔科',
							classcontent: '2-7',
							color: '#F56C6C',
						},
					],
						
					},
				
                     week6: {
                     	copystates:false,
                     	valtype:false,	
						birthday:'',
						applyclass:'',
						classmessage:[{
							classcontname: '医务班',
							classcontent: '33-80',
							color: '#E6A23C',
						},

					],
						
					},

                   week7: {
						
						
					},
				
					sum: '40h',
					bxqx: {
						bx: '1',
						qx: '2',
					},
				},
				yhpb: [

					{
						
						
						     week1: {
						
						
					},
					
					
					  week2: {
					  	copystates:false,
						birthday:'',
						applyclass:'1',
						classmessage:[{
								classcontname: '责任班',
								classcontent: '9-15',
								color: 'red',
						},	
							{
								classcontname: '行政班',
								classcontent: '+120-160',
								color: 'blue',
							},
						],
						
					},
					
						  week3: {
					
						
					},
					
					  week4: {
					
						
					},
					
					
					  week5: {
					  	copystates:false,
						birthday:'',
						applyclass:'1',
						classmessage:[{
								classcontname: '责任班',
								classcontent: '9-15',
								color: 'red',
						},	
							{
								classcontname: '行政班',
								classcontent: '+120-160',
								color: 'blue',
							},
						],
						
					},
					
						week6: {
						copystates:false,	
						repair: '休',
						owe: '',
						birthday:'1',
						applyclass:'',
					},
						week7: {
						copystates:false,	
						repair: '休',
						owe: '',
						birthday:'1',
						applyclass:'',
					},
						sum: '55h',
						bxqx: {
							bx: '2',
							qx: '5',
						},
					},
					{


					  week1: {
					
						
					},
					
					
					  week2: {
//					  	copystates:false,
//						birthday:'',
//						applyclass:'1',
//						classmessage:[{
//								classcontname: '责任班',
//								classcontent: '9-15',
//								color: 'red',
//						},	
//							{
//								classcontname: '行政班',
//								classcontent: '+120-160',
//								color: 'blue',
//							},
//						],
//						
					},

                    
                     week3: {
                     	copystates:false,
						birthday:'',
						applyclass:'1',				
						classmessage: [{
								classcontname: '责任班',
								classcontent: '9-15',
								color: 'red',
						},	
							{
								classcontname: '行政班',
								classcontent: '+120-160',
								color: 'blue',
							},
						],
						
					},
                    
                    
                     week4: {
                     	copystates:false,
						birthday:'1',
						applyclass:'1',
						classmessage: [{
								classcontname: '责任班',
								classcontent: '9-15',
								color: 'red',
						},	
							{
								classcontname: '行政班',
								classcontent: '+120-160',
								color: 'blue',
							},
						],
						
					},
                    

                    week5: {
                    	copystates:false,
						birthday:'1',
						applyclass:'1',
						classmessage: [{
								classcontname: '责任班',
								classcontent: '9-15',
								color: 'red',
						},	
							{
								classcontname: '行政班',
								classcontent: '+120-160',
								color: 'blue',
							},
						],
						
					},

		
						week6: {
						copystates:false,	
						repair: '休',
						owe: '',
						birthday:'',
						applyclass:'',
					},
						week7:  {
						copystates:false,	
						repair: '休',
						owe: '',
						birthday:'',
						applyclass:'',
					},
						sum: '10h',
						bxqx: {
							bx: '6',
							qx: '8',
						},
					},
					{
						
						
						 week1: {
						copystates:false, 	
						birthday:'1',
						applyclass:'1',
						classmessage:[{
								classcontname: '责任班',
								classcontent: '10-35',
								color: 'red',
							},
							{
								classcontname: '辅助班',
								classcontent: '5-8',
								color: 'green',
							},

						],
						
					},
					
					
					 week2: {
					
						
					},
					
                    
					 week3: {
					 	copystates:false,
						birthday:'1',
						applyclass:'1',
						classmessage: [{
								classcontname: '皮肤科',
								classcontent: '+120-156',
								color: '#2F4F4F',
							},
							{
								classcontname: '辅助班',
								classcontent: '5-8',
								color: 'green',
							},

						],
						
					},
					    
                      week4: {
		
					},  

                    
                     week5: {

						
					},
                    

						week6: {
						copystates:false,	
						birthday:'',
						applyclass:'',	
						repair: '休',
						owe: '',
					},
						week7: {
						copystates:false,	
						copystates:false,	
						birthday:'1',
						applyclass:'',	
						repair: '休',
						owe: '',
					},
						sum: '60h',
						bxqx: {
							bx: '10',
							qx: '12',
						},
					},
					{

						week1: {
						
					},
					
					
					 week2: {
					 	copystates:false,
						birthday:'1',
						applyclass:'1',
						classmessage: [{
								classcontname: '小夜班',
								classcontent: '+120-156',
								color: '#2F4F4F',
							},
							{
								classcontname: '夜班',
								classcontent: '1-8',
								color: 'green',
							},

						],
						
					},
					
					
	
					
					
					 week3: {
					 	copystates:false,
						birthday:'1',
						applyclass:'1',
						classmessage:  [{
								classcontname: '午间(中)',
								classcontent: '1+-99',
								color: '#D2B48C',
							},
							{
								classcontname: '夜班(后)',
								classcontent: '6-80',
								color: '#FF4500',
							},

						],
						
					},
					
					
					week4: {
						copystates:false,
						birthday:'1',
						applyclass:'1',
						classmessage:  [{
								classcontname: '午间(中)',
								classcontent: '1+-99',
								color: '#D2B48C',
							},
							{
								classcontname: '夜班(后)',
								classcontent: '6-80',
								color: '#FF4500',
							},

						],
						
					},
					
					
					week5: {
						copystates:false,
						birthday:'1',
						applyclass:'1',
						classmessage:  [{
								classcontname: '午间(中)',
								classcontent: '1+-99',
								color: '#D2B48C',
							},
							{
								classcontname: '夜班(后)',
								classcontent: '6-80',
								color: '#FF4500',
							},

						],
						
					},


						week6:{
						copystates:false,	
						birthday:'',
						applyclass:'',	
						repair: '休',
						owe: '',
					},
						week7: {
						copystates:false,	
						birthday:'',
						applyclass:'',
						repair: '休',
						owe: '欠休',
					},
						sum: '69h',
						bxqx: {
							bx: '7',
							qx: '3',
						},
					},
					
					{

						week1: {
						copystates:false,		
						birthday:'',
						applyclass:'1',
						classmessage:[{
								classcontname: '责任班',
								classcontent: '9-15',
								color: 'red',
						},	
							{
								classcontname: '行政班',
								classcontent: '+120-160',
								color: 'blue',
							},
						],
					},
					
					
					 week2: {
					 	copystates:false,
						birthday:'1',
						applyclass:'1',
						classmessage: [{
								classcontname: '小夜班',
								classcontent: '+120-156',
								color: '#2F4F4F',
							},
							{
								classcontname: '夜班',
								classcontent: '1-8',
								color: 'green',
							},

						],
						
					},
					
					 week3: {	
					},
					

					
					
					week4: {

						
					},
					
					
					week5: {
						copystates:false,
						birthday:'1',
						applyclass:'1',
						classmessage:  [{
								classcontname: '午间(中)',
								classcontent: '1+-99',
								color: '#D2B48C',
							},
							{
								classcontname: '夜班(后)',
								classcontent: '6-80',
								color: '#FF4500',
							},

						],
						
					},


						week6:{
						copystates:false,	
						birthday:'',
						applyclass:'',	
						repair: '休',
						owe: '',
					},
						week7: {
						copystates:false,	
						birthday:'',
						applyclass:'',
						repair: '休',
						owe: '欠休',
					},
						sum: '69h',
						bxqx: {
							bx: '7',
							qx: '3',
						},
					},
	
				],

				value3: '100',
				valueweek:new Date(),
//				tablesdata: [{
//						id: "REP201811020000000301",
//						name: "提里奥-弗丁",
//						aeCriticalStr: "紧急",
//						aeLevelStr: "〇级",
//						aeTypeStr: "护理事件",
//
//					},
//					{
//						id: "REP201811020000000302",
//						name: "范克里夫",
//						aeCriticalStr: "紧急",
//						aeLevelStr: "〇级",
//						aeTypeStr: "护理事件",
//
//					},
//					{
//						id: "REP201811020000000303",
//						name: "安东尼达斯",
//						aeCriticalStr: "紧急",
//						aeLevelStr: "〇级",
//						aeTypeStr: "护理事件",
//
//					},
//					{
//						id: "REP201811020000000304",
//						name: "先知维纶",
//						aeCriticalStr: "紧急",
//						aeLevelStr: "〇级",
//						aeTypeStr: "护理事件",
//
//					},
//				],
//				//建立表头
//				tablesHead: [{
//						label: 'ID',
//						prop: 'id',
//						width: '200',
//						align: 'center',
//						show: true,
//					},
//					{
//						label: '姓名',
//						prop: 'name',
//						width: '200',
//						align: 'center',
//						show: true,
//					},
//					{
//						label: '紧急度',
//						prop: 'aeCriticalStr',
//						width: '200',
//						align: 'center',
//						show: true,
//					},
//					{
//						label: '级别',
//						prop: 'aeLevelStr',
//						width: '200',
//						align: 'center',
//						show: true,
//					},
//					{
//						label: '事件类型',
//						prop: 'aeTypeStr',
//						width: '200',
//						align: 'center',
//						show: true,
//					},
//
//				],

			}
		},

		watch: {
			tr: {
				handler: function(newVal) {
					this.domdata();
				},
				deep: true
			}
		},
		
		//在 keep-alive使用 否则用destroyed
		deactivated(){
			this.$refs.contextmenu.hideAll();
			this.$refs.contextmenucontent.hideAll();
		},
		
		

		methods: {
			submit(){
			},
			
			
			//出现弹出框
//			changepop(flag){
//				flag=true;
//			},
//

			rightClick(val,index){
				this.rightindex=index;
				this.isGroup = false;
				this.checked = val.checked;
				this.$refs.contextmenu.isDisFlag = !val.checked;
			},
			//复制
			Copydata(val){
				this.clearcopy();	
			    
			    
				this.copydata=val;
					if(this.copyType==false){
					let str = `week${this.Xindex}`;
					this.yhpbtzval[str].copystates = true;	
					this.yhpbtzval[str] = this.copydata;
					
				}else{
					let str = `week${this.Xindex+1}`;
					this.yhpb[this.Yindex][str].copystates = true;	
					this.yhpb[this.Yindex][str] = this.copydata;

				}
				
				
				
			},
			
				dbapply(){
				clearTimeout(this.ctrlTime)
				this.ctrlFlag = true;
				this.ctrlTime = setTimeout( () =>{
					this.ctrlFlag = false;
				},200);
			},
			
			
			//多条粘贴
			ctrlClick(Y,X,type,dom){
					if(type==false){	
					let str = `week${X}`;        
					if(Object.keys(this.yhpbtzval[str]).length==0){

						if(dom.srcElement.style.background==''){
							
							var points={
								X:Y,
								Y:X,
								copyType:type,
								domstyle:dom.srcElement
							}
						 this.ctrlArr.push(points);
							dom.srcElement.style.background='#fcf8e3';	
						}else{
							
							for(var a=0;a<this.ctrlArr.length;a++){
								if(X==this.ctrlArr[a].X&&Y==this.ctrlArr[a].Y){
									this.ctrlArr.splice(a,1);
									break;
								}
							}
							
							
							//清空掉之前保存的数据
							dom.srcElement.style.background='';
						}
						//改变背景颜色
	
					}
 	
					
				}else{
					let str = `week${X+1}`;
					
					if(Object.keys(this.yhpb[Y][str]).length==0){
						//改变背景颜色
						if(dom.srcElement.style.background==''){
							var points={
								X:Y,
								Y:X,
								copyType:type,
								domstyle:dom.srcElement
							}
						 this.ctrlArr.push(points);
							dom.srcElement.style.background='#fcf8e3';	
						}else{
							
							for(var a=0;a<this.ctrlArr.length;a++){
								if(X==this.ctrlArr[a].X&&Y==this.ctrlArr[a].Y){
									this.ctrlArr.splice(a,1);
									break;
								}
							}
							dom.srcElement.style.background='';
						}
					}
				}
				
				
				

				clearTimeout(this.ctrlTime)
				this.ctrlFlag = true;
				this.ctrlTime = setTimeout( () =>{
					this.ctrlFlag = false;
				},200);
				
				
				
				
			
			},
			
			//粘贴数据
			Pastedata(){     
				//false 为第一排的数据  true 为其他的数据多条粘贴
				for(var a=0;a<this.ctrlArr.length;a++){				
					if(this.ctrlArr[a].copyType==false){	
					JSON.parse(JSON.stringify(this.copydata.valtype=false));	
					let str = `week${this.ctrlArr[a].Y}`;
					var copyval=JSON.parse(JSON.stringify(this.copydata));
					copyval.valtype=false;
					this.yhpbtzval[str] = copyval;	
				}else{
					
					let str = `week${this.ctrlArr[a].Y+1}`;
				
					//覆盖之前空的内容
					this.yhpb[this.ctrlArr[a].X][str] = JSON.parse(JSON.stringify(this.copydata)) ; 
					
				}			
				}
 
                
                //单条粘贴
				if(this.copyType==false&&this.ctrlArr.length==0){
					let str = `week${this.Xindex}`;

					var copyval=JSON.parse(JSON.stringify(this.copydata));
					copyval.valtype=false;
					this.yhpbtzval[str] = copyval;	
				}else{
					
					let str = `week${this.Xindex+1}`;
					//覆盖之前空的类容
					this.yhpb[this.Yindex][str] = JSON.parse(JSON.stringify(this.copydata));
				}
				
				
			},
			
		    	//清空所有的copy 单元顺带清空复制保存的值 以及选中背景颜色
			clearcopy(){
					this.copydata='';
					this.ctrlArr.forEach((v, i) => {	
						v.domstyle.style.background='';	
						    })
					this.ctrlArr=[];

					//清空所有的copy
					var arrayss=Object.keys(this.yhpbtzval);
					for(var c=0;c<arrayss.length;c++){	  
						if(this.yhpbtzval[arrayss[c]].copystates!=undefined){
							 this.yhpbtzval[arrayss[c]].copystates = false;	
						}	   
					}		
					for(var b=0;b<this.yhpb.length;b++){
						var arrays=Object.keys(this.yhpb[b])
						for(var a=0;a<arrays.length;a++){
						   if(this.yhpb[b][arrays[a]].copystates!=undefined){
						   this.yhpb[b][arrays[a]].copystates = false;
						   }
					}		
					}	
			},
			
			clearcopyweek(val){
				  this.$confirm('是否要删除整周班次!', '提示', {
          confirmButtonText: '确定',
          showCancelButton:false,
          type: 'warning'
        }).then(() => {
        	
        	if(this.copyType==false){
        		
        		for(var a=0;a<Object.keys(this.yhpbtzval).length;a++){
        			this.yhpbtzval[Object.keys(this.yhpbtzval)[a]]='';
        		}
        				
        	}else{
        		let str = `week${this.Yindex}`;
        	     
        			for(var b=0;b<Object.keys(this.yhpb[this.Yindex]).length;b++){
        				this.yhpb[this.Yindex][Object.keys(this.yhpb[this.Yindex])[b]]='';
        			}
        			
        		
        		
        	}
         
          
          
          
        }).catch(() => {
                 
        });
				
				
			},
			
			
			
			//控制数据的拷贝 Y轴是人 X轴是星期
			copyval(val,Yindex,Xindex,type){
				this.Yindex = Yindex;
				this.Xindex = Xindex;
				//拷贝类型
				this.copyType=type;
				
				this.copytemp=val;
				if(Object.keys(val).length!=0){
					this.copydisable=false;
					this.pastedisable=true;
					
				}else{
					this.copydisable=true;
					
					if(Object.keys(this.copydata).length!=0){
					this.pastedisable=false;
				}
				
				}
				
				
			},
			
			
			//控制pop框的出现
            popovershow($event,val,nownum){
				if(this.ctrlFlag) return;
					if(nownum!=this.presentval){
						this.visibles=false; 
					}else{
					}
						this.presentval=nownum;
					//为空的时候出现pop框
					if(Object.keys(val).length==0&&this.delflag==true){
					this.visibles=true;  
					this.$nextTick(function(){
						this.visibles=true;  
						var pop=this.$refs.popover;
						pop.popperJS._reference=$event.target;
						//边框颜色配置
	//                  pop.popperElm.style.border='solid 2px black ';
						//3d 定位
	                 pop.popperJS._options.gpuAcceleration=true;
							pop.popperJS.update();           	 	
							})
					}
             },
             
             
             //统一高度 删除数据
			domdatas(val,location){
				this.delflag=false;
                
 
				if(val.valtype==false){
					let str = `week${location[1]}`;
					this.yhpbtzval[str]={};	
				}else{
					let str = `week${location[1]+1}`;
					//覆盖之前空的类容
					this.yhpb[location[0]][str] = {};
						
				}
				
				var _this=this;
				setTimeout(function(){
					_this.delflag=true;
					_this.domdata();
				},200);
			},
               
               
			
			handleScroll (scrollTop) {
			},


             
			
			
		 menuLeave(){//菜单移出
				this.ismou = false;
				setTimeout( () =>{
					if(!this.ismou){
						this.$refs.contextmenu.hide();
					};
				},50)
				
			},
			menuShow(){//菜单移入
				this.ismou = true;
				this.timer = setTimeout( ()=>{
					window.clearTimeout(this.timer2);
					this.$refs.contextmenu.show();
				},50);
			},
			mouenter(index,item){//ul列表移入
				
				if(item instanceof Array){
					this.popdisable=false;	
				}else{
					if(item.checked==false){	   			
					this.popdisable=true;		
			    	}else{
			    	this.popdisable=false;		
			    	}
					
				}

				  if(index==this.rightindex){
				  	this.ismou = true;
				  };
				
				
			},
			mouseOut(){//ul列表移出
				this.ismou = false;
				this.timer2 = setTimeout( () =>{
					this.$refs.contextmenu.hide();
				},100)
			},
			relationship(flag){
			if(this.isGroup) return;
			var yhpb=this.yhpbtz;
			//需要装配的数据
			var yhpbarray=[];
			//复制的排班数据
			var tempyhpbtz=[];
			var num=0;
			
			   for (var c=0;c<yhpb.length;c++) {
			   	 tempyhpbtz.push(yhpb[c]);
			   }
			   
			   
			   
			   for(var a=0;a<yhpb.length;a++){
					if(yhpb[a] instanceof Array){
					}else{
						if(yhpb[a].checked==true){					
							num++;
						}
					
					}
				}
			   
			   
			   
			
			
				for(var a=0;a<yhpb.length;a++){
					if(yhpb[a] instanceof Array){
					}else{
						if(yhpb[a].checked==true&&num>=2){	
							yhpb[a].background='';
							yhpbarray.push(yhpb[a]);
	                       for (var d=0;d<tempyhpbtz.length;d++) {
	                       	     if(tempyhpbtz[d].id==yhpb[a].id){
	                       	     	tempyhpbtz.splice(d,1);
	                       	     }
	                       } 
						}
					
					}
				}
				
				//把带放在第一位置
				for(var e=0;e<yhpbarray.length;e++){
					if(yhpbarray[e].relation=='带'){
						var temp=yhpbarray[e];
						yhpbarray.splice(e,1);
						yhpbarray.unshift(temp);		
					}
				}
				
				
				if(yhpbarray.length>=2){
				 tempyhpbtz.push(yhpbarray);
				  this.$message({message: '恭喜你,带学关系配置成功!', type: 'success'});
				}else{
					  this.$message.error('创建失败,请勾选两条或两条以上的数据！');
				}
			
			 
			 
			 this.yhpbtz=tempyhpbtz;
			 
			this.domdata();
			},
			
			changerelation(val){
				
				if(val.checked==true){
					this.popdisable=false;	
				}else{
					this.popdisable=true;	
				}
				
				//我取消了带 我要把其他的都清空
				if(val.relation=='带'){
					
					 this.$confirm('取消带 关系会清空所有关系配置, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          showCancelButton:false,
		          type: 'warning'
		       }).then(() => {
		          	for(var a=0;a<this.yhpbtz.length;a++){
					if(this.yhpbtz[a] instanceof Array){		
					}else{
					this.yhpbtz[a].checked=false;
					this.yhpbtz[a].relation='';
					}
				}
		        }).catch(() => {
		        	val.checked=true;
		        	val.relation='带';         
		        });
				}
				
				var tempnum=0;
				for(var a=0;a<this.yhpbtz.length;a++){
					if(this.yhpbtz[a] instanceof Array){
						
					}else{
						if(this.yhpbtz[a].checked==true){
							tempnum++;
						}
						
						
					}
				}

				if(val.checked==true){
					if(tempnum==1){
					val.relation='带';	
					}else{
					val.relation='学';
					}
					
					
				}else{
					val.relation='';
				}
			},
			
			clickEventsave(flag){
				if(!this.isGroup) return;
				if(flag == false){
				var rightvalcopy=[];
				
				for (var a=0;a<this.rightval.length;a++){	
					rightvalcopy.push(this.rightval[a]);
				}
				
				for (var b=0;b<this.rightval.length;b++){			
					if(this.rightval[b].checked==false){		
						this.yhpbtz.push(this.rightval[b]);				
						rightvalcopy.splice(b,1);
					}
				}
							this.yhpbtz[this.rightindex]=rightvalcopy;
							this.$message({  message: '恭喜你，配置保存成功', type: 'success' });
				}
			},

 			clickEventrelieve(flag) {
				if(!this.isGroup) return;
				if(flag == false) {
				this.yhpbtz.splice([this.rightindex], 1);

				for(var a = 0; a < this.rightval.length; a++) {
							this.yhpbtz.push(this.rightval[a]);
						}

					this.pagedisable = true;
				}
			},
			
			Eventrelieveconfiguration(){
				if(!this.isGroup) return;
				this.yhpbtz.splice([this.rightindex],1);
				for (var a=0;a<this.rightval.length;a++){
					this.rightval[a].relation='';
					this.rightval[a].checked=false;
					this.yhpbtz.push(this.rightval[a]);
				}
				
				this.pagedisable=true;
			},
			
			rightevent(val,index){
				this.isGroup = true;
				this.rightval=val;
				this.rightindex=index;
				var tempnum=0;
				if(val instanceof Array){
					
					for(var a=0;a<val.length;a++){
						  if(val[a].checked==true){
						  	tempnum++;
						  }
					}
					for(var a=0;a<val.length;a++){
						val[a].background='#fcf8e3';
						this.pagedisable=false;
							// console.log('我触发了菜单');
						if(val[a].relation=='带'){
							if(val[a].checked==true&&tempnum>=2){
							
								this.menudisable=false;
									this.$refs.contextmenu.show();
							}else{
								this.menudisable=true;
							}
							
						}
						
					}
				}else{
					this.pagedisable=true;
					this.$refs.contextmenu.hideAll();
					val.background='#fcf8e3';
				}
				
			},
			
			hideright(){
				for(var a=0;a<this.yhpbtz.length;a++){
					if(this.yhpbtz[a] instanceof Array){
						for(var b=0;b<this.yhpbtz[a].length;b++){
							this.yhpbtz[a][b].background='';
						}
						
					}
					
				}
			},
			
			showright(){			
				   var tempname='';
					for(var a=0;a<this.yhpbtz.length;a++){
					if(this.yhpbtz[a] instanceof Array){
						
						
						
					}else{
						if(this.yhpbtz[a].relation=='带'){
							this.menudisablerelieve=true;					
							tempname=this.yhpbtz[a].name;
							break;
						}else{
							this.menudisablerelieve=false;
						}
						
						
					}
				}
				
				
				
				
				
				if(this.menudisablerelieve==true){
			  this.$message.error('['+tempname+']'+ ' 带学关系尚未配置完成!');
				}
			},
			
			
			closerightevent(val){
				this.mouseOut();
				if(val instanceof Array){
					for(var a=0;a<val.length;a++){
						val[a].background='';
					}
				}else{
					val.background='';
				}
				val.background='';
			},
			
			turnaround(index){
				var temp=0;
				for(var a=0;a<this.yhpbtz.length;a++ ){
					 if(this.yhpbtz[a].fontcolor!=''){
					 	temp++;
					 }
				}
				this.yhpbtz[index].fontcolor==''?this.yhpbtz[index].fontcolor='red':this.yhpbtz[index].fontcolor='';
				
				
				if(temp>0){
					for(var a=0;a<this.yhpbtz.length;a++ ){
					 this.yhpbtz[a].fontcolor='';				
				}
				}
			
				
				
				
			},
			
			//处理数据
			processdata(){
			},
			
			//拖拽行	
			rowDrop(){
			
				const _this = this
				const tbody = document.querySelector('#text');

				Sortable.create(tbody, {
					animation: 150,
					// Element dragging ended
					onEnd({
						newIndex,
						oldIndex
					}) {
						const currRow = _this.yhpbtz.splice(oldIndex, 1)[0]
						_this.yhpbtz.splice(newIndex, 0, currRow)
						_this.domdata();
						//						  _this.$forceUpdate();
					},

				})
			},

			    domdata(){
      this.tr = this.$refs.tablesdom.children[1].children;
      var indexNum = null; //存第一个为数组的最大索引
      let index = null; //存单个排列第一位的索引
      let cont = 0;
      let len = 0;
      for (var a = 0; a < this.yhpbtz.length; a++) {
        if (this.yhpbtz[a] instanceof Array) {
          cont++;
        }
      }
      for (var a = 0; a < this.yhpbtz.length; a++) {
        if (this.yhpbtz[a] instanceof Array) {
          //为数组的情况
          if (cont < 2) {
            let num = a;
            for (let b = 0; b < this.yhpbtz[a].length; b++) {
              this.yhpbtz[a][b].height = this.tr[b + num+1].clientHeight - 0.2;
            }
            if (a === 0) {
              indexNum = this.yhpbtz[a].length - 1;
            }
          } else {
            for (let b = 0; b < this.yhpbtz[a].length; b++) {
              this.yhpbtz[a][b].height =
              this.tr[b + this.ergodic(a)+1].clientHeight - 0.2;
            }
          }
        } else {
          //不是数组
          // 情况一:索引为0
          if (cont > 1) {
            this.yhpbtz[a].height = this.tr[this.ergodicMax(a)].clientHeight - 0.2;
          } else {
            if (a === 0) {
              this.yhpbtz[a].height = this.tr[a + a+1].clientHeight - 0.2;
              index = a;
            } else {
              // 情况二:索引不为0
              if (this.yhpbtz[a - 1] instanceof Array) {
                index = this.yhpbtz[a - 1].length - 1;
              }
              if (this.yhpbtz[0] instanceof Array) {
                //1、列表第一个为数组
                this.yhpbtz[a].height =
                  this.tr[a + indexNum+1].clientHeight - 0.2;
              } else {
                //2、列表第一个不为数组
                this.yhpbtz[a].height = this.tr[a + index+1].clientHeight - 0.2;
              }
            }
          }
        }
      }
    },
	ergodic(num) {
      let sum = 0;
      this.yhpbtz.forEach((v, i) => {
        if (i < num) {
          sum = sum + (v.length || 1);
        }
	    });
      return sum;
    },
    ergodicMax(num) {
      let sum = 0;
      this.yhpbtz.forEach((v, i) => {
        if (i <= num) {
          sum = sum + (v.length || 1);
        }
      });
      return sum;
    },

			
			

		},

	}
</script>

<style scoped>
	.trthstyle{
		min-width: 120px;
	}
	
	.tbodytdstyle{
		height:50px;
	}
	.tdctrl{
		background: #fcf8e3;
	}
    .yhpbstyle{
    	border:  solid 2px black;
    }


	.menuList{
		padding: 0;
		border: none;
	}
	.menuList li{
        margin: 0;
		padding:6px 10px;
		border:1px solid #e8e8e8;
        border-bottom: none;
	}
	.menuList .disItem{
		color:#ccc;
		cursor: not-allowed;
	}
	.menuList li:last-of-type{
        border-bottom:1px solid #e8e8e8;
    }
	
	
	#changeplaceicon{
		cursor: pointer;
		transform: rotate(90deg);
	}
	
	.Holidays{
		width: 120px;
		background-color:#EEEEEE;
	}
	
	#Schedulingtd {
		padding: 5px;
	}
	
	#Schedulingtd:hover{
		background: #fcf8e3;
	}
	
	.dragstyle:hover {
		cursor: Move;
	}
	
	.dragstyle {
		background: skyblue;
	}
	
	@tables-width: 900px;
	.dragstyle_1 {
		border-top: solid 0.4px #EBEEF5;
		border-left: solid 1px #EBEEF5;
		border-right: solid 1px #EBEEF5;
		border-bottom: solid 1px #EBEEF5;
		width: @tables-width;
		line-height: 18px;
		font-size: 12px;
		padding: 6px;
		position: relative;
		bottom: 4px;
		left: 2px;
		color: #606266;
	}
	
	.dragstyle_1:hover {
		background: #f5f7fa;
	}
	
	.dragstyle_1:active {
		background: #f5f7fa;
	}
	
	.dragstyle_1 td span {
		position: relative;
		left: 17px;
	}
	
	.thstyle {
		width: 100px;
		line-height: 23.8px;
		padding: 6px;
		margin: 0;
		color: #909399;
		font-size: 12px;
		border: solid 1px #EBEEF5;
		position: relative;
		bottom: 1px;
		left: 2px;
		background: white;
	}
	
	.tdstyle {
		text-align: center;
		width: @tables-width/3;
		word-break: break-all;
	}
	
	.tdstyle:hover {
		cursor: move;
	}
	
	.tables {
		width: 100%;
		margin-bottom: 1rem;
		background-color: transparent;
	}
	
	.tables th,
	.tables td {
		padding: 0.75rem;
		vertical-align: middle;
		border-top: 1px solid #dee2e6;
	}
	
	.tables thead th {
		vertical-align: bottom;
		border-bottom: 2px solid #dee2e6;
	}
	
	.tables tbody+tbody {
		border-top: 2px solid #dee2e6;
	}
	
	.tables .tables {
		background-color: #fff;
	}
	
	.tables-sm th,
	.tables-sm td {
		padding: 0.3rem;
	}
	
	.tables-bordered {
		border: 1px solid #dee2e6;
	}
	
	.tables-bordered th,
	.tables-bordered td {
		border: 1px solid #dee2e6;
	}
	
	.tables-bordered thead th,
	.tables-bordered thead td {
		border-bottom-width: 2px;
	}
	
	.tables-borderless th,
	.tables-borderless td,
	.tables-borderless thead th,
	.tables-borderless tbody+tbody {
		border: 0;
	}
	
	.tables-striped tbody tr:nth-of-type(odd) {
		background-color: rgba(0, 0, 0, 0.05);
	}
	
	.tables-hover tbody tr:hover {
		background-color: rgba(0, 0, 0, 0.075);
	}
	
	.tables-primary,
	.tables-primary>th,
	.tables-primary>td {
		background-color: #b8daff;
	}
	
	.tables-hover .tables-primary:hover {
		background-color: #9fcdff;
	}
	
	.tables-hover .tables-primary:hover>td,
	.tables-hover .tables-primary:hover>th {
		background-color: #9fcdff;
	}
	
	.tables-secondary,
	.tables-secondary>th,
	.tables-secondary>td {
		background-color: #d6d8db;
	}
	
	.tables-hover .tables-secondary:hover {
		background-color: #c8cbcf;
	}
	
	.tables-hover .tables-secondary:hover>td,
	.tables-hover .tables-secondary:hover>th {
		background-color: #c8cbcf;
	}
	
	.tables-success,
	.tables-success>th,
	.tables-success>td {
		background-color: #c3e6cb;
	}
	
	.tables-hover .tables-success:hover {
		background-color: #b1dfbb;
	}
	
	.tables-hover .tables-success:hover>td,
	.tables-hover .tables-success:hover>th {
		background-color: #b1dfbb;
	}
	
	.tables-info,
	.tables-info>th,
	.tables-info>td {
		background-color: #bee5eb;
	}
	
	.tables-hover .tables-info:hover {
		background-color: #abdde5;
	}
	
	.tables-hover .tables-info:hover>td,
	.tables-hover .tables-info:hover>th {
		background-color: #abdde5;
	}
	
	.tables-warning,
	.tables-warning>th,
	.tables-warning>td {
		background-color: #ffeeba;
	}
	
	.tables-hover .tables-warning:hover {
		background-color: #ffe8a1;
	}
	
	.tables-hover .tables-warning:hover>td,
	.tables-hover .tables-warning:hover>th {
		background-color: #ffe8a1;
	}
	
	.tables-danger,
	.tables-danger>th,
	.tables-danger>td {
		background-color: #f5c6cb;
	}
	
	.tables-hover .tables-danger:hover {
		background-color: #f1b0b7;
	}
	
	.tables-hover .tables-danger:hover>td,
	.tables-hover .tables-danger:hover>th {
		background-color: #f1b0b7;
	}
	
	.tables-light,
	.tables-light>th,
	.tables-light>td {
		background-color: #fdfdfe;
	}
	
	.tables-hover .tables-light:hover {
		background-color: #ececf6;
	}
	
	.tables-hover .tables-light:hover>td,
	.tables-hover .tables-light:hover>th {
		background-color: #ececf6;
	}
	
	.tables-dark,
	.tables-dark>th,
	.tables-dark>td {
		background-color: #c6c8ca;
	}
	
	.tables-hover .tables-dark:hover {
		background-color: #b9bbbe;
	}
	
	.tables-hover .tables-dark:hover>td,
	.tables-hover .tables-dark:hover>th {
		background-color: #b9bbbe;
	}
	
	.tables-active,
	.tables-active>th,
	.tables-active>td {
		background-color: rgba(0, 0, 0, 0.075);
	}
	
	.tables-hover .tables-active:hover {
		background-color: rgba(0, 0, 0, 0.075);
	}
	
	.tables-hover .tables-active:hover>td,
	.tables-hover .tables-active:hover>th {
		background-color: rgba(0, 0, 0, 0.075);
	}
	
	.tables .thead-dark th {
		color: #fff;
		background-color: #212529;
		border-color: #32383e;
	}
	
	.tables .thead-light th {
		color: #495057;
		background-color: #e9ecef;
		border-color: #dee2e6;
	}
	
	.tables-dark {
		color: #fff;
		background-color: #212529;
	}
	
	.tables-dark th,
	.tables-dark td,
	.tables-dark thead th {
		border-color: #32383e;
	}
	
	.tables-dark.tables-bordered {
		border: 0;
	}
	
	.tables-dark.tables-striped tbody tr:nth-of-type(odd) {
		background-color: rgba(255, 255, 255, 0.05);
	}
	
	.tables-dark.tables-hover tbody tr:hover {
		background-color: rgba(255, 255, 255, 0.075);
	}
	
	.tables {
		border-collapse: collapse !important;
	}
	
	/*.tables td,
	.tables th {
		background-color: #fff !important;
	}*/
	
	.tables-bordered th,
	.tables-bordered td {
		border: 1px solid #dee2e6 !important ;
	}
	
	.tables-dark {
		color: inherit;
	}
	
	.tables-dark th,
	.tables-dark td,
	.tables-dark thead th,
	.tables-dark tbody+tbody {
		border-color: #dee2e6;
	}
	
	.tables .thead-dark th {
		color: inherit;
		border-color: #dee2e6;
	}
	
	.list-group {
		display: -ms-flexbox;
		display: flex;
		-ms-flex-direction: column;
		flex-direction: column;
		padding-left: 0;
		margin: 0;
		margin-bottom: -1px;
	}
	
	.list-group-item-action {
		width: 100%;
		color: #495057;
		text-align: inherit;
	}
	
	.list-group-item:hover {
		cursor: move;
	}
	
	.list-group-item-action:hover,
	.list-group-item-action:focus {
		color: #495057;
		text-decoration: none;
		background-color: #f8f9fa;
	}
	
	.list-group-item-action:active {
		color: #212529;
		background-color: #e9ecef;
	}
	
	.list-group-item {
		position: relative;
		display: block;
		padding: 0.75rem 1.25rem;
		margin: -1px;
		background-color: #fff;
		border: 1px solid rgba(0, 0, 0, 0.125);
	}
	
	.list-group-item:first-child {
		border-top-left-radius: 0.25rem;
		border-top-right-radius: 0.25rem;
	}
	
	.list-group-item:last-child {
		margin-bottom: 0;
		border-bottom-right-radius: 0.25rem;
		border-bottom-left-radius: 0.25rem;
	}
	
	.list-group-item:hover,
	.list-group-item:focus {
		z-index: 1;
		text-decoration: none;
	}
	
	.list-group-item.disabled,
	.list-group-item:disabled {
		color: #6c757d;
		background-color: #fff;
	}
	
	.list-group-item.active {
		z-index: 2;
		color: #fff;
		background-color: #007bff;
		border-color: #007bff;
	}
	
	.list-group-flush .list-group-item {
		border-right: 0;
		border-left: 0;
		border-radius: 0;
	}
	
	.list-group-flush:first-child .list-group-item:first-child {
		border-top: 0;
	}
	
	.list-group-flush:last-child .list-group-item:last-child {
		border-bottom: 0;
	}
	
	.list-group-item-primary {
		color: #004085;
		background-color: #b8daff;
	}
	
	.list-group-item-primary.list-group-item-action:hover,
	.list-group-item-primary.list-group-item-action:focus {
		color: #004085;
		background-color: #9fcdff;
	}
	
	.list-group-item-primary.list-group-item-action.active {
		color: #fff;
		background-color: #004085;
		border-color: #004085;
	}
	
	.list-group-item-secondary {
		color: #383d41;
		background-color: #d6d8db;
	}
	
	.list-group-item-secondary.list-group-item-action:hover,
	.list-group-item-secondary.list-group-item-action:focus {
		color: #383d41;
		background-color: #c8cbcf;
	}
	
	.list-group-item-secondary.list-group-item-action.active {
		color: #fff;
		background-color: #383d41;
		border-color: #383d41;
	}
	
	.list-group-item-success {
		color: #155724;
		background-color: #c3e6cb;
	}
	
	.list-group-item-success.list-group-item-action:hover,
	.list-group-item-success.list-group-item-action:focus {
		color: #155724;
		background-color: #b1dfbb;
	}
	
	.list-group-item-success.list-group-item-action.active {
		color: #fff;
		background-color: #155724;
		border-color: #155724;
	}
	
	.list-group-item-info {
		color: #0c5460;
		background-color: #bee5eb;
	}
	
	.list-group-item-info.list-group-item-action:hover,
	.list-group-item-info.list-group-item-action:focus {
		color: #0c5460;
		background-color: #abdde5;
	}
	
	.list-group-item-info.list-group-item-action.active {
		color: #fff;
		background-color: #0c5460;
		border-color: #0c5460;
	}
	
	.list-group-item-warning {
		color: #856404;
		background-color: #ffeeba;
	}
	
	.list-group-item-warning.list-group-item-action:hover,
	.list-group-item-warning.list-group-item-action:focus {
		color: #856404;
		background-color: #ffe8a1;
	}
	
	.list-group-item-warning.list-group-item-action.active {
		color: #fff;
		background-color: #856404;
		border-color: #856404;
	}
	
	.list-group-item-danger {
		color: #721c24;
		background-color: #f5c6cb;
	}
	
	.list-group-item-danger.list-group-item-action:hover,
	.list-group-item-danger.list-group-item-action:focus {
		color: #721c24;
		background-color: #f1b0b7;
	}
	
	.list-group-item-danger.list-group-item-action.active {
		color: #fff;
		background-color: #721c24;
		border-color: #721c24;
	}
	
	.list-group-item-light {
		color: #818182;
		background-color: #fdfdfe;
	}
	
	.list-group-item-light.list-group-item-action:hover,
	.list-group-item-light.list-group-item-action:focus {
		color: #818182;
		background-color: #ececf6;
	}
	
	.list-group-item-light.list-group-item-action.active {
		color: #fff;
		background-color: #818182;
		border-color: #818182;
	}
	
	.list-group-item-dark {
		color: #1b1e21;
		background-color: #c6c8ca;
	}
	
	.list-group-item-dark.list-group-item-action:hover,
	.list-group-item-dark.list-group-item-action:focus {
		color: #1b1e21;
		background-color: #b9bbbe;
	}
	
	.list-group-item-dark.list-group-item-action.active {
		color: #fff;
		background-color: #1b1e21;
		border-color: #1b1e21;
	}
	.list-group-item .listItem{
		border-bottom: 1px solid rgba(0, 0, 0, 0.125);
		position: relative;
		box-sizing: border-box;
		/* top: 40% */
	}
	.list-group-item .listItem:last-of-type{
		border-bottom:none;
	}
	.topBorder{
		position: absolute;
		right: 5px;
        display: inline-block;
        height: 50%;
        width: 18px;
        border-top: 3px solid rgb(148, 202, 238);
        border-right: 3px solid rgb(148, 202, 238);
        border-top-right-radius:20%;
        bottom:0;
    }
    .centBorder{
		position: absolute;
		right: 5px;
        display: inline-block;
        bottom: 0;
        height: 100%;
        width: 18px;
        border-right: 3px solid rgb(148, 202, 238);
        /* border-radius: 3px; */
    }
    .botBorder{
		position: absolute;
		right: 5px;
        top: 0;
        display: inline-block;
        height: 50%;
        width: 18px;
        border-bottom: 3px solid rgb(148, 202, 238);
        border-right: 3px solid rgb(148, 202, 238);
        border-bottom-right-radius:20%;
    }
	.sign{
		position: static;
        color: salmon;
       
        border-radius: 20%;
        font-size: 13px
	}
	@media (max-width: 575.98px) {
		.tables-responsive-sm {
			display: block;
			width: 100%;
			overflow-x: auto;
			-webkit-overflow-scrolling: touch;
			-ms-overflow-style: -ms-autohiding-scrollbar;
		}
		.tables-responsive-sm>.tables-bordered {
			border: 0;
		}
	}
	
	
	.tooltip {
  display: block !important;
  z-index: 10000;

  .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    z-index: 1;
  }

  &[x-placement^="top"] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="bottom"] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="right"] {
    margin-left: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^="left"] {
    margin-right: 5px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
}
</style>
