import Dexie, { Table } from 'dexie';
import { StoryNode, Entity } from '../types/story';
import { Edge } from '@xyflow/react';

class StoryDatabase extends Dexie {
  nodes!: Table<StoryNode>;
  edges!: Table<Edge>;
  entities!: Table<Entity>;

  constructor() {
    super('StoryFlowDB');
    this.version(1).stores({
      nodes: 'id',
      edges: 'id',
      entities: 'id'
    });
  }
}

export const db = new StoryDatabase();
