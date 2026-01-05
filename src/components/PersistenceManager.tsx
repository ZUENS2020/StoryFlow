import { useEffect, useRef } from 'react';
import { useStoryStore } from '../store/useStoryStore';
import { db } from '../db/db';

const PersistenceManager = () => {
  const { nodes, edges, entities, setNodes, setEdges, setEntities } = useStoryStore();
  const isLoaded = useRef(false);

  // Load on mount
  useEffect(() => {
    const load = async () => {
      try {
        const savedNodes = await db.nodes.toArray();
        const savedEdges = await db.edges.toArray();
        const savedEntities = await db.entities.toArray();

        // Only set if we have data, otherwise we might overwrite initial state if we are not careful
        // But actually, if DB is empty, we might want to keep initial state from App.tsx
        // App.tsx checks if nodes.length === 0.
        // So if we load empty array, App.tsx will add initial node.
        // If we load non-empty, App.tsx won't add initial node.
        // But we need to make sure App.tsx waits for load?
        // Or we just set loaded flag.
        
        if (savedNodes.length > 0) setNodes(savedNodes);
        if (savedEdges.length > 0) setEdges(savedEdges);
        if (savedEntities.length > 0) setEntities(savedEntities);
        
        isLoaded.current = true;
      } catch (error) {
        console.error("Failed to load from DB:", error);
      }
    };
    load();
  }, []);

  // Auto-save with debounce could be better, but for now:
  useEffect(() => {
    if (!isLoaded.current) return; // Don't save before loading
    const save = async () => {
        await db.transaction('rw', db.nodes, async () => {
            await db.nodes.clear();
            await db.nodes.bulkAdd(nodes);
        });
    };
    save();
  }, [nodes]);

  useEffect(() => {
    if (!isLoaded.current) return;
    const save = async () => {
        await db.transaction('rw', db.edges, async () => {
            await db.edges.clear();
            await db.edges.bulkAdd(edges);
        });
    };
    save();
  }, [edges]);

  useEffect(() => {
    if (!isLoaded.current) return;
    const save = async () => {
        await db.transaction('rw', db.entities, async () => {
            await db.entities.clear();
            await db.entities.bulkAdd(entities);
        });
    };
    save();
  }, [entities]);

  return null;
};

export default PersistenceManager;
