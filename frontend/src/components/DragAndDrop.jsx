import React from 'react';

const DragAndDrop = () => {
  const handleDragStart = (event) => {
    event.preventDefault();
    console.log("DRAG STARTED!");
    window.electron.startDrag('/iconForDragAndDrop.jpg');
  };

  return (
    <div>
      <div 
        draggable="true" 
        id="drag1" 
        onDragStart={handleDragStart}
        className="border-2 border-gray-500 p-4 rounded-md"
      >
        Drag me
      </div>
    </div>
  );
};

export default DragAndDrop;
