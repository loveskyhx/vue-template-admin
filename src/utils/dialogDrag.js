import Vue from 'vue';

// v-dialogDrag: 弹窗拖拽指令  如果非弹出框 则需要 .drag__header 自定义把手位置 
Vue.directive('dialogDrag', {
    bind(el, binding, vnode, oldVnode){
    	//获取element的头部el
        var dialogHeaderEl = el.querySelector('.el-dialog__header');
        var dragDom = el.querySelector('.el-dialog');
        //非弹出框自定义拖拽
        if(el.querySelector('.el-dialog')==null&&el.querySelector('.el-dialog__header')==null){
          	       dialogHeaderEl = el.getElementsByClassName('.drag__header')[0]; //把手位置
                   dragDom = el;
        }

        
        //将鼠标的图标改为移动的样式
        dialogHeaderEl.style.cursor = 'Move';

        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
        
        dialogHeaderEl.onmousedown = (e) => {
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - dialogHeaderEl.offsetLeft;
            const disY = e.clientY - dialogHeaderEl.offsetTop;
            
            // 获取到的值带px 正则匹配替换
            let styL, styT;

            // ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
            if(sty.left.includes('%')) {
                styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
                styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
            }else {
                styL = +sty.left.replace(/\px/g, '');
                styT = +sty.top.replace(/\px/g, '');
            };
            
            document.onmousemove = function (e) {
                // 通过事件委托，计算移动的距离 
                const l = e.clientX - disX;
                const t = e.clientY - disY;

                // 移动当前元素               
                if(el.getElementsByClassName('.drag__header')[0]!=null){
                	    dragDom.style.top = `${t + styT}px`;
                }else{
                	dragDom.style.left = `${l + styL}px`;
                    dragDom.style.top = `${t + styT}px`;
                }
                
               
//             //(dragDom.style.width);
//               //(dragDom.offsetHeight);
//                //(document.body.offsetHeight);
            };

            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }  
    }
})

