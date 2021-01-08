import React, { useState, useContext } from 'react';
import { CountContext } from './context-manager';


function ExampleChild() {
    let count = useContext(CountContext);

    return (
        <div style={{ backgroundColor: '#ff0', padding: '24px' }}>
            <h3>ExampleChild: count in child {count}</h3>
        </div>
    )
}

export function ExampleContext(): any {
    const [count, setCount] = useState(0);

    return (
        <div>
            <hr /><h1>useContext </h1>
            <CountContext.Provider value={count}>
                <ExampleChild />
            </CountContext.Provider>
            <button onClick={() => { setCount(count + 1) }}>Click me in Parent</button>
        </div>
    )
}