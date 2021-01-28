import React from 'react';
import {Link} from 'react-router-dom'

function Welcome() {
    return (
        <>
            欢迎页
            <Link to="/menu/menu1">菜单1</Link>
            <Link to="/menu/menu2/menu2_1">菜单2-1</Link>
            <Link to="/menu/menu2/menu2_2">菜单2-2</Link>
        </>
    );
}

export default Welcome;