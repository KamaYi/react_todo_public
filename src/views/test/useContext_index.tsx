import React, { useState, useContext, useRef } from 'react';
const CountContext = React.createContext(0);
function ExampleChild(this: any, props: any) {
    let count = useContext(CountContext);
    console.log('props: ', props);
    const click = props.click;
    console.log('onClick: ', click);
    const inputEl: any = useRef(null);
    const onButtonClick = () => {
        // `current` points to the mounted text input element
        inputEl.current.focus();
    };
    return (
        <div style={{ backgroundColor: '#ff0', padding: '24px' }}>
            <h3>ExampleChild: count in child {count}</h3>
            {props.name}
            <button onClick={click}> Click me in children</button>
            <input ref={inputEl} type="text" />
            <button onClick={onButtonClick}>Focus the input</button>
        </div>

        /* {<CountContext.Consumer>
        {context => (
            <div style={{ backgroundColor: '#ff0', padding: '24px' }}>
                <h3>ExampleChild: count in child {context}</h3>
            </div>
        )}
        </CountContext.Consumer>} */
    )
}

function ExampleContext() {
    const [count, setCount] = useState(0);
    function ceshi() {
        console.log('====================================');
        console.log(setCount(count + 1));
        console.log('23423423');
        console.log('====================================');
    }
    return (
        <div>
            <div>
                <hr /><h1>useContext </h1>
                <CountContext.Provider value={count}>
                    <ExampleChild click={() => { setCount(count + 1) }} name="ceshiName" />
                </CountContext.Provider>
                <button onClick={() => { setCount(count + 1) }}>Click me in Parent</button>
            </div>
        </div>
    )
}

export default ExampleContext