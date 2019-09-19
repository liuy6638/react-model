import request from '../utils/request';
import { routerRedux } from 'dva/router';

let admin = {
    namespace: 'admin',
    state: {
        isLogin: false
    },
    effects: {
        // 登录 
        *doLogin({ payload }, { select, put, call }) {
            try {
                // 发送请求
                let res = yield call(request('/login', {
                    method: 'post',
                    data: JSON.stringify(payload)
                }));
                // 根据返回结果判断登陆是否成功
                let { data } = res;
                if (res.status === 200 && data.code !== "ok") return alert('用户名/密码不正确！');
                // 将返回信息存入sessionStorage
                window.sessionStorage.setItem('user', JSON.stringify(data));
                // sessionStorage中user不存在或为undefined时， 组织进入下一级目录
                if (
                    window.sessionStorage.getItem('user') === 'null' ||
                    window.sessionStorage.getItem('user') === 'undefined'
                ) {
                    alert('登陆异常');
                    yield put(routerRedux.push('/'));
                    return;
                }
                // 改变isLogin的bool
                yield put({ type: 'changeLogin', payload: { isLogin: true } });
                // 跳转页面
                yield put(routerRedux.push('/home'));
            }
            catch (err) {
                alert('登陆异常');
            }
        },
        // 登出
        *doSignout({ payload }, { select, put, call }) {
            let res = yield call(request('/signout'));
            if (res.status === 200 && res.data.code === 'ok') {
                yield put({ type: 'changeLogin', payload: { isLogin: false } });
                yield put(routerRedux.push('./login'));
                window.sessionStorage.clear();
                return;
            };
            alert('退出失败');
        },
        // 注册
        *doRegister({ payload }, { select, put, call }) {
            let res = yield call(request('/register'), {
                method: "post",
                data: JSON.stringify(payload)
            });
            if (res.status === 200 && res.data.code !== "ok") return alert('注册失败');
            yield put({ type: 'changerRegister', payload: { reg: false } });
        }
    },
    reducers: {
        changeLogin(state, { payload }) {
            return {
                isLogin: payload.isLogin
            }
        },
        changeRegister(state, { payload }) {
            return {
                reg: payload.reg
            }
        }
    }
}

export default admin;