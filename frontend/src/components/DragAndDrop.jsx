import React from 'react';

const DragAndDrop = () => {
  // Handle drag start event
  const handleDragStart = (event) => {
    event.preventDefault();
    console.log("DRAG STARTED!");
  
    // Trigger the startDrag method in the main process via the exposed API
     // Vérifiez que window.electron existe avant d'appeler startDrag
      window.electron.startDrag('/iconForDragAndDrop.png');
  };

  return (
    <div>
      <div 
        draggable="true" 
        id="drag1" 
        onDragStart={handleDragStart}>
        Drag me
      </div>
    </div>
  );
};

export default DragAndDrop;
