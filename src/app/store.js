import { create } from 'zustand';

const useStore = create((set) => ({
    allNodes: [],
    addNodes: (node) => set((state) => ({ allNodes: [node, ...state.allNodes] }))
}));

export default useStore