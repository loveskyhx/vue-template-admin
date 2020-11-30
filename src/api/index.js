import axios from 'axios';
import * as text from '../api/text';
//导入element相应样式
import { Message } from 'element-ui'
//配置默认的IP地址
//axios.defaults.baseURL = config.ip;
// 带cookie请求
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true;

//添加响应拦截器
axios.interceptors.request.use(
    config =>{
        //在发送请求之前做某事	
        return config;
    },
    err => {
    	//请求错误时做些事
        return Promise.reject(err);
    }
);

//添加响应拦截器 当接口错误时 返回接口提示值
axios.interceptors.response.use((response) => {
    //store.dispatch('loading', false);
    switch (response.data.code){
        case '500':
            Message({
                message: response.data.message,
                type: 'error'
            });
            break;
    }
    return response;
}, (error) => {
    return Promise.reject(error)
});

//将接口导出在项目中
export {
  text,
}