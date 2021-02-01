import React from 'react';
import Driver from "driver.js"; // import driver.js
import "driver.js/dist/driver.min.css"; // import driver.js css
import { Button } from "antd";
import steps from "./steps";
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
        allowClose:false
    });
    const guide = function () {
        driver.defineSteps(steps);
        driver.start();
    };
    return (
        <>
            <Button type="primary" onClick={guide}>
                打开引导
            </Button>
        </>
    );
}

export default Guide;