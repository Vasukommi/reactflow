import { useState, useRef, useCallback, useEffect } from 'react';
import DatabaseNode from '../customs/DatabaseNode';
import ChildNode from '../customs/ChildNode';
import FilterNode from '../customs/FilterNode';
import SortByNode from '../customs/SortByNode';
import Popup from '../popup/Popup';
import PopupFilter from '../popup/PopupFilter';
import PopupSortBy from '../popup/PopupSortBy';
import OutputNode from '../customs/OutputNode';
import PopupOutput from '../popup/PopupOuput';
import ReactFlow, {
    MiniMap, Controls, Background, ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import "../left-sidebar/index.css";
import useStore from '../../app/store';

let id = 0;
const getId = () => `dndnode_${id++}`;

let database = 0
let shortBy = 0
let Filter = 0
let output = 0

const nodeTypes = {
    Database: DatabaseNode,
    ChildNode: ChildNode,
    Filter: FilterNode,
    SortBy: SortByNode,
    output: OutputNode
}

const WorkflowCanvas = () => {
    const [variant, setVariant] = useState('cross');
    const [activeNode, setActiveNode] = useState('');
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [showPopup, setShowPopup] = useState('');
    const allNodes = useStore(state => state.allNodes);
    const addNodesToState = useStore(state => state.addNodes);
    const addEdgesToState = useStore(state => state.addEdges);

    const onConnect = useCallback((params) => {
        const newEdges = addEdge(params, edges);
        setEdges(newEdges);
        addEdgesToState(newEdges);
    }, [edges, addEdgesToState]);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const addChildreNodes = (childNodesArray, activeNode) => {
        const totalHeight = childNodesArray.length * 75;
        const updatedNodes = nodes.map((node) => {
            if (node.id === activeNode.id) {
                const updatedHeight = parseInt(node.style.height || '0') + totalHeight;
                return {
                    ...node,
                    style: {
                        ...node.style,
                        height: `${updatedHeight}px`,
                    },
                };
            }
            return node;
        });
        setNodes(updatedNodes);
        childNodesArray.forEach((newNode) => {
            setNodes((nds) => nds.concat(newNode));
        });
    };

    const onNodeClick = (event, node) => {
        setActiveNode(node)
    }

    const onNodeDoubleClick = (event, node) => {
        if (node !== undefined) {
            setShowPopup(node.data.label);
        } else {
            setShowPopup('');
        }
    }

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();
            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow');
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            let newNode = {}
            let height = (nodes.length + 1) * 75;
            if (type.includes('Database') && database < 2) {
                newNode = {
                    id: getId() + 'A',
                    type: 'input',
                    data: { label: `${type}` },
                    position,
                    type: 'Database',
                    style: { backgroundColor: '#f2f2f5', color: 'black', width: '200px', minHeight: '30px' },
                }
                database++
                addNodesToState(newNode)
                setNodes((nds) => nds.concat(newNode));
            } else if (type.includes('Filter') && shortBy < 2) {
                newNode = {
                    id: getId(),
                    type: 'input',
                    data: { label: `${type}` },
                    position,
                    type: 'Filter',
                    style: { color: 'black', minHeight: '30px' },
                }
                shortBy++
                addNodesToState(newNode)
                setNodes((nds) => nds.concat(newNode));
            } else if (type.includes('SortBy') && Filter < 2) {
                newNode = {
                    id: getId(),
                    type: 'input',
                    data: { label: `${type}` },
                    position,
                    type: 'SortBy',
                    style: { color: 'black', minHeight: '30px' },
                }
                Filter++
                addNodesToState(newNode)
                setNodes((nds) => nds.concat(newNode));
            } else if (type.includes('output') && output < 1) {
                newNode = {
                    id: getId(),
                    type: 'output',
                    data: { label: `${type}` },
                    position,
                    style: { color: 'black', minHeight: '30px' },
                }
                output++
                addNodesToState(newNode)
                setNodes((nds) => nds.concat(newNode));
            }
        },
        [reactFlowInstance]
    );

    useEffect(() => {
        setNodes(allNodes);
    }, [allNodes]);

    return (
        <div style={{ height: '90vh', width: '80vw', border: '1px solid black', boxSizing: 'border-box' }}>
            {showPopup === 'Database' &&
                <Popup
                    onClose={onNodeDoubleClick}
                    onApply={onNodeDoubleClick}
                    activeNode={activeNode}
                    addChildreNodes={addChildreNodes}
                />}
            {showPopup === 'Filter' &&
                <PopupFilter
                    onClose={onNodeDoubleClick}
                    onApply={onNodeDoubleClick}
                    activeNode={activeNode}
                    addChildreNodes={addChildreNodes}
                />}
            {showPopup === 'SortBy' &&
                <PopupSortBy
                    onClose={onNodeDoubleClick}
                    onApply={onNodeDoubleClick}
                    activeNode={activeNode}
                    addChildreNodes={addChildreNodes}
                />}
            {showPopup === 'output' &&
                <PopupOutput
                    onClose={onNodeDoubleClick}
                    onApply={onNodeDoubleClick}
                    activeNode={activeNode}
                    addChildreNodes={addChildreNodes}
                />}
            <div className="dndflow">
                <ReactFlowProvider>
                    <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            onInit={setReactFlowInstance}
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                            onNodeDoubleClick={onNodeDoubleClick}
                            onNodeClick={onNodeClick}
                            snapGrid={[15, 15]}
                            fitView
                            nodeTypes={nodeTypes}
                        >
                            <MiniMap nodeStrokeWidth={3} zoomable pannable />
                            <Background color="#ccc" variant={variant} />
                            <Controls />
                        </ReactFlow>
                    </div>
                </ReactFlowProvider>
            </div>
        </div>
    )
}

export default WorkflowCanvas;
