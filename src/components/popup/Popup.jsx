import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import useStore from '../../app/store';
import './Popup.css';

let id = 0;
const getId = () => `child_${id++}`;

const Popup = ({ onClose, onApply, activeNode, addChildreNodes }) => {
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


    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await fetch('http://localhost:4000/getAllTables');
                const responseData = await response.json();
                const { data } = responseData
                const addLabel = data.map((eachTable) => {
                    return { 'value': eachTable, 'label': eachTable }
                })
                setOptions(addLabel)
            } catch (error) {
                console.error(error);
            }
        }
        fetchOptions();
    }, []);

    useEffect(() => {
        const fetchHeaders = async () => {
            const selectedTables = selectedOptions.map((option) => option.value);
            if (selectedTables.length > 0) {
                try {
                    const response = await fetch('http://localhost:4000/getHeadersByTable', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            tables: selectedTables
                        })
                    });
                    const responseData = await response.json();
                    const { data } = responseData;
                    const headerOptions = data.map((header) => {
                        const allHeaders = header.map((headerValue) => {
                            return { 'value': headerValue, 'label': headerValue };
                        })
                        return allHeaders
                    });
                    const headerResult = []
                    headerOptions.forEach((eachArray) => headerResult.push(...eachArray))
                    setHeaderOptions([...new Set(headerResult)]);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        fetchHeaders();
    }, [selectedOptions]);

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
                    <h1 style={{ textAlign: 'start' }}>Tables</h1>
                    <Select
                        isMulti
                        options={options}
                        value={selectedOptions}
                        onChange={setSelectedOptions}
                    />
                    {selectedOptions.length > 0 && <h1 style={{ textAlign: 'start' }}>Table Headers</h1>}
                    {selectedOptions.length > 0 &&
                        <Select
                            isMulti
                            options={options}
                            value={selectedHeaders}
                            onChange={setHeaderOptions}
                        />}
                </div>
                <div>
                    <button onClick={() => setShowPopup(false)}>Close</button>
                    <button onClick={() => onNodesApply()}>Apply changes</button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
