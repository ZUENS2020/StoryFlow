import React from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap,
  NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useStoryStore } from '../store/useStoryStore';
import StoryNode from './StoryNode';

const nodeTypes: NodeTypes = {
  storyNode: StoryNode,
};

const StoryCanvas = () => {
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect 
  } = useStoryStore();

  return (
    <div className="w-full h-screen bg-slate-950">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-slate-950"
        defaultEdgeOptions={{
            animated: true,
            style: { stroke: '#94a3b8', strokeWidth: 2 },
        }}
      >
        <Background color="#334155" gap={16} />
        <Controls className="!bg-slate-800 !border-slate-700 [&>button]:!fill-slate-200 [&>button]:!border-slate-700 hover:[&>button]:!bg-slate-700" />
        <MiniMap 
            nodeColor={(n) => {
                const type = n.data?.type as string;
                switch (type) {
                    case 'plot': return '#3b82f6';
                    case 'conflict': return '#ef4444';
                    case 'resolution': return '#22c55e';
                    default: return '#a855f7';
                }
            }}
            className="!bg-slate-800 !border-slate-700" 
            maskColor="rgba(15, 23, 42, 0.6)"
        />
      </ReactFlow>
    </div>
  );
};

export default StoryCanvas;
