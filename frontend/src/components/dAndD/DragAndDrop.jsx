// NativeFileDropZone.js
import React, { useState } from 'react';

function DragAndDrop () {
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);

        const droppedFiles = Array.from(event.dataTransfer.files);
        const fileData = droppedFiles.map((file) => ({
            file,
            preview: file.type.startsWith("image") ? URL.createObjectURL(file) : null,
        }));

        setFiles((prevFiles) => [...prevFiles, ...fileData]);
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
                border: '2px dashed #999',
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center',
                backgroundColor: isDragging ? '#e0e0e0' : '#f9f9f9',
                color: '#666',
            }}
        >
            <p>Déposez vos fichiers ici</p>

            {files.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Fichiers téléchargés :</h3>
                    <ul>
                        {files.map((fileData, index) => (
                            <li key={index} style={{ marginBottom: '10px' }}>
                                {fileData.preview ? (
                                    <img
                                        src={fileData.preview}
                                        alt="Aperçu"
                                        style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }}
                                    />
                                ) : (
                                    <span>{fileData.file.name}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default DragAndDrop;
