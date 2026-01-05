import React, { useEffect } from 'react';
import StoryCanvas from './components/StoryCanvas';
import ChapterEditor from './components/ChapterEditor';
import AIChatAssistant from './components/AIChatAssistant';
import EntitySidebar from './components/EntitySidebar';
import PersistenceManager from './components/PersistenceManager';
import Toolbar from './components/Toolbar';
import { useStoryStore } from './store/useStoryStore';
import { StoryNode } from './types/story';

function App() {
  const addNode = useStoryStore((state) => state.addNode);
  const addEntity = useStoryStore((state) => state.addEntity);
  const nodes = useStoryStore((state) => state.nodes);
  const entities = useStoryStore((state) => state.entities);

  useEffect(() => {
    // Add initial node if empty
    if (nodes.length === 0) {
      const initialNode: StoryNode = {
        id: '1',
        type: 'storyNode',
        position: { x: 250, y: 250 },
        data: {
          title: 'The Beginning',
          outline: 'Our hero wakes up in a mysterious forest...',
          content: '<p>It was a dark and stormy night...</p>',
          type: 'plot',
        },
      };
      addNode(initialNode);
    }

    // Add initial entities if empty
    if (entities.length === 0) {
        addEntity({
            id: 'e1',
            name: 'Hero',
            type: 'character',
            attributes: { role: 'Protagonist', hp: 100 },
        });
        addEntity({
            id: 'e2',
            name: 'Magic Sword',
            type: 'item',
            attributes: { damage: 50, rarity: 'Legendary' },
        });
    }
  }, [addNode, addEntity, nodes.length, entities.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950">
      <PersistenceManager />
      <Toolbar />
      <StoryCanvas />
      <EntitySidebar />
      <ChapterEditor />
      <AIChatAssistant />
    </div>
  );
}

export default App;
