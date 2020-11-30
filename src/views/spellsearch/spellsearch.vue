<template>
	<div style="text-align: center;">
		
		<div>
		  <el-alert
			 center
		    title="模糊查询加首字母拼音搜索"
		    type="success"
		    :closable="false">
		  </el-alert>	
		</div>
		<br />
  <el-select v-model="sepllValue" clearable  	@visible-change='restore'  :filter-method="handleCityFilter" filterable placeholder="请输入首字母或者文字">
    <el-option
      v-for="item in Options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
	</div>
	
</template>
<script>
import spelldata from './spelldata.json';
	
export default {
    data(){
      return {
        Options:[],
        sepllValue:'',
      }
    },
    
    mounted(){
    	//将默认值带入
    	this.restore();
    },
    
    methods:{
    	restore(flag){
    		if(flag==true){
    		this.Options=spelldata;	
    		}
    	},
    	
    	handleCityFilter(keyWord){
    	//将所有大写转换为小写
    	var keyWordLower=keyWord.toLowerCase();
	    var len = spelldata.length;
	    var arr = [];
	    //new 正则表达式 放入对象值
	    var reg = new RegExp(keyWordLower);
	    //循环动态数据通过match进行匹配
	    for(var i=0;i<len;i++){
	        //如果字符串中不包含目标字符会返回-1 比配拼音和文字
	        if(spelldata[i].py.match(reg)||spelldata[i].label.match(reg)){
	            arr.push(spelldata[i]);
	        }
	    }
	    //将值放入数据源
	    this.Options=arr;
	
    }
}
    }
</script>