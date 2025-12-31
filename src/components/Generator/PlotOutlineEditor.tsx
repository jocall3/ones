import React, { useState, useEffect } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from '@hello-pangea/dnd';

// Define the structure for a single plot point
export interface PlotPoint {
  id: string;
  content: string;
}

// Define the props for the component
interface PlotOutlineEditorProps {
  initialOutline: PlotPoint[];
  onOutlineChange: (newOutline: PlotPoint[]) => void;
}

// Helper function to reorder a list
const reorder = (list: PlotPoint[], startIndex: number, endIndex: number): PlotPoint[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const PlotOutlineEditor: React.FC<PlotOutlineEditorProps> = ({
  initialOutline,
  onOutlineChange,
}) => {
  const [plotPoints, setPlotPoints] = useState<PlotPoint[]>(initialOutline);
  const [newPointContent, setNewPointContent] = useState('');

  // Effect to sync state with parent when props change
  useEffect(() => {
    setPlotPoints(initialOutline);
  }, [initialOutline]);

  // Effect to notify parent component of changes
  useEffect(() => {
    onOutlineChange(plotPoints);
  }, [plotPoints, onOutlineChange]);

  const onDragEnd = (result: DropResult) => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorderedPoints = reorder(
      plotPoints,
      result.source.index,
      result.destination.index
    );

    setPlotPoints(reorderedPoints);
  };

  const handleAddPlotPoint = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPointContent.trim() === '') return;

    const newPoint: PlotPoint = {
      id: `point-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      content: newPointContent.trim(),
    };

    setPlotPoints([...plotPoints, newPoint]);
    setNewPointContent('');
  };

  const handleUpdatePlotPoint = (id: string, newContent: string) => {
    setPlotPoints(
      plotPoints.map((point) =>
        point.id === id ? { ...point, content: newContent } : point
      )
    );
  };

  const handleDeletePlotPoint = (id: string) => {
    setPlotPoints(plotPoints.filter((point) => point.id !== id));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Plot Outline Editor</h2>
      <p style={styles.instructions}>
        Add, edit, and drag-and-drop plot points to structure your story.
      </p>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="plot-points">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getDroppableStyle(snapshot.isDraggingOver)}
            >
              {plotPoints.length > 0 ? (
                plotPoints.map((point, index) => (
                  <Draggable key={point.id} draggableId={point.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={getDraggableStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <div {...provided.dragHandleProps} style={styles.dragHandle} aria-label="Drag to reorder">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block' }}>
                            <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                          </svg>
                        </div>
                        <input
                          type="text"
                          value={point.content}
                          onChange={(e) =>
                            handleUpdatePlotPoint(point.id, e.target.value)
                          }
                          style={styles.input}
                          aria-label={`Plot point ${index + 1}`}
                        />
                        <button
                          onClick={() => handleDeletePlotPoint(point.id)}
                          style={styles.deleteButton}
                          aria-label={`Delete plot point ${index + 1}`}
                        >
                          &times;
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                !snapshot.isDraggingOver && (
                  <div style={styles.emptyListPlaceholder}>
                    <p>Your plot outline is empty.</p>
                    <p>Use the form below to add your first plot point.</p>
                  </div>
                )
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <form onSubmit={handleAddPlotPoint} style={styles.addForm}>
        <input
          type="text"
          value={newPointContent}
          onChange={(e) => setNewPointContent(e.target.value)}
          placeholder="Add a new plot point..."
          style={styles.addInput}
          aria-label="New plot point content"
        />
        <button type="submit" style={styles.addButton}>
          Add Point
        </button>
      </form>
    </div>
  );
};

// Basic styling to make the component functional and clean
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    backgroundColor: '#f4f5f7',
    padding: '24px',
    borderRadius: '8px',
    maxWidth: '800px',
    margin: '20px auto',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  header: {
    marginTop: 0,
    color: '#172b4d',
    borderBottom: '1px solid #dfe1e6',
    paddingBottom: '12px',
    marginBottom: '8px',
  },
  instructions: {
    color: '#5e6c84',
    marginBottom: '24px',
    fontSize: '14px',
  },
  draggableItem: {
    userSelect: 'none',
    padding: '8px',
    margin: '0 0 8px 0',
    backgroundColor: '#ffffff',
    border: '1px solid #dfe1e6',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    transition: 'box-shadow 0.2s ease, background-color 0.2s ease',
  },
  dragHandle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 8px',
    color: '#5e6c84',
    cursor: 'grab',
  },
  input: {
    flexGrow: 1,
    border: 'none',
    padding: '8px',
    fontSize: '16px',
    backgroundColor: 'transparent',
    outline: 'none',
    color: '#172b4d',
  },
  deleteButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#5e6c84',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '0 10px',
    borderRadius: '50%',
    lineHeight: 1,
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s ease, color 0.2s ease',
  },
  addForm: {
    display: 'flex',
    marginTop: '24px',
  },
  addInput: {
    flexGrow: 1,
    padding: '12px',
    fontSize: '16px',
    border: '2px solid #dfe1e6',
    borderRadius: '4px 0 0 4px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  },
  addButton: {
    padding: '12px 20px',
    fontSize: '16px',
    fontWeight: 600,
    border: 'none',
    backgroundColor: '#0052cc',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '0 4px 4px 0',
    outline: 'none',
    transition: 'background-color 0.2s ease',
  },
  emptyListPlaceholder: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#5e6c84',
    fontSize: '16px',
  },
};

// Add focus and hover styles dynamically if needed, though CSS classes are better for this.
// For simplicity in this single file, we'll rely on browser defaults.

const getDroppableStyle = (isDraggingOver: boolean): React.CSSProperties => ({
  background: isDraggingOver ? '#e6fcff' : 'transparent',
  padding: '8px',
  minHeight: '150px',
  borderRadius: '4px',
  border: '2px dashed #c1c7d0',
  transition: 'background-color 0.2s ease',
});

const getDraggableStyle = (
  isDragging: boolean,
  draggableStyle: DraggableProvidedDraggableProps['style']
): React.CSSProperties => ({
  ...styles.draggableItem,
  ...draggableStyle,
  background: isDragging ? '#e9f2ff' : '#ffffff',
  boxShadow: isDragging ? '0 4px 8px rgba(0,0,0,0.2)' : styles.draggableItem.boxShadow,
});

export default PlotOutlineEditor;