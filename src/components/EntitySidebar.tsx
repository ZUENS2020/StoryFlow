import React, { useState } from 'react';
import { useStoryStore } from '../store/useStoryStore';
import { Entity } from '../types/story';
import { Users, Plus, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const EntitySidebar = () => {
  const { entities, addEntity, removeEntity, updateEntity } = useStoryStore();
  const [isOpen, setIsOpen] = useState(true);

  const handleAddEntity = () => {
    const newEntity: Entity = {
      id: Date.now().toString(),
      name: 'New Character',
      type: 'character',
      attributes: { role: 'Protagonist', status: 'Alive' },
    };
    addEntity(newEntity);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-4 left-4 z-50 p-2 bg-slate-800 rounded-full text-slate-200 shadow-lg transition-transform duration-300 ${isOpen ? 'translate-x-64' : ''}`}
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 h-screen w-64 bg-slate-900 border-r border-slate-700 shadow-xl z-40 flex flex-col"
      >
        <div className="p-4 border-b border-slate-700 flex items-center justify-between bg-slate-800 pl-12">
          <div className="flex items-center gap-2">
            <Users size={20} className="text-blue-400" />
            <h2 className="font-bold text-slate-100">Entities</h2>
          </div>
          <button onClick={handleAddEntity} className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-blue-400">
            <Plus size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {entities.map((entity) => (
            <div key={entity.id} className="bg-slate-800 p-3 rounded border border-slate-700 hover:border-blue-500 transition-colors group">
              <div className="flex justify-between items-start mb-2">
                <input
                  className="bg-transparent font-bold text-slate-200 w-full focus:outline-none"
                  value={entity.name}
                  onChange={(e) => updateEntity(entity.id, { name: e.target.value })}
                />
                <button 
                    onClick={() => removeEntity(entity.id)}
                    className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <Trash2 size={16} />
                </button>
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{entity.type}</div>
              <div className="space-y-1">
                {Object.entries(entity.attributes).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-xs">
                        <span className="text-slate-400">{key}:</span>
                        <span className="text-slate-300">{String(value)}</span>
                    </div>
                ))}
              </div>
            </div>
          ))}
          
          {entities.length === 0 && (
            <div className="text-center text-slate-500 mt-10 text-sm">
                No entities yet.<br/>Click + to add one.
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default EntitySidebar;
