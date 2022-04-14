import React from 'react';
import load from './load.gif'
const Spinner=()=> {
    return (
    <div className='text-center'>
        <img src={load} alt="load" width={"50vh"} />
    </div>
    )
}

export default Spinner;
