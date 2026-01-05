import { Node, Edge } from '@xyflow/react';

export type StoryNodeType = 'plot' | 'conflict' | 'resolution' | 'custom';

export interface StoryNodeData extends Record<string, unknown> {
  title: string;
  outline: string; // < 200 chars
  content: string; // Full chapter content
  type: StoryNodeType;
  customFields?: Record<string, any>;
}

export type StoryNode = Node<StoryNodeData>;
export type StoryEdge = Edge;

export interface Entity {
  id: string;
  name: string;
  type: 'character' | 'item' | 'location';
  attributes: Record<string, any>;
  description?: string;
}
