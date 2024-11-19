// DragAndDropOut.js
import React from 'react';

const DragAndDropOut = ({ files }) => {
    const handleDragStart = (event, file) => {
        window.electron.startDrag(file.file.path);
    };

    return (
        <div>
            <div>
                {files.length > 0 ? (
                    files.map((fileData, index) => (
                        <div
                            key={index}
                            draggable="true"
                            onDragStart={(event) => handleDragStart(event, fileData)}
                            className="border-2 border-gray-500 p-4 rounded-md flex items-center justify-center"
                            style={{ marginBottom: '10px' }}
                        >
                            {fileData.preview ? (
                                <img
                                    src={fileData.preview}
                                    alt="Aperçu"
                                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                                />
                            ) : (
                                <span>{fileData.file.name}</span>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Aucune image disponible pour le drag.</p>
                )}
            </div>
        </div>
    );
};

export default DragAndDropOut;
