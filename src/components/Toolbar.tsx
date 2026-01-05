import React from 'react';
import { useStoryStore } from '../store/useStoryStore';
import { StoryNode } from '../types/story';
import { Plus, Save, Layout } from 'lucide-react';

const Toolbar = () => {
  const addNode = useStoryStore((state) => state.addNode);

  const handleAddNode = (type: string) => {
    const id = Date.now().toString();
    const newNode: StoryNode = {
      id,
      type: 'storyNode',
      position: { x: Math.random() * 400 + 100, y: Math.random() * 400 + 100 },
      data: {
        title: 'New Chapter',
        outline: 'Write a summary...',
        content: '',
        type: type as any,
      },
    };
    addNode(newNode);
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-slate-800/90 backdrop-blur border border-slate-700 rounded-full shadow-xl p-1.5 flex gap-2 z-50">
      <button onClick={() => handleAddNode('plot')} className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-500/20">
        <Plus size={16} /> Plot
      </button>
      <button onClick={() => handleAddNode('conflict')} className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-full text-sm font-medium transition-all hover:shadow-lg hover:shadow-red-500/20">
        <Plus size={16} /> Conflict
      </button>
      <button onClick={() => handleAddNode('resolution')} className="flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-full text-sm font-medium transition-all hover:shadow-lg hover:shadow-green-500/20">
        <Plus size={16} /> Resolution
      </button>
    </div>
  );
};

export default Toolbar;
