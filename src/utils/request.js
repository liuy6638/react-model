import Axios from "axios";
import { serviceHost, port } from '../config';

let req = Axios.create({ baseURL: `${serviceHost}:${port}` });

export default function request( url='', options={}){
    return () => {
        // 请求拦截 
        if (!url.includes('index')) {
            let isLogin = JSON.parse(window.sessionStorage.getItem('user') || false);
            if (!isLogin) return Promise.reject('未登录!');
        }
        if (url === '') return Promise.reject('必须传递url');
        // 设置默认的 请求方式get, 请求头'Content-Type': 'application/json; charset=utf-8'
        return req({ 
            url, 
            method: 'get', 
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            ...options
        });
    }
}
