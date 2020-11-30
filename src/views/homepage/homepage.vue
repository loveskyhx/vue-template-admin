<template>
	<div>
		
		<el-row>
			<el-col style='text-align: center;font-size: 20px;font-weight: 600;color: red;'>你好！欢迎进入管理模板</el-col>
		</el-row>
		<br />
<el-row>
	<el-col :span='12'>
		<ve-histogram :data="chartData"></ve-histogram>
	</el-col>
	
		<el-col :span='12'>
		<ve-line :data="chartData"></ve-line>
	</el-col>
</el-row>	

<el-row>
	<el-col :span='12'>
		 <ve-pie :data="chartData"></ve-pie>
	</el-col>
	
		<el-col :span='12'>
		<ve-radar :data="chartData"></ve-radar>
	</el-col>
</el-row>	
	
  </div>
</template>

<script>
  export default {
  	
  	activated(){
  	
  	},
  	
    data () {
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
        }
      }
    }
  }
</script>