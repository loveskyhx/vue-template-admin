<template>
    <div id="app"  ref='body'>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition> 
    </div>
</template>

<script>
    export default {
 
    }
</script>

<style lang="less">
/*控制页面切换速度*/	
    .fade-enter-active,
    .fade-leave-active {
        transition: all .1s ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }
    
 /*.el-popper[x-placement^=bottom] .popper__arrow::after{
		border-bottom-color: #000000;
		
}   

 .el-popper[x-placement^="top"]  .popper__arrow::after{
	border-top-color:#000000;	
}  
 .el-popper[x-placement^=left] .popper__arrow::after{
		border-left-color: #000000;
		
}   

 .el-popper[x-placement^="right"]  .popper__arrow::after{
	border-right-color:#000000;	
} */

</style>
