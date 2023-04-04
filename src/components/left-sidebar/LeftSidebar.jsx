import React from 'react';
import DatabaseNode from "../customs/DatabaseNode.jsx";
import "./index.css";

const LeftSidebar = () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };
    return (
        <div style={{ height: '90vh', width: '24vw', border: '1px solid black', boxSizing: 'border-box' }}>
            <aside>
                <h1 style={{ margin: '20px', textAlign: 'start' }}>
                    Integrations
                </h1>
                <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'Database')} draggable>
                    <button style={{ height: '50px', width: '300px', marginBottom: '10px' }}>Database</button>
                </div>
                <h1 style={{ margin: '20px', textAlign: 'start' }}>
                    Filters
                </h1>
                <div className="dndnode" onDragStart={(event) => onDragStart(event, 'Filter')} draggable>
                    <button style={{ height: '50px', width: '300px', marginBottom: '10px' }}>Filter</button>
                </div>
                <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'SortBy')} draggable>
                    <button style={{ height: '50px', width: '300px', marginBottom: '10px' }}>SortBy</button>
                </div>
                <h1 style={{ margin: '20px', textAlign: 'start' }}>
                    Output
                </h1>
                <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'output')} draggable>
                    <button style={{ height: '50px', width: '300px', marginBottom: '10px' }}>Output</button>
                </div>
            </aside>
        </div>
    )
}

export default LeftSidebar