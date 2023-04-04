import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import useStore from '../../app/store';
import './Popup.css';

let id = 0;
const getId = () => `child_${id++}`;

const PopupSortBy = ({ onClose, onApply, activeNode, addChildreNodes }) => {
    const test = useStore((state) => state.selectedTables)
    debugger
    const [selectedOptions, setSelectedOptions] = useState(useStore((state) => state.selectedTables));
    const [selectedHeaders, setHeaderOptions] = useState(useStore((state) => state.selectedHeaders));
    const [options, setOptions] = useState([]);
    const addTables = useStore(state => state.addTables);
    const addHeaders = useStore(state => state.addHeaders);

    const setShowPopup = () => {
        onClose()
    }

    const onNodesApply = () => {
        const parentNode = activeNode;
        const childNodes = [];
        let y = parentNode.position.y + parentNode.height;
        let totalHeight = 0;
        selectedHeaders.forEach((child) => {
            childNodes.push({
                id: getId(),
                type: 'ChildNode',
                data: { label: `${child.label}` },
                position: { x: 10, y },
                parentNode: parentNode.id,
                extent: 'parent',
            });
            y += 50;
            totalHeight += 15;
        });
        addChildreNodes(childNodes, activeNode);
        addTables(...selectedOptions)
        addHeaders(...selectedHeaders)
        onClose();
    };
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 10 }}>
            <div style={
                {
                    height: '500px',
                    width: '500px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '5px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }
            }>
                <div style={{ minWidth: '100%' }}>

                </div>
                <div>
                    <button onClick={() => setShowPopup(false)}>Close</button>
                    <button onClick={() => onNodesApply()}>Apply changes</button>
                </div>
            </div>
        </div>
    );
};

export default PopupSortBy;