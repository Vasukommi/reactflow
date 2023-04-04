import React, { useState, useEffect } from 'react';
import { PuffLoader } from 'react-spinners';
import useStore from '../../app/store';
import './Popup.css';

const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
}


const PopupOutput = ({ onClose }) => {
    const [isLoading, setLoadingStatus] = useState(true);
    const [isError, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const allNodes = useStore((state) => state.allNodes);
    const allEdges = useStore((state) => state.allEdges);
    const filterValue = useStore((state) => state.filterValue);
    const filterHeader = useStore((state) => state.filterHeader);
    const input = useStore((state) => state.input);
    const selectedTables = useStore((state) => state.selectedTables);
    const selectedHeaders = useStore((state) => state.selectedHeaders);

    const setShowPopup = () => {
        onClose()
    }

    useEffect(() => {
        const getOutput = async () => {
            try {
                const data = {
                    allNodes,
                    allEdges,
                    filterValue,
                    filterHeader,
                    input,
                    selectedTables,
                    selectedHeaders
                }
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
                const response = await fetch('http://localhost:4000/renderWorkflowOutput', options);
                const responseData = await response.json();
                if (responseData.isError) {
                    setError(!isError)
                    setErrorMessage(responseData.message)
                    setLoadingStatus(!isLoading)
                }
                return
                debugger
            } catch (error) {
                console.log(error.message)
            }
        }
        getOutput()
    },[])

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
                <div style={{ height: '100%', Width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <PuffLoader loading={isLoading} css={override} size={50} />
                    {isError && <div>{errorMessage}</div>}
                </div>
                <div>
                    <button onClick={() => setShowPopup(false)}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default PopupOutput;