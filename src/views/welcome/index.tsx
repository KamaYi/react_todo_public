import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import welcome from '@/assets/images/welcome.png'
import './index.less'

function Welcome() {
    return (
        <>
            <div className="welcome" >
                {/* <img src={welcome} alt="welcome" /> */}
                欢迎页
            </div>
        </>
    )
}

export default Welcome