import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { motion, AnimatePresence } from 'framer-motion';
import { useStoryStore } from '../store/useStoryStore';
import { X } from 'lucide-react';

const ChapterEditor = () => {
  const { selectedNodeId, nodes, updateNodeData, setSelectedNodeId } = useStoryStore();
  
  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-[300px]',
      },
    },
    onUpdate: ({ editor }) => {
      if (selectedNodeId) {
        // We use a debounce or just update directly. 
        // For now direct update, but be careful about performance with large text.
        updateNodeData(selectedNodeId, { content: editor.getHTML() });
      }
    },
  });

  // Sync editor content when switching nodes
  useEffect(() => {
    if (editor && selectedNodeId) {
      const node = useStoryStore.getState().nodes.find((n) => n.id === selectedNodeId);
      if (node && editor.getHTML() !== node.data.content) {
        editor.commands.setContent(node.data.content || '');
      }
    }
  }, [selectedNodeId, editor]);

  return (
    <AnimatePresence>
      {selectedNodeId && selectedNode && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 h-screen w-1/2 bg-slate-900 border-l border-slate-700 shadow-2xl z-50 flex flex-col"
        >
          <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800">
            <input
              type="text"
              value={selectedNode.data.title || ''}
              onChange={(e) => updateNodeData(selectedNodeId, { title: e.target.value })}
              className="bg-transparent text-xl font-bold text-slate-100 focus:outline-none w-full mr-4"
              placeholder="Chapter Title"
            />
            <button
              onClick={() => setSelectedNodeId(null)}
              className="p-2 hover:bg-slate-700 rounded-full text-slate-400 hover:text-slate-100"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="mb-4">
                <label className="block text-sm font-medium text-slate-400 mb-1">Outline</label>
                <textarea
                    value={selectedNode.data.outline || ''}
                    onChange={(e) => updateNodeData(selectedNodeId, { outline: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-slate-200 focus:border-blue-500 focus:outline-none resize-none h-24"
                    placeholder="Brief summary of this chapter..."
                />
            </div>
            
            <label className="block text-sm font-medium text-slate-400 mb-1">Content</label>
            <div className="prose prose-invert max-w-none bg-slate-800 p-4 rounded border border-slate-700 focus-within:border-blue-500">
              <EditorContent editor={editor} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChapterEditor;
