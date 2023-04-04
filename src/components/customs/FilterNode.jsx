import React from 'react';
import { Handle } from 'reactflow';
import { FiFilter } from 'react-icons/fi';

const filterNodeCss = {
    width: '50px',
    height: '50px',
    padding: '5px',
    background: 'white',
    borderRadius: '100px',
    border: '1px solid black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const FilterNode = ({ data }) => {
    const customHandle = {
        background: '#ff0072',
        width: '10px',
        height: '10px',
        borderRadius: '100px',
    }
    return (
        <div>
            <Handle type="target" position="left" style={customHandle} />
            <div style={filterNodeCss}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <FiFilter />
                </div>
            </div>
            <Handle type="source" position="right" style={customHandle} />
        </div>
    );
};

export default FilterNode;
