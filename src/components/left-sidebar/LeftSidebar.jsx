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
                    Inegrations
                </h1>
                <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'Database')} draggable>
                    <button style={{ height: '50px', width: '300px', marginBottom: '10px' }}>Database</button>
                </div>
                <h1 style={{ margin: '20px', textAlign: 'start' }}>
                    Filters
                </h1>
                <div className="dndnode" onDragStart={(event) => onDragStart(event, 'OR')} draggable>
                    <button style={{ height: '50px', width: '300px', marginBottom: '10px' }}>OR</button>
                </div>
                <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'GroupBy')} draggable>
                    <button style={{ height: '50px', width: '300px', marginBottom: '10px' }}>GroupBy</button>
                </div>
                <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'SortBy')} draggable>
                    <button style={{ height: '50px', width: '300px', marginBottom: '10px' }}>SortBy</button>
                </div>
            </aside>
        </div>
    )
}

export default LeftSidebar