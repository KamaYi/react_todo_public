import React from 'react';
import Driver from "driver.js"; // import driver.js
import "driver.js/dist/driver.min.css"; // import driver.js css
import { Button } from "antd";
import steps from "./steps";
import { Statistic, Row, Col } from 'antd';

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

function Guide() {
    const driver = new Driver({
        animate: true, // 在更改突出显示的元素时是否设置动画，
        // 当header的position为fixed时，会覆盖元素，这是driver.js的bug，
        // 详细内容见https://github.com/kamranahmedse/driver.js/issues/97
        opacity: 0.75, // 背景不透明度（0表示只有弹出窗口，没有覆盖）
        doneBtnText: "完成", // 最后一个按钮上的文本
        closeBtnText: "关闭", // 此步骤的“关闭”按钮上的文本
        nextBtnText: "下一步", // 此步骤的下一步按钮文本
        prevBtnText: "上一步", // 此步骤的上一个按钮文本
        allowClose: false
    });
    const guide = function () {
        driver.defineSteps(steps);
        driver.start();
    };
    function onFinish() {
        console.log('finished!');
    }
    return (
        <>
            <Row gutter={16}>
                <Col span={12}>
                    <Countdown title="Countdown" value={deadline} onFinish={onFinish} />
                </Col>
                <Col span={12}>
                    <Countdown title="Million Seconds" value={deadline} format="HH:mm:ss:SSS" />
                </Col>
                <Col span={24} style={{ marginTop: 32 }}>
                    <Countdown title="Day Level" value={deadline} format="D 天 H 时 m 分 s 秒" />
                </Col>
            </Row>
            <Button type="primary" onClick={guide}>
                打开引导
            </Button>
        </>
    );
}

export default Guide;