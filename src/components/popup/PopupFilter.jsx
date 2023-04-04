import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import useStore from '../../app/store';
import './Popup.css';

const options = [
    { label: 'Greater Than', value: 'GREATERTHAN' },
    { label: 'Less Than', value: 'LESSTHAN' },
    { label: 'Equal To', value: 'EQUALTO' },
    { label: 'Not Equal To', value: 'NOTEQUALTO' },
    { label: 'Includes', value: 'INCLUDES' }
]

const PopupFilter = ({ onClose, onApply, activeNode, addChildreNodes }) => {
    const allHeaders = useStore((state) => state.selectedHeaders)
    const [selectedOptions, setSelectedOptions] = useState(useStore((state) => state.filterValue));
    const [inputValue, setInputValue] = useState(useStore((state) => state.input));
    const [Headers, setHeaders] = useState(useStore((state) => state.filterHeader));
    const addInput = useStore(state => state.addInput);
    const addFilterValue = useStore(state => state.addFilterValue);
    const addfilterHeader = useStore(state => state.addfilterHeader);

    const setShowPopup = () => {
        onClose()
    }

    const onNodesApply = () => {
        addInput(inputValue)
        addFilterValue(selectedOptions)
        addfilterHeader(Headers)
        onClose();
    };

    const handleOptionChange = (event) => {
        setSelectedOptions(event.target.value);
    };
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
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
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: '100%', textAlign: 'start' }}>
                    <p style={{ textAlign: 'start' }}>Filter</p>
                    <select style={{
                        padding: "10px",
                        borderRadius: "5px",
                        backgroundColor: "#f7f7f7",
                        border: "none",
                        boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.1)",
                        marginBottom: "20px",
                        width: '100%'
                    }} value={selectedOptions} onChange={handleOptionChange}>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <div style={{ width: '100%' }}>
                        <p style={{ textAlign: 'start' }}>Tables Headers</p>
                        <Select
                            options={allHeaders}
                            value={Headers}
                            onChange={setHeaders}
                        />
                    </div>
                    <div style={{ width: '100%' }}>
                        <p style={{ textAlign: 'start' }}>Filter Value</p>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Enter a value"
                            style={{
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.1)",
                                marginBottom: "20px",
                                width: '96%'
                            }}
                        />
                    </div>
                </div>
                <div>
                    <button onClick={() => setShowPopup(false)}>Close</button>
                    <button onClick={() => onNodesApply()}>Apply changes</button>
                </div>
            </div>
        </div>
    );
};

export default PopupFilter;