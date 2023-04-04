import React from 'react';
import { Handle } from 'reactflow';
import { VscOutput } from 'react-icons/vsc';

const filterNodeCss = {
    width: '50px',
    height: '50px',
    padding: '5px',
    background: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const OutputNode = ({ data }) => {
    const customHandle = {
        background: '#ff0072',
        width: '10px',
        height: '10px',
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Handle type="target" position="left" style={customHandle} />
            <div style={filterNodeCss}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    Output
                    <VscOutput />
                </div>
            </div>
        </div>
    );
};

export default OutputNode;
