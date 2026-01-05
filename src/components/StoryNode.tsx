import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { StoryNodeData } from '../types/story';
import { useStoryStore } from '../store/useStoryStore';
import { twMerge } from 'tailwind-merge';

const StoryNode = ({ id, data, selected }: NodeProps<StoryNodeData>) => {
  const setSelectedNodeId = useStoryStore((state) => state.setSelectedNodeId);

  if (!data) return null;

  const typeColors: Record<string, string> = {
    plot: 'border-blue-500 bg-slate-800',
    conflict: 'border-red-500 bg-slate-800',
    resolution: 'border-green-500 bg-slate-800',
    custom: 'border-purple-500 bg-slate-800',
  };

  return (
    <div
      className={twMerge(
        'w-64 rounded-lg border-l-4 p-4 shadow-lg transition-all hover:shadow-xl',
        typeColors[data.type] || typeColors.plot,
        selected ? 'ring-2 ring-blue-400' : ''
      )}
      onClick={() => setSelectedNodeId(id)}
    >
      <Handle type="target" position={Position.Top} className="!bg-slate-400" />
      
      <div className="mb-2">
        <h3 className="text-lg font-bold text-slate-100">{data.title}</h3>
        <span className="text-xs uppercase tracking-wider text-slate-500">
          {data.type}
        </span>
      </div>
      
      <p className="line-clamp-3 text-sm text-slate-400">
        {data.outline || 'No outline provided...'}
      </p>

      <Handle type="source" position={Position.Bottom} className="!bg-slate-400" />
    </div>
  );
};

export default memo(StoryNode);
