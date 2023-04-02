import Header from "../components/header/Header"
import LeftSidebar from "../components/left-sidebar/LeftSidebar"
import WorkflowCanvas from "../components/workflow-canvas/WorkflowCanvas"
import useStore from "../app/store"

const Workflow = () => {
    const initialNodes = useStore((state) => state.allNodes)
    return (
        <div>
            <Header />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <LeftSidebar />
                <WorkflowCanvas initialNodes={initialNodes} />
            </div>
        </div>
    )
}

export default Workflow