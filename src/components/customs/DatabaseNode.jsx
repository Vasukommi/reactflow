import React from 'react';
import { Handle } from 'reactflow';
import { BsDatabaseFillAdd } from 'react-icons/bs';

const DatabaseNode = ({ data }) => {
    const customHandle = {
        background: '#ff0072',
        width: '8px',
        height: '10px',
        borderRadius: '3px',
    }
    return (
        <div>
            <Handle type="target" position="left" style={customHandle} />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Database <BsDatabaseFillAdd /></div>
            <Handle type="source" position="right" style={customHandle} />
        </div>
    );
};

export default DatabaseNode;
