import React from 'react';
import { connect } from 'dva';

export default function checkLogin(Template) {
    class Tmp extends React.Component {
        render () {
            // 判断是否登录
            let isLogin = JSON.parse(window.sessionStorage.getItem('user') || false);
            if (!isLogin) {
                alert('没有登录');
                window.location.href = '/login';
                return;
            };
            return <Template/>
        }
    }
    return connect(state=>{
        return {
            isLogin: state.admin.isLogin
        }
    })(Tmp);
}