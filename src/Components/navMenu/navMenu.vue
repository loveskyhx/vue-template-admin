<template>
    <div>
        <template v-for="(item, index) in list">
            <el-submenu :index="index + '_' + item.id"   class="subMenu" :key="item.id" v-if="item.children && item.children.length > 0">
                <template slot="title">
                	<i :class="item.icon" style="color: #606266;" ></i>
                   <span v-show="item.level==1?false:true">{{item.name}}</span>          
                    <span  style="position: absolute;right: 0px;"> <i :class="item.iconright"></i></span>
                </template>
                
                <navMenu :list="item.children"></navMenu>
            </el-submenu>    
             
            <el-menu-item :index="item.href+''" v-else>
               <i :class="item.icon"></i>
               {{item.name}}    
            </el-menu-item>
               
        </template>
    </div>
</template>
<script>
	//在menuTemp.json 父子节点的值必须不一致 否则会影响到切换  图标统一使用Font Awesome图标
export default {
    name: 'navMenu',
    mounted(){
  	
    },
    data() {
        return {
        	icon:'el-icon-document',
        }
    },
    props: ['list'],
    methods:{

    },
}
</script>
<style lang="less" >

.el-icon-arrow-right:before{
    content:"";
}

</style>