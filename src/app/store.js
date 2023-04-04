import { create } from 'zustand';

const useStore = create((set) => ({
    input: '',
    filterValue: 'GREATERTHAN',
    filterHeader: [],
    allNodes: [],
    allEdges: [],
    selectedTables: [],
    selectedHeaders: [],
    addNodes: (node) => set((state) => ({ allNodes: [node, ...state.allNodes] })),
    addEdges: (node) => set((state) => ({ allEdges: [node, ...state.allEdges] })),
    addTables: (...node) => set((state) => ({ selectedTables: [...node, ...state.selectedTables] })),
    addHeaders: (...node) => set((state) => ({ selectedHeaders: [...node, ...state.selectedHeaders] })),
    addInput: (value) => set((state) => ({ input: value })),
    addFilterValue: (value) => set((state) => ({ filterValue: value })),
    addfilterHeader: (value) => set((state) => ({ filterHeader: value }))
}));

export default useStore