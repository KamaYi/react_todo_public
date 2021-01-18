import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';

function Welcome() {
    return (
        <Row>
            <Col span={12} offset={6}>
                col-12 col-offset-6
            </Col>
        </Row>
    )
}

export default Welcome