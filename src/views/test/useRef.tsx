import { useEffect, useState, memo, forwardRef, useRef } from 'react';

function UserRef() {
    const TextInput = forwardRef((props, ref: any) => {
        console.log('ref: ', ref);
        console.log('props: ', props);
        return <input ref={ref}></input>
    })
    const inputEl: any = useRef(null)
    console.log('inputEl: ', inputEl);
    const onButtonClick = () => {
        // 关键代码，`current` 指向已挂载到 DOM 上的文本输入元素
        inputEl.current.focus();
    };

    return (
        <>
            <TextInput ref={inputEl}></TextInput>
            <button onClick={onButtonClick}>Focus the input</button>
        </>
    )
}

export default UserRef