<template>
	<div>	
		<el-tooltip :content="fullscreen ? `取消全屏`:`全屏`"   placement="bottom" effect="dark">
		<i id='Fullscreen' @click="handleFullScreen"  class="fa fa-desktop" aria-hidden="true"></i>
		</el-tooltip>	
			
		<el-tooltip :content="openpet ? `取消助手`:`开启助手`"   placement="bottom" effect="dark">
		<i id='petstyle' @click="handlepet"  class="fa fa-paw" aria-hidden="true"></i>
		</el-tooltip>	
			
	</div>
	
</template>

<script>
	export default{
		data(){
			return{	
	  			
      fullscreen: false,
	  openpet:true,
			}
		},
		
		mounted() {
			

		},
		methods:{
			handlepet(){
				if(this.openpet){	
					document.getElementById('live2dcanvas').style.visibility='hidden'																	
				}else{
					document.getElementById('live2dcanvas').style.visibility='visible'
				}
				
				
				document.getElementById("live2dcanvas").addEventListener('onclick',function(){
				});
				this.openpet = !this.openpet;
			},
			
			
			
	
			
			 handleFullScreen(){
                let element = document.documentElement;
                //离开全屏 以下判断是处理兼容
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                	//进入全屏 以下判断是处理兼容
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            },
		},
	}
	
</script>

<style>
	#Fullscreen{
		font-size: 18px;
		color: white;
		cursor: cell;
        
	}
	#Fullscreen:hover{
		opacity: 0.7;
	}
	#petstyle{
		margin-left: 5px;
	}
	
	#petstyle:hover{
		opacity: 0.7;
	}
</style>