import React, { useState, useReducer } from 'react';
const initialState = { count: 0 };
function reducer(state: { count: number; }, action: { type: any; }) {
    switch (action.type) {
        case 'reset':
            return initialState;
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        case 'ride':
            return { count: state.count * 10 };
        default:
            // A reducer must always return a valid state.
            // Alternatively you can throw an error if an invalid action is dispatched.
            return state;
    }
}

function ExampleReducer({ initialCount }: any) {
    const [state, dispatch] = useReducer(
        reducer,
        initialState
    );

    return (
        <>
            Count: {state.count}
            <button
                onClick={() => dispatch({ type: 'reset' })}>
                Reset
        </button>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
            <button onClick={() => dispatch({ type: 'ride'}) }>*</button>
        </>
    );
}

export default ExampleReducer