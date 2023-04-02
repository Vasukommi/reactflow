import { useState, useRef, useCallback, useEffect } from 'react';
import DatabaseNode from '../customs/DatabaseNode';
import ChildNode from '../customs/ChildNode';
import Popup from '../popup/Popup';
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

const nodeTypes = { Database: DatabaseNode, ChildNode: ChildNode }

const WorkflowCanvas = () => {
    const [variant, setVariant] = useState('cross');
    const [activeNode, setActiveNode] = useState('');
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const allNodes = useStore(state => state.allNodes);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

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
        setShowPopup(!showPopup);
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
            if (type.includes('Database')) {
                newNode = {
                    id: getId() + 'A',
                    type: 'input',
                    data: { label: `${type}` },
                    position,
                    type: 'Database',
                    style: { backgroundColor: '#f2f2f5', color: 'black', width: '200px', minHeight: '30px' },
                }
            }
            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
    );

    useEffect(() => {
        setNodes(allNodes);
    }, [allNodes]);

    return (
        <div style={{ height: '90vh', width: '80vw', border: '1px solid black', boxSizing: 'border-box' }}>
            {showPopup &&
                <Popup
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
