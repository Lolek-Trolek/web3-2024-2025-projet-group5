import React from 'react';

const DragAndDrop = () => {
  const handleDragStart = (event) => {
    event.preventDefault();
    console.log("DRAG STARTED!");
    window.electron.startDrag('/iconForDragAndDrop.png');
  };

  return (
    <div>
      <div 
        draggable="true" 
        id="drag1" 
        onDragStart={handleDragStart}
        className="w-16 h-16 bg-red-500 text-white flex items-center justify-center rounded-lg shadow-lg cursor-pointer"
      >
        Drag me
      </div>
    </div>
  );
};

export default DragAndDrop;
