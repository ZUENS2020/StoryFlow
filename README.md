# StoryFlow

StoryFlow is a web application that transforms "emotional literary creation" into "rational graph logic operations". It allows users to conceive stories by dragging and dropping nodes (plots) and connecting lines (causality).

## Features

*   **Dual-View Nodes**: Outline view on canvas, full editor in sidebar.
*   **Graph Engine**: Powered by `@xyflow/react` for node editing and dragging.
*   **Rich Text Editor**: `TipTap` integration for writing chapters.
*   **AI Co-Pilot**: An agent that can modify the graph structure and entities via natural language commands.
*   **Entity Management**: Manage characters, items, and locations with real-time updates.
*   **Persistence**: `Dexie.js` (IndexedDB) integration for saving large texts and graph structure.
*   **Dark Mode**: Industrial Slate-900 theme.

## Tech Stack

*   React (Vite)
*   Tailwind CSS
*   Zustand (State Management)
*   @xyflow/react (React Flow)
*   TipTap (Editor)
*   Dexie.js (IndexedDB)
*   Framer Motion (Animations)
*   Lucide React (Icons)

## Getting Started

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Run the development server:
    ```bash
    npm run dev
    ```

## AI Agent Commands

The AI Agent (Mock) supports the following commands in the console:

*   `add node [Title] [type]`
    *   Example: `add node The Ambush conflict`
    *   Types: `plot`, `conflict`, `resolution`, `custom`
*   `link [sourceId] [targetId]`
    *   Example: `link 1 2`

## Project Structure

*   `src/components`: UI components (StoryNode, StoryCanvas, ChapterEditor, EntitySidebar, AgentConsole).
*   `src/store`: Zustand store (`useStoryStore`).
*   `src/types`: TypeScript definitions.
*   `src/services`: AI Agent logic.
*   `src/db`: Dexie database configuration.

## Progress

- [x] Environment Initialization
- [x] Data Layer Development (Zustand)
- [x] Visualization Interface (React Flow)
- [x] AI Agent Mock
- [x] Entity Library Logic
- [x] Persistence (Dexie.js)
