import React from 'react';
import { Handle } from 'reactflow';

const ChildNode = ({ data }) => {
    const customHandle = {
        background: '#ff0072',
        width: '8px',
        height: '10px',
        borderRadius: '3px',
    }
    return (
        <div>
            <Handle type="target" position="left" style={customHandle} />
            <div style={{ width: '100px', padding: '5px', background: 'white', borderRadius: '4px', border: '1px solid black' }}>{data.label}</div>
            <Handle type="source" position="right" style={customHandle} />
        </div>
    );
};

export default ChildNode;
