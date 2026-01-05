import { create } from 'zustand';
import { 
  addEdge, 
  applyNodeChanges, 
  applyEdgeChanges, 
  Connection, 
  EdgeChange, 
  NodeChange 
} from '@xyflow/react';
import { StoryNode, StoryEdge, Entity, StoryNodeData } from '../types/story';

interface StoryState {
  nodes: StoryNode[];
  edges: StoryEdge[];
  entities: Entity[];
  
  // React Flow actions
  onNodesChange: (changes: NodeChange<StoryNode>[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  
  // Story actions
  addNode: (node: StoryNode) => void;
  updateNodeData: (id: string, data: Partial<StoryNodeData>) => void;
  removeNode: (id: string) => void;
  
  addEntity: (entity: Entity) => void;
  updateEntity: (id: string, data: Partial<Entity>) => void;
  removeEntity: (id: string) => void;

  // Bulk setters for persistence
  setNodes: (nodes: StoryNode[]) => void;
  setEdges: (edges: StoryEdge[]) => void;
  setEntities: (entities: Entity[]) => void;

  // UI State
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
}

export const useStoryStore = create<StoryState>((set, get) => ({
  nodes: [],
  edges: [],
  entities: [],
  selectedNodeId: null,

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  setEntities: (entities) => set({ entities }),
  
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes) as StoryNode[],
    });
  },
  
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  
  addNode: (node) => {
    set((state) => ({
      nodes: [...state.nodes, node],
    }));
  },
  
  updateNodeData: (id, data) => {
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: { ...node.data, ...data },
          };
        }
        return node;
      }),
    }));
  },
  
  removeNode: (id) => {
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== id),
      edges: state.edges.filter((edge) => edge.source !== id && edge.target !== id),
    }));
  },
  
  addEntity: (entity) => {
    set((state) => ({
      entities: [...state.entities, entity],
    }));
  },
  
  updateEntity: (id, data) => {
    set((state) => ({
      entities: state.entities.map((entity) => 
        entity.id === id ? { ...entity, ...data } : entity
      ),
    }));
  },
  
  removeEntity: (id) => {
    set((state) => ({
      entities: state.entities.filter((entity) => entity.id !== id),
    }));
  },

  setSelectedNodeId: (id) => {
    set({ selectedNodeId: id });
  },
}));
