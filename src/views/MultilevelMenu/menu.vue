<template>
    <div>
          <!--继承父类的颜色currentcolor-->
     <div style="color: red;">我是父类<br/>
     <span style="color: green;">我是子类</span><br/>
      <span style="color:currentcolor;">我是子类继承</span><br/>
     </div>
     
    </div>
</template>
<script>

export default {
    components: {
//  	TreeChart
	},
    data () {
        return {

        }
    },
    mounted () {

    },
    methods: {

    }
}
</script>
<style scoped>
   
</style>
