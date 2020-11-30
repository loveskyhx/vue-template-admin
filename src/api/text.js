import axios from 'axios'
//导入接口
export const text =params =>{
    return axios.post('/地址', params).then(res => res.data);
};
//下面是在方法中使用的例子
//	index.text(params).then(request_data => {
//					let {
//						code,
//						message,
//						data
//					} = request_data;
//					if(code === "200") {
//						
//					}
//				})



