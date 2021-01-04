import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { setUserInfo, UserState } from '@/store/module/user';
let showFruit = true;
function Login() {
    const [count, setState] = useState(function getInitialState() {
        const initialState = () => {
            return '34534534543'
        };
        return initialState;
    });
    useEffect(() => {
        // 更新文档的标题
        console.log(`useEffect=>你点击了${count} 次`)
        return () => {
            console.log('====================')
        }
    },[count]);
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => {}}>
                Click me
        </button>
        </div>
    );
}

export default Login
// https://react.html.cn/docs/hooks-reference.html#usestate